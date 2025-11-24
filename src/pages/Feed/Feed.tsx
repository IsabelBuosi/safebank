// pages/Feed/Feed.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { api } from "../../lib/api";

interface Report {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  user: {
    id: number;
    nome: string;        // ← era "name", agora "nome" (português)
    email: string;
  } | null;
  reportImages: {
    imageUrl: string;
  }[];
  likeCount?: number;
  commentCount?: number;
}

export default function Feed() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api.getReports()
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar denúncias");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary-500">
        <div className="text-2xl">Carregando denúncias...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-24">
      {/* Barra de busca */}
      <div className="sticky top-16 px-4 py-4 bg-white/50 dark:bg-gray-900/40 backdrop-blur-md border-b border-purple-200 dark:border-purple-700 z-40">
        <div className="relative max-w-[480px] mx-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-600 dark:text-purple-300">
            ⌕
          </span>
          <input
            type="text"
            placeholder="Pesquisar por palavra-chave..."
            className="w-full rounded-full border border-purple-300 dark:border-purple-700 bg-gray-50 dark:bg-gray-700 py-3 pl-10 pr-4 text-black dark:text-white focus:ring-4 focus:ring-purple-300 outline-none transition"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <main className="max-w-[480px] mx-auto flex flex-col gap-5 p-4 pb-32">
        {reports.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 py-20">
            Ainda não há denúncias. Seja a primeira a alertar!
          </div>
        ) : (
          reports.map((r) => (
            <PostCard
              key={r.id}
              id={r.id}
              userName={r.user?.nome || "Anônimo"}
              userAvatar={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.user?.nome || "A")}`}
              time={new Date(r.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
              title={r.title}
              description={r.description}
              image={r.reportImages?.[0]?.imageUrl || undefined}
              likes={r.likeCount ?? 0}
              comments={r.commentCount ?? 0}
              shares={0}
            />
          ))
        )}
      </main>
    </div>
  );
}