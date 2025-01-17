import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { setTheme } from '@/redux/slices/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

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
  const [mobileMenuHidden, setMobileMenuHidden] = useState(false);

  const handleThemeChange = () => {
    dispatch(setTheme({ theme: theme === 'dark' ? 'light' : 'dark' }));
  };

  return (
    <div className="min-h-100vh w-full p-9">
      <div className="flex w-full justify-end text-tBase md:hidden">
        <MdMenu
          onClick={() => setMobileMenuHidden(!mobileMenuHidden)}
          size={32}
        />
      </div>
      {mobileMenuHidden && (
        <div className="flex animate-appear flex-col gap-2 bg-bgPrimary p-5">
          {navItems.map((items) => (
            <Link
              href={items.url}
              key={items.url}
              className={`${router.pathname === items.url && 'text-tBase'} uppercase hover:text-tHover`}
            >
              {items.name}
            </Link>
          ))}
          <div onClick={handleThemeChange} className="cursor-pointer">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      )}
      <div className="hidden items-center justify-between gap-5 rounded-md bg-bgPrimary p-5 text-tUnSelected md:flex">
        <div className="flex flex-col gap-5 md:flex-row">
          {navItems.map((items) => (
            <Link
              href={items.url}
              key={items.url}
              className={`${router.pathname === items.url && 'text-tBase'} uppercase hover:text-tHover`}
            >
              {items.name}
            </Link>
          ))}
        </div>
        <div onClick={handleThemeChange} className="cursor-pointer px-2">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </div>
      </div>
    </div>
  );
};
