import { Navigation } from '@/components';

interface ILayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <Navigation />
      <div className="w-full px-10">{children}</div>
    </div>
  );
};
