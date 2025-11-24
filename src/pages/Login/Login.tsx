// pages/Login/Login.tsx
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
      // COM PROXY DO VITE → usa só o caminho (sem localhost:8080)
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await res.text();

      if (!res.ok) {
        setErro(data || "E-mail ou senha incorretos");
        return;
      }

      // Salva o token
      localStorage.setItem("token", data);

      // Pega os dados do usuário logado
      const userRes = await fetch("/auth/me", {
        headers: { Authorization: `Bearer ${data}` },
      });

      if (!userRes.ok) {
        throw new Error("Erro ao carregar dados do usuário");
      }

      const user = await userRes.json();
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão. Verifique o backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-purple-200 dark:border-purple-700">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Entrar no SafeBank
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-purple-300"
          />
          <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-purple-300"
          />

          {erro && <p className="text-red-500 text-center font-medium">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-70 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Não tem conta?{" "}
          <Link to="/register" className="text-purple-600 font-bold hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}