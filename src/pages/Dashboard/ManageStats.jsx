import React, { useEffect } from 'react'; // Trigger Vercel Deployment
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';
import { BarChart3, Save, TrendingUp, Users, DollarSign, Link, Plus, Trash2 } from 'lucide-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ManageStats = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: stats = {}, isLoading, refetch } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    });

    const { data: expenses = [], refetch: refetchExpenses } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/expenses');
            return res.data;
        }
    });

    const handleAddExpense = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const amount = parseFloat(form.amount.value);
        const date = form.date.value;

        const newExpense = { title, category, amount, date };

        try {
            const res = await axiosSecure.post('/expenses', newExpense);
            if (res.data.insertedId) {
                refetchExpenses();
                refetch(); // Update stats as well
                form.reset();
                Swal.fire({
                    icon: 'success',
                    title: 'সফল!',
                    text: 'নতুন খরচ যুক্ত করা হয়েছে।',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#FEFFF6',
                    confirmButtonColor: '#26B000'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'দুঃখিত',
                text: 'খরচ যুক্ত করতে ব্যর্থ হয়েছে।',
                background: '#FEFFF6',
                confirmButtonColor: '#FF4D50'
            });
        }
    };

    const handleDeleteExpense = (id) => {
        Swal.fire({
            title: 'নিশ্চিত?',
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
                axiosSecure.delete(`/expenses/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetchExpenses();
                            refetch();
                            Swal.fire({
                                title: 'ডিলিট সম্পন্ন!',
                                text: 'খরচ সফলভাবে ডিলিট করা হয়েছে।',
                                icon: 'success',
                                background: '#FEFFF6',
                                confirmButtonColor: '#26B000'
                            });
                        }
                    })
            }
        })
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const activeSupporters = parseInt(form.activeSupporters.value);
        const organizedCommunity = parseInt(form.organizedCommunity.value);
        const raisedFunds = parseInt(form.raisedFunds.value);
        const totalSpent = parseInt(form.totalSpent.value);
        const newsLink = form.newsLink.value;

        const newStats = {
            activeSupporters,
            organizedCommunity,
            raisedFunds,
            totalSpent,
            newsLink
        };

        try {
            const res = await axiosSecure.post('/stats', newStats);
            if (res.data.modifiedCount > 0 || res.data.insertedId) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'সফল!',
                    text: 'পরিসংখ্যান সফলভাবে আপডেট করা হয়েছে।',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#FEFFF6',
                    confirmButtonColor: '#26B000'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'দুঃখিত',
                text: 'আপডেট করতে ব্যর্থ হয়েছে।',
                background: '#FEFFF6',
                confirmButtonColor: '#FF4D50'
            });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen font-body">
            {/* Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[#FFA46F]/20 shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-2xl flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#FF4D50] mb-1 sm:mb-2">পরিসংখ্যান ব্যবস্থাপনা</h2>
                        <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">ওয়েবসাইটের পরিসংখ্যান আপডেট করুন</p>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {/* Current Stats Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-[#FFA46F]/20 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-[#FF4D50]/10 rounded-xl">
                                <Users className="h-6 w-6 text-[#FF4D50]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">সক্রিয় সমর্থক</p>
                                <p className="text-2xl font-bold text-[#FF4D50]">{stats.activeSupporters || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-[#FFA46F]/20 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-[#FFA46F]/10 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-[#FFA46F]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">সংগঠিত কমিউনিটি</p>
                                <p className="text-2xl font-bold text-[#FFA46F]">{stats.organizedCommunity || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-[#FFA46F]/20 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-[#26B000]/10 rounded-xl">
                                <DollarSign className="h-6 w-6 text-[#26B000]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">সংগৃহীত তহবিল</p>
                                <p className="text-2xl font-bold text-[#26B000]">৳ {stats.raisedFunds || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#FFA46F]/20">
                    <h3 className="text-xl font-bold text-[#FF4D50] mb-6">পরিসংখ্যান আপডেট করুন</h3>
                    <form onSubmit={handleUpdate} className="space-y-6">

                        <div className="space-y-2">
                            <label className="font-bold text-gray-700 block flex items-center gap-2">
                                <Users size={18} className="text-[#FF4D50]" />
                                সক্রিয় সমর্থক
                            </label>
                            <input
                                type="number"
                                name="activeSupporters"
                                defaultValue={stats.activeSupporters}
                                className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50]"
                                required
                            />
                            <p className="text-sm text-gray-500">মোট কতজন মানুষ সাথে কাজ করছেন</p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-gray-700 block flex items-center gap-2">
                                <TrendingUp size={18} className="text-[#FFA46F]" />
                                সংগঠিত কমিউনিটি
                            </label>
                            <input
                                type="number"
                                name="organizedCommunity"
                                defaultValue={stats.organizedCommunity}
                                className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50]"
                                required
                            />
                            <p className="text-sm text-gray-500">কতটি এলাকায় স্থানীয় সংগঠন গঠিত হয়েছে</p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-gray-700 block flex items-center gap-2">
                                <DollarSign size={18} className="text-[#26B000]" />
                                সংগৃহীত তহবিল (টাকা)
                            </label>
                            <input
                                type="number"
                                name="raisedFunds"
                                defaultValue={stats.raisedFunds}
                                className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50]"
                                required
                            />
                            <p className="text-sm text-gray-500">মোট কত টাকা উন্নয়ন কাজে ব্যয় করা হয়েছে</p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-gray-700 block flex items-center gap-2">
                                <DollarSign size={18} className="text-[#FF4D50]" />
                                মোট খরচ (টাকা)
                            </label>
                            <input
                                type="number"
                                name="totalSpent"
                                defaultValue={stats.totalSpent || 0}
                                className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50]"
                                required
                            />
                            <p className="text-sm text-gray-500">মোট কত টাকা খরচ হয়েছে</p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-gray-700 block flex items-center gap-2">
                                <Link size={18} className="text-blue-500" />
                                খবরের লিঙ্ক
                            </label>
                            <input
                                type="url"
                                name="newsLink"
                                defaultValue={stats.newsLink}
                                placeholder="https://example.com"
                                className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50] focus:border-[#FF4D50]"
                            />
                            <p className="text-sm text-gray-500">হোম পেজের খবরের 'সব দেখুন' বাটনের লিঙ্ক</p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white font-bold text-lg rounded-xl hover:from-[#1e8c00] hover:to-[#26B000] transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                                <Save size={24} />
                                তথ্য আপডেট করুন
                            </button>
                        </div>

                    </form>
                </div>

                {/* Expense Management Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    {/* Add Expense Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#FFA46F]/20 h-fit">
                        <h3 className="text-xl font-bold text-[#FF4D50] mb-6 flex items-center gap-2">
                            <Plus size={24} />
                            নতুন খরচ যুক্ত করুন
                        </h3>
                        <form onSubmit={handleAddExpense} className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-bold text-gray-700 block">বিবরণ (Title)</label>
                                <input type="text" name="title" placeholder="খরচের বিবরণ" className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50]" required />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-gray-700 block">খাত (Category)</label>
                                <input type="text" name="category" placeholder="যেমন: ত্রাণ, পরিবহন, চিকিৎসা" className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50]" required />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-gray-700 block">পরিমাণ (Amount)</label>
                                <input type="number" name="amount" placeholder="500" className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50]" required />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-gray-700 block">তারিখ (Date)</label>
                                <input type="date" name="date" className="w-full p-4 rounded-xl border border-[#FFA46F]/30 focus:outline-none focus:ring-2 focus:ring-[#FF4D50]" />
                            </div>
                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#FF4D50] to-[#E04F5F] text-white font-bold text-lg rounded-xl hover:from-[#E04F5F] hover:to-[#FF4D50] transition-colors shadow-lg">
                                খরচ যুক্ত করুন
                            </button>
                        </form>
                    </div>

                    {/* Expense List */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#FFA46F]/20">
                        <h3 className="text-xl font-bold text-[#FF4D50] mb-6">খরচের তালিকা</h3>
                        <div className="overflow-y-auto max-h-[600px] space-y-4">
                            {expenses.length > 0 ? (
                                expenses.map(item => (
                                    <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#FFA46F]/30 transition-colors">
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-sm text-gray-500">
                                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs mr-2">{item.category || 'N/A'}</span>
                                                {new Date(item.date).toLocaleDateString('bn-BD')} | ৳ {item.amount}
                                            </p>
                                        </div>
                                        <button onClick={() => handleDeleteExpense(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-10">কোনো খরচের হিসাব নেই</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageStats;
