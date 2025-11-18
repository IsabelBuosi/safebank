import { Link } from "react-router-dom";

type PostCardProps = {
  id: number;
  userAvatar: string;
  userName: string;
  time: string;
  title: string;
  description: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
};

export default function PostCard(props: PostCardProps) {
  const {
    id, userAvatar, userName, time,
    title, description, image,
    likes, comments, shares
  } = props;

  return (
    <div className="
      flex flex-col overflow-hidden rounded-card
      bg-surface-light dark:bg-surface-dark
      border borderc-light dark:borderc-dark
      shadow-soft
    ">
      <div className="p-4">

        {/* Usuário */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-primary-300"
            />

            <div>
              <p className="font-semibold text-primary-700 dark:text-primary-200">
                {userName}
              </p>

              <p className="text-xs text-gray-600 dark:text-gray-300">
                {time}
              </p>
            </div>
          </div>

          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
            more_horiz
          </span>
        </div>

        {/* Conteúdo */}
        <p className="text-lg font-bold text-primary-800 dark:text-white mb-1">
          {title}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-1">
          {description}
        </p>

        <Link
          to={`/relato/${id}`}
          className="text-primary-500 dark:text-accent-300 font-semibold hover:underline"
        >
          Ver mais →
        </Link>

        {/* Imagem */}
        {image && (
          <div
            className="mt-3 w-full aspect-[4/3] rounded-xl bg-cover bg-center shadow-inner"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
      </div>

      {/* Rodapé */}
      <div className="
        flex justify-around py-3
        border-t borderc-light dark:borderc-dark
      ">
        <button className="flex items-center gap-1 text-primary-700 dark:text-primary-300">
          <span className="material-symbols-outlined">👍</span>
          <span>{likes}</span>
        </button>

        <Link
          to={`/relato/${id}`}
          className="flex items-center gap-1 text-primary-700 dark:text-primary-300"
        >
          <span className="material-symbols-outlined">💬</span>
          <span>{comments}</span>
        </Link>

        <button className="flex items-center gap-1 text-primary-700 dark:text-primary-300">
          <span className="material-symbols-outlined">➦</span>
          <span>{shares}</span>
        </button>
      </div>
    </div>
  );
}
