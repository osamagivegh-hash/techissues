'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/messages?filter=${filter}`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setMessages(data.messages);
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const toggleRead = async (id: string, currentStatus: boolean) => {
        try {
            await fetch(`/api/messages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: !currentStatus }),
            });
            fetchMessages();
            if (selectedMessage?._id === id) {
                setSelectedMessage(prev => prev ? { ...prev, isRead: !currentStatus } : null);
            }
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        setDeleting(id);
        try {
            await fetch(`/api/messages/${id}`, { method: 'DELETE' });
            fetchMessages();
            if (selectedMessage?._id === id) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    <p className="text-gray-500">
                        {unreadCount > 0
                            ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
                            : 'No unread messages'}
                    </p>
                </div>
                <Link
                    href="/admin"
                    className="text-blue-600 hover:text-blue-800"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b pb-4">
                {(['all', 'unread', 'read'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === f
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : 'Read'}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Messages List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No messages found</div>
                    ) : (
                        <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                            {messages.map((msg) => (
                                <li
                                    key={msg._id}
                                    onClick={() => {
                                        setSelectedMessage(msg);
                                        if (!msg.isRead) toggleRead(msg._id, false);
                                    }}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMessage?._id === msg._id ? 'bg-blue-50' : ''
                                        } ${!msg.isRead ? 'border-l-4 border-blue-600' : ''}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                {!msg.isRead && (
                                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                                )}
                                                <p className={`font-medium truncate ${!msg.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {msg.name}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">{msg.email}</p>
                                            <p className={`text-sm mt-1 truncate ${!msg.isRead ? 'font-medium' : ''}`}>
                                                {msg.subject}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                            {formatDate(msg.createdAt)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Message Detail */}
                <div className="bg-white rounded-lg shadow">
                    {selectedMessage ? (
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                                    <p className="text-sm text-gray-500">{formatDate(selectedMessage.createdAt)}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleRead(selectedMessage._id, selectedMessage.isRead)}
                                        className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
                                    >
                                        {selectedMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                                    </button>
                                    <button
                                        onClick={() => deleteMessage(selectedMessage._id)}
                                        disabled={deleting === selectedMessage._id}
                                        className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {deleting === selectedMessage._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">From:</span>
                                        <p className="font-medium">{selectedMessage.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Email:</span>
                                        <p className="font-medium">
                                            <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                                                {selectedMessage.email}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <span className="text-gray-500 text-sm">Message:</span>
                                    <div className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-700">
                                        {selectedMessage.message}
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        📧 Reply via Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            Select a message to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
