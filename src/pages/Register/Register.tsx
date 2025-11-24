// pages/Register/Register.tsx
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
  const [sucesso, setSucesso] = useState("");

// pages/Register/Register.tsx
async function handleRegister(e: React.FormEvent) {
  e.preventDefault();
  setErro("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nome,
        email,
        password: senha,
        city: cidade || null,
        age: idade === "" ? null : Number(idade),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erro ao cadastrar");
    }

    alert("Cadastrado com sucesso! Faça login.");
    navigate("/login");

  } catch (err: any) {
    setErro(err.message || "Erro de conexão");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-purple-200 dark:border-purple-700">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Criar Conta
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <input placeholder="Nome completo" type="text" value={nome} onChange={e => setNome(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-purple-300" />
          <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-purple-300" />
          <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} required minLength={6} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-purple-300" />
          <input placeholder="Cidade (opcional)" type="text" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700" />
          <input placeholder="Idade" type="number" value={idade} onChange={e => setIdade(e.target.value === "" ? "" : Number(e.target.value))} required min="13" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700" />

          {erro && <p className="text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">{erro}</p>}
          {sucesso && <p className="text-green-500 text-center font-medium bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">{sucesso}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition shadow-lg disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Já tem conta? <Link to="/login" className="text-purple-600 font-bold hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}