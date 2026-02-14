import {InputControlProps} from "@/types/props/input/InputControlProps";

const InputControl = (props: InputControlProps) => {

    if (props.icon) {
        return (
            <div className="flex items-center justify-center size-18 bg-neutral-dark border-6 border-neutral-light rounded-full">
                <p className="text-3xl text-primary-medium font-bold">
                    <props.icon size={36} strokeWidth={2.5} className="text-3xl"/>
                </p>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center size-18 bg-neutral-dark border-6 border-neutral-light rounded-full">
                <p className="text-3xl text-primary-medium font-bold italic">{props.inputKey}</p>
            </div>
        );
    }

}

export default InputControl;