interface ThemeToggleMobileProps {
    theme: string | undefined;
    setTheme: (theme: string) => void;
}
export default function ThemeToggleMobile({ theme, setTheme }: ThemeToggleMobileProps) {
    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg cursor-pointer"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    )
}
