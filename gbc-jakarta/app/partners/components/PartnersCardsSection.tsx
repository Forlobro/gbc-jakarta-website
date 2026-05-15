"use client"

import Link from "next/link"
import ScrollReveal from "../../components/ScrollReveal"
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
    <section className="pt-6 pb-16 bg-[#f8fafc] relative" id="partners-cards">
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
            <p className="text-lg">{t("noCompaniesFound")}</p>
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
                <div className="bg-white rounded-[20px] p-8 transition-all duration-400 ease-in-out border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-linear-to-r before:from-accent before:to-[#00a8b0] before:scale-x-0 before:transition-transform before:duration-400 hover:before:scale-x-100 h-full flex flex-col">
                  <div className="w-full h-44 rounded-2xl flex items-center justify-center mb-6 overflow-hidden shrink-0">
                    {company.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={company.logo_url}
                        alt={company.name ?? ""}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <span className="font-display font-bold text-base text-primary text-center p-4 leading-tight">
                        {(company.name ?? "?").split(" ").slice(0, 2).join(" ")}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-text mb-2">{company.name}</h4>

                  {company.category && (
                    <span className="inline-block bg-accent/10 text-primary-light px-3.5 py-1.5 rounded-[20px] text-[0.75rem] font-semibold mb-4 w-fit">
                      {company.category}
                    </span>
                  )}

                  {(company.description_id || company.description_en) && (
                    <p className="text-[0.9rem] text-text-light leading-[1.7] mb-6 flex-1 line-clamp-3 text-justify">
                      {language === "en"
                        ? company.description_en || company.description_id
                        : company.description_id || company.description_en}
                    </p>
                  )}

                  <Link
                    href={`/partners/${company.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-[0.9rem] transition-all duration-300 hover:gap-3 mt-auto"
                  >
                    {t("viewDetails")} <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Count + Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              {selectedYear && (
                <>
                  <span className="font-semibold text-primary">{selectedYear}</span>
                  {" • "}
                </>
              )}
              {t("showing")} <span className="font-semibold text-text">{paginated.length}</span>{" "}
              {t("companiesOf")} <span className="font-semibold text-text">{categoryTotal}</span>{" "}
              {t("companiesWord")}
              {activeFilter !== "All" && (
                <span className="text-text-muted/70">
                  {" "}
                  {t("companiesIn")} {activeFilter}
                </span>
              )}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 text-text-light text-sm transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <i className="fas fa-chevron-left text-xs" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = page === safePage
                  const show = page === 1 || page === totalPages || Math.abs(page - safePage) <= 1
                  if (!show) {
                    if (page === 2 || page === totalPages - 1)
                      return (
                        <span
                          key={page}
                          className="w-9 h-9 flex items-center justify-center text-text-muted text-sm select-none"
                        >
                          …
                        </span>
                      )
                    return null
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-primary border-primary text-white shadow-md"
                          : "border-gray-200 text-text-light hover:border-primary hover:text-primary"
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {page}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200 text-text-light text-sm transition-all duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next page"
                >
                  <i className="fas fa-chevron-right text-xs" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
