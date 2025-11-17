import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [idade, setIdade] = useState<number | "">("");

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(saved);

    setNome(user.nome);
    setEmail(user.email);
    setCidade(user.cidade || "");
    setIdade(user.idade || "");

    setLoading(false);
  }, []);

  async function salvarAlteracoes(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cidade,
          idade: idade === "" ? null : idade,
          email, // email não muda
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao atualizar");

      // Atualiza localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      setMsg("Alterações salvas com sucesso!");
      setEditing(false);
    } catch (err: any) {
      setMsg(err.message || "Erro ao atualizar");
    }
  }

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black dark:text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 font-display flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-black/20 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
          Meu Perfil
        </h1>

        {/* avatar */}
        <div className="flex justify-center mb-6">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=User"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>

        {!editing ? (
          <>
            <div className="space-y-3 text-black dark:text-white">
              <p><strong>Nome:</strong> {nome}</p>
              <p><strong>E-mail:</strong> {email}</p>
              <p><strong>Cidade:</strong> {cidade || "Não informado"}</p>
              <p><strong>Idade:</strong> {idade || "Não informada"}</p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="w-full mt-6 bg-primary text-background-dark py-3 rounded-xl hover:scale-[1.02] transition-transform"
            >
              Editar Perfil
            </button>

            <button
              onClick={logout}
              className="w-full mt-3 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
            >
              Sair da Conta
            </button>
          </>
        ) : (
          <form onSubmit={salvarAlteracoes} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-xl border p-3 dark:bg-white/10 dark:text-white"
            />

            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="rounded-xl border p-3 dark:bg-white/10 dark:text-white"
            />

            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) =>
                setIdade(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="rounded-xl border p-3 dark:bg-white/10 dark:text-white"
            />

            {msg && <p className="text-center text-sm text-green-500">{msg}</p>}

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="w-1/2 py-3 rounded-xl bg-gray-300 dark:bg-white/10 dark:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-primary text-background-dark"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
