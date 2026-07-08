type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    return (
        <header className="w-full bg-black px-4 py-5 shadow-xl">
            <h2 className="flex items-center justify-center text-lg font-semibold text-white select-none">
                {title}
            </h2>
        </header>
    );
};