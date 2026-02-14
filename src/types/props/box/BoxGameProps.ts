import { Game } from "@/types/model/Game";

export type BoxGameProps = {
    className?: string;
    game: Game;
    selected: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
