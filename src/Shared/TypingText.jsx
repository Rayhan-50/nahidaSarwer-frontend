import React from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text, className, tag = 'div' }) => {
    const MotionTag = motion[tag];

    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                visible: { transition: { staggerChildren: 0.05 } }
            }}
        >
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </MotionTag>
    );
};

export default TypingText;