import Polyglot from "node-polyglot";

const lang_en = {
  label_skills: "Skills",
  sign_in: "Sign in",
  forgot_password: "Forgot Password",
  title_skills: "Skills",
};

const lang_tr = {
  label_skills: "Skiller",
  sign_in: "Giriş",
  forgot_password: "Şifremi Unuttum",
  title_skills: "Skiller",
};

type I18nContextType = {
  polyglot: Polyglot | null;
};

export const I18nContext: I18nContextType = {
  polyglot: null,
};

export function initI18n(selectedLanguage: string): void {
  const polyglot = new Polyglot();
  const selectedConfig = selectedLanguage === "en" ? lang_en : lang_tr;
  polyglot.extend(selectedConfig);
  I18nContext.polyglot = polyglot;
}
