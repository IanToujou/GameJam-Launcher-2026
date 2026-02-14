import { Game } from "@/types/model/Game";

export type BoxGameProps = {
    className?: string;
    game: Game;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
