import { Navigation } from '@/components';
import { useAppSelector } from '@/hooks/index';

interface ILayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <main
      className={`flex flex-col items-center justify-start theme-${theme} mb-[50px] min-h-screen bg-bgSecondary`}
    >
      <Navigation />
      <div className="flex w-full flex-col gap-5 px-10">{children}</div>
    </main>
  );
};
