import {InputButtonProps} from "@/types/props/input/InputButtonProps";

const InputButton = (props: InputButtonProps) => {

    if (props.icon) {

        return (
            <div className="flex items-center justify-center size-18 bg-neutral-dark border-6 border-neutral-light rounded-full duration-200 hover:ring-6 ring-0 ring-primary-medium cursor-pointer]">
                <p className="text-3xl text-white font-bold italic">
                    <props.icon size={36} strokeWidth={2.5} className="text-3xl"/>
                </p>
            </div>
        );

    } else {

        return (
            <div className="flex items-center justify-center h-18 px-10 bg-neutral-dark border-6 border-neutral-light rounded-full duration-200 hover:ring-6 ring-0 ring-primary-medium cursor-pointer">
                <p className="text-3xl font-extrabold italic text-white">{props.content}</p>
            </div>
        );

    }

}

export default InputButton;