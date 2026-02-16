import { BoxVoteProps } from "@/types/props/box/BoxVoteProps";
import Image from "next/image";
import InputStars from "@/components/input/InputStars";
import BoxRating from "@/components/box/BoxRating";

const BoxVote = (props: BoxVoteProps) => {
    return (
        <div
            onMouseEnter={() => props.onMouseEnter()}
            onMouseLeave={() => props.onMouseLeave()}
            className={
                "bg-neutral-dark border-neutral-light ring-primary-medium flex h-[17vh] w-[55vw] items-center justify-between rounded-4xl border-6 p-4 ring-0 duration-200 " +
                (props.selected && "ring-8") +
                " " +
                props.className
            }
        >
            <div className="flex h-full w-[45%] items-center gap-x-6">
                <div className="relative aspect-square h-full rounded-3xl">
                    <Image
                        src={props.game.imageSrc}
                        alt="Game Cover"
                        fill
                        className="rounded-3xl object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white uppercase italic">
                        {props.game.name}
                    </h3>
                    <p className="mt-3 text-lg leading-6 text-gray-400">{props.game.description}</p>
                </div>
            </div>
            <BoxRating rating={props.stars} />
            <InputStars
                onChange={(votes: number) => {
                    props.onChange(votes);
                }}
                stars={props.stars}
                className="mr-6"
            />
        </div>
    );
};

export default BoxVote;
