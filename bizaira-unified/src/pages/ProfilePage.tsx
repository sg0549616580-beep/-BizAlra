import { useI18n } from "@/lib/i18n";
import { UserCircle2, Download, Ticket, Headphones, CreditCard, Settings } from "lucide-react";

const MIDNIGHT_BLUE = "#001830";
const PAGE_BACKGROUND = "#F5F5DC";

const ProfilePage = () => {
  const { lang } = useI18n();
  const isHe = lang === "he";

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: PAGE_BACKGROUND, color: MIDNIGHT_BLUE, fontFamily: "'Heebo', 'Assistant', sans-serif" }} dir={isHe ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[32px] bg-white p-6 sm:p-8 shadow-[0_24px_60px_-36px_rgba(0,24,48,0.18)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 rounded-[28px] bg-[#ECE7D9] p-6 shadow-sm sm:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white shadow-[0_10px_30px_-18px_rgba(0,24,48,0.25)]">
                <UserCircle2 size={36} style={{ color: MIDNIGHT_BLUE }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: MIDNIGHT_BLUE }}>אזור אישי</p>
                <p className="mt-2 text-sm text-[#4B5563] max-w-xs">כרטיס חשבון מודרני ועדכני ללא מרכיבים מיותרים.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FFFFFF] p-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="inline-flex items-center rounded-full border border-[#001830] bg-white px-3 py-1 text-sm font-semibold text-[#001830]">
                  Free Plan
                </span>
                <button className="inline-flex items-center justify-center rounded-3xl bg-[#001830] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d294d]">
                  שדרוג ל-PRO
                </button>
              </div>

              <div className="rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FFFFFF] p-5">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold" style={{ color: MIDNIGHT_BLUE }}>5 / 5 קרדיטים</p>
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                    <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: MIDNIGHT_BLUE }} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FFFFFF] p-5 text-sm text-[#4B5563] sm:flex-row sm:justify-between">
                <span>0% שימוש ראשון</span>
                <span>0% חידוש הבא</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] bg-white p-6 sm:p-8 shadow-[0_24px_60px_-36px_rgba(0,24,48,0.18)]">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: MIDNIGHT_BLUE }}>פעולות אחרונות</h2>
            <p className="mt-2 text-sm text-[#4B5563]">הפעילות שלך החודש</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FBFBFB] p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EFF8] text-[#001830]">
                <UserCircle2 size={30} />
              </div>
              <p className="text-5xl font-semibold" style={{ color: MIDNIGHT_BLUE }}>0</p>
              <div>
                <p className="text-base font-semibold" style={{ color: MIDNIGHT_BLUE }}>יצירות שבוצעו</p>
                <p className="mt-1 text-sm text-[#6B7280]">באנר שיווקי</p>
              </div>
            </div>

            <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FBFBFB] p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EFF8] text-[#001830]">
                <Download size={30} />
              </div>
              <p className="text-5xl font-semibold" style={{ color: MIDNIGHT_BLUE }}>0</p>
              <div>
                <p className="text-base font-semibold" style={{ color: MIDNIGHT_BLUE }}>הורדות</p>
                <p className="mt-1 text-sm text-[#6B7280]">באנר שיווקי</p>
              </div>
            </div>

            <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FBFBFB] p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EFF8] text-[#001830]">
                <Ticket size={30} />
              </div>
              <p className="text-5xl font-semibold" style={{ color: MIDNIGHT_BLUE }}>0</p>
              <div>
                <p className="text-base font-semibold" style={{ color: MIDNIGHT_BLUE }}>יצירת קופון</p>
                <p className="mt-1 text-sm text-[#6B7280]">באנר שיווקי</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] bg-white p-6 sm:p-8 shadow-[0_24px_60px_-36px_rgba(0,24,48,0.18)]">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: MIDNIGHT_BLUE }}>פעולות מהירות</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <button className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FBFBFB] p-6 text-center transition hover:bg-[#F3F6FA]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EFF8] text-[#001830]">
                <Headphones size={24} />
              </div>
              <span className="text-base font-semibold" style={{ color: MIDNIGHT_BLUE }}>תמיכה</span>
            </button>

            <button className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FBFBFB] p-6 text-center transition hover:bg-[#F3F6FA]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EFF8] text-[#001830]">
                <CreditCard size={24} />
              </div>
              <span className="text-base font-semibold" style={{ color: MIDNIGHT_BLUE }}>ניהול מנוי</span>
            </button>

            <button className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-[rgba(0,24,48,0.08)] bg-[#FBFBFB] p-6 text-center transition hover:bg-[#F3F6FA]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EFF8] text-[#001830]">
                <Settings size={24} />
              </div>
              <span className="text-base font-semibold" style={{ color: MIDNIGHT_BLUE }}>הגדרות חשבון</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
