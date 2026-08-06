import type { ProjectItem } from "@/types";
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

export const PROJECTS: ProjectItem[] = [
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
