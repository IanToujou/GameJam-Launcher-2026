import { motion } from "framer-motion";

const PopupOverlay = () => {

    return (
        <motion.div initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-0 left-0 h-full w-full bg-black">
        </motion.div>
    );

}

export default PopupOverlay;