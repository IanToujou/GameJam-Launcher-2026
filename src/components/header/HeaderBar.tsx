import Image from "next/image";
import ImageProfile from "@/public/assets/img/selected_profile.jpg";
import {BatteryCharging, Wifi} from "lucide-react";
import {useEffect, useState} from "react";

const HeaderBar = () => {

    const [time, setTime] = useState("00:00");

    useEffect(() => {

        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);

    }, []);

    return (
        <div className="bg-neutral-dark text-white flex px-4 py-2 items-center justify-between">
            <div className="flex gap-x-4 items-center">
                <div className="p-1 rounded-2xl bg-neutral-medium border-6 border-neutral-light">
                    <div className="relative w-15 h-15">
                        <Image src={ImageProfile} alt="Selected Profile" fill className="object-cover rounded-full"/>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-xl">42 Luxembourg</p>
                    <p className="text-gray-400">Current Profile</p>
                </div>
            </div>
            <h2 className="font-extrabold text-2xl uppercase tracking-wide absolute left-1/2 -translate-x-1/2">
                42 Lux GameJam Voting
            </h2>
            <div className="relative" style={{ width: '434px', height: '95px' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 434 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M430.354 21V73.5C430.354 83.4411 422.296 91.5 412.354 91.5H51.3422C44.9115 91.5 38.9692 88.0692 35.7538 82.5L5.44289 30C-1.48531 18 7.17492 3 21.0313 3H412.354C422.296 3 430.354 11.0589 430.354 21Z" fill="url(#paint0_linear_88_28)" stroke="#313131" stroke-width="6"/>
                    <defs>
                        <linearGradient id="paint0_linear_88_28" x1="-10.1456" y1="47.25" x2="430.354" y2="47.25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#111111"/>
                            <stop offset="1" stop-color="#090909"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div className="relative z-10 flex items-center justify-between h-full ml-18 mr-10">
                    <p className="font-semibold text-2xl tracking-wide">{time}</p>
                    <div className="flex gap-x-6 items-center">
                        <Wifi size={42} />
                        <BatteryCharging size={42} />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HeaderBar;