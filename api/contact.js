import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value) =>
    String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const clean = (formData, field) => escapeHtml(formData.get(field) ?? "").trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { firstName: 100, lastName: 100, email: 255, message: 5000 };

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const formData = req.body ?? {};

    // Honeypot : rempli uniquement par les bots -> on renvoie un succès factice
    if (formData.company) {
        return res.status(200).json({ success: true });
    }

    const required = ["firstName", "lastName", "email", "message"];
    if (required.some((field) => !formData[field])) {
        return res.status(400).json({ error: "Champs manquants" });
    }

    if (!EMAIL_RE.test(String(formData.email))) {
        return res.status(400).json({ error: "Email invalide" });
    }

    if (Object.entries(MAX_LENGTH).some(([field, max]) => String(formData[field]).length > max)) {
        return res.status(400).json({ error: "Champs trop longs" });
    }

    const firstName = clean(formData, "firstName");
    const lastName = clean(formData, "lastName");
    const email = clean(formData, "email");
    const message = clean(formData, "message").replaceAll("\n", "<br />");

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "iolayode@outlook.fr",
            replyTo: email,
            subject: `Nouveau message de ${firstName} ${lastName}`,
            html: `<p><strong>Nom :</strong> ${firstName} ${lastName}</p><p><strong>Email :</strong> ${email}</p><p><strong>Message :</strong></p><p>${message}</p>`,
        });

        return res.status(200).json({ success: true });
    } catch {
        return res.status(500).json({ error: "Échec de l'envoi" });
    }
}
