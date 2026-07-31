import type { LucideIcon } from "lucide-react";

export type ProjectStatus = "production" | "concept";
export type ProjectType = "Enterprise" | "AI" | "Freelance" | "Concept";

export interface NavItem {
  id: string;
  label: string;
  file: string;
}

export interface StackNode {
  name: string;
  detail: string;
}

export interface StackChain {
  id: string;
  label: string;
  icon: LucideIcon;
  nodes: StackNode[];
}

export interface Project {
  id: string;
  file: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
}

export interface ExperienceItem {
  version: string;
  title: string;
  org: string;
  period: string;
  detail: string;
}

export interface ServiceItem {
  method: string;
  path: string;
  title: string;
  desc: string;
}

export interface Profile {
  name: string;
  handle: string;
  headline: string;
  sub: string;
  location: string;
}
