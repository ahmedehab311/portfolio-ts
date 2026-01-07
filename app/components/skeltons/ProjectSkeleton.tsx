export const ProjectSkeleton = () => (
    <div className="card-glass rounded-3xl overflow-hidden h-100 animate-pulse">
        <div className="h-48 bg-white/5" /> {/* مكان الصورة */}
        <div className="p-6 space-y-4">
            <div className="h-4 bg-white/10 rounded w-1/4" /> {/* التصنيف */}
            <div className="h-6 bg-white/10 rounded w-3/4" /> {/* العنوان */}
            <div className="h-4 bg-white/10 rounded w-full" /> {/* الوصف */}
            <div className="flex gap-2 pt-4">
                <div className="h-6 bg-white/10 rounded-full w-12" />
                <div className="h-6 bg-white/10 rounded-full w-12" />
            </div>
        </div>
    </div>
);