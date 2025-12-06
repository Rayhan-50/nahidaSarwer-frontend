import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Trash2, Edit, X, DollarSign, Calendar, Phone, Hash } from 'lucide-react';
import Loading from '../../components/Loading/Loading';

const ShowDonateInformation = () => {
    const axiosSecure = useAxiosSecure();
    const [editingDonation, setEditingDonation] = useState(null);

    const { data: donations = [], refetch, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "আপনি এটি ফিরিয়ে আনতে পারবেন না!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF4D50',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'হ্যাঁ, ডিলিট করুন!',
            cancelButtonText: 'না',
            background: '#FEFFF6'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donations/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'ডিলিট সম্পন্ন!',
                                text: 'আপনার ফাইলটি ডিলিট করা হয়েছে।',
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
        const name = form.name.value;
        const amount = form.amount.value;
        const trxId = form.trxId.value;
        const phone = form.phone.value;

        const updateData = { name, amount, trxId, phone };

        try {
            const res = await axiosSecure.patch(`/donations/${editingDonation._id}`, updateData);
            if (res.data.modifiedCount > 0) {
                refetch();
                setEditingDonation(null);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'তথ্য আপডেট করা হয়েছে',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#FEFFF6'
                });
            }
        } catch (error) {
            console.error("Update failed", error);
            Swal.fire({
                title: 'Error',
                text: 'Update failed',
                icon: 'error',
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
                        <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#FF4D50] mb-1 sm:mb-2">সকল অনুদান তথ্য</h2>
                        <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">মোট অনুদান: {donations.length}</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-[#FFA46F]/20">
                <table className="table w-full">
                    <thead className="bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white">
                        <tr>
                            <th className="py-4 px-6 text-left">ক্রমিক</th>
                            <th className="py-4 px-6 text-left">নাম</th>
                            <th className="py-4 px-6 text-left">পরিমাণ</th>
                            <th className="py-4 px-6 text-left">Trx ID</th>
                            <th className="py-4 px-6 text-left">ফোন</th>
                            <th className="py-4 px-6 text-left">তারিখ</th>
                            <th className="py-4 px-6 text-center">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => (
                            <tr key={donation._id} className="border-b border-[#FFA46F]/10 hover:bg-[#FFA46F]/5 transition-colors">
                                <th className="py-4 px-6 font-medium text-gray-900">{index + 1}</th>
                                <td className="py-4 px-6 font-medium">{donation.name}</td>
                                <td className="py-4 px-6 font-bold text-[#26B000]">৳ {donation.amount}</td>
                                <td className="py-4 px-6 font-mono text-sm text-[#FF4D50]">{donation.trxId}</td>
                                <td className="py-4 px-6">{donation.phone}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{new Date(donation.date).toLocaleDateString()}</td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => setEditingDonation(donation)}
                                            className="p-2 bg-[#FFA46F]/10 text-[#FFA46F] rounded-full hover:bg-[#FFA46F]/20 transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(donation._id)}
                                            className="p-2 bg-[#FF4D50]/10 text-[#FF4D50] rounded-full hover:bg-[#FF4D50]/20 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {editingDonation && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] p-6 flex justify-between items-center text-white">
                            <h3 className="text-xl font-bold">তথ্য আপডেট করুন</h3>
                            <button onClick={() => setEditingDonation(null)} className="hover:bg-white/20 p-1 rounded-full"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                                <input name="name" defaultValue={editingDonation.name} className="w-full p-2 border border-[#FFA46F]/30 rounded-lg focus:ring-2 focus:ring-[#FF4D50] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">পরিমাণ</label>
                                <input name="amount" defaultValue={editingDonation.amount} className="w-full p-2 border border-[#FFA46F]/30 rounded-lg focus:ring-2 focus:ring-[#FF4D50] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                <input name="trxId" defaultValue={editingDonation.trxId} className="w-full p-2 border border-[#FFA46F]/30 rounded-lg focus:ring-2 focus:ring-[#FF4D50] outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ফোন</label>
                                <input name="phone" defaultValue={editingDonation.phone} className="w-full p-2 border border-[#FFA46F]/30 rounded-lg focus:ring-2 focus:ring-[#FF4D50] outline-none" />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setEditingDonation(null)} className="px-4 py-2 border border-[#FFA46F]/30 rounded-lg hover:bg-[#FFA46F]/5">বাতিল</button>
                                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white rounded-lg hover:from-[#1e8c00] hover:to-[#26B000]">আপডেট করুন</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDonateInformation;
