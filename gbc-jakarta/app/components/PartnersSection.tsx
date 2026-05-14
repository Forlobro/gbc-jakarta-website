"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function PartnersSection() {
  const buttons = [
    { id: 1, href: "https://english.gg.go.kr/", alt: "Gyeonggi", src: "/images/gyeonggi-logo1.png", large: false },
    { id: 2, href: "https://www.gbsa.or.kr/en/index.do", alt: "GBSA", src: "/images/GBSA transparent logo.png", large: true },
    { id: 3, href: "https://www.gbcprime.com/buyer/index.do", alt: "GBC Prime", src: "/images/gbc-prime.png", large: true },
    { id: 4, href: "https://www.gfair.or.kr/home/kr/index.do", alt: "G-Fair", src: "/images/g-fair-logo.jpg", large: true },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#f0f7ff] to-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-[5%]">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-accent font-semibold text-[0.9rem] tracking-[0.1em] uppercase mb-4 before:content-[''] before:w-10 before:h-0.5 before:bg-accent before:block after:content-[''] after:w-10 after:h-0.5 after:bg-accent after:block">
              Family Site
            </div>
            
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {buttons.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center min-h-[140px] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Placeholder for image — replace src with your image path */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.large ? 240 : 160}
                  height={item.large ? 140 : 80}
                  className={`object-contain w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${item.large ? "max-h-[140px]" : "max-h-[80px]"}`}
                />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
