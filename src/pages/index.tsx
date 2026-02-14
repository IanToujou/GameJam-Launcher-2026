import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";
import BoxGame from "@/components/box/BoxGame";
import {Game} from "@/types/model/Game";
import Cover1 from "@/public/assets/img/game_cover_1.jpg";
import Cover2 from "@/public/assets/img/game_cover_2.jpg";
import Cover3 from "@/public/assets/img/game_cover_3.jpg";
import InputButton from "@/components/input/InputButton";

export default function Home() {

    const games: Game[] = [
        {
            id: -1,
            name: "Awesome Game",
            description: "A cool game about something cool or so.",
            imageSrc: Cover1.src
        },
        {
            id: -1,
            name: "Awesome Game 2",
            description: "A cool game about something cool or so.",
            imageSrc: Cover2.src
        },
        {
            id: -1,
            name: "Awesome Game 3",
            description: "A cool game about something cool or so.",
            imageSrc: Cover3.src
        }
    ];

    return (
        <>
            <Head>
                <title>GameJam Launcher 2026</title>
            </Head>
            <div className="flex flex-col h-screen">
                <HeaderBar/>
                <div className="flex grow gap-x-[6vw] items-center justify-center">
                    <BoxGame game={games[0]}/>
                    <BoxGame game={games[1]}/>
                    <BoxGame game={games[2]}/>
                </div>
                <div className="flex items-center py-8 px-16">
                    <div className="flex items-center gap-x-4">
                        <InputButton/>
                        <InputButton/>
                        <p className="text-white font-bold text-2xl">Select</p>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <InputButton/>
                        <p className="text-white font-bold text-2xl">Play</p>
                    </div>
                    <div className="grow"/>
                    <div className="flex items-center gap-x-4">
                        <InputButton/>
                        <InputButton/>
                    </div>
                </div>
            </div>
        </>
    );

}
