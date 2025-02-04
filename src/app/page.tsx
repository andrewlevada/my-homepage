"use client";

import { useEffect, useState } from "react";
import { PictureHeap, PictureHeapDimensions } from "./picture-heap/picture-heap";
import { getPicturesInRandomOrder } from "./consts";

export default function Home() {
    const padding = 8; // px

    const [dimensions, setDimensions] = useState<PictureHeapDimensions>({
        width: 0,
        height: 0,
        imageSize: 0,
    });

    useEffect(() => {
        const updateDimensions = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            setDimensions({
                width: screenWidth - padding * 2,
                height: screenHeight - padding * 2,
                imageSize: 400,
            });
        };

        updateDimensions(); // Set initial dimensions
        window.addEventListener('resize', updateDimensions); // Update dimensions on resize

        return () => {
            window.removeEventListener('resize', updateDimensions); // Cleanup listener on unmount
        };
    }, []);

    return (
        <div className="block w-screen h-screen bg-[#DBDBDB]" style={{
            padding: `${padding}px`,
        }}>
            <PictureHeap images={getPicturesInRandomOrder()} dimensions={dimensions} className="w-full h-full" />
        </div>
    );
}
