"use client";
import { motion, Variants } from "framer-motion";
export default function MyDescrption() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" // دلوقتي هيفهم إن دي Easing function صحيحة
            }
        },
    };
    return (


        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // التعديل هنا: items-center للموبايل و items-start للشاشات الكبيرة
            className="flex flex-col items-center md:items-start text-center md:text-left mt-3"
        >
            <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]"
            >
                Frontend
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 ml-1">
                    Developer
                </span>
            </motion.h1>

            <motion.p
                variants={itemVariants}
                className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300  max-w-xl md:max-w-2xl leading-relaxed"
            >
                Hi, I&apos;m <span className="font-bold text-gray-900 dark:text-white">Ahmed Ehab</span>.
                I have <span className="text-blue-500 font-semibold">1.5 years</span> of professional experience as a
                <span className="font-semibold italic"> Frontend Developer</span> at
                <span className="text-blue-600 dark:text-blue-400"> OtherLogic</span>.

                <span className="block mt-4">
                    My core expertise lies in crafting <span className="font-medium text-gray-900 dark:text-white">Exceptional User Interfaces</span>,
                    while I expand my horizons by building end-to-end applications using
                    <span className="font-medium text-gray-900 dark:text-white"> Next.js, Node.js, and MongoDB</span>.
                </span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4 my-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Available for Projects
                </div>
            </motion.div>
        </motion.div>
    )
}
