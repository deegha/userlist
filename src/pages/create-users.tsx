import { Layout, UserForm } from '@/components';

const CreateUsers = () => {
  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h1 className="text-[23px] uppercase text-tBase">Create user</h1>

        <UserForm />
        <p className="text-sm text-secondary">
          Note: since we are using a mock api the user is not getting created in
          the backend, but it simulates the api call
        </p>
      </div>
    </Layout>
  );
};

export default CreateUsers;
