import { useState } from "react";

export default function Proposta() {
  const [nome, setNome] = useState("");
  const [produto, setProduto] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setResultado(null);

    const res = await fetch("http://localhost:8000/proposta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome_cliente: nome,
        produto_interesse: produto,
      }),
    });

    const data = await res.json();
    setResultado(data);
    setCarregando(false);
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>📄 Gerar Proposta Comercial</h1>
      <form onSubmit={enviar}>
        <div style={{ marginBottom: 16 }}>
          <label>Nome do cliente:</label><br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Produto de interesse:</label><br />
          <input
            type="text"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={carregando} style={{ padding: 10 }}>
          {carregando ? "Gerando..." : "Gerar Proposta"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: 30 }}>
          {resultado.error ? (
            <p style={{ color: "red" }}>Erro: {resultado.error}</p>
          ) : (
            <>
              <p>✅ {resultado.mensagem}</p>
              <a href={resultado.pdf} target="_blank" rel="noreferrer">
                📥 Baixar PDF da proposta
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
