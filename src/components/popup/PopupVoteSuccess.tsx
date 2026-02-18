import PopupOverlay from "@/components/popup/PopupOverlay";
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const PopupVoteSuccess = () => {

    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown === 0) {
            router.push("/").then();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, router]);

    return (
        <div>
            <PopupOverlay />
            <motion.div
                className="bg-neutral-darker fixed top-1/2 left-1/2 m-auto w-[30vw] overflow-y-scroll text-white text-center py-12 bg-neutral-dark border-6 rounded-4xl border-neutral-light"
                initial={{ translateY: "-50%", translateX: "-50%", scale: 0.8 }}
                whileInView={{ translateY: "-50%", translateX: "-50%", scale: 1.0 }}
                transition={{ duration: 0.2 }}
            >
                <h3 className="text-3xl font-bold">Vote Submitted</h3>
                <p className="text-2xl font-semibold mt-4 text-gray-400">
                    Returning in {countdown} second{countdown !== 1 ? "s" : ""}...
                </p>
            </motion.div>
        </div>
    );

}

export default PopupVoteSuccess;