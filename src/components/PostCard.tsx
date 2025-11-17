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
  shares,
}: PostCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-black/10 dark:bg-white/5">
      <div className="p-4">
        {/* Topo do Card */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              alt={`Avatar de ${userName}`}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="font-bold text-black dark:text-white">{userName}</p>
              <p className="text-xs text-black/60 dark:text-white/60">{time}</p>
            </div>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-full text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-xl">more_horiz</span>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold text-black dark:text-white">{title}</p>

          <p className="text-base text-black/80 dark:text-white/80">
            {description}
          </p>

          <Link
            to={`/relato/${id}`}
            className="font-semibold text-primary hover:underline"
          >
            Ver mais
          </Link>
        </div>

        {/* Imagem */}
        {image && (
          <div
            className="mt-4 w-full aspect-[16/10] rounded-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
      </div>

      {/* Rodapé */}
      <div className="flex justify-between border-t border-white/10 px-4 py-1">
        <div className="flex items-center gap-2 px-3 py-2 text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5 rounded-md cursor-pointer">
          <span className="material-symbols-outlined">thumb_up</span>
          <p className="text-[13px] font-bold">{likes}</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5 rounded-md cursor-pointer">
          <span className="material-symbols-outlined">chat_bubble</span>
          <p className="text-[13px] font-bold">{comments}</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5 rounded-md cursor-pointer">
          <span className="material-symbols-outlined">share</span>
          <p className="text-[13px] font-bold">{shares}</p>
        </div>
      </div>
    </div>
  );
}
