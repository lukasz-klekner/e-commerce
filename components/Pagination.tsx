import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
}

const PAGES = Array.from({ length: 10 }, (_, k) => k + 1)

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <button
          type='button'
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type='button'
          className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          onClick={onNext}
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>{(currentPage - 1) * 25 + 1}</span> to{' '}
            <span className='font-medium'>{currentPage * 25}</span> of{' '}
            <span className='font-medium'>250</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              type='button'
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon
                className='h-5 w-5'
                aria-hidden='true'
                onClick={onPrevious}
              />
            </button>
            {PAGES.map((pageNumber) => (
              <button
                type='button'
                key={pageNumber}
                className={`bg-white  hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium border-gray-300 ${
                  currentPage === pageNumber
                    ? 'text-indigo-600 text-xl'
                    : ' text-gray-500'
                } `}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type='button'
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon
                className='h-5 w-5'
                aria-hidden='true'
                onClick={onNext}
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
