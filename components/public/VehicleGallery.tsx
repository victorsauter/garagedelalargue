"use client";

import {vehicleTitle} from "@/lib/format";
import {useState} from "react";

export function VehicleGallery({
  photos,
  title,
}: {
  photos: {id: string; url: string; alt?: string | null}[];
  title: string;
}) {
  const items = photos.length ? photos : [{id: "ph", url: "/placeholders/car.svg", alt: title}];
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={items[index].url}
          alt={items[index].alt || vehicleTitle({brand: title, model: ""})}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
      {items.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {items.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border ${
                i === index ? "border-accent" : "border-border"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
