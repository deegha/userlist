import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  {
    name: 'home',
    url: '/home',
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

  return (
    <div className="min-h-100vh w-full p-9">
      <div className="flex items-center gap-5 rounded-md bg-slate-600 p-2 text-slate-400">
        {navItems.map((user) => (
          <Link
            href={user.url}
            key={user.url}
            className={`${router.pathname === user.url && 'text-sky-100'} hover:text-sky-100`}
          >
            {user.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
