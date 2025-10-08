"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getGownById, mockGowns } from "../data";
import React from "react";

type Props = {
  params: { id: string };
};

type LocationKey = "METRO_MANILA" | "LUZON" | "OUTSIDE_LUZON";

export default function GownPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const gown = getGownById(id);

  const [location, setLocation] = useState<LocationKey>("METRO_MANILA");
  const [isPixie, setIsPixie] = useState(false);

  const rate = useMemo(() => {
    if (!gown) return 0;
    if (isPixie) {
      if (location === "METRO_MANILA") return gown.pixieMetroManilaRate;
      if (location === "LUZON") return gown.pixieLuzonRate;
      return gown.pixieOutsideLuzonRate;
    }
    if (location === "METRO_MANILA") return gown.metroManilaRate;
    if (location === "LUZON") return gown.luzonRate;
    return gown.outsideLuzonRate;
  }, [gown, isPixie, location]);

  if (!gown) {
    return (
      <div className="p-6">
        <p className="text-sm opacity-70">Gown not found.</p>
        <Link className="underline" href="/">Go back</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <div className="mb-4 text-xs">
          <Link href="/collections/all" className="text-neutral-500 hover:text-neutral-800">Collections</Link>
          <span className="mx-2 text-neutral-400">/</span>
          <span className="text-neutral-800">{gown.name}</span>
        </div>
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
          <Image
            src={isPixie ? gown.pixiePicture : gown.longGownPicture}
            alt={gown.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[gown.longGownPicture, gown.filipinianaPicture, gown.pixiePicture, gown.trainPicture].map((src, idx) => (
            <button
              key={idx}
              onClick={() => setIsPixie(idx === 2)}
              className="relative aspect-square overflow-hidden rounded bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
              aria-label="Change preview"
            >
              {/* Using next/image for thumbnails for consistency */}
              <Image src={src} alt="thumb" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5 md:sticky md:top-24 md:pt-10 self-start">
        <div>
          <p className="mt-1 text-sm text-neutral-600">{gown.collection}</p>
          <h1 className="text-6xl font-semibold tracking-tight font-serif">{gown.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            {gown.tags.map((t) => (
              <span key={t} className="rounded-full border px-3 py-1 bg-white/60 tracking-wide uppercase text-neutral-700">{t}</span>
            ))}
          </div>
        </div>

        <div className="rounded p-4 space-y-4 bg-white shadow-sm">
          <div>
            <div className="text-[11px] tracking-wide uppercase text-neutral-500 mb-2">Location</div>
            <div className="inline-flex rounded-full bg-neutral-50 p-1">
              {([
                { k: "METRO_MANILA", l: "Metro Manila" },
                { k: "LUZON", l: "Luzon" },
                { k: "OUTSIDE_LUZON", l: "Outside Luzon" },
              ] as { k: LocationKey; l: string }[]).map(({ k, l }) => (
                <button
                  key={k}
                  onClick={() => setLocation(k)}
                  className={`px-3 py-1.5 text-sm rounded-full transition ${location === k ? "bg-white shadow-sm" : "text-neutral-600"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] tracking-wide uppercase text-neutral-500 mb-2">Version</div>
            <div className="inline-flex rounded-full bg-neutral-50 p-1">
              {([
                { v: false, l: "Standard" },
                { v: true, l: "Pixie" },
              ] as { v: boolean; l: string }[]).map(({ v, l }) => (
                <button
                  key={l}
                  onClick={() => setIsPixie(v)}
                  className={`px-3 py-1.5 text-sm rounded-full transition ${isPixie === v ? "bg-white shadow-sm" : "text-neutral-600"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <div className="text-[11px] tracking-wide uppercase text-neutral-500">Rate</div>
            <div className="mt-1 text-3xl font-semibold">₱{rate.toLocaleString()}</div>
            <div className="text-xs text-neutral-500">PHP</div>
          </div>

          <button className="w-full rounded-full bg-black text-white py-3 text-sm tracking-wide hover:opacity-90">
            Book Now
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded p-4 bg-white">
            <h3 className="text-sm font-semibold mb-3 tracking-wide">Measurements</h3>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              <dt className="opacity-70">Bust</dt><dd>{gown.bust}</dd>
              <dt className="opacity-70">Waist</dt><dd>{gown.waist}</dd>
              <dt className="opacity-70">Arms</dt><dd>{gown.arms}</dd>
              <dt className="opacity-70">Backing</dt><dd>{gown.backing}</dd>
            </dl>
          </div>
          <div className="rounded p-4 bg-white">
            <h3 className="text-sm font-semibold mb-3 tracking-wide">Skirt</h3>
            <p className="text-sm">{gown.skirt}</p>
          </div>
        </div>

        <div className="rounded p-4 bg-white">
          <h3 className="text-sm font-semibold mb-3 tracking-wide">Add Ons</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {gown.addOns.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 tracking-wide">Related Gowns</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gown.relatedGownIds
              .map((id) => mockGowns.find((g) => g.id === id))
              .filter(Boolean)
              .map((rel) => (
                <Link key={rel!.id} href={`/gown/${rel!.id}`} className="block group">
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded bg-neutral-50 group-hover:shadow-sm">
                    <Image src={rel!.longGownPicture} alt={rel!.name} fill className="object-cover" sizes="200px" />
                  </div>
                  <div className="mt-2 text-sm group-hover:underline">{rel!.name}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}


