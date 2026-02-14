import Image from "next/image";
import { Play } from "lucide-react";
import { BoxGameProps } from "@/types/props/box/BoxGameProps";

const BoxGame = (props: BoxGameProps) => {

    return (
        <div
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            className={`bg-neutral-dark border-neutral-light ring-primary-medium group flex cursor-pointer flex-col rounded-4xl border-8 p-5 ring-0 transition-all duration-200 ${
                props.selected ? 'ring-8' : ''
            }`}
        >
            <div className="relative flex h-[34vh] w-[34vh] items-center justify-center">
                <div className={`border-neutral-light bg-neutral-dark text-primary-medium absolute top-1/2 left-1/2 z-10 -translate-1/2 rounded-full border-4 p-6 duration-200 ${
                    props.selected ? 'scale-100 opacity-100' : 'scale-[150%] opacity-0'
                }`}>
                    <Play size={52} strokeWidth={2.5} />
                </div>
                <Image
                    src={props.game.imageSrc}
                    alt="Game Cover"
                    fill
                    className="rounded-3xl object-cover"
                />
            </div>
            <h5 className="mx-2 mt-4 max-w-[32vh] text-left text-3xl font-bold text-white uppercase italic">
                {props.game.name}
            </h5>
            <p className={`mx-2 max-w-[32vh] overflow-hidden text-xl text-gray-400 transition-all duration-200 ${
                props.selected ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                {props.game.description}
            </p>
        </div>
    );
};

export default BoxGame;