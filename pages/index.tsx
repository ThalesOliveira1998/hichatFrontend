import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: 40 }}>🧠 HiChatChain — Escolha um serviço</h1>

      <button
        style={{ padding: "12px 20px", marginBottom: 20, width: "100%" }}
        onClick={() => router.push("/juridico")}
      >
        ⚖️ Análise Jurídica
      </button>

      <button
        style={{ padding: "12px 20px", marginBottom: 20, width: "100%" }}
        onClick={() => router.push("/locais")}
      >
        📍 Buscar Pontos Comerciais
      </button>

      <button
        style={{ padding: "12px 20px", marginBottom: 20, width: "100%" }}
        onClick={() => router.push("/conteudo")}
      >
        ✍️ Gerar Conteúdo
      </button>
    </div>
  );
}
