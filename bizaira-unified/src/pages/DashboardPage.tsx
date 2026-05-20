import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingCart, Download, Rocket, Box, Headphones } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-white text-[#001830]" dir="rtl" style={{ fontFamily: "'Rubik', 'Inter', sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-[#001830]/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 rounded-2xl border border-[#E0E0E0] bg-white/80 px-4 py-2 text-[#001830]">
            <User size={18} strokeWidth={1.5} />
            <span className="text-sm font-semibold">Bizaira</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-[#E0E0E0] bg-white/80 px-4 py-3 text-right text-sm font-semibold text-[#001830]">
              <div>Free Plan</div>
              <div className="mt-1 text-xs text-[#001830]/70">5 / 5 credits</div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-[#001830] bg-[#000B18] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#001830]/90">
                התחברות
              </button>
              <button className="rounded-2xl border border-[#001830] bg-[#000B18] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#001830]/90">
                הרשמה
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-28">
        <section className="text-center">
          <div className="mx-auto max-w-[90vw]">
            <h1 className="whitespace-nowrap text-center text-2xl font-semibold tracking-tight text-[#001830] sm:text-3xl">
              ברוכים הבאים למרכז הניהול העסקי שלך
            </h1>
            <p className="mt-3 text-center text-sm text-[#001830]/70">
              בחר את הפעולה הבאה כדי להתקדם במהירות ובסטייל.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                id: 1,
                icon: ShoppingCart,
                title: "התחל ליצור",
                desc: "צור ותנהל תוכן מותאם במהירות ובדיוק.",
                path: "/create",
              },
              {
                id: 2,
                icon: User,
                title: "אזור אישי",
                desc: "עדכן פרטים ואפסן את העדפות המערכת.",
                path: "/profile",
              },
              {
                id: 3,
                icon: Rocket,
                title: "מעקב פעילות",
                desc: "צפה בנתוני ביצועים ודוחות שימוש תקופתיים.",
                path: "/create/analytics",
              },
              {
                id: 4,
                icon: Box,
                title: "ניהול מנוי",
                desc: "שדרג את התוכנית ונהל אפשרויות תשלום בקלות.",
                path: "/pricing",
              },
              {
                id: 5,
                icon: Headphones,
                title: "תמיכה",
                desc: "קבל מענה מהיר וסיוע טכני מקצועי.",
                path: "/support",
              },
            ].map((panel) => {
              const IconComponent = panel.icon;
              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => navigate(panel.path)}
                  className="group flex h-[34rem] w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white p-6 text-center transition-all duration-300 ease-in-out hover:bg-[#000B18]"
                >
                  <div className="space-y-6">
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-[#E0E0E0] bg-white text-[#001830] transition-colors duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:text-white">
                      <IconComponent size={26} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-white" />
                    </div>

                    <div className="space-y-4 px-2">
                      <h2 className="text-xl font-semibold text-[#001830] transition-colors duration-300 group-hover:text-white">
                        {panel.title}
                      </h2>
                      <p className="text-sm leading-6 text-[#4B5563] transition-colors duration-300 group-hover:text-white">
                        {panel.desc}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex w-full items-center justify-center rounded-full border border-[#E0E0E0] px-4 py-3 text-sm font-semibold text-[#001830] transition-all duration-300 group-hover:border-white group-hover:bg-white/10 group-hover:text-white">
                    פתח
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-[#001830]/10 bg-white py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-white px-5 py-3 text-sm font-semibold text-[#001830]">
            <User size={20} strokeWidth={1.5} />
            <span>אזור אישי</span>
          </button>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E0E0E0] bg-white text-[#001830]/60">
            <ShoppingCart size={18} strokeWidth={1.5} />
          </button>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#E0E0E0] bg-white text-[#001830]/60">
            <Download size={18} strokeWidth={1.5} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
