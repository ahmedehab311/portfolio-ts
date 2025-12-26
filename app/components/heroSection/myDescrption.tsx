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
        // <motion.div
        //     variants={containerVariants}
        //     initial="hidden"
        //     animate="visible"
        // >
        //     {/* العنوان الرئيسي */}
        //     <motion.h1
        //         variants={itemVariants}
        //         className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
        //     >
        //         Full Stack <br className="md:hidden" />
        //         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
        //             Developer
        //         </span>
        //     </motion.h1>

        //     {/* الوصف المعدل */}
        //     <motion.p
        //         variants={itemVariants}
        //         className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed"
        //     >
        //         Hi, I&apos;m <span className="font-bold text-gray-900 dark:text-white border-b-2 border-blue-500/30">Ahmed Ehab</span>.
        //         With over <span className="text-blue-500 font-semibold">1.5 years</span> of professional experience at
        //         <span className="italic"> OtherLogic</span>, I specialize in building high-performance
        //         web applications.
        //         <br className="hidden md:block" /><br className="hidden md:block" />
        //         While my heart belongs to <span className="font-medium text-gray-900 dark:text-white">Frontend Excellence</span>,
        //         I bridge the gap between design and logic by crafting scalable <span className="font-medium text-gray-900 dark:text-white">Full-stack solutions</span> with MongoDB and Node.js.
        //     </motion.p>

        //     {/* أزرار سريعة (Optional) لزيادة التفاعل */}
        //     <motion.div variants={itemVariants} className="flex gap-4">
        //         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-medium">
        //             <span className="relative flex h-2 w-2">
        //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        //                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        //             </span>
        //             Available for Projects
        //         </div>
        //     </motion.div>
        // </motion.div>



        // <motion.div
        //     variants={containerVariants}
        //     initial="hidden"
        //     animate="visible"
        //     className="flex flex-col items-start"
        // >
        //     <motion.h1
        //         variants={itemVariants}
        //         className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
        //     >
        //         Frontend <br className="hidden md:block" />
        //         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
        //             Developer
        //         </span>
        //     </motion.h1>

        //     <motion.p
        //         variants={itemVariants}
        //         className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed"
        //     >
        //         Hi, I&apos;m <span className="font-bold text-gray-900 dark:text-white">Ahmed Ehab</span>.
        //         I have <span className="text-blue-500 font-semibold">1.5 years</span> of professional experience as a
        //         <span className="font-semibold italic"> Frontend Developer</span> at
        //         <span className="text-blue-600 dark:text-blue-400"> OtherLogic</span>.
        //         <br /><br />
        //         My core expertise lies in crafting <span className="font-medium text-gray-900 dark:text-white">Exceptional User Interfaces</span>,
        //         while I expand my horizons by building end-to-end applications using
        //         <span className="font-medium text-gray-900 dark:text-white"> Next.js, Node.js, and MongoDB</span>.
        //     </motion.p>

        //     <motion.div variants={itemVariants} className="flex gap-4 mb-4">
        //         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-medium">
        //             <span className="relative flex h-2 w-2">
        //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        //                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        //             </span>
        //             Available for Projects
        //         </div>
        //     </motion.div>
        // </motion.div>


        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // نغير items-start لـ items-center في الموبايل عشان يبقى التصميم متناسق، وبداية من md يرجع items-start
            className="flex flex-col items-start "
        >
            {/* العنوان: عدلنا الـ Leading والـ Sizes */}
            <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1]"
            >
                Frontend <br className="hidden sm:block" /> {/* الـ break يظهر فقط من أول الشاشات الـ small */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                    Developer
                </span>
            </motion.h1>

            {/* الوصف: تقليل الـ max-w وتعديل الـ Font size */}
            <motion.p
                variants={itemVariants}
                className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl md:max-w-2xl leading-relaxed"
            >
                Hi, I&apos;m <span className="font-bold text-gray-900 dark:text-white">Ahmed Ehab</span>.
                I have <span className="text-blue-500 font-semibold">1.5 years</span> of professional experience as a
                <span className="font-semibold italic"> Frontend Developer</span> at
                <span className="text-blue-600 dark:text-blue-400"> OtherLogic</span>.

                {/* نستخدم margin بدل br br عشان الـ spacing يبقى أدق */}
                <span className="block mt-4">
                    My core expertise lies in crafting <span className="font-medium text-gray-900 dark:text-white">Exceptional User Interfaces</span>,
                    while I expand my horizons by building end-to-end applications using
                    <span className="font-medium text-gray-900 dark:text-white"> Next.js, Node.js, and MongoDB</span>.
                </span>
            </motion.p>

            {/* Badge الحالة الحالية */}
            <motion.div variants={itemVariants} className="flex gap-4 mb-4">
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
