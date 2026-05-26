import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const cards = [
    {
      id: 1,
      title: "סטודיו AI",
      desc: "צור תמונות עסקיות ברזולוציה גבוהה ובטון פרימיום.",
      path: "/create/image-studio",
      featured: true,
    },
    {
      id: 2,
      title: "סטטוס אישי",
      desc: "נהל את החשבון, הקרדיטים והעדפות המערכת.",
      path: "/profile",
    },
    {
      id: 3,
      title: "ניתוחים עסקיים",
      desc: "קבל דוחות מהירים על ביצועי העסק שלך.",
      path: "/create/analytics",
    },
    {
      id: 4,
      title: "בחר מסלול",
      desc: "שדרג לתכנית פרימיום עם ניהול עסקי מקצועי.",
      path: "/pricing",
    },
    {
      id: 5,
      title: "תמיכה מקצועית",
      desc: "מצא פתרונות מהירים למוקדי שירות ותהליכים.",
      path: "/support",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl" style={{ fontFamily: "'Assistant', 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-light text-3xl md:text-4xl text-[#0A192F] tracking-tight">
              ברוכים הבאים למרכז הניהול העסקי שלך
            </h1>
            <p className="font-light text-sm md:text-base text-[#64748B] mt-3 opacity-90">
              בחר מסלול חכם, התחבר או צור חשבון לניהול עסקי מקצועי.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/auth?mode=login")}
                className="min-w-[160px] rounded-3xl bg-[#0A192F] px-6 py-3 text-sm font-light text-white transition hover:bg-[#0A192F]/90"
              >
                התחברות
              </button>
              <button
                onClick={() => navigate("/auth?mode=register")}
                className="min-w-[160px] rounded-3xl bg-[#0A192F] px-6 py-3 text-sm font-light text-white transition hover:bg-[#0A192F]/90"
              >
                הרשמה
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => navigate(card.path)}
              className={`group flex h-[18rem] w-full flex-col justify-between overflow-hidden rounded-[24px] bg-white border border-[#E2E8F0] p-6 text-right transition-all duration-300 ${card.featured ? "shadow-[0_16px_40px_rgba(10,25,47,0.08)]" : "shadow-[0_8px_20px_rgba(10,25,47,0.04)]"} hover:border-[#0A192F] hover:bg-[#0A192F] hover:text-white`}
            >
              <div className="space-y-4">
                {card.featured && (
                  <span className="inline-flex rounded-full bg-[#0A192F] px-3 py-1 text-[11px] font-light uppercase tracking-[0.26em] text-white">
                    הכי מומלץ
                  </span>
                )}
                <div className="space-y-3">
                  <h2 className="font-normal text-lg text-[#0A192F] transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h2>
                  <p className="font-light text-xs md:text-sm text-[#64748B] leading-relaxed transition-colors duration-300 group-hover:text-white/85">
                    {card.desc}
                  </p>
                </div>
              </div>
              <div className="inline-flex w-full items-center justify-center rounded-full border border-[#0A192F] px-4 py-3 text-sm font-light text-[#0A192F] transition-all duration-300 group-hover:border-transparent group-hover:bg-white/15 group-hover:text-white">
                פתח
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
