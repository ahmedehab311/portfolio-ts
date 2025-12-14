
import { TSkillsHeroColors } from "@/types/heroSectionType";
interface TDescrption {
    colors: TSkillsHeroColors;
}

export default function MyDescrption({ colors }: TDescrption) {
  
    return (
        <>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textPrimary} mb-6`}>
                Frontend <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Developer</span>
            </h1>

            <p className={`text-lg md:text-xl ${colors.textSecondary} mb-8 max-w-2xl`}>
                Welcome to my corner of the web! I&apos;m <span className={`font-semibold ${colors.textPrimary}`}>Ahmed Ehab</span>, a passionate front-end developer with a talent for transforming ideas into captivating experiences. With a blend of creativity and technical expertise, I strive to design and build user-friendly interfaces that make a lasting impact.
            </p>
        </>
    )
}
