import { usePagination } from '@/hooks/index';
import { Button } from '../button/button';
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
          className={`cursor-pointer rounded-lg border-2 border-solid border-border p-1 text-tUnSelected md:p-2 ${parseInt(activePage) === i ? 'bg-bgPrimary text-tBase' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>,
      );
    }

    return pages;
  };

  function handleNextPage() {
    if (parseInt(activePage) > 9) return;
    handlePageClick(parseInt(activePage) + 1);
  }

  function handlePreviousPage() {
    if (parseInt(activePage) < 1) return;
    handlePageClick(parseInt(activePage) - 1);
  }

  return (
    <>
      <div className="hidden items-center justify-start gap-5 px-2 md:flex">
        {renderPage()}
      </div>
      <div className="flex w-full items-center justify-start justify-center gap-5 px-2 md:hidden">
        <Button
          onClick={handlePreviousPage}
          variant="primary"
          text="Previous"
        />

        <Button onClick={handleNextPage} variant="primary" text="Next" />
      </div>
    </>
  );
};
