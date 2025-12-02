'use client';

import { useState, useEffect, FormEvent, use } from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/lib/utils';
import RichTextEditor from '@/components/RichTextEditor';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface Post {
    _id: string;
    title: string;
    slug: string;
    category: string;
    language: 'ar' | 'en';
    tags: string[];
    excerpt: string;
    content: string;
    coverImage: string;
    status: 'draft' | 'published';
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        language: 'ar' as 'ar' | 'en',
        tags: '',
        excerpt: '',
        content: '',
        coverImage: '',
        status: 'draft' as 'draft' | 'published',
    });

    useEffect(() => {
        fetchCategories();
        fetchPost();
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories');
        }
    };

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/posts/${id}`);
            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/admin/login');
                    return;
                }
                throw new Error('Failed to fetch post');
            }
            const post: Post = await response.json();
            setFormData({
                title: post.title,
                slug: post.slug,
                category: post.category,
                language: post.language || 'ar',
                tags: post.tags.join(', '),
                excerpt: post.excerpt,
                content: post.content,
                coverImage: post.coverImage,
                status: post.status,
            });
        } catch (err) {
            setError('حدث خطأ في تحميل المقال');
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'حدث خطأ في تحديث المقال');
                setSaving(false);
                return;
            }

            router.push('/admin/posts');
            router.refresh();
        } catch (err) {
            setError('حدث خطأ في تحديث المقال');
            setSaving(false);
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
        <div className="max-w-4xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">تعديل المقال</h2>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        العنوان *
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="input"
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                        الرابط (Slug) *
                    </label>
                    <input
                        type="text"
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="input"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        القسم *
                    </label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="input"
                        required
                    >
                        <option value="">اختر القسم</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Language */}
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                        اللغة *
                    </label>
                    <select
                        id="language"
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value as 'ar' | 'en' })}
                        className="input"
                        required
                    >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                    </select>
                </div>

                {/* Tags */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                        الوسوم
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="input"
                        placeholder="افصل بين الوسوم بفاصلة"
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                        الملخص *
                    </label>
                    <textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="textarea"
                        rows={3}
                        maxLength={300}
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.excerpt.length}/300 حرف
                    </p>
                </div>

                {/* Cover Image */}
                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                        رابط صورة الغلاف *
                    </label>
                    <input
                        type="url"
                        id="coverImage"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="input"
                        required
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        المحتوى *
                    </label>
                    <RichTextEditor
                        content={formData.content}
                        onChange={(html) => setFormData({ ...formData, content: html })}
                        placeholder="اكتب محتوى المقال هنا..."
                    />
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                        الحالة *
                    </label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                        className="input"
                        required
                    >
                        <option value="draft">مسودة</option>
                        <option value="published">منشور</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn btn-secondary"
                    >
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    );
}
