import type { ResourceCategory, ResourceType } from "@fatherhood-companion/domain";

import { Icon } from "../atoms/icon";

const TYPE_ICONS: Record<ResourceType, string> = {
  ARTICLE: "article",
  VIDEO: "play_circle",
  EXERCISE: "fitness_center",
  MINI_COURSE: "school",
  GUIDE: "menu_book",
};

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  MENTAL_HEALTH: "Mental Health",
  CO_PARENTING: "Co-Parenting",
  LEGAL: "Legal",
  FINANCE: "Finance",
  CHILD_DEVELOPMENT: "Child Development",
  SELF_CARE: "Self Care",
  COMMUNITY: "Community",
};

type ResourceMetaProps = {
  type: ResourceType;
  category: ResourceCategory;
  isSaved?: boolean;
  isCompleted?: boolean;
  onSave?: () => void;
  onComplete?: () => void;
  className?: string;
};

export function ResourceMeta({
  type,
  category,
  isSaved = false,
  isCompleted = false,
  onSave,
  onComplete,
  className = "",
}: ResourceMetaProps) {
  return (
    <div className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
      <div className="flex items-center gap-1">
        <Icon name={TYPE_ICONS[type]} size={14} className="text-on-surface-variant" />
        <span className="font-body text-xs text-on-surface-variant">
          {CATEGORY_LABELS[category]}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            aria-label={isSaved ? "Unsave resource" : "Save resource"}
            className="text-on-surface-variant hover:text-primary transition-colors duration-150"
          >
            <Icon name={isSaved ? "bookmark" : "bookmark_border"} size={18} fill={isSaved} />
          </button>
        )}
        {onComplete && (
          <button
            type="button"
            onClick={onComplete}
            aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
            className="text-on-surface-variant hover:text-primary transition-colors duration-150"
          >
            <Icon
              name={isCompleted ? "check_circle" : "radio_button_unchecked"}
              size={18}
              fill={isCompleted}
              className={isCompleted ? "text-primary" : ""}
            />
          </button>
        )}
      </div>
    </div>
  );
}
