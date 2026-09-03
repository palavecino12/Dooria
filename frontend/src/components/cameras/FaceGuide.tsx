interface FaceGuideProps {
    color: string;
}

export const FaceGuide = ({ color }: FaceGuideProps) => {
    return (
        <div className="absolute inset-0 pointer-events-none">

            {/* Superior izquierda */}
            <div
                className={`absolute top-15 left-15 h-10 w-10 border-t-[4px] border-l-[4px] 
                    rounded-tl-full opacity-55 ${color}`}/>

            {/* Superior derecha */}
            <div
                className={`absolute top-15 right-15 h-10 w-10 border-t-[4px] border-r-[4px]
                    rounded-tr-full opacity-55 ${color}`}
            />

            {/* Inferior izquierda */}
            <div
                className={`absolute bottom-15 left-15 h-10 w-10 border-b-[4px] border-l-[4px]
                    rounded-bl-full opacity-55 ${color}`}
            />

            {/* Inferior derecha */}
            <div
                className={`absolute bottom-15 right-15 h-10 w-10 border-b-[4px] border-r-[4px]
                    rounded-br-full opacity-55 ${color}`}
            />

        </div>
    );
};