import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Trash2, MessageSquare, MapPin, Calendar, Star, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';

const ShowReview = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Review has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    };

    const handleApprove = (id) => {
        axiosSecure.patch(`/reviews/${id}`, { status: 'approved' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Approved!',
                        text: 'Review has been approved successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 bg-[#FDF6E9] min-h-screen font-body">
            <h2 className="text-3xl font-header font-bold text-[#0A3D91] mb-8 text-center flex items-center justify-center gap-3">
                <Star size={32} /> জনগনের মতামত / রিভিউ ({reviews.length})
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0A3D91] text-white">
                            <tr>
                                <th className="p-4 text-lg font-bold">নাম</th>
                                <th className="p-4 text-lg font-bold">এলাকা</th>
                                <th className="p-4 text-lg font-bold">রেটিং</th>
                                <th className="p-4 text-lg font-bold">স্ট্যাটাস</th>
                                <th className="p-4 text-lg font-bold">বার্তা</th>
                                <th className="p-4 text-lg font-bold">তারিখ</th>
                                <th className="p-4 text-lg font-bold text-center">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reviews.map((review) => (
                                <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-800">{review.name}</td>
                                    <td className="p-4 text-gray-600 flex items-center gap-1">
                                        <MapPin size={16} /> {review.location}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1">
                                            {[...Array(parseInt(review.rating || 0))].map((_, i) => (
                                                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize 
                                            ${review.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {review.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-700 max-w-xs truncate" title={review.message}>
                                        {review.message}
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-center flex items-center justify-center gap-2">
                                        {review.status === 'approved' ? (
                                            <button
                                                disabled
                                                className="px-3 py-1 bg-green-200 text-green-800 rounded-lg cursor-not-allowed text-sm font-bold flex items-center gap-1"
                                            >
                                                <CheckCircle size={16} /> Approved
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleApprove(review._id)}
                                                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold flex items-center gap-1"
                                            >
                                                <CheckCircle size={16} /> Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowReview;
