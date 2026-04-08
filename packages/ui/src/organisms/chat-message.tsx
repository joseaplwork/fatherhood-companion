import { Avatar } from "../atoms/avatar";

type ChatMessageProps = {
  sender: "user" | "assistant";
  content: string;
  timestamp?: string;
  userName?: string;
  userAvatarSrc?: string | null;
  className?: string;
};

export function ChatMessage({
  sender,
  content,
  timestamp,
  userName = "",
  userAvatarSrc,
  className = "",
}: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={["flex items-end gap-2", isUser ? "flex-row-reverse" : "flex-row", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Avatar */}
      <div className="shrink-0 mb-1">
        {isUser ? (
          <Avatar src={userAvatarSrc} name={userName} size="sm" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed">
            <span className="font-display text-xs font-semibold text-primary">AI</span>
          </div>
        )}
      </div>

      {/* Bubble */}
      <div
        className={[
          "max-w-[75%] rounded-2xl px-4 py-3",
          isUser
            ? "rounded-br-sm bg-primary-container text-on-primary-container"
            : "rounded-bl-sm bg-surface-container text-on-surface",
        ].join(" ")}
      >
        <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p
            className={[
              "font-body text-xs mt-1",
              isUser ? "text-on-primary-container/70 text-right" : "text-on-surface-variant",
            ].join(" ")}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
