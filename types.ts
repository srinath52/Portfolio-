import { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  tech: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  label: string;
}

export interface TimelineItemProps {
  project: Project;
  index: number;
}
