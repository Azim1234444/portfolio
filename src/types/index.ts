import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  detail: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  highlights: string[];
  github?: string;
  demo?: string;
  /** Cover screenshot. Falls back to the `gradient` treatment when absent. */
  image?: string;
  /** Extra screenshots shown on the project detail page. */
  gallery?: { src: string; caption: string }[];
  gradient: [string, string];
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: IconType;
  skills: Skill[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  category: string;
  image: string;
  credentialUrl?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
}
