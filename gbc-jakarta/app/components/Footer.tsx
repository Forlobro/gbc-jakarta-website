"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-primary pt-10 pb-6 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[51px] mb-[51px]">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-panjang.png"
              alt="GBC Jakarta"
              width={160}
              height={60}
              className="h-[60px] w-auto mb-[19px] rounded-xl"
            />
            <p className="text-primary/60 text-[0.76rem] leading-[1.8] max-w-[240px]">
              {t("gyeonggi")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[1.2rem] font-bold mb-[19px] text-primary">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/#companies" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("companies")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[1.2rem] font-bold mb-[19px] text-primary">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("marketResearch")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("businessMatching")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("tradePromotion")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("partnerships")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-[1.2rem] font-bold mb-[19px] text-primary">Industries</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/#companies" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("gmsCompanies")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-primary/60 text-[0.9rem] transition-colors duration-300 hover:text-accent">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/10 pt-[26px] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-primary/50 text-[0.72rem]">
            &copy; 2026 GBC Jakarta. All rights reserved.
          </p>
          <div className="flex items-center gap-[26px]">
            <span className="text-primary/50 text-[0.68rem]">Supported by:</span>
            <Image
              src="/images/gbsa-logo.jpeg"
              alt="GBSA"
              width={78}
              height={20}
              className="h-[10px] w-auto opacity-100 transition-opacity duration-300 hover:opacity-100"
            />
            <Image
              src="/images/gyeonggi-logo.jpeg"
              alt="Gyeonggi-do"
              width={78}
              height={20}
              className="h-[10px] w-auto opacity-100 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
