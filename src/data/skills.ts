import {
  FiLayout,
  FiServer,
  FiTerminal,
  FiPenTool,
  FiGlobe,
  FiTool,
} from "react-icons/fi";
import { GiConsoleController } from "react-icons/gi";
import type { SkillCategory } from "@/types";

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    icon: FiLayout,
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: FiServer,
    skills: [
      { name: "PHP", level: 88 },
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 72 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    title: "Programming",
    icon: FiTerminal,
    skills: [
      { name: "Python", level: 80 },
      { name: "Java", level: 72 },
      { name: "C++", level: 70 },
      { name: "C#", level: 78 },
    ],
  },
  {
    title: "Game Development",
    icon: GiConsoleController,
    skills: [
      { name: "Unity", level: 80 },
      { name: "Blender", level: 70 },
      { name: "3D Modelling", level: 68 },
    ],
  },
  {
    title: "UI/UX & Analysis",
    icon: FiPenTool,
    skills: [
      { name: "Figma", level: 82 },
      { name: "Canva", level: 88 },
      { name: "System Analysis", level: 85 },
    ],
  },
  {
    title: "CMS & SEO",
    icon: FiGlobe,
    skills: [
      { name: "WordPress", level: 90 },
      { name: "Hostinger", level: 85 },
      { name: "SEO", level: 75 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: FiTool,
    skills: [
      { name: "GitHub", level: 88 },
      { name: "Visual Studio Code", level: 95 },
      { name: "Linux", level: 75 },
      { name: "After Effects", level: 72 },
      { name: "Photoshop", level: 70 },
      { name: "Draw.io", level: 80 },
    ],
  },
];
