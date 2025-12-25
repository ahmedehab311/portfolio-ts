"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Tag } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("تم إرسال رسالتك بنجاح!"); // ممكن تستخدم Toast هنا
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 italic">Get In <span className="text-blue-500">Touch</span></h2>
                    <p className="text-gray-400">Feel free to reach out for collaborations or just a friendly hello!</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="card-glass p-8 rounded-3xl border border-white/5">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Mail /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Me At</p>
                                    <p className="text-lg font-medium">ahmedehab.aa47@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all w-full"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all w-full"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all w-full"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Message"
                            rows={5}
                            className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all w-full resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}