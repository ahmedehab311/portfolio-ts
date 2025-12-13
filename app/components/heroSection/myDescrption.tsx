import useDescriptionHero from "@/hooks/useDescriptionHero";
import { TSkillsHeroColors } from "@/types/heroSectionType";
interface TDescrption {
    colors: TSkillsHeroColors;
}

export default function MyDescrption({ colors }: TDescrption) {
    const { data: descriptionData, isLoading, isError } = useDescriptionHero()
    console.log("descrptionData", descriptionData);

    return (
        <>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textPrimary} mb-6`}>
                Frontend <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Developer</span>
            </h1>

            {/* <p className={`text-lg md:text-xl ${colors.textSecondary} mb-8 max-w-2xl`}>
                Welcome to my corner of the web! I&apos;m <span className={`font-semibold ${colors.textPrimary}`}>Ahmed Ehab</span>, a passionate front-end developer with a talent for transforming ideas into captivating experiences. With a blend of creativity and technical expertise, I strive to design and build user-friendly interfaces that make a lasting impact.
            </p> */}
            {isLoading ? (
                <div className="space-y-1 max-w-2xl mb-8 ">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                </div>
            ) : (
                <p className={`text-lg md:text-xl ${colors.textSecondary} mb-8 max-w-2xl`}>
                    {descriptionData?.description}
                </p>
            )}
        </>
    )
}
