import {Game} from "@/types/model/Game";

export type BoxVoteProps = {
    className?: string;
    game: Game;
    stars: number;
    onChange: (stars: number) => void;
};