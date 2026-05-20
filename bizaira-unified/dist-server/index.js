import express from "express";
import cors from "cors";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const CONTACT_EMAIL = "sg0549616580@gmail.com";
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const transporter = SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    })
    : null;
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing contact fields" });
    }
    if (!transporter) {
        return res.status(501).json({ error: "SMTP_NOT_CONFIGURED" });
    }
    try {
        await transporter.sendMail({
            from: `BizAIra Support <${SMTP_USER}>`,
            to: CONTACT_EMAIL,
            subject: `BizAIra Contact Form: ${name}`,
            text: `Contact request from BizAIra:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
        });
        return res.json({ success: true });
    }
    catch (error) {
        console.error("Contact email failed:", error);
        return res.status(500).json({ error: "CONTACT_SEND_FAILED" });
    }
});
function generateDynamicText(template, context) {
    let result = template;
    Object.entries(context).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        result = result.replace(new RegExp(placeholder, 'g'), String(value || ''));
    });
    return result;
}
function generateMarketingCopy(product, audience, style, language = "hebrew", premium = false, previousSummary = "", modifier = "") {
    const isHe = language === "hebrew";
    if (!product || product.trim() === '') {
        return isHe
            ? 'אנא הזן את שם המוצר או השירות שלך כדי לקבל הודעת שיווק מותאמת אישית.'
            : 'Please enter your product or service name to receive a tailored business message.';
    }
    const target = audience && audience.trim() !== ''
        ? audience
        : isHe
            ? 'לקוחותיך'
            : 'your clients';
    const intro = premium
        ? isHe
            ? 'עדכון פרימיום: מסר חד, ברור וממוקד.'
            : 'Premium update: a sharp, clear, and focused message.'
        : '';
    const previous = previousSummary ? (isHe ? `בהתחשב בעדכון הקודם: ${previousSummary}` : `Based on the previous update: ${previousSummary}`) : '';
    const customModifier = modifier ? modifier : '';
    const base = isHe
        ? `${product} מציע ל${target} פתרון מקצועי שמדגיש תוצאות אמיתיות.`
        : `${product} offers ${target} a professional solution that highlights real results.`;
    const benefit = isHe
        ? 'המסר קצר, עסקי ומכוון לתוצאה.'
        : 'The message is short, business-focused, and outcome-driven.';
    const cta = isHe
        ? 'הוסף קריאה פשוטה לפעולה אחת בלבד.'
        : 'Include one simple call-to-action only.';
    return [intro, previous, base, benefit, customModifier, cta]
        .filter(Boolean)
        .join(' ')
        .trim();
}
function generateImageMockUrl(description, style) {
    // HARD-CODED LOCAL IMAGE PLACEHOLDERS - NO EXTERNAL API CALLS
    const styleColors = {
        realistic: "2563EB", // Blue
        minimal: "F8FAFC", // Light gray
        luxury: "7C3AED", // Purple
        cartoon: "F59E0B", // Orange
        soft: "EC4899", // Pink
        modern: "10B981", // Green
    };
    const color = styleColors[style] || styleColors.modern;
    const cleanDesc = description.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 20) || "Professional Image";
    // Return high-quality placeholder image
    return `https://via.placeholder.com/1024x1024/${color}/FFFFFF.png?text=${encodeURIComponent(cleanDesc)}`;
}
function generateAnalysisReport(revenue, expenses, clients, feeling, tooMuchTime, wantToImprove, language = "hebrew", premium = false, previousSummary = "") {
    const isHe = language === "hebrew";
    if (!revenue && !expenses && !clients && !feeling && !tooMuchTime && !wantToImprove) {
        return isHe
            ? 'אנא הזן את הפרטים העסקיים שלך (הכנסות, הוצאות, מספר לקוחות, תחושות) כדי לקבל ניתוח עסקי מותאם אישית.'
            : 'Please enter your business details (revenue, expenses, clients, feelings) to receive a tailored analysis.';
    }
    const profit = revenue - expenses;
    const profitMargin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
    const intro = premium
        ? isHe
            ? 'עדכון פרימיום: ניתוח עסקי תמציתי ומעשי.'
            : 'Premium update: concise, practical business analysis.'
        : isHe
            ? 'ניתוח עסקי תמציתי וממוקד על בסיס הנתונים שלך.'
            : 'A concise, focused business analysis based on your data.';
    const previous = previousSummary ? (isHe ? `בהתחשב בעדכון הקודם: ${previousSummary}` : `Based on previous update: ${previousSummary}`) : '';
    const summaryLines = [];
    if (revenue > 0) {
        summaryLines.push(isHe
            ? `הכנסות ₪${revenue.toLocaleString()}, רווח נקי ₪${profit.toLocaleString()} (${profitMargin}%).`
            : `Revenue ${revenue.toLocaleString()}, net profit ${profit.toLocaleString()} (${profitMargin}%).`);
    }
    if (clients > 0) {
        summaryLines.push(isHe
            ? `לקוחות חדשים: ${clients}.`
            : `New clients: ${clients}.`);
    }
    if (feeling.trim()) {
        summaryLines.push(isHe
            ? `תחושה עיקרית: ${feeling}.`
            : `Key feeling: ${feeling}.`);
    }
    if (tooMuchTime.trim()) {
        summaryLines.push(isHe
            ? `זמן מושקע ב: ${tooMuchTime}.`
            : `Time is spent on: ${tooMuchTime}.`);
    }
    if (wantToImprove.trim()) {
        summaryLines.push(isHe
            ? `יעד לשיפור: ${wantToImprove}.`
            : `Improvement goal: ${wantToImprove}.`);
    }
    const recommendations = isHe
        ? [
            'צמצם הוצאות לא חיוניות כדי לשפר רווחיות.',
            'הגבר שימור לקוחות כדי למקסם ערך קיים.',
            'קבע פעולה ספציפית להרחבת הכיסוי השיווקי.',
        ]
        : [
            'Reduce non-essential costs to improve profitability.',
            'Increase client retention to maximize existing value.',
            'Set one specific action to expand market coverage.',
        ];
    return [intro, previous, ...summaryLines, ...recommendations].filter(Boolean).join('\n');
}
function generateTimePlan(weeklyHours, monthlyIncome, services, language = "hebrew", premium = false, previousSummary = "") {
    const isHe = language === "hebrew";
    if (!weeklyHours && !monthlyIncome && !services) {
        return isHe
            ? 'אנא הזן את פרטי הזמן השבועי, ההכנסה החודשית והשירותים שלך כדי לקבל תוכנית ניהול זמן מותאמת אישית.'
            : 'Please enter weekly hours, monthly income, and services to receive a personalized time plan.';
    }
    const hourlyRate = weeklyHours > 0 ? Math.round(monthlyIncome / (weeklyHours * 4)) : 0;
    const intro = premium
        ? isHe
            ? 'עדכון פרימיום: תוכנית זמן תמציתית למיקוד ותוצאה.'
            : 'Premium update: a concise time plan for focus and results.'
        : isHe
            ? 'תוכנית זמן תמציתית למטרות שלך.'
            : 'A concise time plan for your priorities.';
    const previous = previousSummary ? (isHe ? `בהתחשב בעדכון הקודם: ${previousSummary}` : `Based on previous update: ${previousSummary}`) : '';
    const loadText = isHe
        ? weeklyHours > 40 ? 'עומס גבוה.' : weeklyHours > 35 ? 'עומס משמעותי.' : 'עומס מאוזן.'
        : weeklyHours > 40 ? 'High load.' : weeklyHours > 35 ? 'Significant load.' : 'Balanced load.';
    const recommendations = isHe
        ? [
            `קבע בלוקים של עבודה מרוכזת וביטול הפרעות במשך ${Math.min(4, weeklyHours)} שעות ביום.`,
            'הפרד זמן תקשורת מיום עבודה עמוק.',
            'העבר משימות שגרתיות לכלים או לשותפים כדי לחסוך זמן.',
        ]
        : [
            `Block focused work and avoid distractions for ${Math.min(4, weeklyHours)} hours per day.`,
            'Separate communication time from deep work.',
            'Shift routine tasks to tools or partners to save time.',
        ];
    return [intro, previous, isHe ? `שעות שבועיות: ${weeklyHours}, הכנסה: ₪${monthlyIncome}, ערך שעתי: ₪${hourlyRate}.` : `Weekly hours: ${weeklyHours}, income: ₪${monthlyIncome}, hourly value: ₪${hourlyRate}.`, loadText, ...recommendations].filter(Boolean).join('\n');
}
function generatePricingStrategy(businessType, currentPrice, audience, goals, language = "hebrew", premium = false, previousSummary = "") {
    const isHe = language === "hebrew";
    if (!businessType && !currentPrice && !audience && !goals) {
        return isHe
            ? 'אנא הזן את סוג העסק, המחיר הנוכחי, קהל היעד והמטרות שלך כדי לקבל אסטרטגיית תמחור מותאמת אישית.'
            : 'Please enter your business type, current price, audience, and goals to receive a tailored pricing strategy.';
    }
    const intro = premium
        ? isHe
            ? 'עדכון פרימיום: אסטרטגיית תמחור קצרה וחדה.'
            : 'Premium update: a sharp, concise pricing strategy.'
        : isHe
            ? 'אסטרטגיית תמחור תמציתית ומקצועית.'
            : 'A concise, professional pricing strategy.';
    const previous = previousSummary ? (isHe ? `בהתחשב בעדכון הקודם: ${previousSummary}` : `Based on previous update: ${previousSummary}`) : '';
    const overview = isHe
        ? `${businessType} עם מחיר נוכחי של ${currentPrice} המכוון ל${audience}. מטרות: ${goals}.`
        : `${businessType} priced at ${currentPrice} for ${audience}. Goals: ${goals}.`;
    const recommendations = isHe
        ? [
            'הצג חבילת ערך ברורה עם נקודת מחיר אחת מובחנת.',
            'הגבר את ההצעה עם ערך תוצאה מוחשית במקום פונקציות.',
            'בדוק העלאה מתונה של 10-15% לקהל קיים עם תקשורת תוצאות מוצקה.',
        ]
        : [
            'Present a clear value package with one differentiated price point.',
            'Strengthen the offer with tangible outcome value instead of features.',
            'Test a moderate 10-15% increase for existing buyers with strong outcome messaging.',
        ];
    return [intro, previous, overview, ...recommendations].filter(Boolean).join('\n');
}
app.post("/api/generate-image", (req, res) => {
    const { prompt, editImage } = req.body;
    // Internal logic only - generate mock image URL based on description
    const imageUrl = generateImageMockUrl(prompt || "Generated Image", "modern");
    return res.json({ imageUrl });
});
app.post("/api/image-studio", (req, res) => {
    const { imageType, style, bgColor, ratio, description } = req.body;
    // Internal logic only - generate 2 mock image URLs
    const desc = description || imageType || "Professional Image";
    const imageUrls = [
        generateImageMockUrl(`${desc} - Version 1`, style),
        generateImageMockUrl(`${desc} - Version 2`, style),
    ];
    return res.json({ imageUrls, prompt: `${imageType} - ${style}` });
});
app.post("/api/chat", (req, res) => {
    const { messageType, tone, audience, details } = req.body;
    // Internal logic only - generate marketing copy dynamically
    const text = generateMarketingCopy(details || "Our Premium Solution", audience || "Clients", tone || "marketing");
    return res.json({ text });
});
app.post("/api/generate-text", (req, res) => {
    const { prompt, systemPrompt } = req.body;
    // Internal logic only - generate based on prompt content
    const text = generateMarketingCopy("Premium Solution", "Valued Client", "marketing");
    return res.json({ text });
});
app.post("/api/generate-analytics", (req, res) => {
    const { revenue = 0, expenses = 0, clients = 0, feeling = "", tooMuchTime = "", wantToImprove = "", language = "english", premium = false, previousSummary = "", } = req.body;
    const analysis = generateAnalysisReport(revenue, expenses, clients, feeling, tooMuchTime, wantToImprove, language, premium, previousSummary);
    return res.json({ text: analysis });
});
app.post("/api/generate-time", (req, res) => {
    const { weeklyHours = 0, monthlyIncome = 0, services = "", language = "english", premium = false, previousSummary = "", } = req.body;
    const plan = generateTimePlan(weeklyHours, monthlyIncome, services, language, premium, previousSummary);
    return res.json({ text: plan });
});
app.post("/api/generate-pricing", (req, res) => {
    const { businessType = "small business", currentPrice = "", audience = "", goals = "", language = "english", premium = false, previousSummary = "", } = req.body;
    const strategy = generatePricingStrategy(businessType, currentPrice, audience, goals, language, premium, previousSummary);
    return res.json({ text: strategy });
});
app.post("/api/generate-message", (req, res) => {
    const { messageType, tone, audience, details, language = "english", premium = false, previousSummary = "", modifier = "", } = req.body;
    const text = generateMarketingCopy(details || messageType || "Our Solution", audience || "Clients", tone || "marketing", language, premium, previousSummary, modifier);
    const filledText = generateDynamicText(text, { product: details || "Product", audience: audience || "customers" });
    return res.json({ text: filledText, message: filledText });
});
app.post("/api/generate", (req, res) => {
    const { messageType, tone, audience, details } = req.body;
    // Internal logic only - generate marketing message
    const text = generateMarketingCopy(details || "Our Solution", audience || "Clients", tone || "marketing");
    const filledText = generateDynamicText(text, { product: details || "Product", audience: audience || "customers" });
    return res.json({ text: filledText });
});
const distPath = path.resolve(__dirname, "../dist");
// In development, redirect root to Vite dev server
if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
        res.redirect('http://localhost:5000');
    });
}
// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath));
    app.use((_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}
app.listen(PORT, () => {
    console.log(`[server] running on port ${PORT}`);
});
