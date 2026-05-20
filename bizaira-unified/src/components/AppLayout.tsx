import { ReactNode, useState } from "react";
import BottomNav from "./BottomNav";
import CookieSettings from "./CookieSettings";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Wand2, HelpCircle, User, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { getActivityStats } from "@/lib/activity-tracker";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t, lang } = useI18n();
  const isHe = lang === "he";
  const { user, profile } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalActions, limit, nextRenewalDate } = getActivityStats();
  const isLocked = totalActions >= limit;
  const isStudioPath = location.pathname.startsWith("/create");
  const renewalDateText = nextRenewalDate
    ? nextRenewalDate.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
    : lang === "he"
    ? "תאריך לא זמין"
    : "Date unavailable";
  const upgradeButtonLabel = lang === "he" ? "שדרג ל-PRO" : "Upgrade to PRO";

  const navItems = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/create", icon: Wand2, label: t("nav.create") },
    { to: "/dashboard", icon: User, label: t("nav.dashboard") },
    { to: "/support", icon: HelpCircle, label: t("nav.support") },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div dir={isHe ? "rtl" : "ltr"} className={`min-h-screen flex flex-col bg-white ${isHe ? "text-right" : "text-left"}`}>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
      >
        {t("app.skipToContent")}
      </a>

      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-3 right-3 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-sm"
          aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile side menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={closeMenu}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">{t("nav.menu")}</h2>
                <button onClick={closeMenu} className="p-1" aria-label={t("nav.close")}>
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isLocked ? "pointer-events-none opacity-50" : "hover:bg-gray-100"}`}
                    aria-disabled={isLocked}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Language toggle — floating top corner */}
      <main id="main-content" className="flex-1 pb-20">{children}</main>
      {isLocked && isStudioPath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001830]/20 p-6">
          <div className="pointer-events-none absolute inset-0 bg-[#001830]/10 backdrop-blur-xl" />
          <div className="relative w-full max-w-2xl rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-[0_32px_80px_rgba(0,24,48,0.18)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#001830] mb-3">
              {t("app.limit.title")}
            </p>
            <h2 className="text-3xl font-extrabold text-[#001830] mb-4">
              {t("app.limit.subtitle")}
            </h2>
            <p className="text-sm leading-7 text-slate-600 mb-6">
              {t("app.limit.desc")}
            </p>
            <div className="rounded-[24px] border border-slate-200/80 bg-[#F8F7F2] p-6">
              <p className="text-sm text-slate-600 mb-4">
                {t("app.limit.upgrade")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-[#001830] text-sm font-medium">
                  <Clock size={18} />
                  <span>{renewalDateText}</span>
                </div>
                <button
                  onClick={() => window.location.assign("/pricing")}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#001830] px-6 py-3 text-sm font-semibold text-[#F5F5DC] transition hover:bg-[#03172c]"
                >
                  {upgradeButtonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="bg-white border-t border-gray-100 py-2 px-4 text-center">
        <div className="flex justify-center items-center gap-4">
          <Link to="/accessibility" className="text-xs text-gray-500 hover:text-gray-700">
            {t("footer.accessibility")}
          </Link>
          <CookieSettings />
        </div>
      </footer>
      {!(!user && location.pathname === "/") && <BottomNav />}
    </div>
  );
};

export default Layout;
