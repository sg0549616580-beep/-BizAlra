import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import CookieConsentPopup from "@/components/CookieConsentPopup";
import { useI18n } from "@/lib/i18n";
import { safeGetItem } from "@/lib/safe-storage";
import { safeGetSessionItem, safeRemoveSessionItem } from "@/lib/safe-storage";

// Luxury Color Palette
const DEEP_MIDNIGHT_BLUE = "#001830";

const HomePage = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const isHe = lang === "he";
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  useEffect(() => {
    // Check if user just completed onboarding and hasn't seen cookie consent
    const onboardingJustCompleted = safeGetSessionItem("onboarding_just_completed");
    const cookieConsentShown = safeGetItem("bizaira_cookie_consent_shown");

    if (onboardingJustCompleted && !cookieConsentShown) {
      setShowCookiePopup(true);
      // Clear the flag so it doesn't show again
      safeRemoveSessionItem("onboarding_just_completed");
    }
  }, []);

  const quickActions = [
    {
      title: isHe ? "ניתוח פיננסי מהיר" : "Quick Financial Analysis",
      description: isHe ? "היכנס לניתוח עסקי וצפה בתובנות עיקריות" : "Open business analysis and review the key insights",
      path: "/create/analytics",
    },
    {
      title: isHe ? "יצירת קמפיין שיווקי" : "Create a Marketing Campaign",
      description: isHe ? "התחל ביצירת תוכן ושיווק בסטודיו התמונות" : "Start content and marketing creation in the studio",
      path: "/create/image-studio",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-4 pb-24 sm:px-6 md:px-8" dir={isHe ? "rtl" : "ltr"}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 pt-10 md:pt-12">
        <header className="luxury-card p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-[#001830] md:text-4xl">
            {isHe ? "ברוכים הבאים למרכז הניהול העסקי שלך" : "Welcome to your business management hub"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#4A5568] md:text-base">
            {isHe ? "בחר מסלול חכם, התחבר או צור חשבון כדי להתחיל לנהל את העסק שלך בקלות ובסטייל." : "Choose a smart path, log in or sign up to start managing your business easily and elegantly."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="rounded-full border border-[#000B18] bg-[#000B18] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#001830]"
            >
              {isHe ? "התחברות" : "Login"}
            </button>
            <button
              onClick={() => navigate("/auth?mode=register")}
              className="rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#001830] transition hover:bg-[#F8FAFF]"
            >
              {isHe ? "הרשמה" : "Register"}
            </button>
          </div>
        </header>

        <section className="luxury-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4A5568]">
                {isHe ? "לוח תובנות AI" : "AI Business Insights Dashboard"}
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#001830] md:text-2xl">
                {isHe ? "ניתוח עסקי מרכזי" : "Core Business Analysis"}
              </h2>
            </div>
            <span className="rounded-full bg-[#001830]/6 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#001830]">
              {isHe ? "מצב ראשוני" : "Initial state"}
            </span>
          </div>

          <div className="mt-6 rounded-[18px] border border-dashed border-[#E2E8F0] bg-[#FAF9F6] p-5 md:p-6">
            <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <svg viewBox="0 0 320 180" className="h-40 w-full text-[#001830]" aria-label="Empty business chart preview">
                <rect x="0" y="0" width="320" height="180" rx="18" fill="#FAF9F6" />
                <path d="M28 132 C 70 98, 100 112, 140 88 S 210 44, 250 60 S 290 88, 292 50" fill="none" stroke="#001830" strokeWidth="3" strokeLinecap="round" />
                <path d="M28 132 L 28 36" stroke="#E2E8F0" strokeWidth="2" />
                <path d="M28 132 L 292 132" stroke="#E2E8F0" strokeWidth="2" />
                <path d="M28 94 L 292 94" stroke="#F1F5F9" strokeWidth="1" />
                <path d="M28 56 L 292 56" stroke="#F1F5F9" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm text-[#001830] md:text-base">
            {isHe ? "נסרקו 0 נתונים החודש. חבר מקור מידע או העלה דוח ראשון כדי לקבל תובנות AI חכמות." : "0 data points were scanned this month. Connect a data source or upload your first report to unlock smart AI insights."}
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-[#001830] md:text-2xl">{isHe ? "פעולות מהירות" : "Quick Actions"}</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={action.title}
                type="button"
                onClick={() => navigate(action.path)}
                className="luxury-card flex w-full items-center justify-between gap-4 rounded-[18px] p-5 text-right transition hover:-translate-y-0.5 hover:bg-[#F8FAFF] md:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#001830]/10 text-[#001830]">
                    {index === 0 ? <BarChart3 size={20} /> : <Sparkles size={20} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#001830]">{action.title}</h3>
                    <p className="mt-1 text-sm text-[#4A5568]">{action.description}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-[#001830]" />
              </button>
            ))}
          </div>
        </section>

        <section className="luxury-card bg-[#F5F5DC] p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#001830] md:text-2xl">{isHe ? "הטיפ העסקי היומי שלך" : "Your Daily Business Tip"}</h2>
          <p className="mt-3 text-sm text-[#4A5568] md:text-base">
            {isHe ? "עסקים קטנים המשתמשים באוטומציה של תוכן חוסכים בממוצע כ-5 שעות שבועיות. נסה את סטודיו התמונות שלנו ליצירת פוסט מהיר עוד היום." : "Small businesses using content automation save an average of 5 hours per week. Try our image studio to create a quick post today."}
          </p>
        </section>
      </div>
      <CookieConsentPopup 
        isVisible={showCookiePopup} 
        onConsent={() => setShowCookiePopup(false)} 
      />
      <BottomNav />
    </div>
  );
};

export default HomePage;
