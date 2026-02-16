import Image from "next/image";
import { Play } from "lucide-react";
import { BoxGameProps } from "@/types/props/box/BoxGameProps";
import { useState } from "react";
import { motion } from "framer-motion";

const BoxGame = (props: BoxGameProps) => {
    const [isLaunching, setIsLaunching] = useState(false);

    const handleClick = () => {
        if (props.launching) return;
        setIsLaunching(true);
        props.onClick();
    };

    const isDisabled = props.launching && !isLaunching;

    return (
        <div
            onClick={handleClick}
            onMouseEnter={isDisabled ? undefined : props.onMouseEnter}
            onMouseLeave={isDisabled ? undefined : props.onMouseLeave}
            className={`${props.className} bg-neutral-dark border-neutral-light ring-primary-medium group flex flex-col rounded-4xl border-8 p-5 ring-0 transition-all duration-200 ${
                props.selected && !isDisabled ? "ring-8" : ""
            } ${isDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
        >
            <div className="relative flex h-[34vh] w-[34vh] items-center justify-center overflow-hidden rounded-3xl">
                {isLaunching && (
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-primary-medium absolute inset-0 z-20 rounded-full"
                    />
                )}
                <motion.div
                    animate={
                        isLaunching
                            ? { scale: 1.5, opacity: 0 }
                            : props.selected && !isDisabled
                              ? { scale: 1, opacity: 1 }
                              : { scale: 1.5, opacity: 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="border-neutral-light bg-neutral-dark text-primary-medium absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 p-6"
                >
                    <Play size={52} strokeWidth={2.5} />
                </motion.div>
                <motion.div
                    animate={isLaunching ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-full w-full"
                >
                    <Image
                        src={props.game.imageSrc}
                        alt="Game Cover"
                        fill
                        className="rounded-3xl object-cover"
                    />
                </motion.div>
            </div>
            <h5 className="mx-2 mt-4 max-w-[32vh] text-left text-3xl font-bold text-white uppercase italic">
                {props.game.name}
            </h5>
            <p
                className={`mx-2 max-w-[32vh] overflow-hidden text-xl text-gray-400 transition-all duration-200 ${
                    props.selected && !isDisabled ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {props.game.description}
            </p>
        </div>
    );
};

export default BoxGame;
