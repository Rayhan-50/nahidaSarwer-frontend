import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Trash2, MessageSquare, MapPin, Calendar, Youtube, Check, Clock, Filter } from 'lucide-react';

const ShowFeedback = () => {
    const axiosSecure = useAxiosSecure();
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: feedbacks = [], refetch, isLoading } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedbacks');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF4D50',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'হ্যাঁ, ডিলিট করুন!',
            cancelButtonText: 'না',
            background: '#FEFFF6'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/feedbacks/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'ডিলিট সম্পন্ন!',
                                text: 'মতামতটি সফলভাবে ডিলিট করা হয়েছে।',
                                icon: 'success',
                                background: '#FEFFF6',
                                confirmButtonColor: '#26B000'
                            });
                        }
                    })
            }
        })
    };

    const handleApprove = (id) => {
        axiosSecure.patch(`/feedbacks/${id}`, { status: 'approved' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Approved!',
                        text: 'Feedback has been approved successfully.',
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#FEFFF6'
                    });
                }
            });
    };

    const filteredFeedbacks = feedbacks.filter(feedback => {
        const typeMatch = filterType === 'all' || feedback.type === filterType;
        const statusMatch = filterStatus === 'all' || (feedback.status || 'pending') === filterStatus;
        return typeMatch && statusMatch;
    });

    if (isLoading) return null; // No loading screen

    return (
        <div className="min-h-screen font-body">
            {/* Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[#FFA46F]/20 shadow-lg">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-2xl flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#FF4D50] mb-1 sm:mb-2">কমিউনিটি ফিডব্যাক</h2>
                            <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">মোট ফিডব্যাক: {filteredFeedbacks.length}</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-[#FFA46F]/30 text-[#FF4D50] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D50] bg-white"
                        >
                            <option value="all">সব ধরন</option>
                            <option value="comment">মন্তব্য</option>
                            <option value="manifesto">ইশতেহার</option>
                            <option value="support">সমর্থন</option>
                        </select>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-[#FFA46F]/30 text-[#FF4D50] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4D50] bg-white"
                        >
                            <option value="all">সব স্ট্যাটাস</option>
                            <option value="pending">পেন্ডিং</option>
                            <option value="approved">অনুমোদিত</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border border-[#FFA46F]/20">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white">
                            <tr>
                                <th className="p-4 text-sm font-bold">নাম</th>
                                <th className="p-4 text-sm font-bold">এলাকা</th>
                                <th className="p-4 text-sm font-bold">ধরন</th>
                                <th className="p-4 text-sm font-bold">স্ট্যাটাস</th>
                                <th className="p-4 text-sm font-bold">বার্তা</th>
                                <th className="p-4 text-sm font-bold">ভিডিও</th>
                                <th className="p-4 text-sm font-bold">তারিখ</th>
                                <th className="p-4 text-sm font-bold text-center">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#FFA46F]/10">
                            {filteredFeedbacks.map((feedback) => (
                                <tr key={feedback._id} className="hover:bg-[#FFA46F]/5 transition-colors">
                                    <td className="p-4 font-bold text-gray-800">{feedback.name}</td>
                                    <td className="p-4 text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} className="text-[#FFA46F]" />
                                            <span className="text-sm">{feedback.location}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize 
                                            ${feedback.type === 'comment' ? 'bg-[#FFA46F]/10 text-[#FFA46F]' :
                                                feedback.type === 'manifesto' ? 'bg-[#FF4D50]/10 text-[#FF4D50]' :
                                                    'bg-[#26B000]/10 text-[#26B000]'}`}>
                                            {feedback.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1 w-fit
                                            ${feedback.status === 'approved' ? 'bg-[#26B000]/10 text-[#26B000]' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {feedback.status === 'approved' ? <Check size={14} /> : <Clock size={14} />}
                                            {feedback.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-700 max-w-xs">
                                        <p className="truncate text-sm" title={feedback.message}>{feedback.message}</p>
                                    </td>
                                    <td className="p-4">
                                        {feedback.videoUrl ? (
                                            <a href={feedback.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[#FF4D50] hover:text-[#FFA46F] flex items-center gap-1 font-bold text-sm">
                                                <Youtube size={16} /> লিংক
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-500 text-xs">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(feedback.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {feedback.status === 'approved' ? (
                                                <button
                                                    disabled
                                                    className="px-3 py-1 bg-[#26B000]/20 text-[#26B000] rounded-lg cursor-not-allowed text-xs font-bold"
                                                >
                                                    Approved
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleApprove(feedback._id)}
                                                    className="px-3 py-1 bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white rounded-lg hover:from-[#1e8c00] hover:to-[#26B000] transition-colors text-xs font-bold"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(feedback._id)}
                                                className="p-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-lg hover:bg-[#FF4D50]/20 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredFeedbacks.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="p-10 text-center text-gray-500 text-base">
                                        এখনও কোনো ফিডব্যাক পাওয়া যায়নি।
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {filteredFeedbacks.map((feedback) => (
                    <div key={feedback._id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-[#FFA46F]/20">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-[#FF4D50] mb-1">{feedback.name}</h3>
                                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                                    <MapPin size={14} className="text-[#FFA46F]" />
                                    {feedback.location}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize 
                                    ${feedback.type === 'comment' ? 'bg-[#FFA46F]/10 text-[#FFA46F]' :
                                        feedback.type === 'manifesto' ? 'bg-[#FF4D50]/10 text-[#FF4D50]' :
                                            'bg-[#26B000]/10 text-[#26B000]'}`}>
                                    {feedback.type}
                                </span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-flex items-center gap-1
                                ${feedback.status === 'approved' ? 'bg-[#26B000]/10 text-[#26B000]' : 'bg-yellow-100 text-yellow-700'}`}>
                                {feedback.status === 'approved' ? <Check size={14} /> : <Clock size={14} />}
                                {feedback.status || 'pending'}
                            </span>
                        </div>

                        {/* Message */}
                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{feedback.message}</p>

                        {/* Video Link */}
                        {feedback.videoUrl && (
                            <div className="mb-4">
                                <a
                                    href={feedback.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-lg hover:bg-[#FF4D50]/20 transition-colors text-sm font-bold"
                                >
                                    <Youtube size={18} /> ভিডিও দেখুন
                                </a>
                            </div>
                        )}

                        {/* Date */}
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                            <Calendar size={12} />
                            {new Date(feedback.createdAt).toLocaleDateString()}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-[#FFA46F]/10">
                            {feedback.status === 'approved' ? (
                                <button
                                    disabled
                                    className="flex-1 px-4 py-2 bg-[#26B000]/20 text-[#26B000] rounded-xl cursor-not-allowed text-sm font-bold"
                                >
                                    Approved
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleApprove(feedback._id)}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white rounded-xl hover:from-[#1e8c00] hover:to-[#26B000] transition-colors text-sm font-bold"
                                >
                                    Approve
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(feedback._id)}
                                className="px-4 py-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-xl hover:bg-[#FF4D50]/20 transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                ))}

                {filteredFeedbacks.length === 0 && (
                    <div className="bg-white rounded-2xl p-10 text-center text-gray-500 border border-[#FFA46F]/20">
                        এখনও কোনো ফিডব্যাক পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowFeedback;
