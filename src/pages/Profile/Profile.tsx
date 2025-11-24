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
          email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao atualizar");

      localStorage.setItem("user", JSON.stringify(data.user));

      setMsg("Alterações salvas com sucesso!");
      setEditing(false);
    } catch (err: any) {
      setMsg(err.message || "Erro ao atualizar");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 font-display flex justify-center">

      <div className="
        w-full max-w-[420px] p-8 rounded-card shadow-soft
        bg-surface-light dark:bg-surface-dark
        border borderc-light dark:borderc-dark
      ">

        {/* Título com gradiente */}
        <h1 className="text-3xl font-bold text-center mb-6 
          bg-gradient-to-r from-primary-500 to-accent-400 
          bg-clip-text text-transparent">
          Meu Perfil
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${nome}`}
            className="w-28 h-28 rounded-full shadow-glow border-4 border-primary-300"
          />
        </div>

        {/* VISUAL padronizado Instagram */}
        {!editing ? (
          <>
            {/* Informações */}
            <div className="space-y-3 text-primary-900 dark:text-primary-50 text-lg">
              <p><strong>Nome:</strong> {nome}</p>
              <p><strong>E-mail:</strong> {email}</p>
              <p><strong>Cidade:</strong> {cidade || "Não informado"}</p>
              <p><strong>Idade:</strong> {idade || "Não informada"}</p>
            </div>

            {/* Botão editar */}
            <button
              onClick={() => setEditing(true)}
              className="
                w-full mt-8 py-3 rounded-xl text-white font-semibold
                bg-gradient-to-r from-primary-500 to-accent-500
                shadow-glow hover:scale-[1.03] active:scale-95
                transition-transform
              "
            >
              Editar Perfil
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="
                w-full mt-3 py-3 rounded-xl font-semibold
                bg-red-600 text-white 
                hover:bg-red-700 active:scale-95 transition
              "
            >
              Sair da Conta
            </button>
          </>
        ) : (
          <form onSubmit={salvarAlteracoes} className="flex flex-col gap-4 mt-4">

            <div>
              <label className="text-sm text-primary-700 dark:text-primary-300 font-medium">
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="
                  w-full mt-1 rounded-xl p-3
                  bg-surface-light dark:bg-surface-soft
                  border borderc-light dark:borderc-dark
                  text-black dark:text-white
                  focus:ring-2 focus:ring-primary-400
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
                  focus:ring-2 focus:ring-primary-400
                "
              />
            </div>

            <div>
              <label className="text-sm text-primary-700 dark:text-primary-300 font-medium">
                Idade
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
                  focus:ring-2 focus:ring-primary-400
                "
              />
            </div>

            {msg && (
              <p className="text-center text-sm text-green-400 mt-2">{msg}</p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="
                  w-1/2 py-3 rounded-xl font-semibold
                  bg-gray-300 dark:bg-surface-soft text-black dark:text-white
                "
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="
                  w-1/2 py-3 rounded-xl text-white font-semibold
                  bg-gradient-to-r from-primary-500 to-accent-500
                  shadow-glow hover:scale-[1.03] active:scale-95
                  transition
                "
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
