import { BoxRatingProps } from "@/types/props/box/BoxRatingProps";

const BoxRating = (props: BoxRatingProps) => {

    const letters = [
        (<p className="text-gray-400">X</p>),
        (<p className="text-red-400">D</p>),
        (<p className="text-blue-400">C</p>),
        (<p className="text-purple-400">B</p>),
        (<p className="text-amber-400">A</p>),
        (<p className="text-blue-100">S</p>),
    ];

    return (
        <div className="flex h-[12vh] aspect-square text-8xl font-kanit font-bold italic items-center justify-center bg-neutral-dark border-6 border-neutral-light rounded-3xl">
            {letters[props.rating]}
        </div>
    );

}

export default BoxRating;