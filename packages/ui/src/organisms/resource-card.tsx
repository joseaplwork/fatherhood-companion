import type { ResourceCategory, ResourceType } from "@fatherhood-companion/domain";

import { ResourceMeta } from "../molecules/resource-meta";

type ResourceCardProps = {
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  thumbnailUrl?: string | null;
  isAiEnhanced?: boolean;
  isSaved?: boolean;
  isCompleted?: boolean;
  onSave?: () => void;
  onComplete?: () => void;
  onClick?: () => void;
  className?: string;
};

export function ResourceCard({
  title,
  description,
  type,
  category,
  thumbnailUrl,
  isAiEnhanced = false,
  isSaved = false,
  isCompleted = false,
  onSave,
  onComplete,
  onClick,
  className = "",
}: ResourceCardProps) {
  return (
    <div
      className={[
        "rounded-2xl bg-surface-container-low overflow-hidden",
        "transition-shadow duration-150 hover:shadow-ambient",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Thumbnail */}
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt="" className="h-36 w-full object-cover" />
      ) : (
        <div className="h-36 w-full bg-surface-container-high flex items-center justify-center">
          {isAiEnhanced && (
            <span className="font-display text-xs font-semibold text-primary-fixed-dim uppercase tracking-widest">
              AI Enhanced
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <button
        type="button"
        onClick={onClick}
        className="w-full px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        {isAiEnhanced && thumbnailUrl && (
          <span className="font-body text-xs font-medium text-primary mb-1 block">AI Enhanced</span>
        )}
        <h3 className="font-display text-sm font-semibold text-on-surface line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-3">{description}</p>
        <ResourceMeta
          type={type}
          category={category}
          isSaved={isSaved}
          isCompleted={isCompleted}
          onSave={onSave}
          onComplete={onComplete}
        />
      </button>
    </div>
  );
}
