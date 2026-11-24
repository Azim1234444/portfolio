import type { ProjectItem } from "@/types";
import trustedEmpireHome from "@/assets/images/trusted-empire-home.jpg";
import trustedEmpirePlans from "@/assets/images/trusted-empire-plans.jpg";
import trustedEmpireHowItWorks from "@/assets/images/trusted-empire-how-it-works.jpg";
import trustedEmpireSupport from "@/assets/images/trusted-empire-support.jpg";
import corporateEstatesHome from "@/assets/images/corporate-estates-home.jpg";
import corporateEstatesUnitTypes from "@/assets/images/corporate-estates-unit-types.jpg";
import corporateEstatesGallery from "@/assets/images/corporate-estates-gallery.jpg";
import corporateEstatesLayout from "@/assets/images/corporate-estates-layout.jpg";
import corporateEstatesContact from "@/assets/images/corporate-estates-contact.jpg";
import uptimeproHome from "@/assets/images/uptimepro-home.webp";
import uptimeproNews from "@/assets/images/uptimepro-news.webp";
import uptimeproSolutions from "@/assets/images/uptimepro-solutions.webp";
import uptimeproFaq from "@/assets/images/uptimepro-faq.webp";
import uptimeproContact from "@/assets/images/uptimepro-contact.webp";
import ptwLogin from "@/assets/images/ptw-login.webp";
import ptwRequester from "@/assets/images/ptw-requester.webp";
import ptwRoles from "@/assets/images/ptw-roles.webp";
import ptwSafetyOfficer from "@/assets/images/ptw-safety-officer.webp";
import ptwSupervisor from "@/assets/images/ptw-supervisor.webp";
import ptwWorker from "@/assets/images/ptw-worker.webp";
import carRentalLogin from "@/assets/images/carrental-login.webp";
import carRentalHome from "@/assets/images/carrental-home.webp";
import carRentalListing from "@/assets/images/carrental-listing.webp";
import carRentalDetail from "@/assets/images/carrental-detail.webp";
import carRentalBookings from "@/assets/images/carrental-bookings.webp";
import carRentalUpdate from "@/assets/images/carrental-update.webp";
import ipLanding from "@/assets/images/ip-landing.webp";
import ipAdminLogin from "@/assets/images/ip-adminlogin.webp";
import horrorMenu from "@/assets/images/horror-menu.webp";
import horrorDoctor from "@/assets/images/horror-doctor.webp";
import horrorMedicine from "@/assets/images/horror-medicine.webp";
import horrorHaloperidol from "@/assets/images/horror-haloperidol.webp";
import horrorHome from "@/assets/images/horror-home.webp";
import horrorKitchen from "@/assets/images/horror-kitchen.webp";
import horrorEntity from "@/assets/images/horror-entity.webp";
import horrorQuiz from "@/assets/images/horror-quiz.webp";
import vrCinemaHallModern from "@/assets/images/vrcinema-hall-modern.webp";
import vrCinemaHallOutdoor from "@/assets/images/vrcinema-hall-outdoor.webp";
import vrCinemaMovieSelect from "@/assets/images/vrcinema-movie-select.webp";
import vrCinemaMovieInfo from "@/assets/images/vrcinema-movie-info.webp";
import vrCinemaSnacks from "@/assets/images/vrcinema-snacks.webp";
import vrCinemaLobby from "@/assets/images/vrcinema-lobby.webp";
import vrCinemaPortal from "@/assets/images/vrcinema-portal.webp";
import vrCinemaControls from "@/assets/images/vrcinema-controls.webp";
import kongsiRasaMenu from "@/assets/images/kongsirasa-menu.webp";
import kongsiRasaHome from "@/assets/images/kongsirasa-home.webp";
import kongsiRasaAuth from "@/assets/images/kongsirasa-auth.webp";
import kongsiRasaAdmin from "@/assets/images/kongsirasa-admin.webp";
import kongsiRasaAdminUsers from "@/assets/images/kongsirasa-admin-users.webp";
import kongsiRasaAdminRecipes from "@/assets/images/kongsirasa-admin-recipes.webp";
import ipDashboard from "@/assets/images/ip-dashboard.webp";
import ipTables from "@/assets/images/ip-tables.webp";
import ipEdit from "@/assets/images/ip-edit.webp";
import moraknivHome from "@/assets/images/morakniv-home.webp";
import moraknivProducts from "@/assets/images/morakniv-products.webp";
import moraknivBoning from "@/assets/images/morakniv-boning.webp";
import moraknivTechnology from "@/assets/images/morakniv-technology.webp";
import moraknivCompliance from "@/assets/images/morakniv-compliance.webp";
import moraknivCatalogue from "@/assets/images/morakniv-catalogue.webp";
import moraknivProductDetail from "@/assets/images/morakniv-product-detail.webp";
import terpesonaHome from "@/assets/images/terpesona-home.webp";
import terpesonaBag from "@/assets/images/terpesona-bag.webp";
import terpesonaShipping from "@/assets/images/terpesona-shipping.webp";
import terpesonaLogin from "@/assets/images/terpesona-login.webp";
import nutriscanBanner from "@/assets/images/nutriscan-banner.webp";
import nutriscanDashboard from "@/assets/images/nutriscan-dashboard.webp";
import nutriscanScan from "@/assets/images/nutriscan-scan.webp";
import nutriscanAnalysis from "@/assets/images/nutriscan-analysis.webp";
import nutriscanHistory from "@/assets/images/nutriscan-history.webp";

export const PROJECTS: ProjectItem[] = [
  {
    slug: "nutriscan-ai-nutrition-tracker",
    title: "NutriScan — AI Food & Nutrition Tracker",
    category: "Mobile App",
    year: "2026",
    tags: [
      "Flutter",
      "Dart",
      "Google Gemini",
      "Firebase Auth",
      "Cloud Firestore",
      "Open Food Facts",
      "Barcode Scanner",
      "Speech-to-Text",
    ],
    description:
      "An AI-powered Flutter Android nutrition tracker backed by Google Gemini, Firebase Auth, Cloud Firestore, and Open Food Facts — enabling users to scan meals via camera, barcode, or voice to estimate calories and macros and track daily and weekly nutrition goals.",
    highlights: [
      "AI meal photo analysis powered by Google Gemini with calorie, macro breakdown, and confidence scoring (including local dishes like Nasi Ayam Penyet)",
      "Multi-modal food logging via camera capture, barcode scanning (Open Food Facts), and voice input (speech-to-text)",
      "Real-time daily dashboard tracking remaining calories, progress percentage, and protein, carbs, and fat targets",
      "Weekly nutrition history view with day-by-day calorie trends, meal editing, and macro summaries",
      "Firebase Auth, Cloud Firestore persistence, and Firebase App Check with a Google Play Closed Testing release pipeline",
    ],
    image: nutriscanBanner,
    gallery: [
      {
        src: nutriscanDashboard,
        caption: "Home dashboard — daily calorie ring, macro targets, and recent meals",
      },
      {
        src: nutriscanScan,
        caption: "Scan Food — meal photo capture and review before AI analysis",
      },
      {
        src: nutriscanAnalysis,
        caption: "AI Analysis — estimated calories, macro breakdown, and confidence score",
      },
      {
        src: nutriscanHistory,
        caption: "History — weekly calorie chart, day totals, and meal logs",
      },
    ],
    gradient: ["#15803d", "#34d399"],
    featured: true,
  },
  {
    slug: "morakniv-food-industry-malaysia",
    title: "Morakniv Food Industry Malaysia — Product Catalogue & Quotation Website",
    category: "Corporate & Catalogue",
    year: "2026",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
      "Product Catalogue",
      "SEO",
      "Vercel",
    ],
    description:
      "The Malaysian product showcase and B2B quotation website for Morakniv Food Industry knives (distributed by Akmal Station) — presenting 45 professional knife models across 6 categories and 99 article numbers with metallurgy specifications, food contact compliance declarations, and quotation workflows.",
    highlights: [
      "Structured 6-category knife catalogue (Boning, Butcher, Filleting, Trimming, Chef's, and Special Knives) covering 45 models and 99 article numbers",
      "Filterable product specs by blade flex grade (stiff to extra flex) and 5 handle colours including metal-detectable blue",
      "Dedicated technology pages detailing Alleima 10C28Mo2 Swedish stainless steel (57 HRC), blade grinding, PUG handles, and safety",
      "Quality & Compliance section publishing Morakniv AB food contact material declarations and European regulatory standards",
      "B2B quotation request flow, ordering guide, dealer information, and SEO-ready metadata with sitemap",
    ],
    image: moraknivHome,
    gallery: [
      {
        src: moraknivHome,
        caption: "Homepage — Morakniv Food Industry Malaysia hero, metrics, and quotation entry",
      },
      {
        src: moraknivProducts,
        caption: "Product range — 6 professional knife categories covering 45 models",
      },
      {
        src: moraknivBoning,
        caption: "Category detail — Boning Knives with 22 models and 66 article numbers",
      },
      {
        src: moraknivCatalogue,
        caption: "Catalogue grid — 45 knife models with flex grades and handle colour indicators",
      },
      {
        src: moraknivProductDetail,
        caption: "Product detail — CB5S-PUG specifications and handle colour article selector",
      },
      {
        src: moraknivTechnology,
        caption: "Technology — Alleima 10C28Mo2 steel metallurgy and blade engineering",
      },
      {
        src: moraknivCompliance,
        caption: "Quality & Compliance — Morakniv AB food contact material declarations",
      },
    ],
    gradient: ["#b72d25", "#1f2937"],
    featured: true,
  },
  {
    slug: "terpesona-gift-boutique-ecommerce",
    title: "Terpesona — Luxury Gift Boutique & E-Commerce",
    category: "E-Commerce & Web",
    year: "2026",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "E-Commerce",
      "Responsive Design",
      "SEO",
      "Vercel",
    ],
    description:
      "A refined Malaysian gift boutique e-commerce storefront for Terpesona, showcasing curated gift sets, prayer & self-care boxes, festive hampers, and bespoke corporate gifting with complimentary handwritten calligraphy notes and same-day Klang Valley dispatch.",
    highlights: [
      "Editorial boutique storefront featuring Signature, Under RM 100, Festive, and Corporate Hamper collections",
      "Interactive search, collection filtering, price bracket sorting, and shopping bag workflow",
      "Dedicated Gift Concierge and WhatsApp bespoke arrangement flow for custom gifting",
      "Same-day Klang Valley dispatch highlights, delivery policies, and complimentary calligraphy note options",
      "SEO-configured metadata, structured sitemap, and responsive layout across desktop and mobile",
    ],
    image: terpesonaHome,
    gallery: [
      {
        src: terpesonaHome,
        caption: "Storefront homepage — curated gift sets, value tiers, and exclusive collections",
      },
      {
        src: terpesonaBag,
        caption: "Shopping cart — curated gift bag with WhatsApp stylist concierge",
      },
      {
        src: terpesonaShipping,
        caption: "Shipping & courier policy — nationwide coverage and free delivery tiers",
      },
      {
        src: terpesonaLogin,
        caption: "Customer & boutique sign-in with email and Google authentication",
      },
    ],
    gradient: ["#6b1d2f", "#d4af37"],
    featured: true,
  },
  {
    slug: "trusted-empire-subscription-platform",
    title: "Trusted Empire — Digital Subscription Platform",
    category: "E-Commerce & Web",
    year: "2026",
    tags: [
      "React",
      "Vite",
      "Responsive Design",
      "Product Catalogue",
      "Order Workflow",
      "Payment Verification",
      "WhatsApp",
      "Telegram",
    ],
    description:
      "A responsive digital subscription storefront for Malaysian customers to compare entertainment plans, place orders and submit payment receipts for admin verification — with direct WhatsApp and Telegram support built into the customer journey.",
    highlights: [
      "Subscription catalogue for Netflix, HBO Max, Amazon Prime, VIU, iQIYI and IPTV",
      "Clear plan, duration and MYR pricing options designed for quick comparison",
      "Guided checkout flow with QR or CIMB payment instructions",
      "Receipt upload and manual admin verification for submitted orders",
      "WhatsApp support and Telegram community links integrated throughout the site",
      "Responsive dark interface optimized for mobile and desktop browsing",
    ],
    demo: "https://abitrustedempire.com/",
    image: trustedEmpireHome,
    gallery: [
      {
        src: trustedEmpireHome,
        caption: "Homepage — entertainment plans, pricing and customer support entry points",
      },
      {
        src: trustedEmpirePlans,
        caption: "Subscription catalogue — streaming and IPTV plans with MYR pricing",
      },
      {
        src: trustedEmpireHowItWorks,
        caption: "How it works — guided plan selection, payment and verification steps",
      },
      {
        src: trustedEmpireSupport,
        caption: "Help center — Netflix guides with WhatsApp and Telegram support",
      },
    ],
    gradient: ["#c7f464", "#84cc16"],
    featured: true,
  },
  {
    slug: "corporate-estates-property-website",
    title: "Corporate Estates — Property Landing Page",
    category: "Property Website",
    year: "2026",
    tags: [
      "React",
      "Vite",
      "Responsive Design",
      "SEO",
      "Property Showcase",
      "Lead Generation",
      "WhatsApp",
    ],
    description:
      "A polished property marketing website for the Corporate Estates three-storey semi-detached development in Alam Impian, presenting unit specifications, architectural visuals and project layouts through a focused lead-generation experience.",
    highlights: [
      "Immersive hero and development overview built around architectural visuals",
      "Detailed Type A and Type B unit specifications with built-up and parking information",
      "Responsive gallery with full-size property and project layout viewing",
      "Validated property enquiry form with unit-type selection",
      "Direct WhatsApp enquiry flows tailored to the selected unit",
      "Search and social metadata configured for discoverability and rich link previews",
    ],
    demo: "https://www.syazproperty.com/",
    image: corporateEstatesHome,
    gallery: [
      {
        src: corporateEstatesHome,
        caption: "Homepage — Corporate Estates hero and development overview",
      },
      {
        src: corporateEstatesUnitTypes,
        caption: "Unit types — detailed Type A and Type B specifications",
      },
      {
        src: corporateEstatesGallery,
        caption: "Property gallery — architectural renders and building specifications",
      },
      {
        src: corporateEstatesLayout,
        caption: "Project layout — development plan and road frontage details",
      },
      {
        src: corporateEstatesContact,
        caption: "Pricing and enquiries — lead-generation form and property contact",
      },
    ],
    gradient: ["#26322d", "#d9b97d"],
    featured: true,
  },
  {
    slug: "permit-to-work-system",
    title: "PTW Guardian — Permit-to-Work System",
    category: "Web Application",
    year: "2026",
    tags: [
      "Node.js",
      "Express",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS",
      "ExcelJS",
      "Nodemailer",
      "GitHub",
    ],
    description:
      "A digital Permit-to-Work Management System built on a Node.js and Express REST API with MySQL, designed to streamline permit requests, approval workflows, and workplace safety management through requirement analysis, workflow modeling, and web application development.",
    highlights: [
      "Node.js and Express REST API backed by MySQL, with a dependency-free vanilla JS frontend",
      "Multi-stage approval workflow — admin submit, safety officer MOS/JSA review, supervisor final release",
      "Five distinct role portals: requester, admin, safety officer, supervisor and contractor/worker",
      "Live permit validity countdown with prerequisite gating (LOTO, conflict check, permit window)",
      "Bcrypt-hashed credentials and email notifications on permit state changes",
      "Digital MOS/JSA evidence capture exported to Excel via ExcelJS",
      "Audit trail for compliance and safety reporting, covered by Node test-runner suites",
    ],
    image: ptwRequester,
    gallery: [
      { src: ptwLogin, caption: "Sign-in — employee ID based safety access" },
      { src: ptwRequester, caption: "Requester — permit request control center" },
      { src: ptwSafetyOfficer, caption: "Safety officer — staged MOS and permit approval" },
      { src: ptwSupervisor, caption: "Supervisor — final release with prerequisite checks" },
      { src: ptwWorker, caption: "Worker portal — assigned permits and validity countdown" },
      { src: ptwRoles, caption: "Admin — role-based access management" },
    ],
    gradient: ["#3d7dff", "#8b5cf6"],
    featured: true,
  },
  {
    slug: "wordpress-website",
    title: "UPTIME PRO Corporate Website",
    category: "CMS & Web",
    year: "2026",
    tags: ["WordPress", "Hostinger", "SEO", "CMS", "Performance Optimization", "Responsive Design"],
    description:
      "The corporate website for UPTIME PRO Engineering — a performance-tuned WordPress build covering railway engineering, industrial automation and real-time monitoring services, deployed and hosted on Hostinger with on-page SEO and a fully responsive layout.",
    highlights: [
      "Built the full site structure — home, about, solutions, projects, news and contact",
      "Service showcase covering railway engineering, PLC/SCADA automation and real-time monitoring",
      "Accordion FAQ, enquiry form and an embedded Google Map of the Puchong office",
      "Configured hosting, DNS and SSL on Hostinger",
      "Optimized Core Web Vitals and page load performance",
      "Implemented on-page SEO best practices across all pages",
    ],
    demo: "https://uptimepro.com.my/",
    image: uptimeproHome,
    gallery: [
      { src: uptimeproHome, caption: "Homepage — hero and services overview" },
      { src: uptimeproSolutions, caption: "Solutions grid — railway, automation and monitoring services" },
      { src: uptimeproFaq, caption: "About page — accordion FAQ and office imagery" },
      { src: uptimeproContact, caption: "Contact page — enquiry form with embedded office map" },
      { src: uptimeproNews, caption: "News & insights article layout" },
    ],
    gradient: ["#4f9cff", "#6fa8ff"],
    featured: true,
  },
  {
    slug: "intellectual-property-management-system",
    title: "Intellectual Property Management System",
    category: "Web Application",
    year: "2024",
    tags: [
      "PHP",
      "MySQL",
      "Bootstrap",
      "jQuery",
      "DataTables",
      "CRUD",
      "Admin Dashboard",
      "Responsive Design",
    ],
    description:
      "A full-stack platform for UTHM's Innovation and Commercialisation Centre (ICC) to track and manage intellectual property records across five categories — patents, trademarks, utility innovations, industrial designs and copyrights — with a responsive admin dashboard and complete CRUD operations.",
    highlights: [
      "Separate public information site and authenticated admin backend",
      "CRUD across five IP categories: patent, trademark, utility innovation, industrial design and copyright",
      "Searchable, sortable, paginated datatables for every record type",
      "Dashboard statistics broken down by faculty with running IP totals",
      "Owned both frontend and backend implementation",
    ],
    image: ipDashboard,
    gallery: [
      { src: ipLanding, caption: "Public site — ICC intellectual property landing page" },
      { src: ipAdminLogin, caption: "Admin sign-in" },
      { src: ipDashboard, caption: "Admin dashboard — IP totals and per-faculty statistics" },
      { src: ipTables, caption: "Patent datatable — searchable, sortable, paginated" },
      { src: ipEdit, caption: "Record edit form with validation" },
    ],
    gradient: ["#2557e0", "#8b5cf6"],
  },
  {
    slug: "kongsi-rasa-recipe-platform",
    title: "KongsiRasa — Recipe Sharing Platform",
    category: "Web Application",
    year: "2025",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS", "SCSS", "XAMPP"],
    description:
      "A Malaysian recipe sharing platform where members publish their own recipes, comment on others, and subscribe for premium access — backed by a two-tier administrator panel for moderating users, recipes and subscriptions.",
    highlights: [
      "Three access levels — guest browsing, registered member, and administrator",
      "Two-tier admin roles: upper admins can register and remove other admins, lower admins cannot",
      "Members publish recipes with image upload, then edit or delete their own posts",
      "Recipe search across the catalogue plus a commenting system",
      "Subscription tier with payment records and admin-side subscription management",
      "Admin dashboard with live counts for admins, users and recipes",
    ],
    image: kongsiRasaMenu,
    gallery: [
      { src: kongsiRasaHome, caption: "Landing page — KongsiRasa top picks" },
      { src: kongsiRasaMenu, caption: "Recipe catalogue by course and category" },
      { src: kongsiRasaAuth, caption: "Combined log in / sign up with admin entry" },
      { src: kongsiRasaAdmin, caption: "Admin dashboard — platform totals" },
      { src: kongsiRasaAdminUsers, caption: "Admin — member management" },
      { src: kongsiRasaAdminRecipes, caption: "Admin — recipe moderation with search" },
    ],
    gradient: ["#0d9488", "#2dd4bf"],
  },
  {
    slug: "car-rental-management-system",
    title: "MyDrive — Car Rental Management System",
    category: "Web Application",
    year: "2025",
    tags: ["PHP", "MySQL", "Bootstrap", "jQuery", "JavaScript", "HTML", "CSS", "CRUD", "XAMPP"],
    description:
      "A full-stack car rental platform with customer booking and an admin fleet backend — users browse and search available cars, book by date range with delivery details, manage bookings and payments, and leave ratings, while admins handle the vehicle inventory.",
    highlights: [
      "Session-based authentication with separate customer and admin logins",
      "Car catalogue with search, detail pages and per-day RM pricing",
      "Date-range booking flow with automatic total-days and price calculation",
      "Booking management — pay, update or cancel, with status tracking",
      "Admin fleet CRUD for adding, updating and removing vehicles",
      "Ratings and reviews on individual cars",
    ],
    image: carRentalHome,
    gallery: [
      { src: carRentalLogin, caption: "Sign-in — customer and admin access" },
      { src: carRentalHome, caption: "Customer home — logged-in landing page" },
      { src: carRentalListing, caption: "Fleet catalogue with search and per-day pricing" },
      { src: carRentalDetail, caption: "Car detail — specs, booking form and reviews" },
      { src: carRentalBookings, caption: "My bookings — pay, update or cancel" },
      { src: carRentalUpdate, caption: "Update booking — status-aware field locking" },
    ],
    gradient: ["#0ea5e9", "#3d7dff"],
  },
  {
    slug: "vr-cinema",
    title: "VR Cinema",
    category: "VR Experience",
    year: "2025",
    tags: ["Unity 6", "C#", "URP", "XR", "Video Player", "Input System", "3D", "Team Project"],
    description:
      "A virtual reality cinema built in Unity 6 where users explore themed theatre halls, teleport between them through portals, pick a film from a lineup of Malaysian and international titles, watch it on the big screen with full playback controls, and order snacks that spawn as grabbable physics objects.",
    highlights: [
      "Two contrasting venues — an indoor neon-lit theatre and an open-air drive-in with hay-bale seating",
      "Portal-based teleportation between halls with transition delay and cooldown handling",
      "Trigger-activated in-world UI — movie selector, per-film info panels and a snack menu",
      "Per-film detail cards with format, release date and synopsis alongside the poster",
      "In-scene video playback on the theatre screen with play, pause and stop controls",
      "Physics-driven snack ordering: spawn in front of the player, hold, release and auto-despawn",
      "Animated neon RGB lighting cycles for theatre ambience",
      "Raycast-driven pointer interaction for VR-friendly menus",
      "Built on the Universal Render Pipeline with Unity's new Input System",
      "Four-person collaborative team project",
    ],
    image: vrCinemaHallModern,
    gallery: [
      { src: vrCinemaHallModern, caption: "Indoor hall — tiered seating and neon-trimmed screen" },
      { src: vrCinemaHallOutdoor, caption: "Open-air hall — drive-in style with hay-bale seating" },
      { src: vrCinemaMovieSelect, caption: "Movie selector — Malaysian and international lineup" },
      { src: vrCinemaMovieInfo, caption: "Film details with play, pause and stop controls" },
      { src: vrCinemaSnacks, caption: "Food & beverages menu with a spawned snack in hand" },
      { src: vrCinemaLobby, caption: "Spawn hub — orientation screen and hall entrance" },
      { src: vrCinemaPortal, caption: "Portal to the 'Modern' themed hall" },
      { src: vrCinemaControls, caption: "In-world control scheme — move, sneak, sprint, interact" },
    ],
    gradient: ["#7c3aed", "#ec4899"],
    featured: true,
  },
  {
    slug: "3d-survival-horror-game",
    title: "3D Survival Horror Game",
    category: "Game Development",
    year: "2024",
    tags: [
      "Unity 6",
      "C#",
      "Blender",
      "URP",
      "AI Navigation",
      "Timeline",
      "3D Modelling",
      "Mental Health Awareness",
      "GDLC",
    ],
    description:
      "A 3D survival horror game built in Unity that puts the player inside the experience of living with schizophrenia — following a character through clinic visits, medication routines and hallucinated threats at home, then testing the player's understanding through in-game assessment.",
    highlights: [
      "Objective-driven progression with tracked tasks such as 'Talk to the Doctor' and 'Take the Medicine'",
      "Hallucination encounters where a shadow entity appears only to the player character",
      "Medication-adherence theme built around a modelled Haloperidol antipsychotic prop",
      "Subtitled narrative dialogue driving the player through clinic and home chapters",
      "In-game assessment quiz on identifying mental illness, with immediate right/wrong feedback",
      "Press-E interaction system with on-screen prompts and objective counters",
      "Modeled and textured 3D environments and props in Blender",
      "Scripted gameplay systems and AI behaviour in C#",
    ],
    image: horrorMenu,
    gallery: [
      { src: horrorMenu, caption: "Title screen" },
      { src: horrorDoctor, caption: "Clinic — 'Talk to the Doctor' objective" },
      { src: horrorMedicine, caption: "Collecting prescribed medication via the interact prompt" },
      { src: horrorHaloperidol, caption: "Haloperidol prop — modelled antipsychotic medication" },
      { src: horrorHome, caption: "Returning home — subtitled narrative beat" },
      { src: horrorKitchen, caption: "Guided objective toward the kitchen" },
      { src: horrorEntity, caption: "Hallucination encounter — the shadow entity" },
      { src: horrorQuiz, caption: "In-game assessment on identifying the condition" },
    ],
    gradient: ["#6d28d9", "#a855f7"],
    featured: true,
  },
];
