import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Camera,
  Heart,
  Calendar,
  Flag,
  Share2,
  Copy,
  CheckCircle,
  Award,
} from "lucide-react";

/** Animated Number for Stats */
const AnimatedNumber = ({ value, duration = 1.2 }) => (
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration }}
  >
    {value}
  </motion.span>
);

const Profile = () => {
  const { user } = useContext(AuthContext) || {};
  const displayName = user?.displayName || user?.name || "সম্মানিত সদস্য";
  const email = user?.email || "ইমেইল প্রদান করা হয়নি";
  const photoURL = user?.photoURL;
  const referralCode = user?.uid?.slice(0, 8) || "NIVA2025";

  const [copied, setCopied] = useState(false);

  const copyRefCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-body text-gray-800 pb-12">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#26B000]/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF4D50]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFA46F]/20 text-[#FF4D50] font-semibold text-sm mb-4">
            ঢাকা-১২ নির্বাচনী এলাকা
          </span>
          <h1 className="text-4xl md:text-5xl font-header font-bold text-[#FF4D50] mb-2 leading-tight">
            স্বাগতম, {displayName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            নাহিদা সারোয়ার নিভা'র নেতৃত্বে আগামীর স্মার্ট ঢাকা-১২ গড়ার যাত্রায় আপনার অংশগ্রহণ আমাদের অনুপ্রাণিত করে।
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-[2rem] shadow-xl border border-[#FFA46F]/20 p-6 relative overflow-hidden group">
              {/* Card Header Background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#FF4D50] to-[#FFA46F]"></div>

              <div className="relative pt-12 flex flex-col items-center">

                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                    {photoURL ? (
                      <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#FFA46F] text-white text-4xl font-bold">
                        {displayName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 p-2 bg-[#26B000] rounded-full border-2 border-white text-white shadow-sm">
                    <CheckCircle size={16} />
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900 font-header text-center">{displayName}</h2>
                <div className="flex items-center gap-2 text-gray-500 mt-1 mb-6 text-sm">
                  <Calendar size={14} />
                  <span>সদস্য যোগ দিয়েছেন: ২০২৪</span>
                </div>

                {/* Info List */}
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-[#FFA46F]/5 transition-colors border border-transparent hover:border-[#FFA46F]/30">
                    <div className="p-2.5 bg-[#FF4D50]/10 text-[#FF4D50] rounded-lg">
                      <Flag size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">পদবী</p>
                      <p className="text-sm font-bold text-gray-800">সক্রিয় কর্মী</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-[#FFA46F]/5 transition-colors border border-transparent hover:border-[#FFA46F]/30">
                    <div className="p-2.5 bg-[#FFA46F]/10 text-[#FFA46F] rounded-lg">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">আইডি</p>
                      <p className="text-sm font-bold text-gray-800 font-mono">#{referralCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-[#FFA46F]/5 transition-colors border border-transparent hover:border-[#FFA46F]/30">
                    <div className="p-2.5 bg-[#26B000]/10 text-[#26B000] rounded-lg">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">এলাকা</p>
                      <p className="text-sm font-bold text-gray-800">ঢাকা-১২</p>
                    </div>
                  </div>
                </div>

                {/* Referral Code */}
                <div className="mt-8 w-full">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">আপনার রেফারেল লিংক</p>
                  <button
                    onClick={copyRefCode}
                    className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-dashed border-[#FFA46F] bg-[#FEFFF6] hover:bg-white transition-all group/btn"
                  >
                    <span className="text-sm font-mono font-bold text-[#FF4D50]">invite/{referralCode}</span>
                    <div className="p-1.5 rounded-lg bg-[#FFA46F]/20 text-[#FF4D50] group-hover/btn:bg-[#FFA46F] group-hover/btn:text-white transition-colors">
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </div>
                  </button>
                  {copied && <p className="text-center text-xs text-green-600 font-bold mt-2">লিংক কপি করা হয়েছে!</p>}
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Column: Stats & Activities */}
          <div className="lg:col-span-8 space-y-8">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "ক্যাম্পেইনে অংশগ্রহণ", value: 12, icon: Flag, color: "text-[#FF4D50]", bg: "bg-[#FF4D50]/10", border: "border-[#FF4D50]/20" },
                { label: "স্বেচ্ছাসেবী ঘন্টা", value: 48, icon: User, color: "text-[#26B000]", bg: "bg-[#26B000]/10", border: "border-[#26B000]/20" },
                { label: "ডোনেশন প্রদান", value: "৳ ৫,০০০", icon: Heart, color: "text-[#FFA46F]", bg: "bg-[#FFA46F]/10", border: "border-[#FFA46F]/20" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className={`p-6 rounded-2xl bg-white border ${stat.border} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-3xl font-bold font-header text-gray-900 mb-1">
                    <AnimatedNumber value={stat.value} />
                  </h3>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity / Campaign Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[2rem] shadow-xl border border-[#FFA46F]/20 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-header text-[#FF4D50]">সাম্প্রতিক কার্যক্রম</h3>
                <button className="text-sm font-bold text-[#FFA46F] hover:underline">সব দেখুন</button>
              </div>

              <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                {[
                  { title: "শীতবস্ত্র বিতরণ কর্মসূচী", date: "২৮ ডিসেম্বর, ২০২৪", status: "আসন্ন", type: "event" },
                  { title: "ওয়ার্ড নং ৬ নির্বাচনী সভা", date: "২৫ ডিসেম্বর, ২০২৪", status: "সম্পন্ন", type: "meeting" },
                  { title: "অনলাইন ডোনেশন", date: "২০ ডিসেম্বর, ২০২৪", status: "সফল", type: "donation" },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-4 pl-0 group">
                    <div className={`relative z-10 w-9 h-9 flex-shrink-0 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${i === 0 ? "bg-[#FF4D50] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-[#FFA46F] group-hover:text-white transition-colors"
                      }`}>
                      {i === 0 ? <Flag size={14} /> : <CheckCircle size={14} />}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-[#FFA46F]/5 transition-colors border border-transparent hover:border-[#FFA46F]/20">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === "আসন্ন" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                          }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Campaign Banner / CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#26B000] to-[#1e8c00] text-white p-8 sm:p-10 shadow-lg"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold font-header mb-2 text-white">স্বেচ্ছাসেবী হিসেবে যোগ দিন</h3>
                  <p className="text-green-50 max-w-md">
                    আমাদের প্রচারণায় অংশগ্রহণ করুন এবং ঢাকা-১২ এর উন্নয়নে ভূমিকা রাখুন।
                  </p>
                </div>
                <button className="px-8 py-3 bg-white text-[#26B000] font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95">
                  যোগ দিন
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;