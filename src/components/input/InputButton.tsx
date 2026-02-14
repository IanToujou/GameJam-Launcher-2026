import {InputButtonProps} from "@/types/props/button/InputButtonProps";

const InputButton = (props: InputButtonProps) => {

    return (
        <div className="flex items-center justify-center size-18 bg-neutral-dark border-6 border-neutral-light rounded-full">
            <p className="text-3xl text-primary-medium font-bold italic">A</p>
        </div>
    );

}

export default InputButton;