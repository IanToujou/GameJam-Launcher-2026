import { Game } from "@/types/model/Game";

export type BoxVoteProps = {
    className?: string;
    game: Game;
    stars: number;
    selected: boolean;
    onChange: (stars: number) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
