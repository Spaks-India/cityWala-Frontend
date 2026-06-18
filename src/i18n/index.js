import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../i18n/locals/en.json";
import hi from "../i18n/locals/hi.json";
import ar from "../i18n/locals/ar.json";
import bn from "../i18n/locals/bn.json";
import ch from "../i18n/locals/ch.json";
import de from "../i18n/locals/de.json";
import fr from "../i18n/locals/fr.json";
import id from "../i18n/locals/id.json";
import it from "../i18n/locals/it.json";
import ja from "../i18n/locals/ja.json";
import ko from "../i18n/locals/ko.json";
import nl from "../i18n/locals/nl.json";
import pt from "../i18n/locals/pt.json";
import ru from "../i18n/locals/ru.json";
import th from "../i18n/locals/th.json";
import tr from "../i18n/locals/tr.json";
import vi from "../i18n/locals/vi.json";

// ⚠️ fix this naming (Sp.json is bad practice)
import es from "../i18n/locals/es.json";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ar: { translation: ar },
    bn: { translation: bn },
    ch: { translation: ch },
    de: { translation: de },
    fr: { translation: fr },
    id: { translation: id },
    it: { translation: it },
    ja: { translation: ja },
    ko: { translation: ko },
    nl: { translation: nl },
    pt: { translation: pt },
    ru: { translation: ru },
    th: { translation: th },
    tr: { translation: tr },
    vi: { translation: vi },
    es: { translation: es }
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
