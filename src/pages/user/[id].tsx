import { Layout, UserForm } from '@/components';
import { clearUser, fetchUserThunk } from '@/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const EditUsers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(fetchUserThunk(id as string));
    }

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, id, router]);

  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h1 className="text-[23px] uppercase text-tBase">Edit user</h1>
        {user.age && <UserForm id={id as string} />}
      </div>
    </Layout>
  );
};

export default EditUsers;
