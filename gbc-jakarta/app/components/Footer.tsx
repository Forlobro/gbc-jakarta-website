"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-primary pt-14 pb-6 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Col 1: Logo + Desc + Social */}
          <div>
            <Image
              src="/images/logo-panjang.png"
              alt="GBC Jakarta"
              width={160}
              height={60}
              className="h-[50px] w-auto mb-4"
            />
            <p className="text-primary/60 text-sm leading-[1.8] mb-6 max-w-[260px]">
              {t("gyeonggi")}
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/gbc.jakarta" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300">
                <i className="fab fa-instagram text-sm" />
              </a>
              <a href="https://id.linkedin.com/company/gbcjakarta" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300">
                <i className="fab fa-linkedin-in text-sm" />
              </a>
              <a href="https://www.youtube.com/@gbcjakarta" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300">
                <i className="fab fa-youtube text-sm" />
              </a>
            </div>
          </div>

          {/* Col 2: Address + Contact */}
          <div>
            <h4 className="text-primary font-bold text-base mb-4">{t("officeAddress")}</h4>
            <p className="text-primary/60 text-sm leading-[1.8] mb-6">
              DBS Tower Suite #905,<br />
              Jl. Prof. Dr. Satrio Kav.3,<br />
              Kuningan, South Jakarta 12940
            </p>
            <h4 className="text-primary font-bold text-base mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary/60 text-sm">
                <i className="fas fa-phone text-accent text-xs w-4" />
                <a href="tel:+622139712135" className="hover:text-accent transition-colors">+62 21 3971 2135</a>
              </li>
              <li className="flex items-center gap-3 text-primary/60 text-sm">
                <i className="fas fa-envelope text-accent text-xs w-4" />
                <a href="mailto:gbcjkt@gbcprime.com" className="hover:text-accent transition-colors">gbcjkt@gbcprime.com</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-primary font-bold text-base mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                t("marketResearch"),
                t("businessMatching"),
                t("legalSupport"),
                t("tradePromotion"),
                t("partnerships"),
                t("industrial"),
                t("beautyLifestyle"),
                t("agriculture"),
                t("fb"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-primary/60 text-sm">
                  <span className="text-accent text-xs">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-primary/40 text-xs">
            &copy; 2026 GBC Jakarta. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-primary/40 text-xs">Supported by:</span>
            <Image src="/images/gbsa-logo.jpeg" alt="GBSA" width={60} height={20}
              className="h-[18px] w-auto mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/gyeonggi-logo.jpeg" alt="Gyeonggi-do" width={60} height={20}
              className="h-[18px] w-auto mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
