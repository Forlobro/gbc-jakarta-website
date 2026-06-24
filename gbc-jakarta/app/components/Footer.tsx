"use client"

import Image from "next/image"
import { useTranslation } from "../lib/LanguageContext"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-[5%] pt-14 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/LOGO GBC 2026.png"
              alt="GBC Jakarta"
              width={140}
              height={50}
              style={{ height: "60px", width: "auto" }}
              className="mb-4 rounded-xl"
            />
            <p className="text-gray-500 text-[0.83rem] leading-[1.9] mb-6 max-w-[260px] text-justify">
              {t("gyeonggi")}
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://www.instagram.com/gbc.jakarta", icon: "fab fa-instagram" },
                { href: "https://id.linkedin.com/company/gbcjakarta", icon: "fab fa-linkedin-in" },
                { href: "https://www.youtube.com/@GBCJakarta-official", icon: "fab fa-youtube" },
              ].map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
                >
                  <i className={`${icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-primary font-bold text-[0.9rem] mb-4 pb-2 border-b border-gray-200">
              {t("footerServices")}
            </h4>
            <ul className="space-y-3">
              {[t("marketResearch"), t("businessMatching"), t("tradePromotion")].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-500 text-[0.82rem]">
                  <span className="text-accent mt-[3px] shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Address */}
          <div>
            <h4 className="text-primary font-bold text-[0.9rem] mb-4 pb-2 border-b border-gray-200">
              {t("officeAddress")}
            </h4>
            <address className="not-italic text-gray-500 text-[0.82rem] leading-[1.9]">
              DBS Tower Suite #905,
              <br />
              Jl. Prof. Dr. Satrio Kav.3,
              <br />
              Kuningan, South Jakarta 12940
            </address>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-primary font-bold text-[0.9rem] mb-4 pb-2 border-b border-gray-200">
              {t("footerContact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-gray-500 text-[0.82rem]">
                <i className="fas fa-phone text-accent text-[0.65rem] w-3 shrink-0" />
                <a href="tel:+622139712135" className="hover:text-accent transition-colors">
                  +62 21 3971 2135
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500 text-[0.82rem]">
                <i className="far fa-envelope text-accent text-[0.65rem] w-3 shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=chat.gbcjkt@gmail.com&subject=Pertanyaan%20%2F%20Informasi%20-%20GBC%20Jakarta&body=Halo%20Tim%20GBC%20Jakarta%2C%0A%0ASaya%20ingin%20mengetahui%20lebih%20lanjut%20mengenai%20%5Btopik%5D.%0A%0ANama%3A%20%0APerusahaan%2FInstitusi%3A%20%0ANomor%20HP%3A%20%0A%0APesan%3A%0A%0A%0ATerima%20kasih."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors break-all"
                >
                  chat.gbcjkt@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500 text-[0.82rem]">
                <i className="fab fa-whatsapp text-accent text-[0.65rem] w-3 shrink-0" />
                <a
                  href="https://wa.me/628111300313?text=Hello%20GBC%20Jakarta%20Team%2C%0A%0AI%20would%20like%20to%20get%20in%20touch%20and%20learn%20more%20about%20your%20services.%0A%0AName%3A%20%0ACompany%2FInstitution%3A%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  +62 8111 300 313
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-[0.72rem] text-center sm:text-left">
            {t("footerCopyright")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-[0.72rem]">{t("footerSupportedBy")}</span>
            <Image
              src="/images/gbsa-logo.jpeg"
              alt="GBSA"
              width={70}
              height={20}
              style={{ width: "auto", height: "14px" }}
              className="mix-blend-multiply opacity-60 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/gyeonggi-logo.jpeg"
              alt="Gyeonggi-do"
              width={70}
              height={20}
              style={{ width: "auto", height: "14px" }}
              className="mix-blend-multiply opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
