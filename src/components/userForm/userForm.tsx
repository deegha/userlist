import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '@/components/';
import { createUserThunk, updateUserThunk } from '@/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { useMemo } from 'react';
import { TUserCreate } from '@/types/user';

const CreateUserSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  age: Yup.number().typeError('Age must be a number').required('Required'),
  city: Yup.string().required('Required'),
  occupation: Yup.string().required('Required'),
});

export const UserForm = ({ id }: { id?: string }) => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);

  const isEditing = id;

  const initialValues = useMemo(() => {
    return isEditing
      ? user
      : {
          name: '',
          age: '',
          city: '',
          occupation: '',
        };
  }, [isEditing, user]);

  const handleSubmit = (values: TUserCreate) => {
    if (isEditing) {
      dispatch(updateUserThunk({ id: id as string, user: values }));
    } else {
      dispatch(createUserThunk(values));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full flex-col gap-5 rounded-lg bg-bgForm p-10 md:w-[800px]">
          <Field
            name="name"
            as={Input}
            placeholder="Enter Name"
            label={'Name'}
          />
          <Field name="age" as={Input} label={'Age'} placeholder="Enter Age" />
          <Field
            name="city"
            as={Input}
            label={'City'}
            placeholder="Enter City"
          />
          <Field
            name="occupation"
            as={Input}
            label={'Occupation'}
            placeholder="Enter Occupation"
          />
          <div className="flex w-full justify-center md:justify-end">
            <Button
              size="small"
              disabled={loading}
              variant="primary"
              type="submit"
              text={isEditing ? 'Save User' : 'Create User'}
              loading={loading}
            />
          </div>
        </Form>
      </Formik>
    </>
  );
};
