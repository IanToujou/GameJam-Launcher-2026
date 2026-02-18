import { InputControlProps } from "@/types/props/input/InputControlProps";

const InputControl = (props: InputControlProps) => {
    if (props.icon) {
        return (
            <div style={{backgroundColor: props.pressed ? "#f0e907" : "#090909", color: props.pressed ? "#090909" : "#f0e907"}}
                 className="border-neutral-light flex size-18 items-center justify-center rounded-full border-6">
                <p className="text-3xl font-bold">
                    <props.icon size={36} strokeWidth={2.5} className="text-3xl" />
                </p>
            </div>
        );
    } else {
        return (
            <div style={{backgroundColor: props.pressed ? "#f0e907" : "#090909", color: props.pressed ? "#090909" : "#f0e907"}}
                 className="border-neutral-light flex size-18 items-center justify-center rounded-full border-6">
                <p className="text-3xl font-bold italic">{props.inputKey}</p>
            </div>
        );
    }
};

export default InputControl;
