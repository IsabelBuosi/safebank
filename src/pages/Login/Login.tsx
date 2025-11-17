import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // ---- AJUSTE PARA A SUA API REAL ----
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erro ao realizar login");

      // Salva o usuário (opcional)
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
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
          Entrar no SafeBank
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-background-dark font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-black dark:text-white">
          Não tem conta?{" "}
          <Link to="/register" className="text-primary font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
