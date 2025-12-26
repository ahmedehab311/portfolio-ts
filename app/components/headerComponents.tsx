import { motion } from "framer-motion";
interface HeaderComponentsProps {
    leftText: string;
    rightText: string;
    description: string;
}
export default function HeaderComponents({ leftText, rightText, description }: HeaderComponentsProps) {
    return (
        <div className="text-center mb-16">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
            >
                {leftText} <span className="text-gradient-blue-cyan">{rightText}</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }} // تأخير بسيط 0.2 ثانية
                className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
            >
                {description}
            </motion.p>
        </div>
    )
}
