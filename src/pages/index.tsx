import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";
import InputButton from "@/components/input/InputButton";
import { Info, Space } from "lucide-react";
import InputControl from "@/components/input/InputControl";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoxGame from "@/components/box/BoxGame";
import { router } from "next/client";
import GameList from "@/data/GameList";
import { Command } from "@tauri-apps/plugin-shell";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Popup from "reactjs-popup";
import PopupInformation from "@/components/popup/PopupInformation";
import {PopupActions} from "reactjs-popup/dist/types";

export default function HomePage() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    const [launching, setLaunching] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<number>(-1);

    const popupInfo = useRef<PopupActions|null>(null);
    const gameStartTimeRef = useRef<number | null>(null);

    async function focusAppWindow() {
        await getCurrentWindow().setFocus();
    }

    const launchGame = () => {
        if (selectedGame === -1) return;
        if (launching) return;
        setLaunching(true);
        console.log(
            "Launching game ID " + selectedGame + " (" + GameList[selectedGame].name + ").",
        );
        console.log(
            "Command: /bin/bash -c /home/event/Downloads/Games/" + GameList[selectedGame].path,
        );
        gameStartTimeRef.current = Date.now();
        setTimeout(() => {
            Command.create("launch-game", [
                "-c",
                "/home/event/Downloads/Games/" + GameList[selectedGame].path,
            ])
                .execute()
                .then((result) => {
                    console.log(result);
                    const timer = setTimeout(() => {
                        if (gameStartTimeRef.current) {
                            const playTime = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);
                            const existingPlayTime = sessionStorage.getItem('playTime');
                            const playTimeArray = existingPlayTime ? JSON.parse(existingPlayTime) : [0, 0, 0];
                            playTimeArray[selectedGame] = (playTimeArray[selectedGame] || 0) + playTime;
                            sessionStorage.setItem('playTime', JSON.stringify(playTimeArray));
                            gameStartTimeRef.current = null;
                        }
                        focusAppWindow().then();
                        router.reload();
                    }, 500);
                    return () => clearTimeout(timer);
                })
                .catch((error) => {
                    console.error(error);
                    router.reload();
                });
        }, 500);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (launching) return;
            setPressedKeys((prev) => new Set(prev).add(e.key.toLowerCase()));
            const key = e.key.toLowerCase();

            if (key === "a") {
                setSelectedGame((prev) => {
                    if (prev <= 0) return 0;
                    return prev - 1;
                });
            } else if (key === "d") {
                setSelectedGame((prev) => {
                    if (prev >= GameList.length - 1) return GameList.length - 1;
                    if (prev === -1) return 0;
                    return prev + 1;
                });
            } else if (key === " " && selectedGame !== -1) {
                e.preventDefault();
                const gameElement = document.querySelector(
                    `.game-box-${selectedGame}`,
                ) as HTMLElement;
                if (gameElement) {
                    gameElement.click();
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setPressedKeys((prev) => {
                const next = new Set(prev);
                next.delete(e.key.toLowerCase());
                return next;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [launching, selectedGame]);

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
                                src={GameList[selectedGame].imageSrc}
                                alt="Game Background"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <HeaderBar />
                <div className="flex grow items-center justify-center gap-x-[6vw]">
                    {GameList.map((game, index) => {
                        return (
                            <BoxGame
                                key={index}
                                game={GameList[index]}
                                selected={selectedGame === index}
                                launching={launching}
                                onMouseEnter={() => {
                                    if (launching) return;
                                    setSelectedGame(index);
                                }}
                                onMouseLeave={() => {
                                    if (launching) return;
                                    setSelectedGame(-1);
                                }}
                                onClick={() => launchGame()}
                                className={`game-box-${index}`}
                            />
                        );
                    })}
                </div>
                <div className="flex items-center px-16 py-12">
                    <div className="flex items-center gap-x-4">
                        <InputControl inputKey="A" pressed={pressedKeys.has("a")}/>
                        <InputControl inputKey="D" pressed={pressedKeys.has("d")}/>
                        <p className="ml-4 text-3xl font-bold text-white">Select</p>
                    </div>
                    <div className="ml-12 flex items-center gap-x-4">
                        <InputControl icon={Space} pressed={pressedKeys.has(" ")}/>
                        <p className="ml-4 text-3xl font-bold text-white">Play</p>
                    </div>
                    <div className="grow" />
                    <div className="flex items-center gap-x-8">
                        <Popup ref={popupInfo} arrow={false} closeOnEscape={true} closeOnDocumentClick={true} trigger={
                            <div>
                                <InputButton icon={Info} />
                            </div>
                        }>
                            <PopupInformation onClose={() => {
                                popupInfo.current?.close();
                            }}/>
                        </Popup>
                        <InputButton
                            content="Start Voting"
                            onClick={() => router.push("/vote").then()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
