import { usePagination } from '@/hooks/index';

interface IPagination {
  numberOfPage: number;
}

export const Pagination = ({ numberOfPage }: IPagination) => {
  const { activePage, handlePageClick } = usePagination();

  const renderPage = () => {
    const pages = [];
    for (let i = 1; i <= numberOfPage; i++) {
      pages.push(
        <div
          key={i}
          className={`cursor-pointer rounded-lg border-2 border-solid border-border p-2 text-tUnSelected ${parseInt(activePage) === i ? 'bg-bgPrimary text-tBase' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>,
      );
    }

    return pages;
  };
  return (
    <div className="flex items-center justify-start gap-5 px-2">
      {renderPage()}
    </div>
  );
};
