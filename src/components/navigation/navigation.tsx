import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { setTheme } from '@/redux/slices/themeSlice';

const navItems = [
  {
    name: 'Home',
    url: '/',
    icon: 'faHome',
  },
  {
    name: 'List Users',
    url: '/list-users',
    icon: 'faHome',
  },
  {
    name: 'Create Users',
    url: '/create-users',
    icon: 'faHome',
  },
];

export const Navigation = () => {
  const router = useRouter();
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(setTheme({ theme: theme === 'dark' ? 'light' : 'dark' }));
  };

  return (
    <div className="min-h-100vh w-full p-9">
      <div className="flex items-center justify-between rounded-md bg-bgPrimary p-5 text-tUnSelected">
        <div className="flex gap-5">
          {navItems.map((user) => (
            <Link
              href={user.url}
              key={user.url}
              className={`${router.pathname === user.url && 'text-tBase'} hover:text-tHover`}
            >
              {user.name}
            </Link>
          ))}
        </div>
        <div onClick={handleThemeChange} className="cursor-pointer px-2">
          {theme === 'dark' ? 'light' : 'dark'}
        </div>
      </div>
    </div>
  );
};
