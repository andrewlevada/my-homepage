import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { Coordinate } from "./types";

export interface PictureHeapDimensions {
    width: number;
    height: number;
    imageSize: number;
}

interface PictureObject {
    image: StaticImageData;
    location: Coordinate;
}

export function PictureHeap({
    pictureImages,
    dimensions,
    className,
}: {
    pictureImages: StaticImageData[];
    dimensions: PictureHeapDimensions;
    className?: string;
}) {
    const [pictures, setPictures] = useState<PictureObject[]>([]);

    // Filling up the locations
    useEffect(() => {
        const newPictures: PictureObject[] = [];
        const locationsMirror: Coordinate[] = [];

        for (const image of pictureImages) {
            const location = getRandomLocation(dimensions);
            locationsMirror.push(location);
            newPictures.push({ image, location });
        }

        setPictures(newPictures);
    }, [pictureImages, dimensions]);

    return (
        <div className={`relative ${className ?? ''}`} style={{
            width: dimensions.width,
            height: dimensions.height,
        }}>
            {pictures.map((picture) => (
                <div key={picture.image.src} className="absolute" style={{
                    left: picture.location.x - dimensions.imageSize / 2,
                    top: picture.location.y - dimensions.imageSize / 2,
                    width: dimensions.imageSize,
                    height: dimensions.imageSize,
                }}>
                    <Image
                        src={picture.image}
                        alt=""
                        fill
                        placeholder="blur"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

function getRandomFeasibleLocation(heapDimensions: PictureHeapDimensions, locations: Coordinate[]): Coordinate {
    let candidateLocation = getRandomLocation(heapDimensions);

    for (const location of locations) {
        if (doLocationsIntersect(location, candidateLocation, heapDimensions.imageSize)) {
            const adjustmentDelta = getAdjustmentDelta(location, candidateLocation, heapDimensions.imageSize);
            candidateLocation = {
                x: candidateLocation.x + adjustmentDelta.x,
                y: candidateLocation.y + adjustmentDelta.y,
            };
        }
    }

    return candidateLocation;
}

function getRandomLocation(heapDimensions: PictureHeapDimensions): Coordinate {
    const size = heapDimensions.imageSize;

    const x = size / 2 + Math.floor(Math.random() * (heapDimensions.width - size));
    const y = size / 2 + Math.floor(Math.random() * (heapDimensions.height - size));

    return { x, y };
}

function doLocationsIntersect(a: Coordinate, b: Coordinate, imageSize: number): boolean {
    const doesCenterIntersectOnXAxis = a.x < b.x + imageSize && a.x > b.x - imageSize;
    const doesCenterIntersectOnYAxis = a.y < b.y + imageSize && a.y > b.y - imageSize;
    const badIntersection = doesCenterIntersectOnXAxis && doesCenterIntersectOnYAxis;

    return !badIntersection;
}

function getAdjustmentDelta(a: Coordinate, b: Coordinate, imageSize: number): Coordinate {
    const smoothFactor = 0.4;

    const deltaX = b.x - a.x;
    const deltaY = b.y - a.y;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + 0.0001;
    const unitVector = { x: deltaX / distance, y: deltaY / distance };
    const smoothUnitVector = { x: unitVector.x * smoothFactor, y: unitVector.y * smoothFactor };
    const roundedUnitVector = { x: Math.round(smoothUnitVector.x), y: Math.round(smoothUnitVector.y) };

    return { x: roundedUnitVector.x * imageSize, y: roundedUnitVector.y * imageSize };
}


