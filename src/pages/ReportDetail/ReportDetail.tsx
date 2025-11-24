// pages/ReportDetail/ReportDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageCarousel from "../../components/ImageCarousel";
import Comment from "../../components/Comment";

type CommentType = {
  id: number;
  user: string;
  avatar: string;
  time: string;
  text: string;
};

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reportId = Number(id);

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  const API_URL = "http://localhost:8080";

  useEffect(() => {
    async function loadReport() {
      if (!id || isNaN(reportId)) {
        navigate("/");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Carrega o relato
        const reportRes = await fetch(`${API_URL}/reports/${reportId}`, { headers });
        if (!reportRes.ok) throw new Error("Relato não encontrado");
        const reportData = await reportRes.json();

        // Carrega comentários
        const commentsRes = await fetch(`${API_URL}/comments/report/${reportId}`, { headers });
        const commentsData = commentsRes.ok ? await commentsRes.json() : [];

        // Carrega likes
        const likeRes = await fetch(`${API_URL}/likes/report/${reportId}`, { headers });
        const likeData = likeRes.ok ? await likeRes.json() : { totalLikes: 0, liked: false };

        // Monta objeto final
        setReport({
          id: reportData.id,
          title: reportData.title,
          description: reportData.description,
          author: reportData.user?.nome || "Anônimo",
          authorAvatar: reportData.user?.avatar,
          date: new Date(reportData.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          images: reportData.reportImages?.map((img: any) => img.imageUrl) || [],
          likes: likeData.totalLikes || likeData.likes || 0,
          likedByUser: likeData.liked || false,
          comments: commentsData.map((c: any) => ({
            id: c.id,
            user: c.user?.nome || "Anônimo",
            avatar: c.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${c.user?.nome || "A"}`,
            time: new Date(c.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            text: c.text,
          })),
        });
      } catch (err) {
        console.error("Erro ao carregar relato:", err);
        alert("Relato não encontrado ou erro de conexão");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [id, navigate]);

  const toggleLike = async () => {
    if (!report) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/likes/report/${reportId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const textoResposta = await res.text();
      if (!res.ok) return;

      let data;
      try {
        data = JSON.parse(textoResposta);
      } catch {
        return;
      }

      setReport((prev: any) => ({
        ...prev,
        likes: data.totalLikes ?? data.likes ?? prev.likes,
        likedByUser: data.liked ?? false,
      }));
    } catch (err) {
      console.error("Erro no toggleLike:", err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || sending) return;
    setSending(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/comments/report/${reportId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment.trim() }),
      });

      if (!res.ok) throw new Error("Erro ao enviar comentário");
      const data = await res.json();

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const newComm = {
        id: data.id || Date.now(),
        user: user.nome || "Você",
        avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.nome || "Você"}`,
        time: "agora",
        text: newComment.trim(),
      };

      setReport((prev: any) => ({
        ...prev,
        comments: [...prev.comments, newComm],
      }));

      setNewComment("");
    } catch (err) {
      alert("Erro ao enviar comentário");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <p className="text-xl font-medium text-primary-dark dark:text-primary-light">Carregando relato...</p>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-40">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-purple-200 dark:border-purple-700 max-w-[480px] mx-auto">
        <button onClick={() => navigate(-1)} className="text-purple-700 dark:text-purple-300">
          <span className="material-symbols-outlined text-3xl">⭠</span>
        </button>
        <h1 className="text-lg font-bold text-purple-900 dark:text-white">Detalhes</h1>
        <button className="text-purple-700 dark:text-purple-300">
          <span className="material-symbols-outlined text-3xl">⌯⌲</span>
        </button>
      </header>

      <main className="max-w-[480px] mx-auto p-4 space-y-6">
        {/* Autor */}
        <div className="flex items-center gap-3">
          <img
            src={report.authorAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${report.author}`}
            className="w-12 h-12 rounded-full ring-2 ring-purple-300 dark:ring-purple-600 object-cover"
          />
          <div>
            <p className="font-bold text-purple-900 dark:text-white">{report.author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{report.date}</p>
          </div>
        </div>

        {/* Título */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-purple-900 dark:text-white">{report.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{report.description}</p>
        </section>

        {/* Imagens */}
        {report.images.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-white">Evidências</h3>
            <ImageCarousel images={report.images} />
          </section>
        )}

        {/* Ações */}
        <section className="flex gap-3 pt-4">
          <button
            onClick={toggleLike}
            className={`flex-1 py-4 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition ${
              report.likedByUser
                ? "bg-red-600 text-white"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            }`}
          >
            🔥Achei útil ({report.likes})
          </button>

          <button className="flex-1 py-4 rounded-xl bg-red-600/20 text-red-600 dark:text-red-400 font-bold border border-red-600/30">
            🚩Reportar
          </button>
        </section>

        {/* Comentários */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-purple-900 dark:text-white">
            Comentários ({report.comments.length})
          </h3>

          <div className="space-y-4">
            {report.comments.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-6">
                Seja o primeiro a comentar!
              </p>
            ) : (
              report.comments.map((c: CommentType) => <Comment key={c.id} comment={c} />)
            )}
          </div>
        </section>

        {/* Campo de comentário — AGORA ACIMA DO RODAPÉ */}
        <section className="pt-6">
          <div className="space-y-3">
            <textarea
              placeholder="Adicionar comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full max-w-[480px] mx-auto px-4 py-3 rounded-xl border border-purple-300 dark:border-purple-700 bg-gray-50 dark:bg-gray-700 focus:ring-4 focus:ring-purple-300 focus:outline-none resize-none text-black dark:text-white"
            />

            <button
              onClick={addComment}
              disabled={sending || !newComment.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Comentar"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
