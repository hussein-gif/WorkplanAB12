// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// Tillåt din Vite-front (ändra origin om du har annan port/domän)
app.use(cors({ origin: "http://localhost:5173" }));

// Server-klient med SERVICE ROLE KEY (läggs i .env, används bara här)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post("/api/contact", async (req, res) => {
  try {
    const b = req.body;

    const { error } = await supabase.from("contact_messages").insert([
      {
        from_type: "company",
        company_name: b.companyName,
        full_name: b.nameTitle,
        email: b.email,
        phone: b.phone || null,
        subject: b.subject,
        message: b.message,
        status: "new",
        gdpr_consent: !!b.gdprAccept,
        gdpr_consented_at: b.gdprAccept ? new Date().toISOString() : null,
      },
    ]);

    if (error) return res.status(400).json({ ok: false, error: error.message });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message || "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servern kör på http://localhost:${PORT}`));
