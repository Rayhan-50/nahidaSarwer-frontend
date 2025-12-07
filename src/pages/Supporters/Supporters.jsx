
import React from 'react';
import { Send, MessageSquare, AlertCircle, ThumbsUp, ArrowRight, ChevronRight } from 'lucide-react';
import useAxiosPublic from '../../hooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

import { motion } from 'framer-motion';
import Footer from '../../Shared/Footer/Footer';

import frame26 from '../../assets/images/supporter_img/frame_26.png';
import frame16 from '../../assets/frame_16.svg';
import frame24 from '../../assets/images/supporter_img/frame_24.png';
import frame20 from '../../assets/images/3rd/frame_20.png';
import frame19 from '../../assets/images/section_2/frame_19.png';

const Supporters = () => {
    const [activeTab, setActiveTab] = React.useState('manifesto'); // 'comment', 'manifesto', 'support'
    const axiosPublic = useAxiosPublic();

    const { data: videos = [] } = useQuery({
        queryKey: ['videos'],
        queryFn: async () => {
            const res = await axiosPublic.get('/videos');
            return res.data;
        }
    });

    return (
        <div className="w-full bg-[#FEFFF6] min-h-screen font-body text-charcoal">
            {/* Header Section */}
            <section className="relative h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${frame26})` }}
                ></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 md:mt-20">
                    <span className="text-[#00A651] font-bold text-xl md:text-3xl mb-2 md:mb-4 block tracking-wide">অংশগ্রহণ</span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-header font-bold text-black mb-4 md:mb-8 leading-tight">
                        আপনার কণ্ঠস্বর <br /> শেয়ার করুন
                    </h1>
                    <p className="text-lg md:text-2xl lg:text-3xl text-black/80 mb-6 md:mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
                        মন্তব্য যোগ করুন, আপনার প্রস্তাব জমা দিন, বা আমাদের সমর্থন করুন। প্রতিটি মতামত গুরুত্বপূর্ণ এবং আমাদের সম্প্রদায়কে শক্তিশালী করে।
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                        <button className="px-6 py-3 md:px-10 md:py-4 border-2 border-black text-black font-bold text-lg md:text-xl rounded-full hover:bg-black hover:text-white transition-colors">
                            জমা দিন
                        </button>
                        <button className="px-6 py-3 md:px-10 md:py-4 flex items-center justify-center gap-2 font-bold text-black text-lg md:text-xl rounded-full hover:gap-3 transition-all">
                            আরও <ChevronRight size={20} className="md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Feedback Form Section */}
            <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="w-full bg-white rounded-[2rem] shadow-xl border-2 border-[#FF4D50] p-6 md:p-12 relative overflow-hidden">
                    {/* Background Lotus Faint */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-no-repeat bg-right bg-contain opacity-5 pointer-events-none" style={{ backgroundImage: `url(${frame16})` }}></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 md:mb-6 text-black font-bold text-xl md:text-3xl">
                            <span className="w-8 h-8 md:w-10 md:h-10 bg-[#FF4D50] rounded-full flex items-center justify-center text-white text-sm md:text-base">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                            </span>
                            Community Feedback
                        </div>

                        <h2 className="text-4xl md:text-7xl lg:text-9xl font-header font-bold mb-4 md:mb-6">আপনার মতামত শেয়ার করুন</h2>
                        <p className="text-gray-500 mb-8 md:mb-12 text-xl md:text-3xl lg:text-4xl">মন্তব্য, ইশতেহার, বা সমর্থন জমা দিন</p>

                        {/* Tabs */}
                        <div className="flex flex-wrap border-b border-gray-200 mb-8 md:mb-12">
                            <button
                                onClick={() => setActiveTab('comment')}
                                className={`px-4 py-3 md:px-10 md:py-6 font-bold text-2xl md:text-5xl lg:text-9xl transition-colors ${activeTab === 'comment' ? 'text-[#FF4D50] border-b-4 md:border-b-8 border-[#FF4D50]' : 'text-gray-500 hover:text-black'}`}
                            >
                                মন্তব্য
                            </button>
                            <button
                                onClick={() => setActiveTab('manifesto')}
                                className={`px-4 py-3 md:px-10 md:py-6 font-bold text-2xl md:text-5xl lg:text-9xl transition-colors ${activeTab === 'manifesto' ? 'text-[#FF4D50] border-b-4 md:border-b-8 border-[#FF4D50]' : 'text-gray-500 hover:text-black'}`}
                            >
                                ইশতেহার
                            </button>
                            <button
                                onClick={() => setActiveTab('support')}
                                className={`px-4 py-3 md:px-10 md:py-6 font-bold text-2xl md:text-5xl lg:text-9xl transition-colors ${activeTab === 'support' ? 'text-[#FF4D50] border-b-4 md:border-b-8 border-[#FF4D50]' : 'text-gray-500 hover:text-black'}`}
                            >
                                সমর্থন
                            </button>
                        </div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target;
                            const name = form.name.value;
                            const email = form.email.value;
                            const location = form.location.value;
                            const message = form.message.value;
                            const videoUrl = activeTab === 'comment' ? form.videoUrl?.value : '';
                            const privacy = form.privacy.checked;

                            const feedbackData = {
                                name,
                                email,
                                location,
                                message,
                                videoUrl,
                                privacy,
                                type: activeTab, // 'comment', 'manifesto', 'support'
                                createdAt: new Date()
                            };

                            try {
                                const res = await axiosPublic.post('/feedbacks', feedbackData);
                                if (res.data.insertedId) {
                                    import('sweetalert2').then(Swal => {
                                        Swal.default.fire({
                                            icon: 'success',
                                            title: 'ধন্যবাদ!',
                                            text: 'আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে।',
                                            confirmButtonColor: '#00A651'
                                        });
                                    });
                                    form.reset();
                                }
                            } catch (error) {
                                console.error(error);
                                import('sweetalert2').then(Swal => {
                                    Swal.default.fire({
                                        icon: 'error',
                                        title: 'দুঃখিত!',
                                        text: 'কিছু ভুল হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।',
                                        confirmButtonColor: '#d33'
                                    });
                                });
                            }
                        }} className="space-y-6 md:space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-xl md:text-3xl lg:text-4xl">আপনার নাম</label>
                                    <input type="text" name="name" placeholder="আপনার সম্পূর্ণ নাম লিখুন" className="w-full p-4 md:p-8 text-lg md:text-2xl lg:text-4xl bg-white rounded-xl md:rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400" required />
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-xl md:text-3xl lg:text-4xl">ইমেইল ঠিকানা</label>
                                    <input type="email" name="email" placeholder="you@example.com" className="w-full p-4 md:p-8 text-lg md:text-2xl lg:text-4xl bg-white rounded-xl md:rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400" required />
                                </div>
                            </div>

                            <div className="space-y-2 md:space-y-4">
                                <label className="font-bold text-xl md:text-3xl lg:text-4xl">আপনার এলাকা / ওয়ার্ড</label>
                                <input type="text" name="location" placeholder="আপনার এলাকা বা ওয়ার্ডের নাম লিখুন" className="w-full p-4 md:p-8 text-lg md:text-2xl lg:text-4xl bg-white rounded-xl md:rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400" required />
                            </div>

                            <div className="space-y-2 md:space-y-4">
                                <label className="font-bold text-xl md:text-3xl lg:text-4xl">
                                    {activeTab === 'comment' && 'আপনার মন্তব্য'}
                                    {activeTab === 'manifesto' && 'আপনার প্রস্তাব / ইশতেহার'}
                                    {activeTab === 'support' && 'আপনার সমর্থনের বার্তা'}
                                </label>
                                <textarea
                                    name="message"
                                    rows="6"
                                    placeholder={
                                        activeTab === 'comment' ? "আপনার মন্তব্য লিখুন..." :
                                            activeTab === 'manifesto' ? "আপনার প্রস্তাব / ইশতেহার লিখুন..." :
                                                "আপনার সমর্থনের বার্তা লিখুন..."
                                    }
                                    className="w-full p-4 md:p-8 text-lg md:text-2xl lg:text-4xl bg-white rounded-xl md:rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-400"
                                    required
                                ></textarea>
                            </div>

                            {activeTab === 'comment' && (
                                <div className="space-y-2 md:space-y-4">
                                    <label className="font-bold text-lg md:text-2xl lg:text-3xl">আপনার ভিডিও বার্তার ইউটিউব লিংক (ঐচ্ছিক)</label>
                                    <input type="text" name="videoUrl" placeholder="ইউটিউব ভিডিও লিংক দিন..." className="w-full p-4 md:p-8 text-lg md:text-2xl lg:text-3xl bg-white rounded-xl md:rounded-2xl border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400" />
                                </div>
                            )}

                            <div className="flex items-start md:items-center gap-4 md:gap-6">
                                <input type="checkbox" name="privacy" id="privacy" className="w-6 h-6 md:w-10 md:h-10 rounded border-gray-300 text-black focus:ring-black mt-1 md:mt-0" />
                                <label htmlFor="privacy" className="text-lg md:text-2xl lg:text-4xl text-gray-500">আমি আমার {activeTab === 'manifesto' ? 'ইশতেহার' : 'মতামত'} জনসমক্ষে প্রদর্শনের অনুমতি দিচ্ছি</label>
                            </div>

                            <button type="submit" className="px-8 py-4 md:px-16 md:py-8 bg-[#FF4D50] text-white font-bold text-2xl md:text-4xl lg:text-5xl rounded-xl md:rounded-[2rem] hover:bg-red-600 transition-colors shadow-xl shadow-red-200 w-full md:w-auto">
                                {activeTab === 'comment' && 'মন্তব্য জমা দিন'}
                                {activeTab === 'manifesto' && 'ইশতেহার জমা দিন'}
                                {activeTab === 'support' && 'সমর্থন জানান'}
                            </button>
                        </form>
                        <p className="mt-6 md:mt-8 text-lg md:text-xl text-gray-400">
                            সম্মানজনক সম্প্রদায় বজায় রাখতে জমাগুলো যাচাই করা হয়।
                        </p>
                    </div>
                </div>
            </section>

            {/* No Comments / Empty State Section */}
            <section className="py-10 md:py-20 relative bg-black text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none"
                    style={{ backgroundImage: `url(${frame20})` }}
                ></div>
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-lg md:text-xl font-bold mb-2 md:mb-4 block">খালি</span>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-header font-bold mb-4 md:mb-6">এখনও কোনো মন্তব্য নেই</h2>
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300">আপনার চিন্তাভাবনা প্রথম শেয়ার করুন</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white text-black p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem]">
                            <ArrowRight className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">কথপোকথন শুরু করুন</h3>
                            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">এখনও কোনো মন্তব্য নেই। প্রথম হন এবং আপনার মতামত শেয়ার করুন।</p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                                <button className="px-6 py-2 md:px-8 md:py-3 border-2 border-black rounded-full font-bold text-lg md:text-xl hover:bg-black hover:text-white transition-colors">যোগ দিন</button>
                                <button className="flex items-center gap-2 font-bold text-lg md:text-xl hover:gap-3 transition-all">আরও <ChevronRight size={20} /></button>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white text-black p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem]">
                            <div className="flex mb-4 md:mb-6">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-black"></div>
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-black -ml-3 bg-white"></div>
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">এখনও কোনো ইশতেহার নেই</h3>
                            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">প্রথম হন এবং আপনার প্রস্তাব যোগ করুন</p>
                            <button className="flex items-center gap-2 font-bold text-lg md:text-xl hover:gap-3 transition-all">আরও <ChevronRight size={20} /></button>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white text-black p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem]">
                            <div className="w-10 h-10 md:w-12 md:h-12 border-l-4 border-black mb-4 md:mb-6 flex items-center pl-2">
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">এখনও কোনো সমর্থন নেই</h3>
                            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">প্রথম হন এবং আপনার সমর্থন প্রকাশ করুন</p>
                            <button className="flex items-center gap-2 font-bold text-lg md:text-xl hover:gap-3 transition-all">আরও <ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Voice / Video Embed Section */}
            <section
                className="py-10 md:py-16 lg:py-20 relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${frame24})` }}
            >

                <div className="absolute inset-0 bg-black/50"></div> {/* Increased overlay darkness for better text visibility */}
                <div className="w-full relative z-10">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl justify-center px-4">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#FF4D50] rounded-full flex items-center justify-center text-white text-xs">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                        </span>
                        Featured Voice
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-header font-bold mb-6 sm:mb-8 md:mb-12 text-center text-white px-4">জনগণের কথা</h2>

                    <div className="relative">
                        {/* Mobile View: Manual Scroll */}
                        <div className="md:hidden flex overflow-x-auto gap-3 sm:gap-4 px-3 sm:px-4 pb-6 sm:pb-8 snap-x snap-mandatory no-scrollbar">
                            {videos.map((video, index) => (
                                <div key={index} className="min-w-[90vw] sm:min-w-[85vw] bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full snap-center">
                                    <div className="aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-black flex-shrink-0 relative z-0">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={video.videoUrl}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="flex items-start gap-2 sm:gap-3 flex-grow">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 text-black truncate">{video.name}</h3>
                                            <p className="text-gray-500 text-sm sm:text-base mb-1.5 sm:mb-2 truncate">{video.location}</p>
                                            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed line-clamp-3 break-words">
                                                "{video.quote}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View: Marquee */}
                        <div className="hidden md:flex overflow-hidden py-10">
                            <motion.div
                                className="flex gap-8 px-4"
                                animate={{ x: "-50%" }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                {[...videos, ...videos].map((video, index) => (
                                    <div key={index} className="w-[350px] md:w-[400px] lg:w-[500px] xl:w-[600px] bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl border border-gray-100 flex-shrink-0 flex flex-col">
                                        <div className="aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden mb-5 sm:mb-6 md:mb-8 bg-black flex-shrink-0 relative z-0">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={video.videoUrl}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div className="flex items-start gap-3 sm:gap-4 flex-grow">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-black truncate">{video.name}</h3>
                                                <p className="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4 truncate">{video.location}</p>
                                                <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed line-clamp-4 break-words">
                                                    "{video.quote}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Voices Header */}
            <section className="py-16 md:py-32 text-center w-full relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-contain bg-center bg-repeat"
                    style={{ backgroundImage: `url(${frame19})` }}
                ></div>
                <div className="relative z-10 w-full px-4">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-header font-bold mb-4 md:mb-8 text-black leading-tight">
                        সম্প্রদায়ের কণ্ঠস্বর <br /> আমাদের পথ দেখায়
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-black font-medium mb-8 md:mb-12 max-w-4xl mx-auto">
                        প্রতিটি মন্তব্য, প্রস্তাব এবং সমর্থন আমাদের আরও শক্তিশালী করে তোলে।
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                        <button className="px-8 py-3 md:px-10 md:py-4 bg-black text-white rounded-none font-bold text-lg md:text-xl hover:bg-gray-800 transition-colors">দেখুন</button>
                        <button className="px-8 py-3 md:px-10 md:py-4 border-2 border-black bg-white text-black rounded-none font-bold text-lg md:text-xl hover:bg-gray-50 transition-colors">শেয়ার করুন</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Supporters;