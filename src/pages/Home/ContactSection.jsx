import React from 'react';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import TypingText from '../../Shared/TypingText';

import frame19 from '../../assets/images/section_2/frame_19.png';

const ContactSection = () => {
    const contactItems = [
        {
            icon: Mail,
            title: 'ইমেইল',
            subtitle: 'আমাদের সাথে যোগাযোগ করুন',
            link: 'nahidasarwer@gmail.com',
            href: 'mailto:nahidasarwer@gmail.com'
        },
        {
            icon: MessageSquare,
            title: 'ফোন',
            subtitle: 'সরাসরি কথা বলুন',
            link: '01763210498',
            href: 'tel:01763210498'
        },
        {
            icon: Phone,
            title: 'অফিস',
            subtitle: 'ফার্মগেট',
            link: '01763210498',
            href: 'tel:01763210498'
        },
        {
            icon: MapPin,
            title: 'দপ্তর',
            subtitle: 'ফার্মগেট, ঢাকা',
            link: 'ফার্মগেট',
            href: '#'
        }
    ];

    return (
        <section className="relative w-full pt-20 lg:pt-32 pb-0 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${frame19})`,
                }}
            >
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-10 lg:mb-20">
                    <span className="text-[#00A651] font-header text-2xl md:text-3xl lg:text-4xl font-bold mb-4 block">
                        যোগাযোগ
                    </span>
                    <TypingText
                        tag="h2"
                        text="আমাদের সাথে যোগাযোগ করুন"
                        className="text-4xl md:text-6xl lg:text-8xl font-header font-bold text-black mb-6"
                    />
                    <p className="text-lg md:text-xl lg:text-2xl text-black font-body">
                        আপনার প্রশ্ন, পরামর্শ বা যেকোনো বিষয়ে আমাদের সাথে যোগাযোগ করতে পারেন।
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/10 border-t border-black/10">
                    {contactItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 md:p-10 group hover:bg-white/50 transition-colors duration-300">
                            <div className="mb-3 md:mb-6">
                                <item.icon strokeWidth={1.5} className="w-12 h-12 text-black" />
                            </div>

                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-header font-bold text-black mb-3 md:mb-6">
                                {item.title}
                            </h3>

                            <p className="text-base md:text-lg lg:text-xl text-gray-600 font-body mb-4 md:mb-8 min-h-0 md:min-h-[4rem]">
                                {item.subtitle}
                            </p>

                            <a
                                href={item.href}
                                className="text-lg md:text-xl lg:text-2xl font-bold text-black border-b-2 border-black pb-1 hover:text-[#FF4D50] hover:border-[#FF4D50] transition-colors"
                            >
                                {item.link}
                            </a>
                        </div>
                    ))}
                </div>

            </div>

            {/* Bottom Orange Bar */}
            <div className="w-full h-4 bg-[#F4A261] mt-10"></div>
        </section>
    );
};

export default ContactSection;