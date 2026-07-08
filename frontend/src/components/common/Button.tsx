interface ButtonProps {
    variant?: "primario" | "secundario";
    onClick?: () => void;
    children: React.ReactNode;
}

export const Button = ({children,variant = "primario",onClick,}: ButtonProps) => {
    const baseStyles ="flex h-11 w-40 items-center justify-center rounded-lg text-lg font-medium shadow-lg transition-all duration-150 active:scale-95 select-none";

    const variants = {
        primario:"bg-black text-white hover:bg-neutral-900 active:bg-neutral-800 active:shadow-md",
        secundario:"bg-white border border-black text-black hover:bg-gray-100 active:bg-gray-200 active:shadow-md",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </button>
    );
};