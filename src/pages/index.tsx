import { Layout, PieChart } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { useEffect, useMemo } from 'react';
import { fetchAllUsersThunk } from '@/redux/slices/usersSlice';
import { formatDataToChart } from '../utils/formatDataToChart';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    //we are fetching all the data with this thunk, but in a real world app we should fetch for a certain period of time only.
    // And Since its not practical to show all the data at once we have limited the data point to the first 14data points
    dispatch(fetchAllUsersThunk());
  }, [dispatch]);

  const chartData = useMemo(() => {
    return formatDataToChart(users);
  }, [users]);

  return (
    <Layout>
      <h1 className="text-[27px] text-tBase">Dashboard</h1>

      <div className="flex w-2 w-[400px] flex-col items-center gap-5 rounded-lg bg-bgForm p-10">
        <div>{!loading && <PieChart data={chartData} />}</div>
        <p>Showing how many users in each city</p>
        <div className="flex gap-5 text-sm text-secondary">
          <p className="font-bold">Note:</p>
          <p className="w-[200px]">
            Since we have lot of data we are showing the first 14 data points
            only
          </p>
        </div>
      </div>
    </Layout>
  );
}
