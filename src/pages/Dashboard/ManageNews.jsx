import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Trash2, Edit, FileText, Link, Calendar, Clock, Layers, Plus } from 'lucide-react';
import Loading from '../../components/Loading/Loading';

const ManageNews = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        newsLink: '',
        category: '',
        readTime: '',
        date: ''
    });

    const { data: news = [], refetch, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await axiosPublic.get('/news');
            return res.data;
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                const res = await axiosSecure.patch(`/news/${currentId}`, formData);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'আপডেট সম্পন্ন!',
                        text: 'খবর সফলভাবে আপডেট করা হয়েছে।',
                        confirmButtonColor: '#26B000',
                        background: '#FEFFF6'
                    });
                    setIsEditing(false);
                    setCurrentId(null);
                }
            } else {
                const res = await axiosSecure.post('/news', formData);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'সফল!',
                        text: 'নতুন খবর সফলভাবে যুক্ত করা হয়েছে।',
                        confirmButtonColor: '#26B000',
                        background: '#FEFFF6'
                    });
                }
            }
            setFormData({ title: '', description: '', newsLink: '', category: '', readTime: '', date: '' });
            refetch();
        } catch (error) {
            console.error("Operation failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'দুঃখিত!',
                text: 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন।',
                confirmButtonColor: '#FF4D50',
                background: '#FEFFF6'
            });
        }
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            description: item.description,
            newsLink: item.newsLink,
            category: item.category,
            readTime: item.readTime,
            date: item.date
        });
        setCurrentId(item._id);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                axiosSecure.delete(`/news/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'ডিলিট সম্পন্ন!',
                                text: 'খবরটি সফলভাবে ডিলিট করা হয়েছে।',
                                icon: 'success',
                                background: '#FEFFF6',
                                confirmButtonColor: '#26B000'
                            });
                        }
                    })
            }
        })
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData({ title: '', description: '', newsLink: '', category: '', readTime: '', date: '' });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen font-body">
            {/* Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[#FFA46F]/20 shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-2xl flex items-center justify-center">
                        <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#FF4D50] mb-1 sm:mb-2">
                            {isEditing ? 'খবর আপডেট করুন' : 'নতুন খবর যুক্ত করুন'}
                        </h2>
                        <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">সকল খবর ম্যানেজ করুন</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white p-6 rounded-2xl shadow-xl mb-12 border border-[#FFA46F]/20">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><FileText size={18} className="text-[#FF4D50]" /> শিরোনাম (Title)</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="খবরের শিরোনাম"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><Layers size={18} className="text-[#FF4D50]" /> ক্যাটাগরি (Category)</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="যেমন: স্বাস্থ্য, শিক্ষা"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><Calendar size={18} className="text-[#FF4D50]" /> তারিখ (Date)</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            placeholder="যেমন: ১২ ডিসেম্বর, ২০২৪"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><Clock size={18} className="text-[#FF4D50]" /> পড়ার সময় (Read Time)</label>
                        <input
                            type="text"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleInputChange}
                            placeholder="যেমন: ২ মিনিট পড়া"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><Link size={18} className="text-[#FF4D50]" /> খবরের লিঙ্ক (News Link)</label>
                        <input
                            type="url"
                            name="newsLink"
                            value={formData.newsLink}
                            onChange={handleInputChange}
                            placeholder="https://..."
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none font-mono text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><FileText size={18} className="text-[#FF4D50]" /> বিবরণ (Description)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="খবরের বিস্তারিত বিবরণ..."
                            rows="3"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-3 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors"
                            >
                                বাতিল
                            </button>
                        )}
                        <button
                            type="submit"
                            className={`px-6 py-3 text-white rounded-xl font-bold transition-colors flex items-center gap-2 ${isEditing ? 'bg-gradient-to-r from-[#FFA46F] to-[#FF4D50]' : 'bg-gradient-to-r from-[#26B000] to-[#1e8c00]'}`}
                        >
                            {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                            {isEditing ? 'আপডেট করুন' : 'যুক্ত করুন'}
                        </button>
                    </div>
                </form>
            </div>

            {/* List Section */}
            <h3 className="text-2xl font-header font-bold text-[#FF4D50] mb-6 px-4 border-l-4 border-[#FF4D50] inline-block">
                যুক্ত করা খবর সমূহ ({news.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <div key={item._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-[#FFA46F]/20 flex flex-col">
                        <div className="h-48 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                            <div className="text-center p-4">
                                <Link size={48} className="text-gray-300 mx-auto mb-2" />
                                <a href={item.newsLink} target="_blank" rel="noopener noreferrer" className="text-[#FF4D50] hover:underline break-all text-sm">
                                    {item.newsLink}
                                </a>
                            </div>
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                                {item.category}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {item.readTime}</span>
                            </div>
                            <h4 className="font-header font-bold text-lg text-[#FF4D50] mb-2 line-clamp-2">{item.title}</h4>
                            <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{item.description}</p>

                            <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 bg-[#FFA46F]/10 text-[#FFA46F] rounded-lg hover:bg-[#FFA46F]/20 transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-lg hover:bg-[#FF4D50]/20 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {news.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        কোন খবর পাওয়া যায়নি। উপরের ফর্ম ব্যবহার করে নতুন খবর যুক্ত করুন।
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageNews;
