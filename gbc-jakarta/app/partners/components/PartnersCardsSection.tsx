"use client"

import ScrollReveal from "../../components/ScrollReveal"
import ContentCard from "../../components/ContentCard"
import Pagination from "../../components/Pagination"
import { useTranslation } from "../../lib/LanguageContext"
import { usePartners } from "../context/PartnersContext"

export default function PartnersCardsSection() {
  const { t, language } = useTranslation()
  const {
    loading,
    filtered,
    paginated,
    search,
    setSearch,
    selectedYear,
    categoryTotal,
    activeFilter,
    totalPages,
    safePage,
    setCurrentPage,
  } = usePartners()

  return (
    <section className="pt-6 pb-16 relative" id="partners-cards">
      <div className="max-w-350 mx-auto px-[5%] relative z-[2]">
        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[20px] p-8 border border-gray-100 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-200 rounded-2xl mb-6" />
                <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                <div className="h-4 bg-gray-100 rounded mb-2 w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-text-light">
            <i className="far fa-building text-5xl mb-5 opacity-20" />
            <p className="text-lg">{t("noPartnersFound")}</p>
            {search && (
              <button
                onClick={() => {
                  setSearch("")
                  setCurrentPage(1)
                }}
                className="mt-4 text-accent underline text-sm cursor-pointer"
              >
                {t("clearSearch")}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginated.map((company) => (
              <ScrollReveal key={company.id}>
                <ContentCard
                  href={`/partners/${company.id}`}
                  logoUrl={company.logo_url}
                  logoFallback={(company.name ?? "?").split(" ").slice(0, 2).join(" ")}
                  title={company.name}
                  badge={company.category || undefined}
                  year={company.start_date ? new Date(company.start_date).getFullYear() : undefined}
                  description={
                    language === "en"
                      ? company.description_en || company.description_id || undefined
                      : company.description_id || company.description_en || undefined
                  }
                  ctaLabel={t("viewDetails")}
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Count + Pagination */}
        {!loading && filtered.length > 0 && (
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            countLabel={
              <>
                {t("showing")} <span className="font-semibold text-text">{paginated.length}</span>{" "}
                {t("of")} <span className="font-semibold text-text">{categoryTotal}</span>{" "}
                {t("partners")}
                {selectedYear && <span className="text-text-muted/70"> · {selectedYear}</span>}
                {activeFilter !== "All" && (
                  <span className="text-text-muted/70"> · {activeFilter}</span>
                )}
              </>
            }
          />
        )}
      </div>
    </section>
  )
}
