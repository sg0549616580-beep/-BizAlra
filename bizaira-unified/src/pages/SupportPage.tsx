import { useState } from "react";
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

    const contains = (terms: string[]) => terms.some((term) => lowerQuery.includes(term));

    // Guest status queries
    if (contains(["אורח", "מצב אורח", "האם אני אורח", "אני במצב אורח", "guest", "guest mode"])) {
      return {
        title: isHe ? "סטטוס חשבון" : "Account Status",
        content: isHe
          ? "כן, כרגע את/ה מחובר/ת במצב אורח. כדי לשמור את הנתונים ולעדכן פרטים, מומלץ לבצע הרשמה קצרה במערכת. זה ייתן לך גישה מלאה לכל הכלים וההיסטוריה שלך."
          : "Yes, you are currently logged in as a guest. To save your data and update your profile, we recommend completing a quick registration. This will give you full access to all tools and your history.",
      };
    }

    // General greetings
    if (contains(["היי", "שלום", "מה קורה", "מה נשמע", "מה שלומך", "היי!", "שלום!", "hello", "hi"])) {
      return {
        title: isHe ? "ברוכים הבאים" : "Welcome",
        content: isHe
          ? "היי! במה אני יכול לעזור לך היום במרכז הניהול העסקי?"
          : "Hey! How can I help you today with your business management center?",
      };
    }

    // Platform features, how it works and BizAIra overview
    if (
      contains([
        "פיצ'רים",
        "איך זה עובד",
        "איך עובד",
        "איך משתמשים",
        "מה זה",
        "מה BizAIra",
        "bizaira",
        "ביזאירה",
        "כלים",
        "יצירת תוכן",
        "תמונות מוצר",
        "ניתוח עסקי",
        "ניהול זמן",
        "AI",
        "features",
        "how it works",
      ])
    ) {
      return {
        title: isHe ? "על BizAIra" : "About BizAIra",
        content: isHe
          ? "BizAIra היא פלטפורמת AI עסקית חכמה שמאגדת כלים ליצירת תוכן שיווקי, יצירת תמונות מוצר מדויקות, ניתוח עסקי וניהול זמן. העבודה קלה: אתה כותב שאלה או בקשה, והמערכת יוצרת עבורך פתרונות מוכנים לשימוש. ניתן להתחיל בחינם עם 5 יצירות בחודש, ולהתקדם למסלולים מותאמים לעסק שלך כאשר תרצה."
          : "BizAIra is a smart business AI platform that brings together tools for creating marketing content, generating precise product images, performing business analytics, and managing time. It works simply: you type a request or question, and the system creates ready-to-use solutions for you. You can start free with 5 creations per month and upgrade to tailored plans when you're ready.",
      };
    }

    // Help/Support specific queries
    if (contains(["עזרה", "בעיה", "תקלה", "שגיאה", "לא עובד", "help", "issue", "problem", "bug", "error"])) {
      return {
        title: isHe ? "תמיכה וסיוע" : "Support & Assistance",
        content: isHe
          ? "אני כאן כדי לעזור! תאר לי בדיוק מה קרה או מה השאלה שלך, ואספק לך תשובה מותאמת ומעודכנת. אם תרצה, אוכל גם להציג לך שלבים פשוטים כדי להתחיל בעבודה עם BizAIra או לפתור את בעיתך במהירות."
          : "I'm here to help! Tell me exactly what happened or what you need, and I'll provide you with a tailored and up-to-date solution. If you'd like, I can also walk you through simple steps to get started with BizAIra or resolve your issue quickly.",
      };
    }

    // Pricing and plans
    if (contains(["מחיר", "מחירים", "תכנית", "תכניות", "עלות", "כמה עולה", "subscription", "plan", "pricing", "cost"])) {
      return {
        title: isHe ? "תכניות ותמחור" : "Plans & Pricing",
        content: isHe
          ? "אנחנו מציעים תכניות גמישות המתאימות לכל סוג עסק. התחל בחינם עם 5 יצירות בחודש, והתקדם לתכנית Pro או Enterprise כשתרצה יותר. כל תכנית כוללת גישה לכל הכלים החכמים שלנו - יצירת תוכן, תמונות מוצר, ניתוח עסקי וניהול זמן."
          : "We offer flexible plans designed for every type of business. Start free with 5 creations per month and upgrade to Pro or Enterprise when you need more. Each plan includes access to all our smart tools - content creation, product images, business analytics, and time management.",
      };
    }

    // Generic intelligent response for other questions
    return {
      title: isHe ? "תשובה מותאמת" : "Tailored Answer",
      content: isHe
        ? `נשמע כמו שאלה חשובה. לגבי "<strong>${normalizedQuery}</strong>" - אני כאן כדי לתת לך הנחיות חכמות ומעשיות. אם תרצה, אוכל להרחיב ולהסביר איך BizAIra יכולה לעזור לך בתחום הזה.`
        : `That sounds like an important question. Regarding "<strong>${normalizedQuery}</strong>" - I'm here to provide you with smart and practical guidance. If you'd like, I can expand and explain how BizAIra can help you in this area.`,
    };
  };

  const handleSearch = async () => {
    const nextQuery = searchQuery.trim();
    if (!nextQuery) return;

    setSearchQuery(nextQuery);
    setSubmittedQuery(nextQuery);
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      setAiResponse(getAiResponse(nextQuery));
      setIsLoading(false);
    }, 400);
  };

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
          <div className="rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(0,11,24,0.08)]">
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
                className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-[#000B18] px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#000B18]/90 disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div className="rounded-[28px] bg-[#F7F8FA] p-6 shadow-[0_12px_24px_rgba(0,11,24,0.07)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#001830] mb-3">
                {aiResponse.title}
              </h3>
              <p
                className="text-sm leading-6 text-[#001830] whitespace-pre-line"
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

          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-[28px] transition-all duration-300 ${
                  isOpen
                    ? "bg-[#000B18] shadow-[0_16px_40px_rgba(0,11,24,0.12)]"
                    : "bg-white shadow-[0_8px_24px_rgba(0,11,24,0.06)] hover:shadow-[0_12px_32px_rgba(0,11,24,0.08)]"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className={`group w-full flex items-center justify-between px-6 py-5 text-start transition-colors duration-200 ${
                    isOpen ? "text-white" : "hover:text-white hover:bg-[#000B18]/5"
                  }`}
                >
                  <span className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-white" : "text-[#001830]"}`}>
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200 flex-shrink-0 ${
                      isOpen ? "bg-white/20 text-white" : "bg-[#F8F9FA] text-[#001830] group-hover:bg-[#000B18] group-hover:text-white"
                    }`}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-6 py-5 bg-[#000B18]">
                    <p className="text-sm leading-8 text-white/90">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
