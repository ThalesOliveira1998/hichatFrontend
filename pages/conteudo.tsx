import { useState } from "react";
import { API_URL } from "../utils/api";

export default function ConteudoPage() {
  const [tema, setTema] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const gerarConteudo = async () => {
    if (!tema.trim()) return;

    setCarregando(true);
    setResultado(null);

    try {
      const res = await fetch(`${API_URL}/conteudo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema }),
      });

      const data = await res.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 40 }}>
      <h1>✍️ Gerar Conteúdo</h1>
      <input
        type="text"
        placeholder="Digite o tema"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 12 }}
      />
      <button onClick={gerarConteudo} disabled={carregando} style={{ padding: 10 }}>
        {carregando ? "Gerando..." : "Gerar Conteúdo"}
      </button>

      {resultado && (
        <div style={{ marginTop: 30 }}>
          {resultado.error ? (
            <p style={{ color: "red" }}>Erro: {resultado.error}</p>
          ) : (
            <>
              <h3>📌 Resultado:</h3>
              <pre>{JSON.stringify(resultado.conteudo, null, 2)}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
