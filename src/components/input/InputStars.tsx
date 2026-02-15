import {Star} from "lucide-react";
import { InputStarsProps } from "@/types/props/input/InputStarsProps";

const InputStars = (props: InputStarsProps) => {

    return (
        <div className={"bg-neutral-dark border-neutral-light flex gap-x-1 h-22 items-center justify-center rounded-full border-6 px-6 " + props.className}>
            {Array.from({length: 5}).map((_, i: number) => {
                return (
                    <Star key={i} size={48} strokeWidth={2}
                          className="text-3xl hover:scale-110 duration-200 cursor-pointer" onClick={() => props.onChange(i+1)}
                          style={{color: i < props.stars ? "#f0e907" : "white", fill: i < props.stars ? "currentColor" : "none"}}
                    />
                );
            })}
        </div>
    );

};

export default InputStars;