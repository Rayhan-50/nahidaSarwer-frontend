import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const ExpenseTracker = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch Stats
    const { data: stats = { raisedFunds: 0, totalSpent: 0 }, isLoading: isStatsLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    });

    // Fetch Expenses List
    const { data: expenses = [], isLoading: isListLoading } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/expenses');
            return res.data;
        }
    });

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (isStatsLoading || isListLoading) {
        return <div className="text-center py-10 w-full">লোড হচ্ছে...</div>;
    }

    const currentBalance = (stats.raisedFunds || 0) - (stats.totalSpent || 0);

    return (
        <div className="w-full">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Total Raised */}
                <div className="bg-[#E9F7EF] py-8 rounded-2xl text-center shadow-sm border border-transparent">
                    <p className="text-gray-700 font-bold mb-2">মোট অনুদান সংগৃহীত</p>
                    <h3 className="text-4xl font-bold text-[#00A651]">৳ {(stats.raisedFunds || 0).toLocaleString('bn-BD')}</h3>
                </div>

                {/* Total Spent */}
                <div className="bg-[#FDEDEC] py-8 rounded-2xl text-center shadow-sm border border-transparent">
                    <p className="text-gray-700 font-bold mb-2">মোট খরচ</p>
                    <h3 className="text-4xl font-bold text-[#FF4D50]">৳ {(stats.totalSpent || 0).toLocaleString('bn-BD')}</h3>
                </div>

                {/* Current Balance */}
                <div className="bg-[#F2F4F4] py-8 rounded-2xl text-center shadow-sm border border-transparent">
                    <p className="text-gray-700 font-bold mb-2">বর্তমান স্থিতি</p>
                    <h3 className="text-4xl font-bold text-black">৳ {currentBalance.toLocaleString('bn-BD')}</h3>
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center mb-8 text-black">খরচের বিবরণ</h2>

            {/* Table */}
            <div className="w-full overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="py-4 px-6 text-left font-semibold">তারিখ</th>
                            <th className="py-4 px-6 text-left font-semibold">খাত</th>
                            <th className="py-4 px-6 text-center font-semibold">বিবরণ</th>
                            <th className="py-4 px-6 text-right font-semibold">পরিমাণ (৳)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {expenses.length > 0 ? (
                            expenses.map((item) => (
                                <tr key={item._id} className="border-b border-gray-100 last:border-none">
                                    <td className="py-4 px-6 text-left">{formatDate(item.date)}</td>
                                    <td className="py-4 px-6 text-left"><span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{item.category || 'N/A'}</span></td>
                                    <td className="py-4 px-6 text-center">{item.title || item.description || item.reason}</td>
                                    <td className="py-4 px-6 text-right">{item.amount.toLocaleString('bn-BD')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-gray-400 italic">
                                    এখনও কোনো খরচের হিসাব নেই
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTracker;