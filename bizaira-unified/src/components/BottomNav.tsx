import { NavLink as RouterNavLink } from "react-router-dom";
import { Home, Wand2, User, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const NAVY = "#001830";
const ACTIVE = "#001830";

const BottomNav = () => {
  const { t, lang } = useI18n();
  const isHe = lang === "he";

  const navItems = [
    { 
      to: "/", 
      icon: Home, 
      label: t("nav.home")
    },
    { 
      to: "/create", 
      icon: Wand2, 
      label: t("nav.create")
    },
    { 
      to: "/profile", 
      icon: User, 
      label: t("nav.dashboard")
    },
    { 
      to: "/support", 
      icon: HelpCircle, 
      label: t("nav.support")
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE2E6" }}
      dir={isHe ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex-1"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-300 rounded-xl"
                   style={{
                     backgroundColor: isActive ? "#FEF7F0" : "transparent",
                     padding: isActive ? "12px 8px" : "8px",
                   }}
              >
                <item.icon
                  size={22}
                  strokeWidth={1.5}
                  style={{
                    color: isActive ? NAVY : "#D1D5DB",
                    transition: "color 300ms ease-in-out",
                  }}
                />
                <span
                  className="text-[10px] font-medium leading-none"
                  style={{
                    color: isActive ? NAVY : "#D1D5DB",
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: "'Heebo', 'Assistant', sans-serif",
                    transition: "color 300ms ease-in-out, font-weight 300ms ease-in-out",
                  }}
                >
                  {item.label}
                </span>
              </div>
            )}
          </RouterNavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
