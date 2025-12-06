import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Heart, CreditCard, CheckCircle, AlertCircle, QrCode, Smartphone } from 'lucide-react';
import Footer from '../../Shared/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';

import bkashQr from '../../assets/images/payment/bkash.jpg';
import rocketQr from '../../assets/images/payment/rocket.jpg';
import nagadQr from '../../assets/images/payment/nagad.png';
import useAxiosPublic from '../../hooks/UseAxiosPublic';

const Donate = () => {
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        note: '',
        trxId: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const axiosPublic = useAxiosPublic();

    const presetAmounts = ['১০০', '৫০০', '১,০০০', '৫,০০০'];

    const handleAmountSelect = (val) => {
        setAmount(val);
        setCustomAmount('');
        if (errors.amount) setErrors({ ...errors, amount: null });
    };

    const handleCustomAmountChange = (e) => {
        const val = e.target.value;
        setCustomAmount(val);
        setAmount('');
        if (errors.amount) setErrors({ ...errors, amount: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: null });
    };

    const validate = () => {
        const newErrors = {};
        const finalAmount = customAmount || amount;

        if (!finalAmount) newErrors.amount = 'অনুগ্রহ করে অনুদানের পরিমাণ নির্বাচন করুন বা লিখুন';
        else if (isNaN(parseFloat(finalAmount.replace(/,/g, ''))) || parseFloat(finalAmount.replace(/,/g, '')) <= 0) {
            newErrors.amount = 'অনুগ্রহ করে সঠিক পরিমাণ লিখুন';
        }

        if (!formData.name.trim()) newErrors.name = 'আপনার নাম আবশ্যক';

        if (formData.phone && !/^(\+88)?01[3-9]\d{8}$/.test(formData.phone)) {
            newErrors.phone = 'অনুগ্রহ করে সঠিক মোবাইল নম্বর দিন';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'অনুগ্রহ করে সঠিক ইমেইল ঠিকানা দিন';
        }

        if (!formData.trxId.trim()) newErrors.trxId = 'ট্রানজ্যাকশন আইডি আবশ্যক';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);

            const donationInfo = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                amount: customAmount || amount,
                paymentMethod,
                trxId: formData.trxId,
                note: formData.note,
                date: new Date().toISOString()
            };

            try {
                const res = await axiosPublic.post('/donations', donationInfo);
                if (res.data.insertedId) {
                    setIsSubmitting(false);
                    setIsSuccess(true);
                    setFormData({ name: '', phone: '', email: '', note: '', trxId: '' });
                    setAmount('');
                    setCustomAmount('');

                    Swal.fire({
                        icon: 'success',
                        title: 'ধন্যবাদ!',
                        text: 'আপনার মূল্যবান অনুদান সফলভাবে গৃহীত হয়েছে।',
                        confirmButtonText: 'ঠিক আছে',
                        confirmButtonColor: '#00A651'
                    });
                }
            } catch (error) {
                console.error("Donation submission failed:", error);
                setIsSubmitting(false);
                // Optionally handle error state here
            }
        }
    };

    const getPaymentMethodName = (method) => {
        switch (method) {
            case 'bkash': return 'বিকাশ';
            case 'nagad': return 'নগদ';
            case 'rocket': return 'রকেট';
            default: return '';
        }
    };

    const getQrImage = (method) => {
        switch (method) {
            case 'bkash': return bkashQr;
            case 'nagad': return nagadQr;
            case 'rocket': return rocketQr;
            default: return null;
        }
    };

    return (
        <div className="w-full bg-[#FEFFF6] min-h-screen font-body text-charcoal">
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/src/images/hero.jpeg')" }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
                    <span className="text-[#FF4D50] font-bold text-3xl md:text-5xl mb-4 md:mb-6 block tracking-wide">অনুদান</span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-header font-bold text-white mb-6 md:mb-8 leading-tight">
                        অনুদান দিন, পরিবর্তনের পথে অংশ নিন
                    </h1>
                    <p className="text-lg md:text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto font-medium leading-relaxed">
                        আপনার সমর্থন আমাদের রাজনৈতিক প্রচারণাকে আরও শক্তিশালী করবে এবং আমাদের লক্ষ্য অর্জনে সহায়তা করবে।
                    </p>
                </div>
            </section>

            {/* Donation Form Section */}
            <section className="py-10 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="w-full mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">

                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-[#00A651] text-white p-8 md:p-16 text-center relative"
                            >
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                                    <CheckCircle size={32} className="md:w-12 md:h-12" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-header font-bold mb-4 md:mb-6">আপনার মূল্যবান অনুদানের জন্য আন্তরিক ধন্যবাদ!</h2>
                                <p className="text-xl md:text-3xl">আপনার সমর্থন আমাদের রাজনৈতিক প্রচারণাকে আরও শক্তিশালী করবে।</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white"
                                >
                                    <CheckCircle size={24} className="rotate-45 md:w-8 md:h-8" /> {/* Close icon using CheckCircle rotated */}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-6 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

                        {/* Left Column: Options */}
                        <div className="space-y-8 md:space-y-10">

                            {/* Amount Selection */}
                            <div>
                                <h3 className="text-3xl md:text-6xl font-bold mb-6 md:mb-10 flex items-center gap-4 md:gap-6">
                                    <span className="w-10 h-10 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center text-xl md:text-3xl">১</span>
                                    অনুদানের পরিমাণ
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-10">
                                    {presetAmounts.map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => handleAmountSelect(amt)}
                                            className={`py-4 md:py-8 rounded-xl md:rounded-2xl font-bold text-xl md:text-4xl transition-all ${amount === amt
                                                ? 'bg-[#FF4D50] text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            ৳ {amt}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl md:text-4xl">৳</span>
                                    <input
                                        type="number"
                                        placeholder="অন্যান্য পরিমাণ"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                        className={`w-full p-4 pl-10 md:p-8 md:pl-16 bg-gray-50 border-2 rounded-xl md:rounded-2xl text-xl md:text-4xl font-bold focus:outline-none transition-colors ${customAmount ? 'border-[#FF4D50] bg-white' : 'border-gray-200 focus:border-black'
                                            } ${errors.amount ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.amount && <p className="text-red-500 mt-2 md:mt-4 text-lg md:text-2xl flex items-center gap-2"><AlertCircle size={20} className="md:w-6 md:h-6" /> {errors.amount}</p>}
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h3 className="text-3xl md:text-6xl font-bold mb-6 md:mb-10 flex items-center gap-4 md:gap-6">
                                    <span className="w-10 h-10 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center text-xl md:text-3xl">২</span>
                                    পেমেন্ট মেথড
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                                    {['bkash', 'nagad', 'rocket'].map((method) => (
                                        <button
                                            key={method}
                                            onClick={() => setPaymentMethod(method)}
                                            className={`p-4 md:p-8 rounded-xl md:rounded-2xl border-2 flex flex-row sm:flex-col items-center gap-4 md:gap-6 transition-all ${paymentMethod === method
                                                ? 'border-[#FF4D50] bg-[#FF4D50]/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-base ${method === 'bkash' ? 'bg-[#E2136E]' :
                                                method === 'nagad' ? 'bg-[#F6921E]' : 'bg-[#8C3494]'
                                                }`}>
                                                {method === 'bkash' && 'bKash'}
                                                {method === 'nagad' && 'Nagad'}
                                                {method === 'rocket' && 'Rocket'}
                                            </div>
                                            <span className={`font-bold text-xl md:text-4xl ${paymentMethod === method ? 'text-[#FF4D50]' : 'text-gray-600'}`}>
                                                {getPaymentMethodName(method)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* QR Code Area (Desktop) */}
                            <div className="hidden lg:block bg-gray-50 p-10 rounded-[2.5rem] border border-gray-200 text-center">
                                <div className="w-72 h-72 bg-white mx-auto mb-8 p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                                    <img
                                        src={getQrImage(paymentMethod)}
                                        alt={`${getPaymentMethodName(paymentMethod)} QR Code`}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                </div>
                                <p className="text-4xl font-bold text-gray-700 leading-relaxed">
                                    QR কোড স্ক্যান করে <br /><span className="text-[#FF4D50]">{getPaymentMethodName(paymentMethod)}</span> এ পেমেন্ট করুন
                                </p>
                                <p className="text-3xl text-gray-500 mt-6">অথবা ডায়াল করুন: *247#</p>
                            </div>

                        </div>

                        {/* Right Column: Form */}
                        <div>
                            <h3 className="text-3xl md:text-6xl font-bold mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
                                <span className="w-10 h-10 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center text-xl md:text-3xl">৩</span>
                                দাতার তথ্য
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-gray-700 text-xl md:text-4xl">নাম <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="আপনার নাম লিখুন"
                                        className={`w-full p-4 md:p-8 bg-gray-50 border rounded-xl md:rounded-2xl text-xl md:text-4xl focus:outline-none focus:border-black transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-base md:text-xl">{errors.name}</p>}
                                </div>

                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-gray-700 text-xl md:text-4xl">মোবাইল নম্বর (ঐচ্ছিক)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="আপনার মোবাইল নম্বর"
                                        className={`w-full p-4 md:p-8 bg-gray-50 border rounded-xl md:rounded-2xl text-xl md:text-4xl focus:outline-none focus:border-black transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-base md:text-xl">{errors.phone}</p>}
                                </div>

                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-gray-700 text-xl md:text-4xl">ইমেইল (ঐচ্ছিক)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="আপনার ইমেইল ঠিকানা"
                                        className={`w-full p-4 md:p-8 bg-gray-50 border rounded-xl md:rounded-2xl text-xl md:text-4xl focus:outline-none focus:border-black transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-base md:text-xl">{errors.email}</p>}
                                </div>

                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-gray-700 text-xl md:text-4xl">নোট / বার্তা (ঐচ্ছিক)</label>
                                    <textarea
                                        name="note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        rows="6"
                                        placeholder="আমাদের জন্য কোনো বার্তা থাকলে লিখুন..."
                                        className="w-full p-4 md:p-8 bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl text-xl md:text-4xl focus:outline-none focus:border-black transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-gray-700 text-xl md:text-4xl">
                                        {getPaymentMethodName(paymentMethod)} লেনদেন নম্বর (Transaction ID) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="trxId"
                                        value={formData.trxId}
                                        onChange={handleInputChange}
                                        placeholder="X7Y8Z9..."
                                        className={`w-full p-4 md:p-8 bg-gray-50 border rounded-xl md:rounded-2xl text-xl md:text-4xl focus:outline-none focus:border-black transition-colors font-mono ${errors.trxId ? 'border-red-500' : 'border-gray-200'}`}
                                    />
                                    {errors.trxId && <p className="text-red-500 text-base md:text-xl">{errors.trxId}</p>}
                                </div>

                                {/* QR Code Area (Mobile Only) */}
                                <div className="lg:hidden bg-gray-50 p-6 md:p-10 rounded-xl md:rounded-2xl border border-gray-200 text-center my-6 md:my-10">
                                    <div className="w-40 h-40 md:w-56 md:h-56 bg-white mx-auto mb-4 md:mb-8 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                                        <img
                                            src={getQrImage(paymentMethod)}
                                            alt={`${getPaymentMethodName(paymentMethod)} QR Code`}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <p className="font-bold text-gray-700 text-xl md:text-3xl">
                                        QR কোড স্ক্যান করে <span className="text-[#FF4D50]">{getPaymentMethodName(paymentMethod)}</span> এ পেমেন্ট করুন
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 md:py-8 rounded-xl md:rounded-2xl font-header font-bold text-2xl md:text-5xl text-white shadow-lg transition-all ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-black hover:bg-[#FF4D50] hover:shadow-xl hover:-translate-y-1'
                                        }`}
                                >
                                    {isSubmitting ? 'সাবমিট হচ্ছে...' : 'অনুদান সাবমিট করুন'}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Donate;