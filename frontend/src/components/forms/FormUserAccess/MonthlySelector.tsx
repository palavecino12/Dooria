import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";

interface props {
    selectedMonths: Date[];
    setSelectedMonths: React.Dispatch<React.SetStateAction<Date[]>>;
}

export const MonthlySelector = ({selectedMonths,setSelectedMonths}: props) => {

    return (
            <DayPicker navLayout="around" mode="multiple" selected={selectedMonths}
                onSelect={(days) => setSelectedMonths(days ?? [])} locale={es}
                classNames={{
                    day: "text-xl",
                    today: "text-black border border-black/20",
                    selected: "bg-[#2c2c28] text-white rounded-xl",
                    month_grid: "mt-11",
                    weekday: "text-xl",
                }}/>
    )
}
