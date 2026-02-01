"use client";

import React from "react";
import {
  Phone,
  MessageCircle,
  Monitor,
  HardDrive,
  RefreshCw,
  Shield,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Left */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <Shield className="h-4 w-4" />
              <span>Spolehlivý servis od roku 2010</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Opravy notebooků a počítačů{" "}
              <span className="underline">rychle a spolehlivě</span>
            </h1>

            <p className="max-w-xl text-lg">
              Servis NTB a PC, reinstalace Windows, výměna dílů, záchrana dat.
              Profesionální péče o vaši techniku s garancí kvality.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+420123456789"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-semibold"
              >
                <Phone className="h-5 w-5" />
                Zavolat
              </a>

              <a
                href="mailto:info@servisntb.cz"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-semibold"
              >
                <MessageCircle className="h-5 w-5" />
                Napsat zprávu
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ServiceCard
                icon={<Monitor className="h-6 w-6" />}
                title="Opravy notebooků"
                description="Diagnostika a oprava všech značek notebooků"
              />
              <ServiceCard
                icon={<RefreshCw className="h-6 w-6" />}
                title="Reinstalace Windows"
                description="Čistá instalace systému a software"
              />
              <ServiceCard
                icon={<HardDrive className="h-6 w-6" />}
                title="Výměna dílů"
                description="Disky, RAM, baterie, displeje a další"
              />
              <ServiceCard
                icon={<Shield className="h-6 w-6" />}
                title="Záchrana dat"
                description="Obnovení ztracených a smazaných souborů"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <TrustStat value="500+" label="Spokojených zákazníků" />
              <TrustStat value="24h" label="Rychlá diagnostika" />
              <TrustStat value="2 roky" label="Záruka na opravu" />
              <TrustStat value="14+" label="Let zkušeností" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border p-5">
      <div className="mb-3 inline-flex rounded-lg border p-2">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border p-3">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}
