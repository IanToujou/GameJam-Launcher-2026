import { Game } from "@/types/model/Game";
import Cover1 from "@/public/assets/img/game_cover_1.jpg";
import Cover2 from "@/public/assets/img/game_cover_2.jpg";
import Cover3 from "@/public/assets/img/game_cover_3.jpg";

const GameList: Game[] = [
    {
        id: 1,
        name: "Awesome Game",
        description: "A cool game about something cool or so.",
        imageSrc: Cover1.src,
        path: "TestGame/FT_TwinTowers.x86_64",
    },
    {
        id: 2,
        name: "Awesome Game 2",
        description: "A cool game about something cool or so.",
        imageSrc: Cover2.src,
        path: "TestGame/FT_TwinTowers.x86_64",
    },
    {
        id: 3,
        name: "Awesome Game 3",
        description: "A cool game about something cool or so.",
        imageSrc: Cover3.src,
        path: "TestGame/FT_TwinTowers.x86_64",
    },
];

export default GameList;
