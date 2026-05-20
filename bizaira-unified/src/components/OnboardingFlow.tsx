import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ShoppingBag, Utensils, Star, Home, Monitor, Briefcase, Heart, GraduationCap, MoreHorizontal, Users, Baby, User, UserCheck, Building, PartyPopper, Globe, TrendingUp, Megaphone, Share2, Award, Clock, UserPlus, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { saveGuestOnboardingAnswers } from "@/lib/guest-session";

interface OnboardingFlowProps {
  onComplete: (mode: "guest" | "auth") => void;
}

type Step = "greeting" | "language" | "business" | "business-info" | "audience" | "audience-info" | "goal";

type LangOption = {
  value: "en" | "he";
  labelKey: string;
};

const colorNavy = "#001830";
const colorCream = "#F5F5DC";
const colorLight = "#F5F5F5";
const colorBorder = "#D9D9D9";
const colorNeutral = "#1E293B";
const colorMuted = "#475569";

const languageOptions: LangOption[] = [
  { value: "en", labelKey: "onboarding.languages.english" },
  { value: "he", labelKey: "onboarding.languages.hebrew" },
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { lang, setLang, t } = useI18n();
  const isHe = lang === "he";
  const [step, setStep] = useState<Step>("greeting");
  const [selectedLanguage, setSelectedLanguage] = useState<LangOption | null>(
    languageOptions.find((option) => option.value === lang) ?? null
  );
  const [businessType, setBusinessType] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");

  const businessTypes = useMemo(
    () => [
      { label: t("onboarding.business.fashion"), Icon: ShoppingBag },
      { label: t("onboarding.business.food"), Icon: Utensils },
      { label: t("onboarding.business.beauty"), Icon: Star },
      { label: t("onboarding.business.realEstate"), Icon: Home },
      { label: t("onboarding.business.digital"), Icon: Monitor },
      { label: t("onboarding.business.services"), Icon: Briefcase },
      { label: t("onboarding.business.health"), Icon: Heart },
      { label: t("onboarding.business.education"), Icon: GraduationCap },
      { label: t("onboarding.business.other"), Icon: MoreHorizontal },
    ],
    [t]
  );

  const audiences = useMemo(
    () => [
      { label: t("onboarding.audience.teens"), Icon: Baby },
      { label: t("onboarding.audience.adults"), Icon: User },
      { label: t("onboarding.audience.women"), Icon: Users },
      { label: t("onboarding.audience.men"), Icon: UserCheck },
      { label: t("onboarding.audience.businesses"), Icon: Building },
      { label: t("onboarding.audience.parents"), Icon: PartyPopper },
      { label: t("onboarding.audience.general"), Icon: Globe },
    ],
    [t]
  );

  const goals = useMemo(
    () => [
      { label: t("onboarding.goal.sales"), Icon: TrendingUp },
      { label: t("onboarding.goal.exposure"), Icon: Megaphone },
      { label: t("onboarding.goal.social"), Icon: Share2 },
      { label: t("onboarding.goal.branding"), Icon: Award },
      { label: t("onboarding.goal.time"), Icon: Clock },
      { label: t("onboarding.goal.clients"), Icon: UserPlus },
    ],
    [t]
  );

  const handleLanguageSelect = (option: LangOption) => {
    setSelectedLanguage(option);
    setLang(option.value);
  };

  useEffect(() => {
    const currentSelection = languageOptions.find((option) => option.value === lang) ?? null;
    if (currentSelection?.value !== selectedLanguage?.value) {
      setSelectedLanguage(currentSelection);
    }
  }, [lang, selectedLanguage]);

  const stepNumber = useMemo(() => {
    switch (step) {
      case "language":
        return 1;
      case "business":
      case "business-info":
        return 2;
      case "audience":
      case "audience-info":
        return 3;
      case "goal":
        return 4;
      default:
        return 0;
    }
  }, [step]);

  const textAlignClass = isHe ? "text-right" : "text-left";
  const direction = isHe ? "rtl" : "ltr";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-slate-950/10" dir={direction}>
        <div className="w-full max-w-4xl rounded-[32px] border border-slate-200/40 bg-white/95 p-8 shadow-[0_32px_80px_rgba(15,23,42,0.14)] backdrop-blur-md">
        {step === "greeting" && (
          <section className={cn("flex flex-col items-center justify-center gap-8", textAlignClass)}>
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("onboarding.greeting.title")}
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t("onboarding.greeting.subtitle")}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep("language")}
              className="inline-flex items-center justify-center rounded-[18px] bg-[#001830] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,24,48,0.23)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#001830]"
            >
              {t("onboarding.greeting.button")}
              <ChevronRight size={18} className="ml-2" />
            </button>
          </section>
        )}

        {step !== "greeting" && (
          <div className="space-y-6">
            {(step !== "business-info" && step !== "audience-info") && (
              <StepHeader
                num={stepNumber}
                total={4}
                stepLabel={t("onboarding.stepCounter", { num: stepNumber, total: 4 })}
                title={
                  step === "language"
                    ? t("onboarding.language.title")
                    : step === "business"
                    ? t("onboarding.business.title")
                    : step === "audience"
                    ? t("onboarding.audience.title")
                    : t("onboarding.goal.title")
                }
                isHe={isHe}
              />
            )}

            {step === "language" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {languageOptions.map((option) => {
                  const selected = selectedLanguage?.value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleLanguageSelect(option)}
                      className={cn(
                        "flex min-h-[96px] items-center justify-center rounded-xl border px-4 py-3 text-center text-lg font-semibold transition-colors duration-200 ease-in-out",
                        selected
                          ? "border-transparent bg-[#001830] text-white"
                          : "border-slate-200 bg-white text-slate-950"
                      )}
                    >
                      {t(option.labelKey)}
                    </button>
                  );
                })}
              </div>
            )}

            {step === "business" && (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  {businessTypes.map(({ label, Icon }) => {
                    const selected = businessType === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setBusinessType(label)}
                        className={cn(
                          "flex min-h-[96px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 ease-in-out",
                          selected
                            ? "border-transparent bg-[#001830] text-white"
                            : "border-slate-200 bg-white text-slate-950"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 ease-in-out",
                            selected
                              ? "border-transparent bg-white/10 text-white"
                              : "border-slate-200 bg-white text-slate-900"
                          )}
                        >
                          <Icon size={18} strokeWidth={1.6} />
                        </div>
                        <span className={isHe ? "flex-1 text-right" : "flex-1 text-left"}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === "business-info" && (
              <div className={cn("rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-8 text-center", textAlignClass)}>
                <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full bg-[#001830]/10 text-[#001830]">
                  <Check size={34} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-semibold text-slate-950" style={{ fontFamily: isHe ? "var(--font-heebo)" : "'Playfair Display', serif" }}>
                  {t("onboarding.businessInfo.perfect")}
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t("onboarding.businessInfo.confirmationDescription").replace("{{businessType}}", businessType)}
                </p>
              </div>
            )}

            {step === "audience" && (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {audiences.map(({ label, Icon }) => {
                    const selected = audience === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setAudience(label)}
                        className={cn(
                          "flex min-h-[96px] items-center gap-3 rounded-xl border px-4 py-3 text-base font-semibold transition-colors duration-200 ease-in-out",
                          selected
                            ? "border-transparent bg-[#001830] text-white"
                            : "border-slate-200 bg-white text-slate-950"
                        )}
                        style={{ justifyContent: isHe ? "flex-end" : "flex-start" }}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 ease-in-out",
                            selected
                              ? "border-transparent bg-white/10 text-white"
                              : "border-slate-200 bg-white text-slate-900"
                          )}
                        >
                          <Icon size={18} strokeWidth={1.6} />
                        </div>
                        <span className={isHe ? "flex-1 text-right" : "flex-1 text-left"}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === "audience-info" && (
              <div className={cn("rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-8 text-center", textAlignClass)}>
                <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full bg-[#001830]/10 text-[#001830]">
                  <Check size={34} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-semibold text-slate-950" style={{ fontFamily: isHe ? "var(--font-heebo)" : "'Playfair Display', serif" }}>
                  {t("onboarding.audienceInfo.excellent")}
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t("onboarding.audienceInfo.description").replace("{{audience}}", audience)}
                </p>
              </div>
            )}

            {step === "goal" && (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {goals.map(({ label, Icon }) => {
                    const selected = goal === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setGoal(label)}
                        className={cn(
                          "flex min-h-[96px] items-center gap-3 rounded-xl border px-4 py-3 text-base font-semibold transition-colors duration-200 ease-in-out",
                          selected
                            ? "border-transparent bg-[#001830] text-white"
                            : "border-slate-200 bg-white text-slate-950"
                        )}
                        style={{ justifyContent: isHe ? "flex-end" : "flex-start" }}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 ease-in-out",
                            selected
                              ? "border-transparent bg-white/10 text-white"
                              : "border-slate-200 bg-white text-slate-900"
                          )}
                        >
                          <Icon size={18} strokeWidth={1.6} />
                        </div>
                        <span className={isHe ? "flex-1 text-right" : "flex-1 text-left"}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className={cn("text-sm text-slate-600", isHe ? "text-right" : "text-left")}>
                {t("onboarding.stepCounter", { num: stepNumber, total: 4 })}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {step !== "language" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === "business") setStep("language");
                      if (step === "business-info") setStep("business");
                      if (step === "audience") setStep("business-info");
                      if (step === "audience-info") setStep("audience");
                      if (step === "goal") setStep("audience");
                    }}
                    className="inline-flex items-center justify-center rounded-[18px] border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-slate-200"
                  >
                    <ArrowLeft size={18} className={isHe ? "rotate-180" : ""} />
                    <span className="ml-2">{t("onboarding.back")}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (step === "language" && selectedLanguage) setStep("business");
                    if (step === "business" && businessType) setStep("business-info");
                    if (step === "business-info") setStep("audience");
                    if (step === "audience" && audience) setStep("audience-info");
                    if (step === "audience-info") setStep("goal");
                    if (step === "goal" && goal) {
                      saveGuestOnboardingAnswers({ business_type: businessType, target_audience: audience, business_goals: goal });
                      onComplete("auth");
                    }
                  }}
                  disabled={
                    (step === "language" && !selectedLanguage) ||
                    (step === "business" && !businessType) ||
                    (step === "audience" && !audience) ||
                    (step === "goal" && !goal)
                  }
                  className={cn(
                    "inline-flex items-center justify-center rounded-[18px] px-7 py-3 text-sm font-semibold transition-all duration-300 ease-in-out",
                    (step === "language" && !selectedLanguage) ||
                    (step === "business" && !businessType) ||
                    (step === "audience" && !audience) ||
                    (step === "goal" && !goal)
                      ? "cursor-not-allowed bg-slate-300 text-slate-500"
                      : "bg-[#001830] text-white shadow-[0_14px_32px_rgba(0,24,48,0.24)] hover:bg-[#001830]"
                  )}
                >
                  {step === "goal" ? t("onboarding.finish") : t("onboarding.page.continue")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StepHeader = ({ num, total, stepLabel, title, isHe }: { num: number; total: number; stepLabel: string; title: string; isHe?: boolean }) => (
  <div className="mb-8">
    <div className="mb-4 flex gap-3">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors duration-300",
            i < num ? "bg-[#001830]" : "bg-slate-200"
          )}
        />
      ))}
    </div>
    <p className={cn("text-xs uppercase tracking-[0.28em] text-slate-500", isHe ? "text-right" : "text-left")}>
      {stepLabel}
    </p>
    <h2 className={cn("mt-3 text-3xl font-semibold text-slate-950", isHe ? "text-right" : "text-left")} style={{ fontFamily: isHe ? "var(--font-heebo)" : "'Playfair Display', serif" }}>
      {title}
    </h2>
  </div>
);

export default OnboardingFlow;
