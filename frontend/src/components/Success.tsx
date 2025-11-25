import { Check } from "lucide-react"

export const Success = () =>{
    return(
        <div className="h-screen flex justify-center items-center">
            <div className="bg-green-700  text-white rounded-full p-10">
                <Check size={100} strokeWidth={3} />
            </div>
        </div>
    )
}