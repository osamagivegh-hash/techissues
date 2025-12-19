'use client';

import { useState } from 'react';
import { Language } from '@/lib/i18n';

interface ContactFormProps {
    lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const isArabic = lang === 'ar';

    const labels = {
        name: isArabic ? 'الاسم' : 'Name',
        email: isArabic ? 'البريد الإلكتروني' : 'Email',
        subject: isArabic ? 'الموضوع' : 'Subject',
        message: isArabic ? 'الرسالة' : 'Message',
        submit: isArabic ? 'إرسال الرسالة' : 'Send Message',
        sending: isArabic ? 'جاري الإرسال...' : 'Sending...',
        success: isArabic ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.',
        error: isArabic ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending the message. Please try again.',
        required: isArabic ? 'جميع الحقول مطلوبة' : 'All fields are required',
        invalidEmail: isArabic ? 'البريد الإلكتروني غير صالح' : 'Invalid email address',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // Validate
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus('error');
            setErrorMessage(labels.required);
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('error');
            setErrorMessage(labels.invalidEmail);
            return;
        }

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || labels.error);
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <p className="text-green-700 text-lg">{labels.success}</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-green-600 hover:text-green-700 underline"
                >
                    {isArabic ? 'إرسال رسالة أخرى' : 'Send another message'}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {errorMessage || labels.error}
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {labels.name} *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={isArabic ? 'أدخل اسمك' : 'Enter your name'}
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {labels.email} *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    required
                />
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {labels.subject} *
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={isArabic ? 'موضوع الرسالة' : 'Message subject'}
                    required
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {labels.message} *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? labels.sending : labels.submit}
            </button>
        </form>
    );
}
