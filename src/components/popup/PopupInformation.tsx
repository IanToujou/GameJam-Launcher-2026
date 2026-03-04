import PopupOverlay from "@/components/popup/PopupOverlay";
import { motion } from "framer-motion";
import InputButton from "@/components/input/InputButton";
import {PopupProps} from "@/types/props/popup/PopupProps";

const PopupInformation = (props: PopupProps) => {

    return (
        <div className={props.className}>
            <PopupOverlay />
            <motion.div
                className="bg-neutral-darker fixed top-1/2 left-1/2 m-auto w-[30vw] overflow-y-scroll text-white text-center pt-10 pb-6 bg-neutral-dark border-6 rounded-4xl border-neutral-light"
                initial={{ translateY: "-50%", translateX: "-50%", scale: 0.8 }}
                whileInView={{ translateY: "-50%", translateX: "-50%", scale: 1.0 }}
                transition={{ duration: 0.2 }}
            >
                <h3 className="text-3xl font-bold">How does this work ?</h3>
                <div className="text-left text-2xl font-medium text-gray-400 px-10 mt-6 flex flex-col gap-y-2">
                    <p><span className="font-bold">1.</span> Play all three games</p>
                    <p><span className="font-bold">2.</span> Click "Start Voting"</p>
                    <p><span className="font-bold">3.</span> Rate the three games with stars</p>
                    <p><span className="font-bold">4.</span> Please vote only once! Have fun.</p>
                </div>
                <div className="max-w-[15vw] mx-auto mt-4">
                    <InputButton content="Confirm" onClick={props.onClose}/>
                </div>
            </motion.div>
        </div>
    );

}

export default PopupInformation;