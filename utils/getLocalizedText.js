import i18n from "../i18n";

export const getLocalizedText = (field) => {
  const lang = i18n.language || "en";
  return field?.[lang] || field?.en || "";
};