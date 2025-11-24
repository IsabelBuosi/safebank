import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../lib/api";

type PostCardProps = {
  id: number;
  userAvatar?: string;
  userName: string;
  time: string;
  title: string;
  description: string;
  image?: string;
  likes: number;
  comments: number;
  shares?: number;
};

export default function PostCard({
  id,
  userAvatar,
  userName,
  time,
  title,
  description,
  image,
  likes,
  comments,
  shares = 0,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  async function toggleLike() {
    try {
      const response = await api.toggleLike(id);
      setIsLiked(response.liked);
      setLikeCount(response.totalLikes);
    } catch (error) {
      console.error("Erro ao curtir o relato:", error);
      // Opcional: mostrar toast de erro
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark shadow-lg border border-primary/10 dark:border-secondary/10">
      {/* Cabeçalho com avatar e nome */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}&backgroundColor=ff6b6b,4ecdc4,45b7d1,96ceb4,ffeaa7`}
              alt={userName}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/40 shadow-md"
            />
            <div>
              <p className="font-semibold text-primary-dark dark:text-secondary-light">
                {userName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
            </div>
          </div>
          <button className="text-gray-500 dark:text-gray-400 hover:bg-white/10 rounded-full p-2 transition">
            <span className="material-symbols-outlined text-xl">more_horiz</span>
          </button>
        </div>

        {/* Título e descrição */}
        <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-2">
          {description}
        </p>
        <Link
          to={`/relato/${id}`}
          className="text-primary-500 dark:text-primary-400 font-medium text-sm hover:underline inline-flex items-center gap-1"
        >
          Ver mais <span className="text-lg">→</span>
        </Link>

        {/* Imagem */}
        {image && (
          <Link to={`/relato/${id}`} className="block mt-4">
            <div
              className="w-full aspect-[4/3] rounded-xl bg-cover bg-center shadow-inner border border-white/10 transition-transform hover:scale-[1.02]"
              style={{ backgroundImage: `url(${image})` }}
            />
          </Link>
        )}
      </div>

      {/* Ações */}
      <div className="flex justify-around py-3 border-t border-primary/10 dark:border-secondary/10">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 font-semibold transition-all ${
            isLiked
              ? "text-red-500 dark:text-red-400"
              : "text-primary-dark dark:text-secondary-light hover:text-red-500"
          }`}
        >
          {isLiked ? "🔥" : "🔥"} <span className="font-bold">({likeCount})</span>
        </button>

        <Link
          to={`/relato/${id}`}
          className="flex items-center gap-2 text-primary-dark dark:text-secondary-light hover:text-primary-500 font-medium transition"
        >
          🗪 <span className="font-bold">({comments})</span>
        </Link>

        <button className="flex items-center gap-2 text-primary-dark dark:text-secondary-light hover:text-accent-500 font-medium transition">
          ⌯⌲ <span className="font-bold">({shares})</span>
        </button>
      </div>
    </div>
  );
}