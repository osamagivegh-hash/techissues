import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAuthUser } from '@/lib/middleware';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';
import Message from '@/models/Message';
import { formatDate } from '@/lib/utils';

async function getDashboardData() {
    await dbConnect();

    const [totalPosts, publishedPosts, categories, recentPosts, unreadMessages] = await Promise.all([
        Post.countDocuments(),
        Post.countDocuments({ status: 'published' }),
        Category.find().lean(),
        Post.find()
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean(),
        Message.countDocuments({ isRead: false }),
    ]);

    // Get posts count per category
    const categoryStats = await Promise.all(
        categories.map(async (cat) => ({
            name: cat.name,
            count: await Post.countDocuments({ category: cat._id }),
        }))
    );

    return {
        totalPosts,
        publishedPosts,
        draftPosts: totalPosts - publishedPosts,
        categoryStats,
        recentPosts: JSON.parse(JSON.stringify(recentPosts)),
        unreadMessages,
    };
}

export default async function AdminDashboard() {
    const user = await getAuthUser();

    if (!user) {
        redirect('/admin/login');
    }

    const stats = await getDashboardData();

    return (
        <div className="space-y-8">
            {/* Welcome Message */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">مرحباً بك!</h2>
                <p className="text-gray-600">إليك نظرة عامة على موقعك</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">إجمالي المقالات</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">المقالات المنشورة</p>
                            <p className="text-3xl font-bold text-green-600">{stats.publishedPosts}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">المسودات</p>
                            <p className="text-3xl font-bold text-orange-600">{stats.draftPosts}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <Link href="/admin/messages" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">الرسائل الجديدة</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.unreadMessages}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    {stats.unreadMessages > 0 && (
                        <p className="text-sm text-blue-600 mt-2">اضغط لعرض الرسائل →</p>
                    )}
                </Link>
            </div>

            {/* Category Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">المقالات حسب القسم</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.categoryStats.map((cat) => (
                        <div key={cat.name} className="border border-gray-200 rounded-lg p-4">
                            <p className="text-gray-600 text-sm mb-1">{cat.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">آخر المقالات</h3>
                    <Link href="/admin/posts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        عرض الكل
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">العنوان</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">القسم</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">الحالة</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentPosts.map((post: any) => (
                                <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <Link href={`/admin/posts/${post._id}/edit`} className="text-gray-900 hover:text-primary-600 font-medium">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{post.category.name}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {post.status === 'published' ? 'منشور' : 'مسودة'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{formatDate(post.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
