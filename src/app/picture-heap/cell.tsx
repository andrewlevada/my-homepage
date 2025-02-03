import { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Coordinate } from "../types";
import Image from "next/image";

export function Cell({ image, imageSize }: { image: StaticImageData; imageSize: number; }) {
    const [position, setPosition] = useState<Coordinate>({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cellWidth = ref.current?.clientWidth;
        const cellHeight = ref.current?.clientHeight;

        console.log(cellWidth, cellHeight);

        if (!cellWidth || !cellHeight) {
            console.error('no cell width or height');
            return;
        }

        const randomX = Math.random() * cellWidth;
        const randomY = Math.random() * cellHeight;

        setPosition({ x: randomX, y: randomY });
    }, [imageSize, ref.current]);

    return (
        <div className="relative w-full h-full" ref={ref}>
            <Image className="absolute max-w-fit max-h-fit" src={image} alt="" style={{
                top: position.y - imageSize / 2,
                left: position.x - imageSize / 2,
                width: imageSize,
                height: imageSize,
            }} />
        </div>
    );
}