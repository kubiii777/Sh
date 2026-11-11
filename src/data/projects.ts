export type ProjectCategory = "AI" | "Security" | "E-commerce" | "Magento 2" | "Web app" | "Software";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  year: string;
  image: string;
  /** Wszystkie projekty są demonstracyjne, dopóki nie zastąpią ich prawdziwe realizacje. */
  demo: true;
  featured?: boolean;
};

// Faza 4 rozszerza ten typ o: klient, branża, zakres, stack, wyzwanie, rozwiązanie, efekty, galeria, cytat.
export const projects: Project[] = [
  {
    slug: "asystent-dokumentacji-technicznej",
    name: "Asystent dokumentacji technicznej",
    category: "AI",
    year: "2026",
    image: "/images/projects/asystent-dokumentacji-technicznej.png",
    demo: true,
    featured: true,
  },
  {
    slug: "migracja-hurtowni-b2b-na-magento-2",
    name: "Migracja hurtowni B2B na Magento 2",
    category: "Magento 2",
    year: "2026",
    image: "/images/projects/migracja-hurtowni-b2b-na-magento-2.png",
    demo: true,
    featured: true,
  },
  {
    slug: "audyt-bezpieczenstwa-sklepu",
    name: "Audyt bezpieczeństwa sklepu internetowego",
    category: "Security",
    year: "2025",
    image: "/images/projects/audyt-bezpieczenstwa-sklepu.png",
    demo: true,
    featured: true,
  },
  {
    slug: "optymalizacja-wydajnosci-sklepu",
    name: "Optymalizacja wydajności sklepu",
    category: "E-commerce",
    year: "2025",
    image: "/images/projects/optymalizacja-wydajnosci-sklepu.png",
    demo: true,
  },
  {
    slug: "panel-klienta-b2b",
    name: "Panel klienta B2B",
    category: "Web app",
    year: "2025",
    image: "/images/projects/panel-klienta-b2b.png",
    demo: true,
  },
  {
    slug: "integracja-erp-z-magazynem",
    name: "Integracja ERP z magazynem",
    category: "Software",
    year: "2025",
    image: "/images/projects/integracja-erp-z-magazynem.png",
    demo: true,
  },
];
