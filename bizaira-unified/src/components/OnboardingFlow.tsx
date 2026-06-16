import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { saveGuestOnboardingAnswers } from "@/lib/guest-session";

interface OnboardingFlowProps {
  onComplete: (mode: "guest" | "auth") => void;
}

type Step =
  | "greeting"
  | "language"
  | "business"
  | "business-info"
  | "audience"
  | "audience-info"
  | "goal";

type LangOption = {
  value: "en" | "he";
  labelKey: string;
};

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
      { label: t("onboarding.business.fashion") },
      { label: t("onboarding.business.food") },
      { label: t("onboarding.business.beauty") },
      { label: t("onboarding.business.realEstate") },
      { label: t("onboarding.business.digital") },
      { label: t("onboarding.business.services") },
      { label: t("onboarding.business.health") },
      { label: t("onboarding.business.education") },
      { label: t("onboarding.business.other") },
    ],
    [t]
  );

  const audiences = useMemo(
    () => [
      { label: t("onboarding.audience.teens") },
      { label: t("onboarding.audience.adults") },
      { label: t("onboarding.audience.women") },
      { label: t("onboarding.audience.men") },
      { label: t("onboarding.audience.businesses") },
      { label: t("onboarding.audience.parents") },
      { label: t("onboarding.audience.general") },
    ],
    [t]
  );

  const goals = useMemo(
    () => [
      { label: t("onboarding.goal.sales") },
      { label: t("onboarding.goal.exposure") },
      { label: t("onboarding.goal.social") },
      { label: t("onboarding.goal.branding") },
      { label: t("onboarding.goal.time") },
      { label: t("onboarding.goal.clients") },
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

  const direction = isHe ? "rtl" : "ltr";

  const isNextDisabled =
    (step === "language" && !selectedLanguage) ||
    (step === "business" && !businessType) ||
    (step === "audience" && !audience) ||
    (step === "goal" && !goal);

  const goBack = () => {
    if (step === "business") setStep("language");
    if (step === "business-info") setStep("business");
    if (step === "audience") setStep("business-info");
    if (step === "audience-info") setStep("audience");
    if (step === "goal") setStep("audience");
  };

  const goNext = () => {
    if (step === "language" && selectedLanguage) setStep("business");
    if (step === "business" && businessType) setStep("business-info");
    if (step === "business-info") setStep("audience");
    if (step === "audience" && audience) setStep("audience-info");
    if (step === "audience-info") setStep("goal");
    if (step === "goal" && goal) {
      saveGuestOnboardingAnswers({ business_type: businessType, target_audience: audience, business_goals: goal });
      onComplete("auth");
    }
  };

  const sectionTitle = (() => {
    if (step === "language") return t("onboarding.language.title");
    if (step === "business") return t("onboarding.business.title");
    if (step === "audience") return t("onboarding.audience.title");
    if (step === "goal") return t("onboarding.goal.title");
    return "";
  })();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F3F4F6] px-4 py-10" dir={direction}>
      <div className="w-full max-w-3xl rounded-[28px] border border-[#D9D9D9] bg-white p-10 shadow-sm">
        {step === "greeting" ? (
          <div className="space-y-10 text-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-[#6B7280]">
                {t("onboarding.greeting.subtitle")}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-[#001830]">
                {t("onboarding.greeting.title")}
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-[#4B5563]">
                {t("onboarding.greeting.description") || t("onboarding.greeting.subtitle")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep("language")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#001830] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#001830]"
            >
              <span>{t("onboarding.greeting.button")}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#6B7280]">
                    {t("onboarding.stepCounter", { num: stepNumber, total: 4 })}
                  </p>
                  <h2 className="text-3xl font-semibold text-[#001830]">{sectionTitle}</h2>
                </div>
                <div className="flex h-1 w-full gap-2 overflow-hidden rounded-full bg-[#E5E7EB] sm:w-56">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        index < stepNumber ? "w-full bg-[#001830]" : "w-full bg-[#E5E7EB]"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

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
                        "min-h-[96px] rounded-[24px] border px-6 py-5 text-base font-semibold transition-colors duration-200",
                        selected
                          ? "border-transparent bg-[#001830] text-white"
                          : "border-[#D9D9D9] bg-white text-[#001830] hover:border-[#9CA3AF]"
                      )}
                    >
                      {t(option.labelKey)}
                    </button>
                  );
                })}
              </div>
            )}

            {step === "business" && (
              <div className="grid gap-4 sm:grid-cols-3">
                {businessTypes.map(({ label }) => {
                  const selected = businessType === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setBusinessType(label)}
                      className={cn(
                        "min-h-[96px] rounded-[24px] border px-6 py-5 text-base font-semibold transition-colors duration-200",
                        selected
                          ? "border-transparent bg-[#001830] text-white"
                          : "border-[#D9D9D9] bg-white text-[#001830] hover:border-[#9CA3AF]"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {step === "business-info" && (
              <div className="rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-8 text-center">
                <p className="text-sm uppercase tracking-[0.28em] text-[#6B7280]">{t("onboarding.businessInfo.title")}</p>
                <h3 className="mt-4 text-3xl font-semibold text-[#001830]">{t("onboarding.businessInfo.perfect")}</h3>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#4B5563]">
                  {t("onboarding.businessInfo.confirmationDescription").replace("{{businessType}}", businessType)}
                </p>
              </div>
            )}

            {step === "audience" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {audiences.map(({ label }) => {
                  const selected = audience === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAudience(label)}
                      className={cn(
                        "min-h-[96px] rounded-[24px] border px-6 py-5 text-base font-semibold transition-colors duration-200",
                        selected
                          ? "border-transparent bg-[#001830] text-white"
                          : "border-[#D9D9D9] bg-white text-[#001830] hover:border-[#9CA3AF]"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {step === "audience-info" && (
              <div className="rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-8 text-center">
                <p className="text-sm uppercase tracking-[0.28em] text-[#6B7280]">{t("onboarding.audienceInfo.title")}</p>
                <h3 className="mt-4 text-3xl font-semibold text-[#001830]">{t("onboarding.audienceInfo.excellent")}</h3>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#4B5563]">
                  {t("onboarding.audienceInfo.description").replace("{{audience}}", audience)}
                </p>
              </div>
            )}

            {step === "goal" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {goals.map(({ label }) => {
                  const selected = goal === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setGoal(label)}
                      className={cn(
                        "min-h-[96px] rounded-[24px] border px-6 py-5 text-base font-semibold transition-colors duration-200",
                        selected
                          ? "border-transparent bg-[#001830] text-white"
                          : "border-[#D9D9D9] bg-white text-[#001830] hover:border-[#9CA3AF]"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-[#6B7280]">{t("onboarding.stepCounter", { num: stepNumber, total: 4 })}</div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {step !== "language" && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center justify-center rounded-full border border-[#D9D9D9] bg-white px-7 py-3 text-sm font-semibold text-[#001830] transition hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft size={18} className={isHe ? "rotate-180" : ""} />
                    <span className="ml-2">{t("onboarding.back")}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={isNextDisabled}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200",
                    isNextDisabled
                      ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                      : "bg-[#001830] text-white hover:bg-[#001830]"
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
            "h-1 flex-1 rounded-full transition-colors duration-200",
            i < num ? "bg-[#001830]" : "bg-[#E5E7EB]"
          )}
        />
      ))}
    </div>
    <p className={cn("text-xs uppercase tracking-[0.28em] text-[#6B7280]", isHe ? "text-right" : "text-left")}>{stepLabel}</p>
    <h2 className={cn("mt-3 text-3xl font-semibold text-[#001830]", isHe ? "text-right" : "text-left")}>{title}</h2>
  </div>
);

export default OnboardingFlow;
