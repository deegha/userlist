import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { fetchUsersThunk, setOrderBy } from '@/redux/slices/usersSlice';
import { setUser } from '@/redux/slices/userSlice';
import { useEffect, useMemo } from 'react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  ColDef,
  SizeColumnsToFitGridStrategy,
  RowClickedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Layout, Pagination, Search } from '@/components';
import { usePagination } from '@/hooks/index';
import { TUser } from '@/types/user';
import { useRouter } from 'next/router';

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef = {
  sortable: false,
};

const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
  type: 'fitGridWidth',
};

const ListUser = () => {
  const { activePage } = usePagination();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { users, loading, sortBy, order, searchQuery } = useAppSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsersThunk({ page: activePage, sortBy, order, searchQuery }));
  }, [activePage, sortBy, order, dispatch, searchQuery]);

  const tableHeading: Array<ColDef<TUser>> = useMemo(
    () => [
      { field: 'name' },
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

  const handleRowClick = (event: RowClickedEvent<TUser>) => {
    if (!event.data) return;
    dispatch(setUser(event.data));

    router.push(`/user/${event.data.id}`);
  };

  return (
    <Layout>
      <div className="flex w-full justify-end">
        <Search />
      </div>
      <div className="h-full w-full flex-1">
        <AgGridReact
          defaultColDef={defaultColDef}
          theme={themeQuartz}
          rowData={users}
          columnDefs={tableHeading}
          loading={loading}
          autoSizeStrategy={autoSizeStrategy}
          domLayout="autoHeight"
          onRowClicked={handleRowClick}
        />
      </div>
      <Pagination numberOfPage={10} />
    </Layout>
  );
};

export default ListUser;
