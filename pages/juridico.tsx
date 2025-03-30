import { useState } from "react";
import { API_URL } from "../utils/api";

export default function JuridicoPage() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const analisarContrato = async () => {
    if (!texto.trim()) return;

    setCarregando(true);
    setResultado(null);

    try {
      const res = await fetch(`${API_URL}/analise-juridica`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });

      const data = await res.json();
      setResultado(data.resultado || data);
    } catch (error) {
      console.error("Erro na análise:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 24 }}>
      <h1>Análise Jurídica de Contrato</h1>

      <textarea
        rows={8}
        style={{ width: "100%", marginTop: 12 }}
        placeholder="Cole aqui o texto do contrato ou cláusula..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={analisarContrato} disabled={carregando} style={{ marginTop: 12 }}>
        {carregando ? "Analisando..." : "Analisar"}
      </button>

      {resultado && (
        <div style={{ marginTop: 24 }}>
          <h3>📌 Pontos-chave:</h3>
          <pre>{resultado.pontos_chave}</pre>

          <h3>🧐 Análise:</h3>
          <pre>{resultado.analise}</pre>

          <h3>⚖️ Conselho Final:</h3>
          <pre>{resultado.conselho}</pre>
        </div>
      )}
    </div>
  );
}
