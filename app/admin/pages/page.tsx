'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Page {
    _id: string;
    slug: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    isActive: boolean;
    updatedAt: string;
}

const pageLabels: Record<string, { ar: string; en: string }> = {
    'privacy-policy': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
    'terms': { ar: 'شروط الاستخدام', en: 'Terms of Use' },
    'about': { ar: 'من نحن', en: 'About Us' },
    'contact-info': { ar: 'معلومات الاتصال', en: 'Contact Information' },
};

export default function PagesManagement() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [editLang, setEditLang] = useState<'ar' | 'en'>('ar');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    // Form state
    const [formData, setFormData] = useState({
        titleAr: '',
        titleEn: '',
        contentAr: '',
        contentEn: '',
        isActive: true,
    });

    const fetchPages = async () => {
        try {
            const response = await fetch('/api/pages');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setPages(data.pages);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const selectPage = (page: Page) => {
        setSelectedPage(page);
        setFormData({
            titleAr: page.titleAr,
            titleEn: page.titleEn,
            contentAr: page.contentAr,
            contentEn: page.contentEn,
            isActive: page.isActive,
        });
        setMessage(null);
    };

    const handleSave = async () => {
        if (!selectedPage) return;

        setSaving(true);
        setMessage(null);

        // Get content from editor
        const currentContent = editorRef.current?.innerHTML || '';
        const updatedFormData = {
            ...formData,
            [editLang === 'ar' ? 'contentAr' : 'contentEn']: currentContent,
        };

        try {
            const response = await fetch(`/api/pages/${selectedPage.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) throw new Error('Failed to save');

            const updatedPage = await response.json();
            setPages(pages.map(p => p.slug === updatedPage.slug ? updatedPage : p));
            setSelectedPage(updatedPage);
            setFormData({
                titleAr: updatedPage.titleAr,
                titleEn: updatedPage.titleEn,
                contentAr: updatedPage.contentAr,
                contentEn: updatedPage.contentEn,
                isActive: updatedPage.isActive,
            });
            setMessage({ type: 'success', text: editLang === 'ar' ? 'تم الحفظ بنجاح!' : 'Saved successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: editLang === 'ar' ? 'فشل في الحفظ' : 'Failed to save' });
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Rich text editor commands
    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const switchLanguage = (lang: 'ar' | 'en') => {
        // Save current content before switching
        if (editorRef.current) {
            const currentContent = editorRef.current.innerHTML;
            setFormData(prev => ({
                ...prev,
                [editLang === 'ar' ? 'contentAr' : 'contentEn']: currentContent,
            }));
        }
        setEditLang(lang);
    };

    // Update editor content when language changes
    useEffect(() => {
        if (editorRef.current && selectedPage) {
            editorRef.current.innerHTML = editLang === 'ar' ? formData.contentAr : formData.contentEn;
        }
    }, [editLang, selectedPage]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الصفحات / Pages Management</h1>
                    <p className="text-gray-500">تعديل صفحات: سياسة الخصوصية، الشروط، من نحن، الاتصال</p>
                    <p className="text-gray-400 text-sm">Edit pages: Privacy Policy, Terms, About, Contact</p>
                </div>
                <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                    ← العودة للوحة التحكم
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Pages List */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-lg">الصفحات / Pages</h2>
                    </div>
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : pages.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No pages found</div>
                    ) : (
                        <ul className="divide-y">
                            {pages.map((page) => (
                                <li
                                    key={page._id}
                                    onClick={() => selectPage(page)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedPage?.slug === page.slug ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-gray-900">{pageLabels[page.slug]?.ar || page.slug}</p>
                                            <p className="text-sm text-gray-500">{pageLabels[page.slug]?.en}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded ${page.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {page.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Updated: {formatDate(page.updatedAt)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Editor */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow">
                    {selectedPage ? (
                        <div className="p-6">
                            {/* Page Info */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <p className="font-bold text-lg">
                                    {pageLabels[selectedPage.slug]?.ar} / {pageLabels[selectedPage.slug]?.en}
                                </p>
                                <p className="text-sm text-gray-500">Slug: {selectedPage.slug}</p>
                            </div>

                            {/* Message */}
                            {message && (
                                <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            {/* Language Tabs */}
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => switchLanguage('ar')}
                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${editLang === 'ar'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    🇸🇦 العربية (Arabic)
                                </button>
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${editLang === 'en'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    🇬🇧 English (الإنجليزية)
                                </button>
                            </div>

                            {/* Current Language Indicator */}
                            <div className={`mb-4 p-2 rounded text-center font-medium ${editLang === 'ar' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                                }`}>
                                {editLang === 'ar' ? '📝 تحرير المحتوى العربي' : '📝 Editing English Content'}
                            </div>

                            {/* Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editLang === 'ar' ? 'العنوان (العربية)' : 'Title (English)'}
                                </label>
                                <input
                                    type="text"
                                    value={editLang === 'ar' ? formData.titleAr : formData.titleEn}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        [editLang === 'ar' ? 'titleAr' : 'titleEn']: e.target.value
                                    }))}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                                    dir={editLang === 'ar' ? 'rtl' : 'ltr'}
                                    placeholder={editLang === 'ar' ? 'أدخل العنوان...' : 'Enter title...'}
                                />
                            </div>

                            {/* Rich Text Toolbar */}
                            <div className="mb-2 flex flex-wrap gap-1 p-2 bg-gray-100 rounded-t-lg border border-b-0">
                                <button onClick={() => execCommand('bold')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50 font-bold" title="Bold">B</button>
                                <button onClick={() => execCommand('italic')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50 italic" title="Italic">I</button>
                                <button onClick={() => execCommand('underline')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50 underline" title="Underline">U</button>
                                <span className="border-l mx-2"></span>
                                <button onClick={() => execCommand('formatBlock', 'h2')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50" title="Heading 2">H2</button>
                                <button onClick={() => execCommand('formatBlock', 'h3')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50" title="Heading 3">H3</button>
                                <button onClick={() => execCommand('formatBlock', 'p')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50" title="Paragraph">P</button>
                                <span className="border-l mx-2"></span>
                                <button onClick={() => execCommand('insertUnorderedList')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50" title="Bullet List">• List</button>
                                <button onClick={() => execCommand('insertOrderedList')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50" title="Numbered List">1. List</button>
                                <span className="border-l mx-2"></span>
                                <button
                                    onClick={() => {
                                        const url = prompt(editLang === 'ar' ? 'أدخل رابط URL:' : 'Enter URL:');
                                        if (url) execCommand('createLink', url);
                                    }}
                                    className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
                                    title="Insert Link"
                                >
                                    🔗 Link
                                </button>
                                <button onClick={() => execCommand('removeFormat')} className="px-3 py-1 bg-white border rounded hover:bg-gray-50" title="Clear Formatting">✕ Clear</button>
                            </div>

                            {/* Content Editor */}
                            <div
                                ref={editorRef}
                                contentEditable
                                className="w-full min-h-[350px] p-4 border rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:outline-none prose max-w-none"
                                dir={editLang === 'ar' ? 'rtl' : 'ltr'}
                                style={{ textAlign: editLang === 'ar' ? 'right' : 'left' }}
                                dangerouslySetInnerHTML={{
                                    __html: editLang === 'ar' ? formData.contentAr : formData.contentEn
                                }}
                            />

                            {/* Active Toggle */}
                            <div className="mt-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                    className="w-5 h-5"
                                />
                                <label htmlFor="isActive" className="text-gray-700">
                                    الصفحة نشطة / Page is active and visible
                                </label>
                            </div>

                            {/* Save Button */}
                            <div className="mt-6 flex flex-wrap gap-4">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                                >
                                    {saving ? 'Saving...' : '💾 Save Changes / حفظ التغييرات'}
                                </button>
                                <a
                                    href={`/ar/${selectedPage.slug === 'contact-info' ? 'contact' : selectedPage.slug}`}
                                    target="_blank"
                                    className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
                                >
                                    👁️ Preview Arabic
                                </a>
                                <a
                                    href={`/en/${selectedPage.slug === 'contact-info' ? 'contact' : selectedPage.slug}`}
                                    target="_blank"
                                    className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
                                >
                                    👁️ Preview English
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p className="text-lg mb-2">Select a page from the list to edit</p>
                            <p className="text-sm">اختر صفحة من القائمة للتعديل</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
