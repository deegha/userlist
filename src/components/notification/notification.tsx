import { clearNotification } from '@/redux/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { useEffect } from 'react';

export const Notification = () => {
  const dispatch = useAppDispatch();
  const { hasNotification, message, type } = useAppSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
    if (hasNotification) {
      setTimeout(() => {
        dispatch(clearNotification());
      }, 1500);
    }
  }, [dispatch, hasNotification]);

  const dynamicStyles = type === 'ERROR' ? 'bg-rose-600' : 'bg-teal-500';

  return (
    <div
      className={`fixed left-0 top-0 flex w-full justify-center transition-transform duration-500 ease-in-out ${
        hasNotification ? 'translate-y-[50px]' : 'translate-y-[-100%]'
      }`}
    >
      <div
        className={`w-[250px] p-10 text-white ${dynamicStyles} flex items-center justify-center rounded-md p-4 text-white`}
      >
        {message}
      </div>
    </div>
  );
};
