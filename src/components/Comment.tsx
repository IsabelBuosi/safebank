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
    <div className="flex items-start gap-3 bg-surface-light dark:bg-surface-dark p-3 rounded-xl border border-primary/10 dark:border-primary/20">
      <img
        src={comment.avatar}
        className="w-10 h-10 rounded-full ring-2 ring-primary/40"
        alt={comment.user}
      />

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <p className="font-semibold text-primary-dark dark:text-primary-light">
            {comment.user}
          </p>
          <p className="text-xs text-black/60 dark:text-white/60">
            {comment.time}
          </p>
        </div>

        <p className="mt-1 text-black/80 dark:text-white/80">
          {comment.text}
        </p>
      </div>
    </div>
  );
}
