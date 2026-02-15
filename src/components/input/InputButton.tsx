import { InputButtonProps } from "@/types/props/input/InputButtonProps";

const InputButton = (props: InputButtonProps) => {
    if (props.icon) {
        return (
            <div onClick={() => {
                if (props.onClick !== undefined) props.onClick();
            }} className="bg-neutral-dark border-neutral-light ring-primary-medium cursor-pointer flex size-18 items-center justify-center rounded-full border-6 ring-0 duration-200 hover:ring-6">
                <p className="text-3xl font-bold text-white italic">
                    <props.icon size={36} strokeWidth={2.5} className="text-3xl" />
                </p>
            </div>
        );
    } else {
        return (
            <div onClick={() => {
                if (props.onClick !== undefined) props.onClick();
            }} className="bg-neutral-dark border-neutral-light ring-primary-medium flex h-18 cursor-pointer items-center justify-center rounded-full border-6 px-10 ring-0 duration-200 hover:ring-6">
                <p className="text-3xl font-extrabold text-white italic">{props.content}</p>
            </div>
        );
    }
};

export default InputButton;
