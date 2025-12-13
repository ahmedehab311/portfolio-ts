import { TSkillsHero } from '@/types/heroSectionType';
import { FaFacebook, FaLinkedin, FaGithub, FaCode, FaLaptopCode, FaReact } from 'react-icons/fa';
export default function SocialIconsWithCV({ colors, isDark }: TSkillsHero) {

    const handleViewCV = () => {
        alert('سيتم تنزيل ملف الـ CV الخاص بـ أحمد إيهاب');
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-6">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${isDark ? 'dark-social' : 'light-social'} transition-all duration-300`}
                    aria-label="Facebook"
                >
                    <FaFacebook size={24} className={isDark ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-700"} />
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${isDark ? 'dark-social' : 'light-social'} transition-all duration-300`}
                    aria-label="LinkedIn"
                >
                    <FaLinkedin size={24} className={isDark ? "text-gray-300 hover:text-blue-700" : "text-gray-600 hover:text-blue-800"} />
                </a>
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${isDark ? 'dark-social' : 'light-social'} transition-all duration-300`}
                    aria-label="GitHub"
                >
                    <FaGithub size={24} className={isDark ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"} />
                </a>
            </div>

            <button
                onClick={handleViewCV}
                className="btn-primary-global"
            >
                <span>View CV</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </button>
        </div>
    )
}
