export default function ProjectCardSkeleton() {
    return (
        <div className="card-glass rounded-xl overflow-hidden animate-pulse">
            <div className="h-48 md:h-56 bg-gray-200 dark:bg-gray-700" />

            <div className="p-5 md:p-6 space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />

                <div className="flex justify-between pt-4">
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    )
}
