/**
 * EventDetailCards — grid of info cards showing event date, time, location, venue.
 * Used on upcoming event pages to highlight key event details.
 *
 * Props:
 * - cards: array of card data { icon, label, value, variant }
 * - note: optional footnote text below the grid
 */

import ScrollReveal from "./ScrollReveal"

interface EventDetailCard {
  icon: string
  label: string
  value: string
  variant?: "primary" | "accent"
}

interface EventDetailCardsProps {
  cards: EventDetailCard[]
  note?: string
}

export default function EventDetailCards({ cards, note }: EventDetailCardsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mx-auto items-stretch">
        {cards.map((card, i) => {
          const isAccent = card.variant === "accent"
          return (
            <ScrollReveal key={i} className="h-full">
              <div
                className={`${isAccent ? "bg-accent" : "bg-primary"} rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-lg h-full min-h-[200px]`}
              >
                <div
                  className={`w-14 h-14 ${isAccent ? "bg-primary/20" : "bg-white/10"} rounded-2xl flex items-center justify-center ${isAccent ? "text-primary" : "text-accent"} text-2xl shrink-0`}
                >
                  <i className={card.icon} />
                </div>
                <div>
                  <p
                    className={`${isAccent ? "text-primary/60" : "text-white/60"} text-[0.75rem] font-semibold uppercase tracking-widest mb-2`}
                  >
                    {card.label}
                  </p>
                  <p
                    className={`${isAccent ? "text-primary" : "text-white"} font-display font-extrabold text-xl leading-tight`}
                  >
                    {card.value}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      {note && (
        <p className="text-center text-text-muted text-[0.82rem] mt-10 italic max-w-[600px] mx-auto">
          {note}
        </p>
      )}
    </>
  )
}
