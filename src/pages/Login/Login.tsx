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
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erro ao realizar login");

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err: any) {
      setErro(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-background-light dark:bg-background-dark p-6 font-display">

      <div className="
        w-full max-w-[420px] p-8 rounded-card shadow-soft
        bg-surface-light dark:bg-surface-dark
        border borderc-light dark:borderc-dark
      ">

        <h1 className="text-3xl font-bold text-center mb-8 
          bg-gradient-to-r from-primary-500 to-accent-400 
          bg-clip-text text-transparent">
          Entrar no SafeBank
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-primary-700 dark:text-primary-300 font-medium">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full mt-1 rounded-xl p-3
                bg-surface-light dark:bg-surface-soft 
                border borderc-light dark:borderc-dark
                text-black dark:text-white 
                focus:ring-2 focus:ring-primary-400 focus:border-transparent
              "
            />
          </div>

          <div>
            <label className="text-sm text-primary-700 dark:text-primary-300 font-medium">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="
                w-full mt-1 rounded-xl p-3
                bg-surface-light dark:bg-surface-soft 
                border borderc-light dark:borderc-dark
                text-black dark:text-white
                focus:ring-2 focus:ring-primary-400 focus:border-transparent
              "
            />
          </div>

          {erro && (
            <p className="text-red-400 text-sm text-center">{erro}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-4 py-3 rounded-xl w-full font-semibold text-white
              bg-gradient-to-r from-primary-500 to-accent-500
              shadow-glow hover:scale-[1.03] active:scale-95
              transition-transform disabled:opacity-50
            "
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-300">
          Não tem conta?{" "}
          <Link className="text-primary-400 font-semibold hover:underline" to="/register">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
