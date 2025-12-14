'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface LoadingProps {
    size?: number;
    text?: string;
}

export default function Loading({ size = 12, text }: LoadingProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const bgColor = theme === "dark" ? "bg-black" : "bg-white";
    const borderColor = theme === "dark" ? "border-cyan-400" : "border-blue-500";
    const textColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

    useEffect(() => {
        setMounted(true);
    }, []);






}
