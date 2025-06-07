'use client';
import { motion } from "framer-motion";

export default function InitialMessage() {
    return (
        <>
            <motion.div
                className="text-3xl font-extrabold text-orange-400 text-center mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Welcome to Project C3
            </motion.div>
            <motion.div
                className="text-2xl font-bold text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Are you confused about choosing a{" "}
                <span className="text-orange-400">career path</span> that feels just
                right for you?
            </motion.div>
            <motion.div
                className="text-xl text-gray-300 text-center italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                You came to the right place!! You are just one {" "}
                <span className="text-orange-400">chat</span> away from your
                dream life!!
            </motion.div>
        </>
    );
}
