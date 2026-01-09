'use client'
export default function SkeletonLine({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-blue-500/10 dark:bg-blue-400/5 rounded-md ${className}`} />
    )
}
