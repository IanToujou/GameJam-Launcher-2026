import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";
import { Game } from "@/types/model/Game";
import Cover1 from "@/public/assets/img/game_cover_1.jpg";
import Cover2 from "@/public/assets/img/game_cover_2.jpg";
import Cover3 from "@/public/assets/img/game_cover_3.jpg";
import InputButton from "@/components/input/InputButton";
import { Info, Space } from "lucide-react";
import InputControl from "@/components/input/InputControl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoxGame from "@/components/box/BoxGame";
import {router} from "next/client";

export default function Home() {

    const [launching, setLaunching] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<number>(-1);

    const games: Game[] = [
        {
            id: 1,
            name: "Awesome Game",
            description: "A cool game about something cool or so.",
            imageSrc: Cover1.src,
        },
        {
            id: 2,
            name: "Awesome Game 2",
            description: "A cool game about something cool or so.",
            imageSrc: Cover2.src,
        },
        {
            id: 3,
            name: "Awesome Game 3",
            description: "A cool game about something cool or so.",
            imageSrc: Cover3.src,
        },
    ];

    const launchGame = () => {
        if (launching) return;
        setLaunching(true);
        setTimeout(() => {
            router.reload();
        }, 1000);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (launching) return;
            const key = e.key.toLowerCase();

            if (key === "a") {
                setSelectedGame((prev) => {
                    if (prev <= 0) return 0;
                    return prev - 1;
                });
            } else if (key === "d") {
                setSelectedGame((prev) => {
                    if (prev >= games.length - 1) return games.length - 1;
                    if (prev === -1) return 0;
                    return prev + 1;
                });
            } else if (key === ' ' && selectedGame !== -1) {
                e.preventDefault();
                // todo implement
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [games.length]);

    return (
        <>
            <Head>
                <title>GameJam Launcher 2026</title>
            </Head>
            <div className="flex h-screen flex-col">
                <AnimatePresence mode="wait">
                    {selectedGame !== -1 && (
                        <motion.div
                            key={selectedGame}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -z-10 h-screen w-screen"
                        >
                            <Image
                                src={games[selectedGame].imageSrc}
                                alt="Game Background"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <HeaderBar />
                <div className="flex grow items-center justify-center gap-x-[6vw]">
                    <BoxGame
                        game={games[0]}
                        selected={selectedGame === 0}
                        launching={launching}
                        onMouseEnter={() => {
                            if (launching) return;
                            setSelectedGame(0);
                        }}
                        onMouseLeave={() => {
                            if (launching) return;
                            setSelectedGame(-1);
                        }}
                        onClick={() => launchGame()}
                    />
                    <BoxGame
                        game={games[1]}
                        selected={selectedGame === 1}
                        launching={launching}
                        onMouseEnter={() => {
                            if (launching) return;
                            setSelectedGame(1);
                        }}
                        onMouseLeave={() => {
                            if (launching) return;
                            setSelectedGame(-1);
                        }}
                        onClick={() => launchGame()}
                    />
                    <BoxGame
                        game={games[2]}
                        selected={selectedGame === 2}
                        launching={launching}
                        onMouseEnter={() => {
                            if (launching) return;
                            setSelectedGame(2);
                        }}
                        onMouseLeave={() => {
                            if (launching) return;
                            setSelectedGame(-1);
                        }}
                        onClick={() => launchGame()}
                    />
                </div>
                <div className="flex items-center px-16 py-12">
                    <div className="flex items-center gap-x-4">
                        <InputControl inputKey="A" />
                        <InputControl inputKey="D" />
                        <p className="ml-4 text-3xl font-bold text-white">Select</p>
                    </div>
                    <div className="ml-12 flex items-center gap-x-4">
                        <InputControl icon={Space} />
                        <p className="ml-4 text-3xl font-bold text-white">Play</p>
                    </div>
                    <div className="grow" />
                    <div className="flex items-center gap-x-8">
                        <InputButton icon={Info} />
                        <InputButton content="Start Voting" />
                    </div>
                </div>
            </div>
        </>
    );
}
