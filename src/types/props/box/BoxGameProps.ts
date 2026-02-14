import { Game } from "@/types/model/Game";

export type BoxGameProps = {
    className?: string;
    game: Game;
    selected: boolean;
    launching: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
};
