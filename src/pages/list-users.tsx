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

const lightTheme = themeQuartz.withParams({
  backgroundColor: '#ffffff',
  foregroundColor: '#000',
  headerTextColor: '#27282c',
  headerBackgroundColor: '#f1f2f6',
  oddRowBackgroundColor: '#f6f9ff',
});

const darkTheme = themeQuartz.withParams({
  backgroundColor: '#222325',
  foregroundColor: '#7b7b7d',
  headerTextColor: '#606064',
  headerBackgroundColor: '#1e1e1e',
  oddRowBackgroundColor: '#292a2c',
});

const ListUser = () => {
  const { activePage } = usePagination();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { users, loading, sortBy, order, searchQuery, theme } = useAppSelector(
    (state) => ({
      ...state.users,
      ...state.theme,
    }),
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
          theme={theme === 'light' ? lightTheme : darkTheme}
          rowData={users}
          columnDefs={tableHeading}
          loading={loading}
          autoSizeStrategy={autoSizeStrategy}
          domLayout="autoHeight"
          onRowClicked={handleRowClick}
        />
      </div>
      <Pagination numberOfPage={10} />
      <div className="flex w-full justify-center">
        <p className="text-sm text-secondary">
          you can click a record to view details or edit!
        </p>
      </div>
    </Layout>
  );
};

export default ListUser;
