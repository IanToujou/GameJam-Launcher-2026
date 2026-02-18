import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";
import InputControl from "@/components/input/InputControl";
import InputButton from "@/components/input/InputButton";
import { router } from "next/client";
import BoxVote from "@/components/box/BoxVote";
import { Game } from "@/types/model/Game";
import { Vote } from "@/types/model/Vote";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GameList from "@/data/GameList";
import {BaseDirectory, readTextFile, writeTextFile} from "@tauri-apps/plugin-fs";

export default function VotePage() {
    const VOTES_FILE = "votes.jsonl";

    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    const [exitHover, setExitHover] = useState(false);
    const [stars, setStars] = useState<number[]>([0, 0, 0]);
    const [selectedGame, setSelectedGame] = useState<number>(-1);
    const [showCountdown, setShowCountdown] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(5);

    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

    const submitVote = async () => {
        if (stars.some((star) => star === 0)) return;
        const entry: Vote = {
            timestamp: new Date().toISOString(),
            sessionId: crypto.randomUUID(),
            stars,
        };
        const line = JSON.stringify(entry) + '\n';
        let existing = '';
        try {
            existing = await readTextFile(VOTES_FILE, { baseDir: BaseDirectory.AppData });
        } catch {}
        await writeTextFile(VOTES_FILE, existing + line, {
            baseDir: BaseDirectory.AppData,
        });
    };

    const startInactivityTimer = useCallback(() => {
        inactivityTimerRef.current = setTimeout(() => {
            setShowCountdown(true);
            let timeLeft = 5;
            setCountdown(timeLeft);
            countdownTimerRef.current = setInterval(() => {
                timeLeft -= 1;
                setCountdown(timeLeft);
                if (timeLeft <= 0) {
                    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
                    router.push("/").then();
                }
            }, 1000);
        }, 5000);
    }, []);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        setShowCountdown(false);
        setCountdown(5);
        startInactivityTimer();
    }, [startInactivityTimer]);

    useEffect(() => {
        startInactivityTimer();
        return () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        };
    }, [startInactivityTimer]);

    useEffect(() => {
        const handleMouseMove = () => {
            resetInactivityTimer();
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [resetInactivityTimer]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            setPressedKeys((prev) => new Set(prev).add(e.key.toLowerCase()));

            resetInactivityTimer();
            if (key === "w") {
                setSelectedGame((prev) => {
                    if (prev <= 0) return 0;
                    return prev - 1;
                });
            } else if (key === "s") {
                setSelectedGame((prev) => {
                    if (prev >= GameList.length - 1) return GameList.length - 1;
                    if (prev === -1) return 0;
                    return prev + 1;
                });
            } else if (key === "a") {
                setStars((prev) => {
                    if (prev[selectedGame] <= 1) return prev;
                    const newStars = [...prev];
                    newStars[selectedGame] -= 1;
                    return newStars;
                });
            } else if (key === "d") {
                setStars((prev) => {
                    if (prev[selectedGame] >= 5) return prev;
                    const newStars = [...prev];
                    newStars[selectedGame] += 1;
                    return newStars;
                });
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
    }, [selectedGame, resetInactivityTimer]);

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
                <div className="flex grow flex-col items-center justify-center gap-y-14">
                    {GameList.map((game: Game, index: number) => {
                        return (
                            <BoxVote
                                key={index}
                                game={GameList[index]}
                                selected={selectedGame === index}
                                onMouseEnter={() => setSelectedGame(index)}
                                onMouseLeave={() => setSelectedGame(-1)}
                                stars={stars[index]}
                                onChange={(stars: number) => {
                                    setStars((prev) => {
                                        prev[index] = stars;
                                        return [...prev];
                                    });
                                }}
                            />
                        );
                    })}
                </div>
                <div className="flex items-center px-16 py-12">
                    <div className="flex items-center gap-x-4">
                        <InputControl inputKey="W" pressed={pressedKeys.has("w")}/>
                        <InputControl inputKey="S" pressed={pressedKeys.has("s")}/>
                        <p className="ml-4 text-3xl font-bold text-white">Select</p>
                    </div>
                    <div className="ml-12 flex items-center gap-x-4">
                        <InputControl inputKey="A" pressed={pressedKeys.has("a")}/>
                        <InputControl inputKey="D" pressed={pressedKeys.has("d")}/>
                        <p className="ml-4 text-3xl font-bold text-white">Adjust</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <InputButton content="Submit Vote"
                                     disabled={stars.some((star) => star === 0)}
                                     onClick={() => submitVote().then(() => {
                                        router.push("/").then();
                                     })}
                        />
                    </div>
                    <div className="grow" />
                    <div className="flex items-center gap-x-8">
                        <div className="text-right font-bold">
                            <p className="text-xl text-white">Back to Home</p>
                            {showCountdown && (
                                <p className="text-lg text-gray-400">
                                    Returning in {countdown} second{countdown !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                        <div
                            className="cursor-pointer rounded-full p-1 transition-all duration-200"
                            onClick={() => router.push("/").then()}
                            onMouseEnter={() => setExitHover(true)}
                            onMouseLeave={() => setExitHover(false)}
                        >
                            <svg
                                width="127"
                                height="74"
                                viewBox="0 0 127 74"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.5778 66.5984L6.1001 10.5984C5.0439 6.77695 7.89624 3 11.861 3H89.9133C134.738 3 135.983 71 89.9133 71H27.3448C24.6467 71 22.2966 69.199 21.5778 66.5984Z"
                                    fill={exitHover ? "#090909" : "#FF2626"}
                                    style={{ transition: "fill 200ms ease" }}
                                />
                                <path
                                    d="M7.81348 3H90.9248C101.931 3 110.078 7.26006 115.531 13.5312C121.036 19.8617 123.921 28.3953 123.998 37.0264C124.075 45.6574 121.342 54.169 115.895 60.4766C110.5 66.7221 102.285 71 90.9248 71H24.4766C23.1284 71 21.9483 70.0973 21.5938 68.7783L4.92871 6.77832C4.4143 4.86366 5.84921 3 7.81348 3Z"
                                    fill={exitHover ? "#FF2626" : "#090909"}
                                    stroke={exitHover ? "#090909" : "#FF2626"}
                                    style={{ transition: "fill 200ms ease, stroke 200ms ease" }}
                                    strokeWidth="6"
                                />
                                <path
                                    d="M43 29.5L55.5 42M43 29.5L55.5 17M43 29.5H70.5C91 29.5 91 54 70.5 54"
                                    stroke={exitHover ? "#090909" : "#FF2626"}
                                    style={{ transition: "stroke 200ms ease" }}
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
