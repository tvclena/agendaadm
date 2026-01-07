import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { user_id, status, fim_teste } = req.body;

    if (!user_id || !status) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { error } = await supabase
      .from("user_profile")
      .update({
        status,
        fim_teste: fim_teste || null,
        atualizado_em: new Date().toISOString()
      })
      .eq("user_id", user_id);

    if (error) throw error;

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ ADMIN UPDATE:", err);
    return res.status(500).json({
      error: err.message || "Erro interno"
    });
  }
}
