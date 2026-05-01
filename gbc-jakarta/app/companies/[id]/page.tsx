"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { GbcCompanyWithPhotos } from "../../lib/supabase"
import { useTranslation } from "../../lib/LanguageContext"

function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.includes("youtube.com/embed/")) return url;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return null;
}

function getCompanyLogoText(name: string | null | undefined) {
  const safeName = (name || "?").trim()
  if (!safeName) return "?"
  return safeName.split(" ").slice(0, 2).join(" ")
}

export default function CompanyDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [company, setCompany] = useState<GbcCompanyWithPhotos | null>(null)
  const [related, setRelated] = useState<GbcCompanyWithPhotos[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  const { language } = useTranslation()

  useEffect(() => {
    if (!id) return

    // Fetch this company
    fetch(`/api/companies/${id}`)
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
    fetch("/api/companies")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRelated(
            data.filter((c) => String(c.id) !== String(id)).slice(0, 3),
          )
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
              Company Not Found
            </h1>
            <p className="text-text-light mb-8">
              The company you are looking for does not exist.
            </p>
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold"
            >
              <i className="fas fa-arrow-left" /> Back to Companies
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

      {/* Company Hero */}
      <section className="pt-40 pb-20 bg-linear-to-br from-primary via-primary-light to-[#2d5a9e] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(0, 194, 203, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)",
          }}
        />
        <div className="max-w-350 mx-auto px-[5%] relative z-1">
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
              {company.category && (
                <span className="inline-block bg-accent/20 border border-accent/40 text-accent px-5 py-2 rounded-full text-[0.85rem] font-semibold mb-4">
                  {company.category}
                </span>
              )}
              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-3">
                {company.name}
              </h1>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm opacity-75">
                <span className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-accent" />
                  Gyeonggi-do, South Korea
                </span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-calendar text-accent" />
                  GMS Batch 1 (2025)
                </span>
                {company.category && (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-industry text-accent" />
                    {company.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Content */}
      <section className="py-20 bg-white">
        <div className="max-w-350 mx-auto px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
            {/* Main Content */}
            <div>
              {/* Video */}
              {getEmbedUrl(company.link_video) && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl font-bold text-primary mb-6 pb-3 border-b-2 border-gray-100 flex items-center gap-3">
                    <i className="fas fa-play-circle text-accent" /> Video Profile
                  </h2>
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
                  <h2 className="font-display text-2xl font-bold text-primary mb-6 pb-3 border-b-2 border-gray-100 flex items-center gap-3">
                    <i className="fas fa-building text-accent" /> About Company
                  </h2>
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
                  <h2 className="font-display text-2xl font-bold text-primary mb-6 pb-3 border-b-2 border-gray-100 flex items-center gap-3">
                    <i className="fas fa-images text-accent" /> Gallery
                    <span className="text-base font-normal text-text-muted">
                      ({photos.length} photos)
                    </span>
                  </h2>

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
                    <i className="fas fa-file-pdf text-red-500" /> Brochure
                  </h3>
                  <p className="text-[0.9rem] text-text-light mb-6">
                    {language === "en"
                      ? "View or download the official company brochure."
                      : "Lihat atau unduh brosur resmi perusahaan."}
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* Preview — opens native browser PDF viewer in new tab */}
                    <a
                      href={company.link_brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 py-3.5 bg-primary !text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#1a3d6e] hover:-translate-y-0.5 text-[0.9rem]"
                    >
                      <i className="fas fa-eye" />
                      {language === "en" ? "View Brochure" : "Lihat Brosur"}
                    </a>
                    {/* Download — forces file save dialog */}
                    <a
                      href={company.link_brochure}
                      download
                      className="flex items-center justify-center gap-3 py-3.5 bg-accent/10 !text-primary border-2 border-accent/30 rounded-xl font-semibold transition-all duration-300 hover:bg-accent/20 hover:border-accent hover:-translate-y-0.5 text-[0.9rem]"
                    >
                      <i className="fas fa-download" />
                      {language === "en" ? "Download PDF" : "Download PDF"}
                    </a>
                  </div>
                </div>
              )}

              {/* Contact Card */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="font-display text-lg font-bold text-primary mb-6 flex items-center gap-2">
                  <i className="fas fa-address-card text-accent" /> Contact via
                  GBC
                </h3>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                      <i className="fas fa-phone" />
                    </div>
                    <div>
                      <label className="block text-[0.75rem] text-text-muted uppercase tracking-[0.05em] mb-0.5">
                        Phone
                      </label>
                      <span className="text-[0.95rem] text-text font-medium">
                        +62 21 3971 2135
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:gbcjkt@gbcprime.com"
                    className="flex items-center justify-center gap-3 py-4 bg-primary !text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#1a3d6e] hover:-translate-y-0.5"
                  >
                    <i className="fas fa-envelope" /> gbcjkt@gbcprime.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Companies */}
      {related.length > 0 && (
        <section className="py-20 bg-[#f9fafb]">
          <div className="max-w-350 mx-auto px-[5%]">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-12">
              Other Companies You May Be Interested In
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-[20px] p-8 transition-all duration-400 border border-gray-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                >
                  <div className="w-20 h-20 bg-[#f9fafb] rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                    {c.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.logo_url}
                        alt={c.name ?? ""}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-display font-bold text-[0.75rem] text-primary text-center p-2 leading-tight">
                        {getCompanyLogoText(c.name)}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-text mb-2">{c.name}</h4>
                  {c.category && (
                    <span className="inline-block bg-accent/10 text-primary-light px-3.5 py-1.5 rounded-[20px] text-[0.75rem] font-semibold mb-4">
                      {c.category}
                    </span>
                  )}
                  {(c.description_en || c.description_id) && (
                    <p className="text-[0.9rem] text-text-light leading-[1.7] mb-6 line-clamp-2">
                      {language === "en" ? c.description_en || c.description_id : c.description_id || c.description_en}
                    </p>
                  )}
                  <Link
                    href={`/companies/${c.id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-[0.9rem] transition-all duration-300 hover:gap-3"
                  >
                    View Details <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
