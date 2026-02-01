"use client";

import { Phone, MessageCircle, Monitor, HardDrive, RefreshCw, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left content */}
          <div className="flex-1 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Spolehlivy servis od roku 2010</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Opravy notebooku a pocitacu{" "}
              <span className="text-primary">rychle a spolehlive</span>
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Servis NTB a PC, reinstalace Windows, vymena dilu, zachrana dat. 
              Profesionalni pece o vasi techniku s garanci kvality.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:+420123456789"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <Phone className="h-5 w-5" />
                Zavolat
              </a>
              <a
                href="mailto:info@servisntb.cz"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <MessageCircle className="h-5 w-5" />
                Napsat zpravu
              </a>
            </div>
          </div>
          
          {/* Right content - Services grid */}
          <div className="mt-16 flex-1 lg:mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ServiceCard 
                icon={<Monitor className="h-6 w-6" />}
                title="Opravy notebooku"
                description="Diagnostika a oprava vsech znacek notebooku"
              />
              <ServiceCard 
                icon={<RefreshCw className="h-6 w-6" />}
                title="Reinstalace Windows"
                description="Cista instalace systemu a software"
              />
              <ServiceCard 
                icon={<HardDrive className="h-6 w-6" />}
                title="Vymena dilu"
                description="Disky, RAM, baterie, displeje a dalsi"
              />
              <ServiceCard 
                icon={<Shield className="h-6 w-6" />}
                title="Zachrana dat"
                description="Obnoveni ztacenych a smazanych souboru"
              />
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-20 border-t border-border pt-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <TrustStat value="500+" label="Spokojenych zakazniku" />
            <TrustStat value="24h" label="Rychla diagnostika" />
            <TrustStat value="2 roky" label="Zaruka na opravu" />
            <TrustStat value="14+" label="Let zkusenosti" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-secondary/30 p-6 transition-all hover:border-primary/50 hover:bg-secondary/50">
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
