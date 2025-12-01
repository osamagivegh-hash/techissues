'use client';

import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = [];
    const showPages = 5; // Number of page links to show

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < showPages) {
        startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            {currentPage > 1 && (
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    ←
                </Link>
            )}

            {/* First Page */}
            {startPage > 1 && (
                <>
                    <Link
                        href={`${baseUrl}?page=1`}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        1
                    </Link>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}

            {/* Page Numbers */}
            {pages.map((page) => (
                <Link
                    key={page}
                    href={`${baseUrl}?page=${page}`}
                    className={`px-4 py-2 rounded-lg transition-colors ${page === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {page}
                </Link>
            ))}

            {/* Last Page */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2">...</span>}
                    <Link
                        href={`${baseUrl}?page=${totalPages}`}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {totalPages}
                    </Link>
                </>
            )}

            {/* Next Button */}
            {currentPage < totalPages && (
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    →
                </Link>
            )}
        </div>
    );
}
