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
    <section className="py-20 relative">
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
