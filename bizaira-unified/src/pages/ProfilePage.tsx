import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { UserCircle2, Headphones, CreditCard, Settings, Lock } from "lucide-react";

const ProfilePage = () => {
  const { lang } = useI18n();
  const isHe = lang === "he";
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [password, setPassword] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const stats = getActivityStats();
  const totalCredits = profile?.credits_total ?? stats.limit;

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setEmail(profile?.email ?? "");
    setPhone(profile?.phone ?? "");
  }, [profile]);

  const handleProfileSave = async () => {
    if (!profile) return;

    setSavingProfile(true);
    try {
      const updates: Record<string, unknown> = {
        full_name: fullName,
        phone,
      };

      const { error: profileError } = await supabase.from("profiles").update(updates).eq("user_id", profile.user_id);
      if (profileError) throw profileError;

      if (email && email !== profile.email) {
        const { error: authError } = await supabase.auth.updateUser({ email });
        if (authError) throw authError;
      }

      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({ password });
        if (passwordError) throw passwordError;
      }

      toast({
        title: isHe ? "הצלחה" : "Success",
        description: isHe ? "השינויים נשמרו בהצלחה." : "Changes saved successfully.",
      });
    } catch (err: any) {
      console.error("Profile save failed:", err);
      toast({
        title: isHe ? "שגיאה" : "Error",
        description: isHe ? "שמירת השינויים נכשלה. נסה שוב." : "Saving changes failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingProfile(false);
    }
  };
  const usedCredits = profile?.credits_used ?? stats.totalActions;
  const remainingCredits = Math.max(0, totalCredits - usedCredits);
  const isPro = profile?.plan === "pro";
  const isBlocked = !isPro && remainingCredits <= 0;

  const resetDate = useMemo(() => {
    if (profile?.last_renewal_at) {
      const date = new Date(profile.last_renewal_at);
      return Number.isNaN(date.getTime()) ? null : date;
    }
    return stats.nextRenewalDate;
  }, [profile?.last_renewal_at, stats.nextRenewalDate]);

  const formattedResetDate = resetDate
    ? resetDate.toLocaleDateString(isHe ? "he-IL" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
    : isHe
    ? "תאריך לא זמין"
    : "Date unavailable";

  const planLabel = isPro ? "PRO" : isHe ? "תוכנית חינם" : "Free Plan";
  const studioStatus = isPro
    ? isHe
      ? "גישה בלתי מוגבלת לסטודיו"
      : "Unlimited studio access"
    : isBlocked
    ? isHe
      ? "הסטודיו נעול עד חידוש הקרדיטים"
      : "Studio blocked until credits renew"
    : isHe
    ? "גישה פעילה לסטודיו"
    : "Studio access active";

  const userName = profile?.full_name ?? profile?.email ?? (isHe ? "משתמש BizAIra" : "BizAIra User");
  const creditPercent = isPro ? 100 : Math.round((remainingCredits / Math.max(totalCredits, 1)) * 100);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#000B18]" dir={isHe ? "rtl" : "ltr"}>
      {isBlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000B18]/10 px-4 py-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[#000B18]/10" />
          <div className="relative w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white/95 p-8 shadow-[0_28px_80px_rgba(0,24,48,0.18)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#000B18] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              <Lock size={16} />
              {isHe ? "הסטודיו נעול" : "Studio blocked"}
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-[#000B18]">
              {isHe ? "ניצלת את כל הקרדיטים החודשיים" : "You’ve used up your monthly credits"}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {isHe
                ? "הגישה לסטודיו תחזור ברגע שהקרדיטים יתחדשו. שדרג ל-PRO כדי לקבל גישה ללא הגבלה היום."
                : "Studio access returns when credits renew. Upgrade to PRO for unlimited access now."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                {isHe ? `מתחדש בתאריך: ${formattedResetDate}` : `Renews on: ${formattedResetDate}`}
              </p>
              <button
                type="button"
                onClick={() => navigate("/pricing")}
                className="rounded-xl bg-[#000B18] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#001830]"
              >
                {isHe ? "שדרג עכשיו" : "Upgrade now"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="max-w-4xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#000B18] text-right" style={{ fontFamily: "Inter, system-ui, sans-serif", letterSpacing: "-0.03em" }}>
                  {isHe ? "היי, מה תרצה לבנות היום?" : "Hey, what would you like to build today?"}
                </h1>
                <p className="mt-3 max-w-2xl text-base text-slate-600">
                  {isHe
                    ? "כל המידע החשוב שלך במקום אחד: חשבון, קרדיטים ותאריך חידוש."
                    : "Everything important is in one place: account, credits, and renewal date."}
                </p>
              </div>
            </div>

          </div>
        </header>

        <section className="rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-[#000B18]">
                <UserCircle2 size={30} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[#000B18]">{planLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#000B18]">
                  {isHe ? `ברוכה השבה, ${userName}` : `Welcome back, ${userName}`}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{studioStatus}</p>
              </div>
            </div>
            <div className="space-y-3 text-right">
              <p className="text-sm font-semibold text-[#000B18]">
                {isHe ? `נשארים קרדיטים: ${remainingCredits} / ${totalCredits}` : `Credits remaining: ${remainingCredits} / ${totalCredits}`}
              </p>
              <p className="text-sm text-slate-500">{isHe ? `מתחדש בתאריך: ${formattedResetDate}` : `Renews on: ${formattedResetDate}`}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-4 text-sm font-medium text-[#000B18]">
              <span>{isHe ? "סטטוס קרדיטים" : "Credit balance"}</span>
              <span>{`${creditPercent}%`}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#000B18] transition-all duration-300" style={{ width: `${creditPercent}%` }} />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-600">
            <span>{isHe ? `יצירות: ${stats.creationsCount}` : `Creations: ${stats.creationsCount}`}</span>
            <span className="inline-flex h-1 w-1 rounded-full bg-slate-300" />
            <span>{isHe ? `הורדות: ${stats.downloadsCount}` : `Downloads: ${stats.downloadsCount}`}</span>
            <span className="inline-flex h-1 w-1 rounded-full bg-slate-300" />
            <span>{isHe ? `פעולות: ${stats.generalCount}` : `Actions: ${stats.generalCount}`}</span>
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">{isHe ? "כלי ניהול מהירים" : "Quick actions"}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#000B18]">{isHe ? "ניהול חשבון וסטודיו" : "Account & studio controls"}</h3>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => navigate("/support")}
              className="group flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-gray-50 px-4 py-4 text-sm font-medium text-[#000B18] transition-all duration-300 hover:bg-[#000B18] hover:text-white"
            >
              <span>{isHe ? "תמיכה" : "Support"}</span>
              <Headphones size={20} className="transition-colors duration-300" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="group flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-gray-50 px-4 py-4 text-sm font-medium text-[#000B18] transition-all duration-300 hover:bg-[#000B18] hover:text-white"
            >
              <span>{isHe ? "ניהול מנוי" : "Manage subscription"}</span>
              <CreditCard size={20} className="transition-colors duration-300" />
            </button>
            <button
              type="button"
              onClick={() => setShowSettings((value) => !value)}
              className={`group flex items-center justify-between rounded-xl border px-4 py-4 text-sm font-medium transition-all duration-300 ${
                showSettings
                  ? "border-[#000B18] bg-[#000B18] text-white"
                  : "border-[#000B18]/30 bg-gray-50 text-[#000B18] hover:bg-[#000B18] hover:text-white"
              }`}
            >
              <span>{isHe ? "הגדרות" : "Settings"}</span>
              <Settings size={20} className="transition-colors duration-300" />
            </button>
          </div>
        </section>

        {showSettings && (
          <section className="mt-8 rounded-[28px] border border-[#000B18] bg-[#F8F9FA] p-6 shadow-[0_12px_30px_rgba(0,11,24,0.08)]">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-widest text-[#001830]/60">
                {isHe ? "הגדרות פרופיל" : "Profile Settings"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#001830]">
                {isHe ? "עדכן את המידע שלך" : "Update your details"}
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#001830]">
                  {isHe ? "שם מלא" : "Full Name"}
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isHe ? "השם שלך" : "Your name"}
                  className="w-full rounded-2xl border border-[#000B18]/10 bg-white px-4 py-3 text-sm text-[#001830] placeholder-[#001830]/40 focus:border-[#000B18] focus:outline-none focus:ring-2 focus:ring-[#000B18]/10"
                  dir={isHe ? "rtl" : "ltr"}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#001830]">
                  {isHe ? "אימייל" : "Email"}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isHe ? "האימייל שלך" : "Your email"}
                  className="w-full rounded-2xl border border-[#000B18]/10 bg-white px-4 py-3 text-sm text-[#001830] placeholder-[#001830]/40 focus:border-[#000B18] focus:outline-none focus:ring-2 focus:ring-[#000B18]/10"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#001830]">
                  {isHe ? "מספר טלפון" : "Phone Number"}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isHe ? "מספר טלפון" : "Phone number"}
                  className="w-full rounded-2xl border border-[#000B18]/10 bg-white px-4 py-3 text-sm text-[#001830] placeholder-[#001830]/40 focus:border-[#000B18] focus:outline-none focus:ring-2 focus:ring-[#000B18]/10"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#001830]">
                  {isHe ? "סיסמה" : "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isHe ? "סיסמה חדשה (אופציונלי)" : "New password (optional)"}
                  className="w-full rounded-2xl border border-[#000B18]/10 bg-white px-4 py-3 text-sm text-[#001830] placeholder-[#001830]/40 focus:border-[#000B18] focus:outline-none focus:ring-2 focus:ring-[#000B18]/10"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#000B18]/10 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#001830]/60">
                  {isHe ? "סוג עסק" : "Business Type"}
                </p>
                <p className="mt-3 text-sm text-[#001830]">{profile?.business_type || (isHe ? "לא זמין" : "Unavailable")}</p>
              </div>
              <div className="rounded-2xl border border-[#000B18]/10 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#001830]/60">
                  {isHe ? "קהל יעד" : "Target Audience"}
                </p>
                <p className="mt-3 text-sm text-[#001830]">{profile?.target_audience || (isHe ? "לא זמין" : "Unavailable")}</p>
              </div>
              <div className="lg:col-span-2 rounded-2xl border border-[#000B18]/10 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#001830]/60">
                  {isHe ? "יעדי עסק" : "Business Goals"}
                </p>
                <p className="mt-3 text-sm text-[#001830]">{profile?.business_goals || (isHe ? "לא זמין" : "Unavailable")}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleProfileSave}
                disabled={!profile || savingProfile}
                className="w-full rounded-full bg-[#000B18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00050D] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
              >
                {savingProfile ? (isHe ? "שומר..." : "Saving...") : isHe ? "שמור פרטים" : "Save details"}
              </button>
              <p className="text-xs text-[#001830]/60">
                {isHe
                  ? "התשובות כאן נשמרות במקום אחד וניתן לעדכן אותן בקלות כמנהל העסק."
                  : "Your answers are stored in one place and can be updated easily as a business owner."}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const getActivityStats = () => ({
  limit: 20,
  totalActions: 12,
  nextRenewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  creationsCount: 11,
  downloadsCount: 5,
  generalCount: 31,
});

export default ProfilePage;
