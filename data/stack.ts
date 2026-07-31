import { Server, Cpu, Code2 } from "lucide-react";
import type { StackChain } from "@/types";

export const STACK_CHAINS: StackChain[] = [
  {
    id: "enterprise",
    label: "Enterprise Backend",
    icon: Server,
    nodes: [
      { name: "Java", detail: "Core language for enterprise service work — daily driver at Pioneer Insurance." },
      { name: "Spring Boot", detail: "Service layer and dependency injection for policy & claims modules." },
      { name: "Hibernate", detail: "ORM layer over Oracle for policy, claims, and party data models." },
      { name: "Oracle DB", detail: "System of record for the insurance platform's core data." },
      { name: "Jenkins", detail: "CI pipelines for build and deployment of enterprise modules." },
      { name: "Azure", detail: "Cloud tooling used across enterprise and freelance infrastructure." },
    ],
  },
  {
    id: "ai",
    label: "AI / Computer Vision",
    icon: Cpu,
    nodes: [
      { name: "Python", detail: "Primary language for AI and automation tooling." },
      { name: "YOLO", detail: "Object detection — used for PPE / compliance detection work." },
      { name: "OpenCV", detail: "Image pipeline and preprocessing for vision models." },
      { name: "OCR + faster-whisper", detail: "Text extraction and speech-to-text for document and voice pipelines." },
    ],
  },
  {
    id: "web",
    label: "Full-Stack Web",
    icon: Code2,
    nodes: [
      { name: "PHP", detail: "Backend for freelance full-stack builds." },
      { name: "MySQL", detail: "Relational data layer for client applications." },
      { name: "JavaScript", detail: "Front-end interactivity across freelance projects." },
      { name: "WordPress / Shopify", detail: "CMS and storefront builds for small-business clients." },
    ],
  },
];
