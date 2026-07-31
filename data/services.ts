import type { ServiceItem } from "@/types";

export const SERVICES: ServiceItem[] = [
  {
    method: "POST",
    path: "/enterprise-backend",
    title: "Enterprise Backend Systems",
    desc: "Java/Spring Boot services, data modeling, and integration work for systems that can't afford to go down.",
  },
  {
    method: "POST",
    path: "/ai-engineering",
    title: "AI & Computer Vision",
    desc: "Detection pipelines, OCR, and automation built around a real business workflow, not a demo.",
  },
  {
    method: "POST",
    path: "/full-stack-web",
    title: "Full-Stack Web",
    desc: "PHP/MySQL or JS applications, plus WordPress and Shopify builds, from database to deploy.",
  },
  {
    method: "POST",
    path: "/consulting",
    title: "Architecture & Code Review",
    desc: "A second set of senior eyes on your system before it ships, or before it breaks.",
  },
];
