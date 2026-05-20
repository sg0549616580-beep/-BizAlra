import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const NAVY = "#000810";
const PURPLE = "#000810";

const SupportPage = () => {
  const { t, lang } = useI18n();
  const isHe = lang === "he";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <div className="px-5 pt-8 pb-28 max-w-xl mx-auto" dir={isHe ? "rtl" : "ltr"}>
      <div className="mb-8 animate-float-up">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
          {isHe ? "מרכז עזרה" : "Help Center"}
        </p>
        <h1 className="text-3xl font-black mb-2" style={{ color: NAVY }}>
          {t("support.title")}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("support.subtitle")}
        </p>
      </div>

      <section className="mb-10 animate-float-up" style={{ animationDelay: "60ms" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F2F5F9]">
            <HelpCircle size={18} strokeWidth={1.6} style={{ color: PURPLE }} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{isHe ? "שאלות נפוצות" : "FAQ"}</p>
            <h2 className="text-xl font-bold" style={{ color: NAVY }}>
              {isHe ? "תשובות מהירות לעסק שלך" : "Fast answers for your business"}
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="glass-card rounded-3xl overflow-hidden border border-[#E5E7EB]">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-start"
                >
                  <span className="text-sm font-semibold text-[#001830]">{faq.q}</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#475569] transition">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-[#E5E7EB] px-5 py-4 bg-white">
                    <p className="text-sm leading-7 text-slate-600">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="animate-float-up" style={{ animationDelay: "120ms" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F2F5F9]">
            <Search size={18} strokeWidth={1.6} style={{ color: PURPLE }} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{isHe ? "עזרה מהירה" : "Quick help"}</p>
            <h2 className="text-xl font-bold" style={{ color: NAVY }}>
              {isHe ? "מצא תשובות חכמות בשבריר שנייה" : "Find smart guidance in seconds"}
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {isHe
              ? "הקלד בקצרה את הצורך העסקי שלך ונכוון אותך לכלי המתאים ביותר."
              : "Type your business need and we’ll guide you to the right tool."}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHe ? "חפש FAQ, כלי או טיפ מהיר..." : "Search FAQ, tool, or quick tip..."}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#000B18]/10"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-[#000B18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#001830]"
              onClick={() => {}}
            >
              <Search size={16} className="me-2" />
              {isHe ? "חפש" : "Search"}
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            {isHe ? "הכלי משפר את חוויית התמיכה המהירה בלבד." : "This search improves your quick support experience only."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
