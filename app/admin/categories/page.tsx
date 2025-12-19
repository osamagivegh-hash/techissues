'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/lib/utils';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

export default function AdminCategoriesPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            setError('حدث خطأ في تحميل الأقسام');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const url = editingId ? `${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories/${editingId}` : `${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/admin/login');
                    return;
                }
                setError(data.error || 'حدث خطأ');
                return;
            }

            // Reset form and refresh
            setFormData({ name: '', slug: '' });
            setShowForm(false);
            setEditingId(null);
            fetchCategories();
        } catch (err) {
            setError('حدث خطأ في حفظ القسم');
        }
    };

    const handleEdit = (category: Category) => {
        setFormData({
            name: category.name,
            slug: category.slug,
        });
        setEditingId(category._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`هل أنت متأكد من حذف القسم "${name}"؟`)) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'حدث خطأ في حذف القسم');
                return;
            }

            fetchCategories();
        } catch (err) {
            alert('حدث خطأ في حذف القسم');
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', slug: '' });
        setShowForm(false);
        setEditingId(null);
        setError('');
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
                <h2 className="text-2xl font-bold text-gray-900">الأقسام</h2>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                    >
                        + قسم جديد
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {editingId ? 'تعديل القسم' : 'قسم جديد'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                اسم القسم *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({
                                    name: e.target.value,
                                    slug: generateSlug(e.target.value),
                                })}
                                className="input"
                                required
                            />
                        </div>

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

                        <div className="flex items-center gap-4">
                            <button type="submit" className="btn btn-primary">
                                {editingId ? 'حفظ التغييرات' : 'إضافة القسم'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-secondary"
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {categories.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        الاسم
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        الرابط (Slug)
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{category.name}</div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {category.slug}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                                >
                                                    تعديل
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id, category.name)}
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
                        <p className="text-gray-500">لا توجد أقسام حالياً</p>
                    </div>
                )}
            </div>
        </div>
    );
}
