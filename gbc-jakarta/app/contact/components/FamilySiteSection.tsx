"use client"

import Image from "next/image"
import ScrollReveal from "@/app/components/ScrollReveal"

export default function FamilySiteSection() {
  const buttons = [
    {
      id: 1,
      href: "https://english.gg.go.kr/",
      alt: "Gyeonggi",
      src: "/images/Gyeonggi do transparent logo.png",
      size: "gyeonggi",
    },
    {
      id: 2,
      href: "https://www.gbsa.or.kr/en/index.do",
      alt: "GBSA",
      src: "/images/GBSA transparent logo.png",
      size: "gbsa",
    },
    {
      id: 3,
      href: "https://www.gbcprime.com/buyer/index.do",
      alt: "GBC Prime",
      src: "/images/GBC prime transparent logo.png",
      size: "small",
    },
    {
      id: 4,
      href: "https://www.gfair.or.kr/home/kr/index.do",
      alt: "G-Fair",
      src: "/images/G-fair korea transparent logo.png",
      size: "xlarge",
    },
  ]

  return (
    <section
      className="flex-1 py-20 bg-gradient-to-b from-[#f0f7ff] to-white relative overflow-hidden"
      id="family-site"
    >
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
                  width={
                    item.size === "gbsa"
                      ? 340
                      : item.size === "gyeonggi"
                        ? 240
                        : item.size === "xlarge"
                          ? 310
                          : item.size === "large"
                            ? 280
                            : item.size === "xsmall"
                              ? 130
                              : 160
                  }
                  height={
                    item.size === "gbsa"
                      ? 285
                      : item.size === "gyeonggi"
                        ? 180
                        : item.size === "xlarge"
                          ? 190
                          : item.size === "large"
                            ? 170
                            : item.size === "xsmall"
                              ? 70
                              : 90
                  }
                  className={`object-contain w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${item.size === "gbsa" ? "max-h-[285px]" : item.size === "gyeonggi" ? "max-h-[180px]" : item.size === "xlarge" ? "max-h-[190px]" : item.size === "large" ? "max-h-[170px]" : item.size === "xsmall" ? "max-h-[70px]" : "max-h-[90px]"}`}
                />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
