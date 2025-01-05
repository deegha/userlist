import { Navigation } from '@/components';
import { useAppSelector } from '@/hooks/index';

interface ILayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <main
      className={`flex flex-col items-center justify-start theme-${theme} min-h-screen bg-bgSecondary`}
    >
      <Navigation />
      <div className="w-full px-10">{children}</div>
    </main>
  );
};
