'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
    _id: string;
    title: string;
    category: {
        name: string;
    };
    status: string;
    createdAt: string;
}

export default function AdminPostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 20;

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/posts?page=${page}&limit=${postsPerPage}`);
            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/admin/login');
                    return;
                }
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data.posts);
            setTotalPages(data.totalPages || 1);
            setTotalPosts(data.total || 0);
        } catch (err) {
            setError('حدث خطأ في تحميل المقالات');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`هل أنت متأكد من حذف المقال "${title}"؟`)) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // Refetch posts for current page
            fetchPosts(currentPage);
        } catch (err) {
            alert('حدث خطأ في حذف المقال');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-gray-600">جاري التحميل...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">المقالات</h2>
                <Link href="/admin/posts/new" className="btn btn-primary">
                    + مقال جديد
                </Link>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {posts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        العنوان
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        القسم
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        الحالة
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        التاريخ
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{post.title}</div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {post.category.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}
                                            >
                                                {post.status === 'published' ? 'منشور' : 'مسودة'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {new Date(post.createdAt).toLocaleDateString('ar-SA')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/posts/${post._id}/edit`}
                                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                                >
                                                    تعديل
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post._id, post.title)}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">لا توجد مقالات حالياً</p>
                        <Link href="/admin/posts/new" className="btn btn-primary">
                            إنشاء أول مقال
                        </Link>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
                    <div className="text-sm text-gray-600">
                        عرض {((currentPage - 1) * postsPerPage) + 1} - {Math.min(currentPage * postsPerPage, totalPosts)} من {totalPosts} مقال
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            السابق
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 10) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 4) {
                                    pageNum = totalPages - 9 + i;
                                } else {
                                    pageNum = currentPage - 4 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1 text-sm font-medium rounded-md ${currentPage === pageNum
                                            ? 'bg-primary-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            التالي
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
