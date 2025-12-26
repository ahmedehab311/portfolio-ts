"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Tag, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";
export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const sendRequest = fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).then(async (res) => {
            if (!res.ok) throw new Error("Failed to send");

            // لو كله تمام، صفر الفورم
            setFormData({ name: "", email: "", subject: "", message: "" });
            return res;
        });

        // 3. عرض الأشكال المختلفة للتوست بناءً على حالة الـ Promise
        toast.promise(sendRequest, {
            loading: 'Sending your message...',
            success: <b>Message sent successfully! 🚀</b>,
            error: <b>Could not send message. 😞</b>,
        });

        try {
            await sendRequest;
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        Get In <span className="text-blue-500 italic">Touch</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
                        Have a project in mind? Looking to hire? Or just want to say hi? My inbox is always open.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">

                    {/* Left Side: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="card-glass p-8 rounded-[2rem] border border-white/5 space-y-8">
                            <h3 className="text-2xl font-bold text-white">Contact Information</h3>

                            <div className="space-y-6">
                                {/* Email Item */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Email Me</p>
                                        <p className="text-sm md:text-lg font-medium text-gray-200 break-all">
                                            ahmedehab.aa47@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Call / WhatsApp</p>
                                        <p className="text-sm md:text-lg font-medium text-gray-200">
                                            +20 01014097665 {/* حط رقمك هنا */}
                                        </p>
                                    </div>
                                </div>
                                {/* Location or Other Info (Optional) */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Location</p>
                                        <p className="text-sm md:text-lg font-medium text-gray-200">Giza, Egypt</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Responsive Input Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-full text-white placeholder:text-gray-600"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-full text-white placeholder:text-gray-600"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Subject"
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-full text-white placeholder:text-gray-600"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />

                            <textarea
                                placeholder="Your Message"
                                rows={5}
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all w-full resize-none text-white placeholder:text-gray-600"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />

                            <button
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}