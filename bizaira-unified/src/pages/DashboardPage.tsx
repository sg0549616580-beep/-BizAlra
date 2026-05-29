import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const quickActions = [
    { title: "ניתוח פיננסי מהיר", description: "היכנס לניתוח עסקי וצפה בתובנות עיקריות", path: "/create/analytics" },
    { title: "יצירת קמפיין שיווקי", description: "התחל ביצירת תוכן ושיווק בסטודיו התמונות", path: "/create/image-studio" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-4 pb-24 sm:px-6 md:px-8" dir="rtl">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 py-10 md:py-12">
        <section className="luxury-card p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-[#001830] md:text-4xl">ברוכים הבאים למרכז הניהול העסקי שלך</h1>
          <p className="mt-3 max-w-2xl text-sm text-[#4A5568] md:text-base">בחר מסלול חכם, התחבר או צור חשבון לניהול עסקי מקצועי.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="rounded-full border border-[#000B18] bg-[#000B18] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#001830]"
            >התחברות</button>
            <button
              onClick={() => navigate("/auth?mode=register")}
              className="rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#001830] transition hover:bg-[#F8FAFF]"
            >הרשמה</button>
          </div>
        </section>

        <section className="luxury-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4A5568]">AI Business Insights Dashboard</p>
              <h2 className="mt-2 text-xl font-bold text-[#001830] md:text-2xl">ניתוח עסקי מרכזי</h2>
            </div>
            <span className="rounded-full bg-[#001830]/6 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#001830]">מצב ראשוני</span>
          </div>
          <div className="mt-6 rounded-[18px] border border-dashed border-[#E2E8F0] bg-[#FAF9F6] p-5 md:p-6">
            <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <svg viewBox="0 0 320 180" className="h-40 w-full text-[#001830]" aria-label="Empty business chart preview">
                <rect x="0" y="0" width="320" height="180" rx="18" fill="#FAF9F6" />
                <path d="M28 132 C 70 98, 100 112, 140 88 S 210 44, 250 60 S 290 88, 292 50" fill="none" stroke="#001830" strokeWidth="3" strokeLinecap="round" />
                <path d="M28 132 L 28 36" stroke="#E2E8F0" strokeWidth="2" />
                <path d="M28 132 L 292 132" stroke="#E2E8F0" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-sm text-[#001830] md:text-base">נסרקו 0 נתונים החודש. חבר מקור מידע או העלה דוח ראשון כדי לקבל תובנות AI חכמות.</p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-[#001830] md:text-2xl">פעולות מהירות</h2>
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
          <h2 className="text-xl font-bold text-[#001830] md:text-2xl">הטיפ העסקי היומי שלך</h2>
          <p className="mt-3 text-sm text-[#4A5568] md:text-base">עסקים קטנים המשתמשים באוטומציה של תוכן חוסכים בממוצע כ-5 שעות שבועיות. נסה את סטודיו התמונות שלנו ליצירת פוסט מהיר עוד היום.</p>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
