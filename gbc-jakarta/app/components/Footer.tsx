"use client";

import Image from "next/image";
import { useTranslation } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-primary pt-4 pb-3 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-[5%]">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-3 items-center">

          {/* Col 1: Logo + Desc + Social */}
          <div>
            <Image
              src="/images/logo-panjang.png"
              alt="GBC Jakarta"
              width={140}
              height={50}
              className="h-[45px] w-auto mb-4 rounded-xl"
            />
            <p className="text-primary/60 text-[0.82rem] leading-[1.8] mb-5 max-w-[300px] text-justify">
              {t("gyeonggi")}
            </p>
            <div className="flex gap-2.5">
              <a href="https://www.instagram.com/gbc.jakarta" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                <i className="fab fa-instagram text-sm" />
              </a>
              <a href="https://id.linkedin.com/company/gbcjakarta" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                <i className="fab fa-linkedin-in text-sm" />
              </a>
              <a href="https://www.youtube.com/@GBCJakarta-official" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                <i className="fab fa-youtube text-sm" />
              </a>
            </div>
          </div>

          {/* Col 2: Address + Contact */}
          <div>
            <h4 className="text-primary font-bold text-[0.95rem] mb-3">{t("officeAddress")}</h4>
            <p className="text-primary/60 text-[0.82rem] leading-[1.8] mb-5">
              DBS Tower Suite #905,<br />
              Jl. Prof. Dr. Satrio Kav.3,<br />
              Kuningan, South Jakarta 12940
            </p>
            <h4 className="text-primary font-bold text-[0.95rem] mb-3">{t("footerContact")}</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-primary/60 text-[0.82rem]">
                <i className="fas fa-phone text-accent text-[0.7rem] w-3" />
                <a href="tel:+622139712135" className="hover:text-accent transition-colors">+62 21 3971 2135</a>
              </li>
              <li className="flex items-center gap-2.5 text-primary/60 text-[0.82rem]">
                <i className="far fa-envelope text-accent text-[0.7rem] w-3" />
                <a href="mailto:chat.gbcjkt@gmail.com" className="hover:text-accent transition-colors">chat.gbcjkt@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-primary font-bold text-[0.95rem] mb-3">{t("footerServices")}</h4>
            <ul className="space-y-2.5">
              {[
                t("marketResearch"),
                t("businessMatching"),
                t("tradePromotion"),
                t("partnerships"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-primary/60 text-[0.82rem]">
                  <span className="text-accent">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-primary/40 text-[0.72rem]">
            {t("footerCopyright")}
          </p>
          <div className="flex items-center gap-5">
            <span className="text-primary/40 text-[0.72rem]">{t("footerSupportedBy")}</span>
            <Image src="/images/gbsa-logo.jpeg" alt="GBSA" width={70} height={20}
              className="h-[14px] w-auto mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/gyeonggi-logo.jpeg" alt="Gyeonggi-do" width={70} height={20}
              className="h-[14px] w-auto mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>

      </div>
    </footer>
  );
}
