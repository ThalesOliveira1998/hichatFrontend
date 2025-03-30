import { useState } from "react";
import { API_URL } from "../utils/api";

export default function LocaisPage() {
  const [nicho, setNicho] = useState("");
  const [cidade, setCidade] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setResultado(null);

    const res = await fetch(`${API_URL}/locais`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nicho,
        cidade,
        valor_maximo: Number(valor),
      }),
    });

    const data = await res.json();
    setResultado(data);
    setCarregando(false);
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>📍 Buscar Pontos Comerciais</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Nicho:</label>
          <input
            type="text"
            value={nicho}
            onChange={(e) => setNicho(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Cidade:</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Valor Máximo (R$):</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" disabled={carregando} style={{ padding: 10 }}>
          {carregando ? "Buscando..." : "Buscar Locais"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: 30 }}>
          {resultado.error ? (
            <p style={{ color: "red" }}>Erro: {resultado.error}</p>
          ) : (
            <>
              <p>✅ {resultado.mensagem}</p>
              <a
                href={resultado.csv}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "#0070f3" }}
              >
                📥 Baixar CSV de locais comerciais
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
