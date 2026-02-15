import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";
import InputControl from "@/components/input/InputControl";
import InputButton from "@/components/input/InputButton";
import {router} from "next/client";

export default function Vote() {

    return (
        <>
            <Head>
                <title>GameJam Launcher 2026</title>
            </Head>
            <div className="flex flex-col h-screen">
                <HeaderBar />
                <div className="flex flex-col items-center justify-center grow">

                </div>
                <div className="flex items-center px-16 py-12">
                    <div className="flex items-center gap-x-4">
                        <InputControl inputKey="W" />
                        <InputControl inputKey="S" />
                        <p className="ml-4 text-3xl font-bold text-white">Select</p>
                    </div>
                    <div className="ml-12 flex items-center gap-x-4">
                        <InputControl inputKey="A" />
                        <InputControl inputKey="D" />
                        <p className="ml-4 text-3xl font-bold text-white">Adjust</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <InputButton content="Submit Vote" />
                    </div>
                    <div className="grow"/>
                    <div className="flex items-center gap-x-8">
                        <div className="text-right font-bold">
                            <p className="text-xl text-white">Back to Home</p>
                            <p className="text-lg text-gray-400">Returning in 5 seconds</p>
                        </div>
                        <div className="cursor-pointer" onClick={() => router.push("/").then() }>
                            <svg width="127" height="74" viewBox="0 0 127 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5778 66.5984L6.1001 10.5984C5.0439 6.77695 7.89624 3 11.861 3H89.9133C134.738 3 135.983 71 89.9133 71H27.3448C24.6467 71 22.2966 69.199 21.5778 66.5984Z" fill="#FF2626"/>
                                <path d="M7.81348 3H90.9248C101.931 3 110.078 7.26006 115.531 13.5312C121.036 19.8617 123.921 28.3953 123.998 37.0264C124.075 45.6574 121.342 54.169 115.895 60.4766C110.5 66.7221 102.285 71 90.9248 71H24.4766C23.1284 71 21.9483 70.0973 21.5938 68.7783L4.92871 6.77832C4.4143 4.86366 5.84921 3 7.81348 3Z" fill="#090909" stroke="#FF2626" stroke-width="6"/>
                                <path d="M43 29.5L55.5 42M43 29.5L55.5 17M43 29.5H70.5C91 29.5 91 54 70.5 54" stroke="#FF2626" stroke-width="6" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}