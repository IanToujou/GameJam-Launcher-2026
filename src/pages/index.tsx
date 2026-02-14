import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";
import BoxGame from "@/components/box/BoxGame";
import { Game } from "@/types/model/Game";
import Cover1 from "@/public/assets/img/game_cover_1.jpg";
import Cover2 from "@/public/assets/img/game_cover_2.jpg";
import Cover3 from "@/public/assets/img/game_cover_3.jpg";
import InputButton from "@/components/input/InputButton";
import { Info, Space } from "lucide-react";
import InputControl from "@/components/input/InputControl";

export default function Home() {
    const games: Game[] = [
        {
            id: -1,
            name: "Awesome Game",
            description: "A cool game about something cool or so.",
            imageSrc: Cover1.src,
        },
        {
            id: -1,
            name: "Awesome Game 2",
            description: "A cool game about something cool or so.",
            imageSrc: Cover2.src,
        },
        {
            id: -1,
            name: "Awesome Game 3",
            description: "A cool game about something cool or so.",
            imageSrc: Cover3.src,
        },
    ];

    return (
        <>
            <Head>
                <title>GameJam Launcher 2026</title>
            </Head>
            <div className="flex h-screen flex-col">
                <HeaderBar />
                <div className="flex grow items-center justify-center gap-x-[6vw]">
                    <BoxGame game={games[0]} />
                    <BoxGame game={games[1]} />
                    <BoxGame game={games[2]} />
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
