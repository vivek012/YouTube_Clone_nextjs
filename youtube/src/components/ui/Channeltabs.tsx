"use client";
import { useState } from "react";
import { Button } from "./button";

const tabs = [
    { id: "Home", label: "Home" },
    { id: "Videos", label: "Videos" },
    { id: "shorts", label: "Shorts" },
    { id: "Playlists", label: "Playlists" },
    { id: "community", label: "community" },
    { id: "About", label: "About" },
];

export default function Channeltabs() {
    const [activeTab, setActiveTab] = useState("Home");

    return (
        <div className="border-b px-4">
            <div className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <Button key={tab.id}
                        variant="ghost"
                        className={`px-0 py-4 border-b-2 rounded-none ${activeTab === tab.id ? "border-black text-black" : "border-transparent text-gray-600 hover:text-black"
                            }`}
                        onClick={() => setActiveTab(tab.id)}>
                        {tab.label}

                    </Button>
                ))}
            </div>

        </div>
    )
}
