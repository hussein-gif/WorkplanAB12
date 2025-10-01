import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // OBS: service key, bara på servern
);

app.post("/api/contact", async (req, res) => {
  const body = req.body;

  const { error } = await supabase.from("contact_messages").insert([{
    from_type: "company",
    company_name: body.companyName,
    full_name: body.nameTitle,
    email: body.email,
    phone: body.phone || null,
    subject: body.subject,
    message: body.message,
    status: "new",
    gdpr_consent: !!body.gdprAccept,
    gdpr_consented_at: body.gdprAccept ? new Date().toISOString() : null,
  }]);

  if (error) return res.status(400).json({ ok: false, error: error.message });
  res.json({ ok: true });
});

app.listen(3001, () => console.log("✅ Servern körs på http://localhost:3001"));
