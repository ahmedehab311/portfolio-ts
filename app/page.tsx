"use client";
import { useTheme } from "next-themes";
import HeroSection from "./components/heroSection/heroSection";
import Header from "./components/partials/header/header";
import { useEffect, useState } from "react";
import MyProjects from "./components/projects/myProjects";

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div
        className={`bg-gradient-to-br  dark:from-gray-900 dark:via-blue-900  dark:to-gray-900  from-blue-50 via-blue-100 to-white px-4 md:px-8 lg:px-16 py-12 transition-all duration-300`}
        suppressHydrationWarning
      >
        <Header />
        <HeroSection />
        <MyProjects />
      </div>
    </>
  );
}