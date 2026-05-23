import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";

const SupportPage = () => {
  const { t, lang } = useI18n();
  const isHe = lang === "he";
  const { user, profile } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<{ title: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  const getAiResponse = (query: string): { title: string; content: string } => {
    const lowerQuery = query.toLowerCase().trim();
    const normalizedQuery = query.trim();

    // General greetings
    if (lowerQuery === "היי" || lowerQuery === "שלום" || lowerQuery === "מה קורה" || lowerQuery === "היי!" || lowerQuery === "שלום!") {
      return {
        title: isHe ? "ברוכים הבאים" : "Welcome",
        content: isHe
          ? "היי! במה אני יכול לעזור לך היום?"
          : "Hey! How can I help you today?",
      };
    }

    // Platform features and how it works
    if (
      lowerQuery.includes("פיצ'רים") ||
      lowerQuery.includes("features") ||
      lowerQuery.includes("איך זה עובד") ||
      lowerQuery.includes("how does it work") ||
      lowerQuery.includes("bizaira") ||
      lowerQuery.includes("כלים") ||
      lowerQuery.includes("tools") ||
      lowerQuery.includes("יוצרים") ||
      lowerQuery.includes("create")
    ) {
      return {
        title: isHe ? "אודות BizAIra" : "About BizAIra",
        content: isHe
          ? "BizAIra היא פלטפורמת AI מתקדמת לבעלי עסקים. אנחנו מציעים כלים חכמים ליצירת תוכן שיווקי, תמונות מוצר, ניתוחי עסקים וניהול זמן — הכול בלחיצת כפתור. ניתן להתחיל בחינם עם 5 יצירות בחודש."
          : "BizAIra is an advanced AI platform for business owners. We offer smart tools for creating marketing content, product images, business analytics, and time management — all with one click. Start free with 5 creations per month.",
      };
    }

    // Email queries
    if (
      (isHe && lowerQuery.includes("אימייל")) ||
      lowerQuery.includes("email") ||
      (isHe && lowerQuery.includes("דואר"))
    ) {
      if (user?.email) {
        return {
          title: isHe ? "כתובת הדואר שלך" : "Your Email",
          content: isHe
            ? `אתה מחובר עם: <strong>${user.email}</strong>`
            : `You are logged in with: <strong>${user.email}</strong>`,
        };
      }
      return {
        title: isHe ? "כתובת אימייל" : "Email Address",
        content: isHe
          ? "כדי לראות את כתובת האימייל שלך, אנא התחבר לחשבונך."
          : "To view your email address, please log in to your account.",
      };
    }

    // Account/Profile questions
    if (
      (isHe && (lowerQuery.includes("פרטים") || lowerQuery.includes("חשבון") || lowerQuery.includes("פרופיל"))) ||
      lowerQuery.includes("account") ||
      lowerQuery.includes("profile") ||
      lowerQuery.includes("details")
    ) {
      if (profile?.full_name) {
        return {
          title: isHe ? "פרופיל משתמש" : "User Profile",
          content: isHe
            ? `שלום <strong>${profile.full_name}</strong>! פרטי הפרופיל שלך כולל את כל מידע החשבון וההגדרות האישיות שלך.`
            : `Hello <strong>${profile.full_name}</strong>! Your profile contains all your account information and personal settings.`,
        };
      }
      return {
        title: isHe ? "פרופיל משתמש" : "User Profile",
        content: isHe
          ? "כדי לראות את פרטי הפרופיל שלך, אנא התחבר לחשבונך."
          : "To view your profile details, please log in to your account.",
      };
    }

    // Pricing questions
    if (
      (isHe && (lowerQuery.includes("מחיר") || lowerQuery.includes("עלות") || lowerQuery.includes("תכנית"))) ||
      lowerQuery.includes("price") ||
      lowerQuery.includes("cost") ||
      lowerQuery.includes("plan")
    ) {
      return {
        title: isHe ? "תכניות ותמחור" : "Plans & Pricing",
        content: isHe
          ? "אנחנו מציעים תכנית התנסות חינמית עם 5 יצירות בחודש. לעסקים הרוצים עוד, יש לנו מסלולים מתקדמים בהתאמה אישית לצרכי העסק שלך."
          : "We offer a free trial plan with 5 creations per month. For businesses wanting more, we have advanced plans customized to your needs.",
      };
    }

    // Help/Support
    if (
      (isHe && (lowerQuery.includes("עזרה") || lowerQuery.includes("בעיה") || lowerQuery.includes("תקלה"))) ||
      lowerQuery.includes("help") ||
      lowerQuery.includes("issue") ||
      lowerQuery.includes("problem")
    ) {
      return {
        title: isHe ? "תמיכה וסיוע" : "Support & Assistance",
        content: isHe
          ? "אנחנו כאן בשביל לעזור! אם יש לך שאלה כלשהי או חווית בעיה, נשמח לתמוך בך. אתה יכול לצפות בשאלות הנפוצות שלנו למעלה או לפנות אלינו ישירות."
          : "We're here to help! If you have any questions or experienced an issue, we're happy to support you. You can check our FAQ above or reach out directly.",
      };
    }

    // Generic encouraging response
    return {
      title: isHe ? "תשובה חכמה" : "Smart Response",
      content: isHe
        ? `כל עוד אתה חדש בפלטפורמה או מחפש עזרה, אנחנו כאן בשביל לך. השאלה שלך על "<strong>${normalizedQuery}</strong>" מעניינת, וגם קיימות אפשרויות נוספות בתפריט העזרה שלנו.`
        : `Whether you're new to the platform or looking for help, we're here for you. Your question about "<strong>${normalizedQuery}</strong>" is important, and there are also additional options in our help menu.`,
    };
  };

  const handleSearch = async () => {
    const nextQuery = searchQuery.trim();
    if (!nextQuery) return;

    setSearchQuery(nextQuery);
    setSubmittedQuery(nextQuery);
    setOpenFaq(null);
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      setAiResponse(getAiResponse(nextQuery));
      setIsLoading(false);
    }, 400);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFaqs = normalizedQuery
    ? faqs.filter((faq) => {
        const content = `${faq.q} ${faq.a}`.toLowerCase();
        return content.includes(normalizedQuery);
      })
    : faqs;

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-5 pt-10 pb-28" dir={isHe ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#64748B] mb-3">
            {isHe ? "מרכז תמיכה" : "Support Center"}
          </p>
          <h1 className="text-5xl font-black tracking-tight text-[#001830] mb-4">
            {t("support.title")}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[#475569]">
            {isHe ? "היעזרו ב-AI החכם שלנו או עיינו בשאלות הנפוצות" : "Use our smart AI assistant or browse frequently asked questions"}
          </p>
        </div>

        <section className="mb-8 space-y-4">
          <div className="rounded-[32px] border border-[#000B18] bg-white p-6 shadow-[0_24px_60px_rgba(0,11,24,0.08)]">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-widest text-[#001830]/60">
                {isHe ? "עוזר חכם AI" : "Smart AI Assistant"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#001830]">
                {isHe ? "עוזר חכם AI" : "Smart AI Assistant"}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder={isHe ? "שאל שאלה..." : "Ask a question..."}
                className="flex-1 min-w-0 rounded-full border border-[#000B18] bg-[#F8F9FA] px-5 py-4 text-sm text-[#001830] placeholder:text-[#001830]/40 shadow-[0_18px_40px_rgba(0,11,24,0.08)] focus:border-[#001830] focus:outline-none focus:ring-2 focus:ring-[#001830]/20 transition"
              />
              <button
                type="button"
                disabled={!searchQuery.trim() || isLoading}
                className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-[#001830] px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#001830]/90 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSearch}
              >
                {isLoading ? (isHe ? "מעבד..." : "Processing...") : isHe ? "חפש" : "Search"}
              </button>
            </div>
            <p className="mt-4 text-xs leading-6 text-[#475569]">
              {isHe ? "נשמח לענות על כל שאלה" : "We're happy to help with any question"}
            </p>
          </div>
        </section>

        {/* AI Response Section */}
        {aiResponse && (
          <section className="mb-8">
            <div className="rounded-[28px] border border-[#000B18] bg-white p-6 shadow-[0_12px_30px_rgba(0,11,24,0.08)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#001830] mb-3">
                {aiResponse.title}
              </h3>
              <p
                className="text-sm leading-7 text-[#0F172A]"
                dangerouslySetInnerHTML={{ __html: aiResponse.content }}
              />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="space-y-3">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-[#001830]/60">
              {isHe ? "שאלות נפוצות" : "Frequently Asked Questions"}
            </p>
          </div>

          {submittedQuery && filteredFaqs.length === 0 ? (
            <div className="rounded-[28px] border border-[#000B18] bg-white p-12 text-center">
              <p className="text-sm font-semibold text-[#001830]">
                {isHe
                  ? "לא נמצאו תוצאות מתאימות ל-FAQ. אנא פנה אלינו לעזרה ישירה."
                  : "No matching FAQ results found. Please contact us for direct assistance."}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`overflow-hidden rounded-[28px] border border-[#000B18] transition-all duration-300 ${
                    isOpen
                      ? "bg-[#001830] shadow-[0_16px_40px_rgba(0,11,24,0.12)]"
                      : "bg-white shadow-[0_8px_24px_rgba(0,11,24,0.06)] hover:shadow-[0_12px_32px_rgba(0,11,24,0.08)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`group w-full flex items-center justify-between px-6 py-5 text-start transition-colors duration-200 ${
                      isOpen ? "text-white" : "hover:text-white hover:bg-[#001830]/5"
                    }`}
                  >
                    <span className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-white" : "text-[#001830]"}`}>
                      {faq.q}
                    </span>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200 flex-shrink-0 ${
                        isOpen ? "bg-white/20 text-white" : "bg-[#F8F9FA] text-[#001830] group-hover:bg-[#001830] group-hover:text-white"
                      }`}
                    >
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 px-6 py-5 bg-[#001830]">
                      <p className="text-sm leading-8 text-white/90">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
