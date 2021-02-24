import Polyglot from "node-polyglot";

const lang_en = {
  label_skills: "All Skills",
  sign_in: "Sign in",
  forgot_password: "Forgot Password",
  title_skills: "Skills",
  title_programming_language: "Programming Language",
  title_description: "Description",
  title_skill_steps: "Skill steps",
  title_skill_step_video_resources: "Video Resources",
  title_skill_step_text_resources: "Text Resources",
  title_my_skills: "My Skills",
  title_additional_resources: "Resources",
  title_settings: "Settings",
  title_settings_dark_theme: "Dark Theme",
  tab_dashboard: "Dashboard",
  tab_my_skills: "My Skills",
  tab_all_skills: "Skills",
  tab_settings: "Settings",
  title_dashboard: "Dashboard",
  title_settings_language: "Language",
  title_dashboard_news: "News",
  title_dashboard_info_label: "Oh you have not select any skill yet ? You will be able to get the latest news from your selected skills, add a skill and stay up-to-date !",
  title_my_skills_info_label: "Oh you have not select any skill yet ? Add some skills to start learning new skills everyday !"
};

const lang_tr = {
  label_skills: "Skiller",
  sign_in: "Giriş",
  forgot_password: "Şifremi Unuttum",
  title_skills: "Tüm Skiller",
  title_programming_language: "Programlama Dili",
  title_description: "Açıklama",
  title_skill_steps: "Skill Adımları",
  title_skill_step_video_resources: "Video Kaynaklar",
  title_skill_step_text_resources: "Metin Kaynaklar",
  title_my_skills: "Skillerim",
  title_additional_resources: "Ek Kaynaklar",
  title_settings: "Ayarlar",
  title_settings_dark_theme: "Dark Tema",
  tab_dashboard: "Ana Sayfa",
  tab_my_skills: "Skillerim",
  tab_all_skills: "Skiller",
  tab_settings: "Ayarlar",
  title_dashboard: "Ana Sayfa",
  title_settings_language: "Dil",
  title_dashboard_news: "Haberler",
  title_dashboard_info_label: "Skill seçmemişsiniz ? seçtiğiniz skillerin son gelişmelerini buradan takip edebileceksiniz, hemen skill ekleyin ve güncel kalın !",
  title_my_skills_info_label: "Skill seçmemişsiniz, skill listesinden skill seçerek her gün yeni yetenekler öğrenin !"
};

type I18nContextType = {
  polyglot: Polyglot | null;
};

export const I18nContext: I18nContextType = {
  polyglot: null,
};

export function initI18n(language: number): void {
  const polyglot = new Polyglot();
  const selectedConfig = language === 0 ? lang_en : lang_tr;
  polyglot.extend(selectedConfig);
  I18nContext.polyglot = polyglot;
}
