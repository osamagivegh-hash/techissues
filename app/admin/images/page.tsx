'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ImageItem {
    _id: string;
    url: string;
    alt: string;
    createdAt: string;
}

export default function AdminImagesPage() {
    const router = useRouter();
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        url: '',
        alt: '',
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/images`);
            const data = await response.json();
            setImages(data);
        } catch (err) {
            setError('حدث خطأ في تحميل الصور');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/images`, {
                method: 'POST',
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

            setFormData({ url: '', alt: '' });
            setShowForm(false);
            fetchImages();
        } catch (err) {
            setError('حدث خطأ في حفظ الصورة');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/images/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            fetchImages();
        } catch (err) {
            alert('حدث خطأ في حذف الصورة');
        }
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('تم نسخ الرابط!');
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
                <h2 className="text-2xl font-bold text-gray-900">الصور</h2>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                    >
                        + إضافة صورة
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
                    <h3 className="text-lg font-bold text-gray-900 mb-4">إضافة صورة جديدة</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                                رابط الصورة *
                            </label>
                            <input
                                type="url"
                                id="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                className="input"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-2">
                                النص البديل
                            </label>
                            <input
                                type="text"
                                id="alt"
                                value={formData.alt}
                                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                                className="input"
                                placeholder="وصف الصورة"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button type="submit" className="btn btn-primary">
                                إضافة الصورة
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({ url: '', alt: '' });
                                    setError('');
                                }}
                                className="btn btn-secondary"
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Images Grid */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div key={image._id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="relative h-48 bg-gray-100">
                                    <Image
                                        src={image.url}
                                        alt={image.alt || 'صورة'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 mb-2 truncate">
                                        {image.alt || 'بدون وصف'}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => copyUrl(image.url)}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                        >
                                            نسخ الرابط
                                        </button>
                                        <button
                                            onClick={() => handleDelete(image._id)}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">لا توجد صور حالياً</p>
                    </div>
                )}
            </div>
        </div>
    );
}
