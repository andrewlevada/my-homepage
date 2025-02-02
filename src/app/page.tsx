"use client";

import { useEffect, useState } from "react";
import { PictureHeap, PictureHeapDimensions } from "./picture-heap";
import { getPicturesInRandomOrder } from "./consts";

export default function Home() {
    const padding = 40; // px

    const [dimensions, setDimensions] = useState<PictureHeapDimensions>({
        width: 0,
        height: 0,
        imageSize: 0,
    });

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        setDimensions({
            width: screenWidth - padding * 2,
            height: screenHeight - padding * 2,
            imageSize: 320,
        });
    }, []);

    return (
        <div className="block w-screen h-screen bg-[#DBDBDB]" style={{
            padding: `${padding}px`,
        }}>
            <PictureHeap pictureImages={getPicturesInRandomOrder()} dimensions={dimensions} className="w-full h-full" />
        </div>
    );
}
