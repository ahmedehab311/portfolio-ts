export default function Logo() {
    return (
        <div className="relative w-12 h-12 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-xl">a</div>
        </div>
    );
}