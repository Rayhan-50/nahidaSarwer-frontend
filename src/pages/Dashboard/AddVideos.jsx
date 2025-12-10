import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Trash2, Edit, Video, MapPin, User, Quote, Plus } from 'lucide-react';
import Loading from '../../components/Loading/Loading';

const AddVideos = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        quote: '',
        videoUrl: ''
    });

    const { data: videos = [], refetch, isLoading } = useQuery({
        queryKey: ['videos'],
        queryFn: async () => {
            const res = await axiosPublic.get('/videos');
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
                const res = await axiosSecure.patch(`/videos/${currentId}`, formData);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'আপডেট সম্পন্ন!',
                        text: 'ভিডিও তথ্য সফলভাবে আপডেট করা হয়েছে।',
                        confirmButtonColor: '#26B000',
                        background: '#FEFFF6'
                    });
                    setIsEditing(false);
                    setCurrentId(null);
                }
            } else {
                const res = await axiosSecure.post('/videos', formData);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'সফল!',
                        text: 'নতুন ভিডিও সফলভাবে যুক্ত করা হয়েছে।',
                        confirmButtonColor: '#26B000',
                        background: '#FEFFF6'
                    });
                }
            }
            setFormData({ name: '', location: '', quote: '', videoUrl: '' });
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

    const handleEdit = (video) => {
        setFormData({
            name: video.name,
            location: video.location,
            quote: video.quote,
            videoUrl: video.videoUrl
        });
        setCurrentId(video._id);
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
                axiosSecure.delete(`/videos/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'ডিলিট সম্পন্ন!',
                                text: 'ভিডিওটি সফলভাবে ডিলিট করা হয়েছে।',
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
        setFormData({ name: '', location: '', quote: '', videoUrl: '' });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen font-body">
            {/* Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[#FFA46F]/20 shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-2xl flex items-center justify-center">
                        <Video className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#FF4D50] mb-1 sm:mb-2">
                            {isEditing ? 'ভিডিও তথ্য আপডেট করুন' : 'নতুন ভিডিও যুক্ত করুন'}
                        </h2>
                        <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">সমর্থকদের ভিডিও ম্যানেজ করুন</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white p-6 rounded-2xl shadow-xl mb-12 border border-[#FFA46F]/20">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><User size={18} className="text-[#FF4D50]" /> নাম</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="সমর্থকের নাম"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><MapPin size={18} className="text-[#FF4D50]" /> এলাকা</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="এলাকার নাম (যেমন: মিরপুর, ঢাকা)"
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none"
                            required
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><Video size={18} className="text-[#FF4D50]" /> ভিডিও URL (Embed Link)</label>
                        <input
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleInputChange}
                            placeholder="https://www.youtube.com/embed/..."
                            className="w-full p-3 border border-[#FFA46F]/30 rounded-xl focus:ring-2 focus:ring-[#FF4D50] outline-none font-mono text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-bold text-gray-700 flex items-center gap-2"><Quote size={18} className="text-[#FF4D50]" /> উক্তি / মন্তব্য</label>
                        <textarea
                            name="quote"
                            value={formData.quote}
                            onChange={handleInputChange}
                            placeholder="সমর্থকের মন্তব্য..."
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
                যুক্ত করা ভিডিও সমূহ ({videos.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-[#FFA46F]/20 flex flex-col">
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                className="w-full h-full"
                                src={video.videoUrl}
                                title={video.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-header font-bold text-lg text-[#FF4D50] mb-1">{video.name}</h4>
                            <p className="text-sm text-gray-500 mb-3 flex items-center gap-1"><MapPin size={14} /> {video.location}</p>
                            <p className="text-gray-600 italic text-sm mb-4 flex-1">"{video.quote}"</p>

                            <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(video)}
                                    className="p-2 bg-[#FFA46F]/10 text-[#FFA46F] rounded-lg hover:bg-[#FFA46F]/20 transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(video._id)}
                                    className="p-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-lg hover:bg-[#FF4D50]/20 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {videos.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        কোন ভিডিও পাওয়া যায়নি। উপরের ফর্ম ব্যবহার করে নতুন ভিডিও যুক্ত করুন।
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddVideos;
