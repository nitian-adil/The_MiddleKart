import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold text-white">
            {t("brand")}
          </h3>
          <p className="mt-2 text-sm">
            {t("tagline")}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">
            {t("quickLinks")}
          </h4>
          <ul className="space-y-1 text-sm">
            <li>{t("products")}</li>
            <li>{t("orders")}</li>
            <li>{t("cart")}</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">
            {t("contact")}
          </h4>
          <p className="text-sm">support@middlekart.com</p>
          <p className="text-sm">+91 8085575767</p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-sm mt-8 text-gray-500">
        © {new Date().getFullYear()} {t("brand")}. {t("rights")}
      </p>
    </footer>
  );
};

export default Footer;