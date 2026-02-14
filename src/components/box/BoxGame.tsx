import Image from "next/image";
import { GameProps } from "@/types/props/type/GameProps";
import {Play} from "lucide-react";

const BoxGame = (props: GameProps) => {

    return (
        <div className="bg-neutral-dark rounded-4xl border-8 border-neutral-light flex flex-col p-5 hover:ring-8 ring-0 duration-200 ring-primary-medium cursor-pointer group transition-all">
            <div className="relative h-[34vh] w-[34vh] flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 scale-[150%] group-hover:scale-100 duration-200 absolute top-1/2 left-1/2 -translate-1/2 z-10 rounded-full border-4 border-neutral-light bg-neutral-dark text-primary-medium p-6">
                    <Play size={52} strokeWidth={2.5}/>
                </div>
                <Image src={props.game.imageSrc} alt="Game Cover" fill className="object-cover rounded-3xl"/>
            </div>
            <h5 className="text-white font-bold italic text-3xl text-left max-w-[32vh] mt-4 uppercase mx-2">{props.game.name}</h5>
            <p className="text-gray-400 text-xl mx-2 max-w-[32vh] transition-all duration-200 group-hover:max-h-20 group-hover:opacity-100 max-h-0 opacity-0 overflow-hidden">{props.game.description}</p>
        </div>
    );

}

export default BoxGame;