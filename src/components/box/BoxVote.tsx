import { BoxVoteProps } from "@/types/props/box/BoxVoteProps";
import Image from "next/image";
import InputStars from "@/components/input/InputStars";
import BoxRating from "@/components/box/BoxRating";

const BoxVote = (props: BoxVoteProps) => {

    return (
        <div className={"w-[55vw] h-[17vh] rounded-4xl bg-neutral-dark border-6 border-neutral-light flex justify-between items-center p-4 " + props.className}>
            <div className="flex gap-x-6 items-center h-full w-[45%]">
                <div className="h-full aspect-square rounded-3xl relative">
                    <Image src={props.game.imageSrc} alt="Game Cover" fill className="object-cover rounded-3xl" />
                </div>
                <div>
                    <h3 className="font-bold italic text-2xl text-white uppercase">{props.game.name}</h3>
                    <p className="text-gray-400 text-lg mt-3 leading-6">{props.game.description}</p>
                </div>
            </div>
            <BoxRating rating={props.stars} />
            <InputStars onChange={(votes: number) => {
                props.onChange(votes);
            }} stars={props.stars} className="mr-6" />
        </div>
    );

}

export default BoxVote;