import type { ResourceCategory, ResourceType } from "../enums/index";

export type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  contentUrl: string | null;
  thumbnailUrl: string | null;
  isAiEnhanced: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ResourceInteraction = {
  id: string;
  resourceId: string;
  providerUserId: string;
  saved: boolean;
  completed: boolean;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
};
