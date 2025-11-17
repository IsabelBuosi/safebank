import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [idade, setIdade] = useState<number | "">("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSuccess("");
    setLoading(true);

    try {
      // Ajuste seu endpoint depois!
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          cidade,
          idade: idade === "" ? null : idade,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");

      setSuccess("Cadastro realizado com sucesso!");

      // Após 1s redireciona pro login
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      setErro(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-6 font-display">
      <div className="w-full max-w-md bg-white dark:bg-black/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
          Criar Conta
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:bg-white/10 dark:text-white dark:border-white/20"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:bg-white/10 dark:text-white dark:border-white/20"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:bg-white/10 dark:text-white dark:border-white/20"
          />

          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:bg-white/10 dark:text-white dark:border-white/20"
          />

          <input
            type="number"
            placeholder="Idade (opcional)"
            value={idade}
            onChange={(e) => setIdade(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 dark:bg-white/10 dark:text-white dark:border-white/20"
          />

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-background-dark font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-black dark:text-white">
          Já tem conta?{" "}
          <Link to="/login" className="text-primary font-medium">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
