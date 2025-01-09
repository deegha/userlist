import { Button, Input } from '@/components';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { setSearch, clearSearch } from '@/redux/slices/usersSlice';
import { useEffect } from 'react';

export const Search = () => {
  const { loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, [dispatch]);

  const handleSubmit = (values: { searchText: string }) => {
    console.log(values);
    dispatch(setSearch({ search: values.searchText }));
  };

  return (
    <>
      <Formik initialValues={{ searchText: '' }} onSubmit={handleSubmit}>
        <Form className="flex gap-2">
          <Field
            name="searchText"
            as={Input}
            placeholder={'Search by anything'}
            showErrors={false}
          />
          <Button
            type="submit"
            text="Search"
            loading={loading}
            disabled={loading}
            variant="primary"
          />
        </Form>
      </Formik>
    </>
  );
};
