interface CommentProps {
  comment: {
    id: number;
    user: string;
    time: string;
    avatar: string;
    text: string;
  };
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex items-start gap-3">
      <img
        src={comment.avatar}
        className="w-10 h-10 rounded-full"
        alt={`Avatar de ${comment.user}`}
      />

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <p className="font-bold text-black dark:text-white">{comment.user}</p>
          <p className="text-xs text-black/60 dark:text-white/60">
            {comment.time}
          </p>
        </div>

        <p className="mt-1 text-black/80 dark:text-white/80">{comment.text}</p>
      </div>
    </div>
  );
}
