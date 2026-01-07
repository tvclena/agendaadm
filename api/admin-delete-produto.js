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
    const { produto_id } = req.body;
    if (!produto_id) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { error } = await supabase
      .from("produtos_servicos")
      .delete()
      .eq("id", produto_id);

    if (error) throw error;

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ DELETE PRODUTO:", err);
    return res.status(500).json({ error: err.message });
  }
}
