import { Layout, UserForm } from '@/components';

const CreateUsers = () => {
  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h1 className="text-[23px] text-tBase">Create user</h1>
        <UserForm />
      </div>
    </Layout>
  );
};

export default CreateUsers;
