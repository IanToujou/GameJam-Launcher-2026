import Head from "next/head";
import HeaderBar from "@/components/header/HeaderBar";

export default function Home() {

    return (
        <>
            <Head>
                <title>GameJam Launcher 2026</title>
            </Head>
            <div>
                <HeaderBar/>
            </div>
        </>
    );

}
