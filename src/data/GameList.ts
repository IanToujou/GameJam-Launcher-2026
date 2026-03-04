import { Game } from "@/types/model/Game";
import Cover1 from "@/public/assets/img/game_cover_1.jpg";
import Cover2 from "@/public/assets/img/game_cover_2.jpg";
import Cover3 from "@/public/assets/img/game_cover_3.jpg";

const GameList: Game[] = [
    {
        id: 1,
        name: "Antventure",
        description: "Play as a young ant to survive. Will you reach adulthood?",
        imageSrc: Cover1.src,
        path: "AntVenture/Antventure.x86_64",
    },
    {
        id: 2,
        name: "Dice Crawler",
        description: "A randomly generated RPG dungeon adventure.",
        imageSrc: Cover2.src,
        path: "DiceCrawler/DiceCrawler.x86_64",
    },
    {
        id: 3,
        name: "Save The PC",
        description: "Action game in a digital universe inside a computer.",
        imageSrc: Cover3.src,
        path: "SaveThePC/SaveThePC.x86_64",
    },
];

export default GameList;
