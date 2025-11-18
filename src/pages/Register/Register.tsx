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

      setTimeout(() => navigate("/login"), 1000);
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
          Criar Conta
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-primary-700 dark:text-primary-300 font-medium">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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

          <div>
            <label className="text-sm text-primary-700 dark:text-primary-300 font-medium">
              Cidade
            </label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
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
              Idade (opcional)
            </label>
            <input
              type="number"
              value={idade}
              onChange={(e) =>
                setIdade(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="
                w-full mt-1 rounded-xl p-3
                bg-surface-light dark:bg-surface-soft
                border borderc-light dark:borderc-dark
                text-black dark:text-white
                focus:ring-2 focus:ring-primary-400 focus:border-transparent
              "
            />
          </div>

          {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-4 py-3 w-full rounded-xl font-semibold text-white
              bg-gradient-to-r from-primary-500 to-accent-500
              shadow-glow hover:scale-[1.03] active:scale-95 
              transition-transform disabled:opacity-50
            "
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700 dark:text-gray-300">
          Já tem conta?{" "}
          <Link className="text-primary-400 font-semibold hover:underline" to="/login">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
