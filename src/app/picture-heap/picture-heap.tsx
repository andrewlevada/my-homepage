import { StaticImageData } from "next/image";
import { getRandomZIndex, solveForBestGridSize } from "./calculations";
import { Cell } from "./cell";

export interface PictureHeapDimensions {
    width: number;
    height: number;
    imageSize: number;
}

export function PictureHeap({
    images,
    dimensions,
    className,
}: {
    images: StaticImageData[];
    dimensions: PictureHeapDimensions;
    className?: string;
}) {
    const { m, n } = solveForBestGridSize(dimensions.width - dimensions.imageSize, dimensions.height - dimensions.imageSize, images.length);
    const gridLength = m * n;
    const imagesToShow = images.slice(0, gridLength);

    return (
        <div className={`relative grid ${className ?? ''}`} style={{
            width: dimensions.width,
            height: dimensions.height,
            gridTemplateColumns: `repeat(${m}, 1fr)`,
            gridTemplateRows: `repeat(${n}, 1fr)`,
            padding: `${dimensions.imageSize / 2}px`,
        }}>
            {imagesToShow.map((image, index) => (
                <div key={index} className="relative" style={{
                    zIndex: getRandomZIndex(images.length),
                }}>
                    <Cell image={image} imageSize={dimensions.imageSize} />
                </div>
            ))}
        </div>
    );
}
