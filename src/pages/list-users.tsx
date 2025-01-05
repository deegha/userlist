import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { fetchUsersThunk, setOrderBy } from '@/redux/slices/usersSlice';
import { useEffect, useMemo } from 'react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  ColDef,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Layout, Pagination } from '@/components';
import { usePagination } from '@/hooks/index';
import { TUser } from '@/types/user';

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = {
  sortable: false,
};

const ListUser = () => {
  const { activePage } = usePagination();
  const { users, loading, sortBy, order } = useAppSelector(
    (state) => state.users,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk({ page: activePage, sortBy, order }));
  }, [activePage, sortBy, order, dispatch]);

  const tableHeading: Array<ColDef<TUser>> = useMemo(
    () => [
      { field: 'name' },
      { field: 'avatar' },
      {
        field: 'age',
        sortable: true,
        comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
          dispatch(
            setOrderBy({
              orderBy: 'age',
              order: isDescending ? 'desc' : 'asc',
            }),
          );

          return 0;
        },
      },
      { field: 'city' },
      { field: 'occupation' },
    ],
    [dispatch],
  );

  return (
    <Layout>
      <div className="h-full w-full flex-1">
        <AgGridReact
          defaultColDef={defaultColDef}
          theme={themeQuartz}
          rowData={users}
          columnDefs={tableHeading}
          loading={loading}
          domLayout="autoHeight"
        />
        <Pagination numberOfPage={10} />
      </div>
    </Layout>
  );
};

export default ListUser;
