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
          className={`cursor-pointer rounded-lg border-2 border-solid border-gray-200 p-2 ${parseInt(activePage) === i ? 'bg-slate-200' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>,
      );
    }

    return pages;
  };
  return (
    <div className="flex items-center justify-start gap-5 px-2 py-10">
      {renderPage()}
    </div>
  );
};
