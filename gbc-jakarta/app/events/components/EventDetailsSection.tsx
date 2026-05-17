"use client"

import ScrollReveal from "../../components/ScrollReveal"
import SectionBadge from "../../components/SectionBadge"
import EventDetailCards from "../../components/EventDetailCards"
import { useTranslation } from "../../lib/LanguageContext"

interface EventDetailsSectionProps {
  date: string
  time: string
  location: string
  venue: string
  note?: string
}

export default function EventDetailsSection({
  date,
  time,
  location,
  venue,
  note,
}: EventDetailsSectionProps) {
  const { t } = useTranslation()

  const cards = [
    {
      icon: "far fa-calendar-alt",
      label: t("upcomingEventDetailsDateLabel"),
      value: date,
      variant: "primary" as const,
    },
    {
      icon: "far fa-clock",
      label: t("upcomingEventDetailsTimeLabel"),
      value: time,
      variant: "accent" as const,
    },
    {
      icon: "fas fa-map-marker-alt",
      label: t("upcomingEventDetailsLocationLabel"),
      value: location,
      variant: "primary" as const,
    },
    {
      icon: "far fa-building",
      label: t("upcomingEventDetailsVenueLabel"),
      value: venue,
      variant: "accent" as const,
    },
  ]

  return (
    <section className="py-20 bg-white relative">
      {/* Blurred accent — top right */}
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-accent/8 blur-2xl pointer-events-none" />
      {/* Blurred primary — bottom left */}
      <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-primary/6 blur-2xl pointer-events-none" />
      {/* Floating symbol */}
      <div className="absolute top-10 right-[6%] text-accent/12 text-7xl font-bold pointer-events-none select-none leading-none">
        +
      </div>
      {/* Decorative lines — right */}
      <div className="absolute right-[3%] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
        {[65, 40, 95, 55, 80, 38].map((w, i) => (
          <div key={i} className="h-[3px] bg-accent/20 rounded-full" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] relative z-[2]">
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-14">
          <SectionBadge centered>{t("upcomingEventDetailsLabel")}</SectionBadge>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-[1.2]">
            {t("upcomingEventDetailsTitle")}
          </h2>
        </ScrollReveal>

        <EventDetailCards cards={cards} note={note} />
      </div>
    </section>
  )
}
