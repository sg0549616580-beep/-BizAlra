import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};

const SupportPage = () => {
  const { t, lang } = useI18n();
  const isHe = lang === "he";
  const { user, profile } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "assistant-intro",
      role: "assistant",
      text: isHe
        ? "שלום. אני העוזר התפעולי של BizAIra — מדריך עסקי טכנולוגי שמכיר את כל מודולי הפלטפורמה. שאל כל דבר על Visual Studio, הודעות AI, ניתוח עסקי, אופטימיזציה של משאבים, מודלי תמחור או יומן פעילות."
        : "Welcome. I am BizAIra's operational advisor — a business technology guide that knows every platform module. Ask anything about Visual Studio, AI Messages, Business Analysis, Resource Optimization, Pricing Models, or Activity Journal.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const userEmail = profile?.email || user?.email || "";

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  const normalize = (value: string) => value.toLowerCase().trim();

  const buildResponse = (query: string): ChatMessage => {
    const normalized = normalize(query);
    const hasAny = (terms: string[]) => terms.some((term) => normalized.includes(term));

    const emailTriggers = [
      "באיזה מייל אני מחובר",
      "מה האימייל שלי במערכת",
      "איזה אימייל מוגדר פה",
      "מה האימייל שלי",
      "איזה מייל",
      "מה המייל שלי",
      "באיזה אימייל",
      "האם ניתן לראות מייל",
      "connected email",
      "my email",
    ].map(normalize);

    if (emailTriggers.some((term) => normalized.includes(term))) {
      if (userEmail) {
        return {
          id: `assistant-email-${Date.now()}`,
          role: "assistant",
          text: isHe
            ? `כתובת המייל הפעילה שלך במערכת BizAIra היא ${userEmail}. זו כתובת דוא"ל אישית ומאובטחת המחוברת לחשבונך עבור גישה אסטרטגית, התראות ותמיכה טכנית.`
            : `Your active BizAIra email is ${userEmail}. This is the secure, personal address attached to your account for strategic access, notifications, and support.`,
        };
      }

      return {
        id: `assistant-email-missing-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? `לא זוהתה כתובת דוא"ל מחוברת במסגרת ההתחברות הנוכחית. אנא בדוק את פרטי החשבונות שלך או פנה לתמיכה לקבלת מידע נוסף.`
          : "No connected email address was detected in your current session. Please verify your account details or contact support for further assistance.",
      };
    }

    if (hasAny(["היי", "שלום", "מה קורה", "מה נשמע", "מה שלומך", "hi", "hello", "hey"])) {
      return {
        id: `assistant-greeting-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "שלום. אני כאן כדי לייעץ לך באופן מקצועי על כל סוגיה במערכת BizAIra. שלח שאלה על אחד ממודולי הבית שלך או על ניהול החשבון, ואעזור לך באופן מיידי."
          : "Hello. I am here to advise you professionally on any BizAIra topic. Send a question about one of your home modules or account management, and I will assist you immediately.",
      };
    }

    if (hasAny(["visual studio", "סטודיו חזותי", "סטודיו", "visual", "studio", "עיצוב מוצר"])) {
      return {
        id: `assistant-visual-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "Visual Studio ב-BizAIra הוא מרכז התכנון וההגדרה החזותית של המותג שלך. כאן תוכל לייצר מסרים שיווקיים, לערוך תבניות חזותיות ולהשתמש בכלים חכמים כדי לייצר גרפיקות מוצר בהשראת אסטרטגיית המכירות שלך."
          : "Visual Studio in BizAIra is the visual planning and brand configuration hub. Here you can generate marketing messages, refine visual templates, and use intelligent tools to create product imagery aligned with your sales strategy.",
      };
    }

    if (hasAny(["ai messages", "הודעות ai", "הודעות AI", "messages", "הודעות חכמות", "AI הודעות", "מודול הודעות"])) {
      return {
        id: `assistant-messages-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "מודול ההודעות החכמה של BizAIra מאפשר לך לשלוח תקשורת עסקית ממוקדת וקורפורטיבית ללקוחות, לשמור תבניות מקצועיות ולהפעיל סנכרון עם מערכות תפעול. זה כלי אסטרטגי לחיזוק המותג והעמקת הקשר עם הלקוח."
          : "The smart messaging module in BizAIra enables you to send targeted corporate communication to clients, retain professional templates, and sync with operational systems. It is a strategic tool for brand reinforcement and deepening customer relationships.",
      };
    }

    if (hasAny(["business analysis", "ניתוח עסקי", "analytics", "דוח", "מכירות", "רווח", "ערך עסקי"])) {
      return {
        id: `assistant-analysis-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "המודול לניתוח עסקי מספק לך תמונת מצב אסטרטגית על ביצועים, רווחיות ומגמות. הוא מעבד נתונים מהמרכז, מציג תובנות חכמות ומדריך אותך להחלטות עסקיות עם מיקרו-שיפורים שנבנים תוך כדי עבודה."
          : "The Business Analysis module gives you a strategic performance overview of profitability and trends. It processes central data, presents intelligent insights, and guides you to business decisions with micro-improvements built in as you work.",
      };
    }

    if (hasAny(["resource optimization", "אופטימיזציה", "משאבים", "ניהול משאבים", "יעילות", "optimize", "שימוש במשאבים"])) {
      return {
        id: `assistant-resources-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "מודול אופטימיזציה של משאבים מסייע לך לזהות נקודות לחיסכון, לנתב את תקציבי הזמן והוצאות בצורה חכמה ולשפר תהליכים פנימיים ביעילות גבוהה. זה מתוכנן כדי למקסם את התפוקה העסקית שלך."
          : "The Resource Optimization module helps you identify savings opportunities, allocate time and expenses intelligently, and improve internal processes with high efficiency. It is designed to maximize your business productivity.",
      };
    }

    if (hasAny(["pricing model", "מחיר", "תמחור", "תכנית", "תכניות", "עלות", "pricing", "plan", "subscription"])) {
      return {
        id: `assistant-pricing-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "מודול מודלי התמחור מציע לך מבנה שקוף ואסטרטגי שמקשר בין ערך לשוק. כאן תוכל להשוות מסלולים, לקבוע תנאים עסקיים ולבחור את המסלול שמתאים לגודל הפעילות וליעדי הרווח שלך."
          : "The Pricing Models module provides a transparent and strategic structure that links value to the market. Here you can compare plans, set business terms, and choose the path that matches your operational scale and profit goals.",
      };
    }

    if (hasAny(["activity journal", "יומן פעילות", "פעילות", "log", "מעקב", "history", "טרנזקציות"])) {
      return {
        id: `assistant-activity-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "יומן הפעילות מתעד את כל ההחלטות, העדכונים והפעולות העסקיות שלך באופן מסודר. הוא מאפשר לך לחזור על הנתונים, להעריך תוצאות ולבצע בקרה איכותית על עבודת הצוות והאסטרטגיה של העסק."
          : "The Activity Journal records all your business decisions, updates, and actions in an organized way. It allows you to review data, assess outcomes, and maintain quality control over your team’s work and business strategy.",
      };
    }

    if (hasAny(["feature", "platform", "bizaira", "ביזאירה", "מערכת", "platform overview", "איך זה עובד"])) {
      return {
        id: `assistant-overview-${Date.now()}`,
        role: "assistant",
        text: isHe
          ? "BizAIra היא חוויית ניהול עסקית משולבת, עם מודולים מתקדמים לכל אחד מהתחומים העסקיים המרכזיים. היא נבנתה כדי לספק ייעוץ אסטרטגי, תשובות בזמן אמת וקוהרנטיות מלאכתית ברמת UX גבוהה."
          : "BizAIra is an integrated business management experience, with advanced modules for each core business domain. It is built to deliver strategic guidance, real-time answers, and seamless UX-level coherence.",
      };
    }

    return {
      id: `assistant-fallback-${Date.now()}`,
      role: "assistant",
      text: isHe
        ? "אני מזהה את השאלה שלך אבל זקוק לעוד פרטים כדי לספק תשובה מדויקת. נסה לנסח מחדש את הבקשה עם אחד מהמודולים הבאים: Visual Studio, הודעות AI, ניתוח עסקי, אופטימיזציה של משאבים, תמחור או יומן פעילות."
        : "I recognize your request, but I need more detail to give an accurate answer. Try rephrasing it with one of the following modules: Visual Studio, AI Messages, Business Analysis, Resource Optimization, Pricing Models, or Activity Journal.",
    };
  };

  const handleSearch = () => {
    const nextQuery = searchQuery.trim();
    if (!nextQuery) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: nextQuery,
    };
    setMessages((prev) => [...prev, userMessage]);
    setSearchQuery("");
    setIsLoading(true);

    window.setTimeout(() => {
      const response = buildResponse(nextQuery);
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const placeholderText = isHe
    ? "לדוגמה: באיזה מייל אני מחובר? או כיצד פועל מודול המחיר?"
    : "Example: What is my connected email? Or how does the Pricing module work?";

  return (
    <div className="tone-shell min-h-screen bg-soft-cream px-5 pt-10 pb-28 text-right" dir={isHe ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-right">
          <p className="luxury-page-eyebrow mb-3">{isHe ? "מרכז תמיכה" : "Support Center"}</p>
          <h1 className="luxury-page-title mb-4">{isHe ? "מרכז תמיכה וייעוץ טכנולוגי" : "Technical Support & Advisory Center"}</h1>
          <p className="luxury-page-copy">{isHe ? "היעזרו בעוזר ה-AI החכם שלנו או גלו מידע על מודולי BizAIra" : "Use our smart AI advisor or discover information about BizAIra modules."}</p>
        </div>

        <section className="relative mb-12 rounded-[28px] border border-[rgba(0,15,33,0.08)] bg-[#FAF9F6]/95 p-6 shadow-[0_30px_80px_rgba(0,15,33,0.08)]">
          <div className="mb-7 text-right">
            <p className="luxury-page-eyebrow">{isHe ? "צ'אט עסקי אינטראקטיבי" : "Interactive Business Chat"}</p>
            <h2 className="luxury-card-title mt-3 text-3xl leading-tight">{isHe ? "עוזר BizAIra חכם" : "BizAIra Intelligent Advisor"}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#28303f]/85">
              {isHe
                ? "דבר ישירות עם העוזר המאמן של המערכת. הוא ידע לענות על שאלות אסטרטגיות, טכניות ותפעוליות לפי נתוני החשבון שלך והמודולים העיקריים של הפלטפורמה."
                : "Speak directly with the platform's trained assistant. It will answer strategic, technical, and operational questions based on your account data and the platform's core modules."}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="min-h-[340px] overflow-hidden rounded-[28px] border border-[rgba(0,15,33,0.06)] bg-[#F4EEE6]/90 p-5 shadow-[inset_0_0_0_1px_rgba(0,15,33,0.03)]">
              <div className="flex h-full flex-col gap-4 overflow-y-auto pb-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[24px] px-5 py-4 text-right leading-7 ${
                        message.role === "user"
                          ? "bg-[#D9D2C6]/95 text-[#101218]"
                          : "bg-[#E7E0D7]/95 text-[#111827]"
                      }`}
                    >
                      <p className="whitespace-pre-line break-words">{message.text}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-[24px] bg-[#E7E0D7]/95 px-5 py-4 text-right leading-7 text-[#111827]">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#001830]" />
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#001830] delay-75" />
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#001830] delay-150" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="sticky bottom-0 z-10 mx-auto w-full max-w-4xl rounded-[999px] border border-[rgba(0,15,33,0.1)] bg-[#F3ECE1]/90 px-4 py-4 shadow-[0_18px_50px_rgba(0,15,33,0.08)] backdrop-blur-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  placeholder={placeholderText}
                  className="flex-1 min-w-0 rounded-full border border-[rgba(0,15,33,0.06)] bg-[#FAF9F6] px-5 py-4 text-sm text-[#001830] placeholder:text-[#001830]/40 focus:border-[#001830] focus:outline-none focus:ring-2 focus:ring-[#001830]/15 transition text-right"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isLoading}
                  className="inline-flex h-14 min-w-[140px] items-center justify-center gap-2 rounded-full bg-[#001830] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#FAF9F6] transition hover:bg-[#002741] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={16} />
                  {isLoading ? (isHe ? "כעת מטמיע" : "Generating") : isHe ? "שלח" : "Send"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-[#001830]/60">{isHe ? "שאלות נפוצות" : "Frequently Asked Questions"}</p>
          </div>

          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`rounded-[18px] border border-[rgba(0,15,33,0.06)] bg-[#FAF9F6] p-0 shadow-[0_12px_40px_rgba(0,15,33,0.04)] transition-all duration-300 ${
                  isOpen ? "" : "hover:-translate-y-0.5"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className={`group w-full flex items-center justify-between rounded-[18px] px-6 py-5 transition duration-200 text-right ${
                    isOpen ? "text-[#001830]" : "text-[#001830] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <span className="text-base font-semibold text-[#001830] transition-colors duration-200">{faq.q}</span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 flex-shrink-0 ${
                      isOpen ? "bg-[#001830] text-[#FAF9F6]" : "bg-[#FAF9F6] text-[#001830] group-hover:bg-[#001830] group-hover:text-[#FAF9F6]"
                    }`}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-[rgba(0,15,33,0.06)] px-6 py-5 bg-[#FAF9F6] text-right">
                    <p className="text-sm leading-7 text-soft-muted">{faq.a}</p>
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
