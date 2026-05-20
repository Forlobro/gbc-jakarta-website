"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { GbcCompanyWithPhotos } from "../../lib/supabase"
import { useTranslation } from "../../lib/LanguageContext"
import PageBadge from "../../components/PageBadge"
import SectionBadge from "@/app/components/SectionBadge"
import HeroDecor from "../../components/HeroDecor"
import EventDetailPageDecor from "../../events/components/EventDetailPageDecor"
import ContentCard from "../../components/ContentCard"

function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.includes("youtube.com/embed/")) return url
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  return null
}

function getCompanyLogoText(name: string | null | undefined) {
  const safeName = (name || "?").trim()
  if (!safeName) return "?"
  return safeName.split(" ").slice(0, 2).join(" ")
}

export default function PartnerDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [company, setCompany] = useState<GbcCompanyWithPhotos | null>(null)
  const [related, setRelated] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  const { language, t } = useTranslation()

  useEffect(() => {
    if (!id) return

    // Fetch this partner
    fetch(`/api/partners/${id}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true)
          return null
        }
        return r.json()
      })
      .then((data) => {
        if (data) setCompany(data)
      })
      .finally(() => setLoading(false))

    // Fetch related (all, then exclude current)
    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRelated(data.filter((c) => String(c.id) !== String(id)).slice(0, 3))
        }
      })
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <i className="fas fa-spinner fa-spin text-3xl text-primary opacity-50" />
        </div>
      </>
    )
  }

  if (notFound || !company) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-primary mb-4">
              {t("companyNotFound")}
            </h1>
            <p className="text-text-light mb-8 text-justify">{t("companyNotFoundMsg")}</p>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold"
            >
              <i className="fas fa-arrow-left" /> {t("backToCompanies")}
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const photos = company.gbc_companies_photos ?? []

  return (
    <>
      <Navbar />

      {/* Partner Hero */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden">
        <HeroDecor />
        <div className="max-w-350 mx-auto px-[5%] relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Logo / First Photo */}
            <div className="w-35 h-35 bg-white rounded-3xl flex items-center justify-center p-4 shadow-2xl shrink-0 overflow-hidden">
              {company.logo_url ? (
                <Image
                  src={company.logo_url}
                  alt={company.name ?? ""}
                  width={140}
                  height={140}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <span className="font-display font-extrabold text-base text-primary text-center">
                  {getCompanyLogoText(company.name)}
                </span>
              )}
            </div>

            {/* Text */}
            <div className="text-white text-center md:text-left">
              {company.category && <PageBadge>{company.category}</PageBadge>}
              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-3">
                {company.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Content */}
      <main className="relative bg-white overflow-hidden">
        <EventDetailPageDecor />

        <section className="py-10">
          <div className="max-w-350 mx-auto px-[5%]">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
              {/* Main Content */}
              <div>
                {/* Video */}
                {getEmbedUrl(company.link_video) && (
                  <div className="mb-12">
                    <SectionBadge>{t("videoProfile")}</SectionBadge>
                    <div className="rounded-3xl overflow-hidden shadow-xl">
                      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                        <iframe
                          src={getEmbedUrl(company.link_video)!}
                          className="absolute inset-0 w-full h-full"
                          title={`${company.name} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {(company.description_id || company.description_en) && (
                  <div className="mb-12">
                    <SectionBadge>{t("aboutCompany")}</SectionBadge>
                    <div className="text-text-light text-[1.05rem] leading-[1.9] whitespace-pre-line">
                      {language === "en"
                        ? company.description_en || company.description_id
                        : company.description_id || company.description_en}
                    </div>
                  </div>
                )}

                {/* Photo Gallery */}
                {photos.length > 0 && (
                  <div className="mb-12">
                    <SectionBadge>
                      {t("galleryLabel")} ({photos.length} photos)
                    </SectionBadge>

                    {/* Main Photo */}
                    <div className="rounded-3xl overflow-hidden shadow-xl mb-4 aspect-video relative">
                      <Image
                        src={photos[activePhoto].photo_url ?? ""}
                        alt={`${company.name} photo ${activePhoto + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                    </div>

                    {/* Thumbnails */}
                    {photos.length > 1 && (
                      <div className="flex gap-3 flex-wrap">
                        {photos.map((photo, idx) => (
                          <button
                            key={photo.id}
                            onClick={() => setActivePhoto(idx)}
                            className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                              idx === activePhoto
                                ? "border-accent scale-105"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={photo.photo_url ?? ""}
                              alt={`Thumbnail ${idx + 1}`}
                              width={80}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-25 lg:self-start space-y-6">
                {/* Brochure Card */}
                {company.link_brochure && (
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <h3 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <i className="far fa-file-pdf text-red-500" /> {t("brochure")}
                    </h3>
                    <p className="text-[0.9rem] text-text-light mb-6 text-justify">
                      {t("brochureDesc")}
                    </p>
                    <div className="flex flex-col gap-3">
                      {/* Preview — opens native browser PDF viewer in new tab */}
                      <a
                        href={company.link_brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 py-3.5 bg-primary !text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#1a3d6e] hover:-translate-y-0.5 text-[0.9rem]"
                      >
                        <i className="far fa-eye" />
                        {t("viewBrochure")}
                      </a>
                    </div>
                  </div>
                )}

                {/* Contact Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <h3 className="font-display text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <i className="far fa-address-card text-accent" /> {t("contactViaGbc")}
                  </h3>
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                        <i className="fas fa-phone" />
                      </div>
                      <div>
                        <label className="block text-[0.75rem] text-text-muted uppercase tracking-[0.05em] mb-0.5">
                          {t("phoneLabel")}
                        </label>
                        <span className="text-[0.95rem] text-text font-medium">
                          +62 21 3971 2135
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:chat.gbcjkt@gmail.com"
                      className="flex items-center justify-center gap-3 py-4 bg-primary !text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#1a3d6e] hover:-translate-y-0.5"
                    >
                      <i className="far fa-envelope" /> chat.gbcjkt@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Companies */}
        {related.length > 0 && (
          <section className="py-20 relative z-[2]">
            <div className="max-w-350 mx-auto px-[5%]">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-12">
                {t("otherCompanies")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((c) => (
                  <ContentCard
                    key={c.id}
                    href={`/partners/${c.id}`}
                    logoUrl={c.logo_url}
                    logoFallback={getCompanyLogoText(c.name)}
                    title={c.name}
                    badge={c.category || undefined}
                    description={
                      language === "en"
                        ? c.description_en || c.description_id || undefined
                        : c.description_id || c.description_en || undefined
                    }
                    ctaLabel={t("viewDetails")}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
