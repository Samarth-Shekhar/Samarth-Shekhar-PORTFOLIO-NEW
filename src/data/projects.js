export const projects = [
  {
    id: 1,
    number: "01",
    title: "MULTI-AGENT ORCHESTRATION SYSTEM",
    subtitle: "Autonomous Agentic AI Workflow Platform",
    tagline: "Autonomous multi-agent system executing non-deterministic workflows through specialized planning, retrieval, execution, and evaluation pipelines.",
    category: "AI & Autonomous Systems",
    year: "2025",
    description:
      "A distributed agentic platform built with LangGraph and FastAPI that orchestrates specialized AI agents to autonomously plan, research, execute, and self-validate multi-step computational tasks.",
    highlights: [
      "4 Autonomous Agent Personas (Planner, Retriever, Executor, Evaluator)",
      "Dynamic DAG task execution with LangGraph state machines",
      "Hybrid RAG with vector semantic search and dense chunk retrieval",
      "Self-correction loop triggered on low evaluation confidence (<95%)",
      "Asynchronous REST API service containerized with Docker",
    ],
    features: [
      "Dynamic Planner Agent decomposing high-level prompts into DAG steps",
      "Vector-based Retriever Agent querying contextual knowledge bases",
      "Sandboxed Executor Agent synthesizing code & executing API calls",
      "Evaluator / Critic Agent validating outputs against strict Pydantic schemas",
      "Persistent state management across multi-turn agent conversations",
      "Asynchronous task queues powered by FastAPI and AsyncIO",
      "Containerized deployment architecture ready for cloud scaling",
    ],
    technologies: [
      "Python",
      "LangGraph",
      "FastAPI",
      "RAG",
      "Llama-3",
      "Pydantic",
      "ChromaDB",
      "Docker",
    ],
    metrics: [
      { label: "Agent Coordination Latency", value: "<850ms" },
      { label: "Evaluation Pass Rate", value: "98.4%" },
      { label: "Autonomous Personas", value: "4 Agents" },
      { label: "Deployment", value: "Docker / FastAPI" },
    ],
    github: "https://github.com/Samarth-Shekhar/Multi-Agent-Orchestration-System-Project",
    liveDemo: "",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    previewImage: "/project-previews/gitpilot-dashboard.png",
    caseStudy: {
      overview:
        "The Multi-Agent Orchestration System is a cutting-edge platform designed to conquer the limitations of monolithic LLM architectures. By distributing responsibilities among autonomous agents—each with dedicated memory, toolsets, and evaluation criteria—the system achieves complex problem-solving that single-prompt pipelines cannot replicate.",
      problem:
        "Standard LLM implementations struggle with context saturation, compounding hallucinations, and a lack of self-correction during multi-step tasks. In enterprise workflows—such as automated research synthesis, code generation, or multi-source data auditing—monolithic models fail without modular validation boundaries.",
      approach:
        "Engineered a state-graph topology using LangGraph where the Planner Agent first decomposes an ambiguous prompt into a Directed Acyclic Graph (DAG) of actionable micro-tasks. The Retriever Agent queries a local vector store (ChromaDB) for high-density domain chunks. The Executor Agent synthesizes solutions using Llama-3 and external tools, while the Evaluator Agent rigorously scores output against precision criteria. If validation fails, the output loops back to the planner with explicit diagnostic feedback.",
      contribution:
        "Designed and implemented the core LangGraph state machine, built the asynchronous FastAPI REST service endpoints, engineered the hybrid RAG retrieval pipeline with custom chunking, and authored Docker containerization scripts for one-command deployment.",
      learned:
        "Deepened mastery of agentic topologies, memory hierarchy design (working vs episodic memory), cyclic graph orchestration, and techniques for mitigating cascading errors in autonomous LLM networks.",
    },
  },
  {
    id: 2,
    number: "02",
    title: "FOLATE — AI WEB APPLICATION GENERATOR",
    subtitle: "Real-Time AI-Powered Interface Generator",
    tagline: "Prompt-to-code engine transforming natural language descriptions into responsive web applications with live hot-reload sandbox preview.",
    category: "Generative AI & Web Engineering",
    year: "2025",
    description:
      "A developer productivity tool that converts plain English prompts into production-ready frontend layouts, component hierarchies, and interactive responsive experiences in real-time.",
    highlights: [
      "Natural language to responsive component tree generation",
      "Instant sandboxed iframe preview with live hot-reloading",
      "Zero-dependency vanilla HTML/CSS/JS output for maximum portability",
      "Interactive prompt refinement (e.g. 'Add a dark mode toggle')",
      "One-click complete source bundle ZIP download",
    ],
    features: [
      "Natural language prompt interpretation using LangChain and OpenAI",
      "Dynamic component layout planning with clean semantic markup",
      "Real-time live browser preview with responsive device viewport toggles",
      "Iterative prompt refinement loop for instant micro-adjustments",
      "One-click source code export and project scaffolding",
      "Custom CSS design system injection for modern typography and glassmorphism",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "LangChain",
      "OpenAI API",
      "HTML5 / CSS3",
      "JavaScript (ES6+)",
      "WebSockets",
    ],
    metrics: [
      { label: "Generation Speed", value: "<3.2s" },
      { label: "Output Code Quality", value: "Semantic HTML5" },
      { label: "Live Domain", value: "folate.pro" },
      { label: "Prototyping Time Saved", value: "65%" },
    ],
    github: "https://github.com/Samarth-Shekhar/folate",
    liveDemo: "https://folate.pro/",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
    previewImage: "/project-previews/folate-landing-page.png",
    caseStudy: {
      overview:
        "Folate is an AI-powered web generation platform engineered to drastically accelerate the ideation-to-interface cycle. It enables founders, designers, and developers to speak or type an idea and watch an entire responsive, interactive application emerge in seconds.",
      problem:
        "Drafting responsive web prototypes from scratch is plagued by repetitive boilerplate coding, manual CSS alignment, and context switching between design tools and code editors. Existing AI generation tools frequently hallucinate non-existent NPM packages or generate unstyled fragments.",
      approach:
        "Built a robust Node.js and Express.js backend that feeds carefully structured system prompts and AST parsing guidelines into LangChain and OpenAI. The pipeline splits generation into layout architecture, semantic DOM construction, and CSS utility styling. A secure sandbox iframe renders the code via live postMessage events, allowing users to modify colors, typography, and interactive behaviors on the fly.",
      contribution:
        "Architected the full-stack system end-to-end: built the prompt-to-AST translation pipeline, designed the isolated browser preview runtime, created the responsive viewport switcher, and deployed the live application to production at folate.pro.",
      learned:
        "Gained profound insights into prompt engineering for syntactic code correctness, sandboxed iframe security, mitigating LLM token hallucinations, and handling real-time browser preview streams.",
    },
  },
  {
    id: 3,
    number: "03",
    title: "NUTRIAI — PERSONAL AI MEAL PLANNER",
    subtitle: "Intelligent Dietary Planning & Nutrition Platform",
    tagline: "Mathematical macro-optimization combined with generative AI to build personalized 7-day culinary regimens and smart grocery lists.",
    category: "AI & Applied Data Science",
    year: "2025",
    description:
      "A personalized nutrition application that computes precise caloric baselines and synthesizes custom weekly meal plans tailored to biometric data, allergen exclusions, and macro goals.",
    highlights: [
      "Biometric BMR / TDEE metabolic calculation engine",
      "Strict macro-convergence algorithm (Protein / Carb / Fat ±5%)",
      "Dietary switchboard: Keto, Vegan, High-Protein, Mediterranean, Gluten-Free",
      "Pantry-match mode: Generate recipes based on available household ingredients",
      "Automated consolidated grocery checklist categorized by grocery aisle",
    ],
    features: [
      "Total Daily Energy Expenditure (TDEE) calculation based on user biometrics",
      "Multi-constraint satisfaction filtering using Pandas and NumPy",
      "Generative recipe creation with ingredient weights and step-by-step instructions",
      "Macro-nutrient breakdown visualization with interactive nutrition charts",
      "Pantry inventory matcher to reduce domestic food waste",
      "Exportable weekly meal calendar and formatted PDF grocery list",
    ],
    technologies: [
      "Python",
      "LangChain",
      "OpenAI API",
      "Pandas",
      "NumPy",
      "Streamlit",
      "Pydantic",
    ],
    metrics: [
      { label: "Weekly Regimen Synth", value: "<4.0s" },
      { label: "Macro Accuracy", value: "±5% Target" },
      { label: "Dietary Presets", value: "8 Modes" },
      { label: "Deployment", value: "Streamlit Cloud" },
    ],
    github: "https://github.com/Samarth-Shekhar/AI-MEAL-RECIPE-PLANNER",
    liveDemo: "https://ai-meal-recipe-planner.streamlit.app/",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85",
    previewImage: "/project-previews/nutriai-meal-planner.png",
    caseStudy: {
      overview:
        "The AI Meal Planner is a data-driven nutrition assistant that bridges algorithmic nutritional math with creative LLM synthesis. It generates mathematically compliant, delicious meal schedules tailored to individual metabolic profiles and dietary restrictions.",
      problem:
        "Adhering to a diet typically fails due to decision fatigue, time-consuming manual meal logging, and generic meal plans that ignore personal tastes or pantry constraints. Users need a system that adapts to their exact biometric targets without sacrificing recipe variety.",
      approach:
        "Combined quantitative data processing in Pandas and NumPy with qualitative recipe generation via LangChain and OpenAI. The platform calculates user baseline calorie needs via the Mifflin-St Jeor equation, computes target macro distributions, filters forbidden ingredients, and prompts the LLM to structure daily meal recommendations that strictly satisfy those quantitative bounds.",
      contribution:
        "Engineered the metabolic formula algorithms, developed the prompt chaining pipeline for structured JSON recipe responses, designed the interactive Streamlit user interface, and published the live web app.",
      learned:
        "Mastered the integration of quantitative constraints with probabilistic generative AI, advanced prompt structuring for JSON outputs, and state management in reactive Python web apps.",
    },
  },
  {
    id: 4,
    number: "04",
    title: "COLLABORATIVE VIDEO SHARING PLATFORM",
    subtitle: "Secure Role-Based Creator & Editor Handoff Pipeline",
    tagline: "Role-based video collaboration platform enabling freelance editors to stage and publish YouTube uploads without credential leakage.",
    category: "Full-Stack Web Architecture",
    year: "2024",
    description:
      "A full-stack workflow system that streamlines video handoffs between YouTube creators and editors using Google OAuth2 delegated tokens and chunked resumable video uploads.",
    highlights: [
      "Zero-credential leakage: Editors publish without accessing master Google accounts",
      "Direct resumable chunked video uploads to YouTube Data API v3",
      "Role-Based Access Control (RBAC): Admin, Creator, Editor, Reviewer",
      "Timestamped frame-by-frame review comments and cut approval states",
      "MongoDB document architecture with audit logging and access key expiration",
    ],
    features: [
      "OAuth2 Google integration with scoped delegated upload privileges",
      "Time-limited ephemeral access key generation for external editors",
      "Resumable multi-part chunked upload engine supporting large 4K files",
      "Video staging workflow: Draft → Review → Revision Required → Approved → Published",
      "In-browser frame-accurate video review player with timestamped feedback markers",
      "Audit trail tracking all upload activities, metadata edits, and publishing events",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Google OAuth2",
      "YouTube Data API",
      "Multer",
    ],
    metrics: [
      { label: "Credential Risk", value: "Zero Leakage" },
      { label: "Max File Size", value: "10GB Chunked" },
      { label: "Access Control", value: "Role-Based RBAC" },
      { label: "API Integration", value: "YouTube Data v3" },
    ],
    github: "https://github.com/Samarth-Shekhar/Collaborative-Video-Sharing-Platform",
    liveDemo: "",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85",
    previewImage: "/project-previews/collaborative-video-platform.png",
    caseStudy: {
      overview:
        "The Collaborative Video Sharing Platform resolves a long-standing security vulnerability in the creator economy: how content creators can empower external video editors to stage and publish videos directly to their channels without ever handing over master Google credentials.",
      problem:
        "Video creators frequently give freelance editors their primary account passwords or Google 2FA codes, exposing personal emails, channel settings, and monetization dashboards. Alternative workarounds—like transferring huge 20GB video files through Google Drive or WeTransfer—wasted hours of upload/download bandwidth.",
      approach:
        "Architected a secure token delegation service using Google OAuth2 and the YouTube Data API v3. Creators authenticate once and issue cryptographic, time-expiring project keys for editors. Editors upload raw video chunks directly through our backend proxy using resumable streams into the creator's channel as 'Unlisted / Draft'. The creator reviews the video in a shared annotation workspace and approves publication with a single click.",
      contribution:
        "Architected the OAuth2 delegation flow, designed the MongoDB database schemas for projects, users, and audit logs, built the chunked video streaming upload handlers with Multer and Express, and developed the React.js collaboration UI.",
      learned:
        "Acquired deep expertise in OAuth2 token lifecycle management, secure credential vaulting, handling heavy binary multipart streams in Node.js, and implementing role-based access control.",
    },
  },
  {
    id: 5,
    number: "05",
    kind: "website",
    title: "STUDENTGRAD - STUDY ABROAD PLATFORM",
    subtitle: "Full-Stack Study Abroad Platform",
    tagline: "StudentGrad: Study Abroad Discovery & Lead Management Platform",
    category: "Education & Web Engineering",
    year: "2025",
    description:
      "A full-stack education platform connecting students with international study opportunities through destination discovery, program exploration, counselling enquiries, and integrated CRM lead capture. The platform combines responsive React interfaces with backend APIs, validated enquiry workflows, bot protection, and Salesmax CRM integration to support the student enquiry journey.",
    highlightTags: [
      "Study Abroad",
      "Lead Management",
      "CRM Integration",
      "Form Validation",
      "CAPTCHA Protection",
    ],
    highlights: [
      "Responsive frontend components for destinations, programs, and student-facing pages.",
      "Student enquiry and counselling workflows with form validation using React Hook Form and Zod.",
      "Salesmax integration for submitting leads and capturing enquiries in the CRM.",
      "Cloudflare Turnstile CAPTCHA integration to help protect enquiry forms from automated submissions.",
      "Frontend data flows and backend API integrations using React, Node.js, and Express.",
      "Reusable UI components and website improvements focused on usability and maintainability.",
    ],
    features: [
      "Responsive frontend development across desktop, tablet, and mobile",
      "Backend workflows and secure form validation",
      "CAPTCHA protection with Cloudflare Turnstile",
      "Salesmax CRM lead integration",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Wouter",
      "TanStack React Query",
      "React Hook Form",
      "Zod",
      "Node.js",
      "Express",
      "MySQL",
      "Drizzle ORM",
      "pnpm",
      "Cloudflare Turnstile",
      "Salesmax CRM",
      "Google Cloud Storage",
    ],
    github: "https://github.com/Samarth-Shekhar/Student-Grad-Website",
    liveDemo: "https://studentgrad.com/",
    image: "/project-previews/studentgrad-homepage.jpg",
    previewImage: "/project-previews/studentgrad-homepage.jpg",
    caseStudy: {
      overview:
        "StudentGrad is a study-abroad platform designed to help students explore international education opportunities and connect with counsellors. The website brings program discovery, student enquiries, and lead management together in a responsive digital experience.",
      problem:
        "Study-abroad enquiries need a straightforward user journey, reliable form validation, and a way to capture submitted leads for follow-up. The platform also needed bot protection and consistent frontend-to-backend communication.",
      approach:
        "Worked on responsive React components, navigation, data fetching, and enquiry form workflows. Integrated validation with React Hook Form and Zod, Cloudflare Turnstile for bot protection, and Salesmax for lead submission and CRM capture. The application uses Node.js and Express for backend workflows, with MySQL and Drizzle ORM in the displayed technology stack.",
      contribution:
        "Contributed to frontend development, responsive UI improvements, enquiry workflows, CAPTCHA integration, CRM lead submission, and debugging. Worked across frontend and backend-connected functionality to improve the student enquiry experience.",
      learned:
        "Strengthened my understanding of full-stack website workflows, form validation, third-party integrations, CRM lead capture, and the importance of connecting user-facing interfaces with reliable backend processes.",
    },
  },
  {
    id: 6,
    number: "06",
    kind: "website",
    title: "4PL ACADEMY - EDUCATION PLATFORM",
    subtitle: "Full-Stack Education Platform",
    tagline: "4PL Academy: Industry-Integrated Learning & Program Discovery",
    category: "Education & Web Engineering",
    year: "2025",
    description:
      "A responsive education platform showcasing degree programs, AI-focused courses, university information, and career-oriented learning opportunities through a modern digital experience. The website combines reusable React components, interactive UI elements, backend-connected workflows, validated forms, and counselling actions to make educational opportunities easier to explore.",
    highlightTags: [
      "Education Platform",
      "AI Programs",
      "Course Discovery",
      "Responsive UI",
      "Counselling Workflows",
    ],
    highlights: [
      "Responsive website layouts and reusable React components.",
      "Program, course, and university sections with structured content presentation.",
      "Interactive UI elements and motion effects using Framer Motion.",
      "Navigation, data-fetching, and frontend workflows using Wouter and TanStack Query.",
      "Form handling and validation using React Hook Form and Zod.",
      "Backend-connected functionality and email workflows using Node.js, Express, and Microsoft Graph.",
      "UI refinements, responsive improvements, debugging, and deployment preparation.",
    ],
    features: [
      "Responsive education and programme discovery interface",
      "Interactive elements and animated UI components",
      "Validated forms and backend workflow integration",
      "Reusable component system for content-led pages",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "Lucide Icons",
      "Wouter",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Node.js",
      "Express 5",
      "MySQL",
      "Drizzle ORM",
      "Drizzle Kit",
      "pnpm",
      "Microsoft Graph",
    ],
    github: "https://github.com/Samarth-Shekhar/4PL-Academy-Website",
    liveDemo: "https://www.4placademy.com/",
    image: "/project-previews/4pl-academy-homepage.png",
    previewImage: "/project-previews/4pl-academy-homepage.png",
    caseStudy: {
      overview:
        "4PL Academy is the learning and development arm of 4PL Consultancy. Its website presents educational programs, AI-related courses, and university opportunities through a structured interface designed to help prospective students explore learning pathways and request counselling.",
      problem:
        "The website needed to present multiple programs and educational opportunities clearly while maintaining consistent navigation, responsive layouts, and accessible counselling actions across devices.",
      approach:
        "Worked on the frontend implementation and redesign using React, Vite, Tailwind CSS, and reusable UI components. Used Wouter and TanStack Query for routing and data-fetching workflows, React Hook Form and Zod for form handling, and Framer Motion for interactive elements. The backend stack includes Node.js, Express 5, Drizzle ORM, and MySQL, with Microsoft Graph used for email integration.",
      contribution:
        "Contributed to the website's UI implementation, responsive layouts, component development, interactive elements, form workflows, and website improvements. Helped refine the presentation of programs, universities, and counselling actions and prepared the website for deployment.",
      learned:
        "Improved my experience with full-stack website development, reusable component architecture, responsive design, animation, backend integration, form validation, and building digital experiences around real user journeys.",
    },
  },
];
