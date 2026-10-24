import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const DATA_DIR = path.join(__dirname, '../data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const UPLOADS_DIR = path.join(__dirname, '../uploads')
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

const DB_PATH = path.join(DATA_DIR, 'portfolio.db')
const db = new Database(DB_PATH)

// Enable foreign keys and WAL mode for high performance
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      last_password_change TEXT,
      recovery_token TEXT,
      recovery_token_expires TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL,
      last_active_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      site_title TEXT,
      meta_description TEXT,
      author_name TEXT,
      tagline TEXT,
      headline TEXT,
      statement TEXT,
      avatar_url TEXT,
      available_status TEXT,
      cta_label TEXT,
      cta_link TEXT,
      contact_email TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      location_text TEXT,
      footer_text TEXT,
      header_config TEXT,
      resume_config TEXT,
      about_config TEXT,
      stats_config TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      tagline TEXT,
      category TEXT,
      year TEXT,
      kind TEXT DEFAULT 'project',
      description TEXT,
      highlights TEXT,
      features TEXT,
      technologies TEXT,
      metrics TEXT,
      github TEXT,
      liveDemo TEXT,
      image TEXT,
      previewImage TEXT,
      gallery TEXT,
      caseStudy TEXT,
      status TEXT DEFAULT 'published',
      featured INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT DEFAULT 'work',
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      duration TEXT,
      start_date TEXT,
      end_date TEXT,
      responsibilities TEXT,
      description TEXT,
      status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      items TEXT NOT NULL,
      status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      degree TEXT NOT NULL,
      division TEXT,
      year TEXT,
      description TEXT,
      status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      platform TEXT,
      url TEXT,
      status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS custom_sections (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      badge_title TEXT,
      description TEXT,
      content_blocks TEXT,
      status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      nav_label TEXT,
      show_in_nav INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      url TEXT NOT NULL,
      mimetype TEXT NOT NULL,
      size INTEGER NOT NULL,
      alt_text TEXT DEFAULT '',
      category TEXT DEFAULT 'general',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      session_id TEXT NOT NULL,
      visitor_id TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT,
      target_label TEXT,
      target_url TEXT,
      device_type TEXT,
      browser TEXT,
      os TEXT,
      duration_seconds INTEGER DEFAULT 0,
      ip_hash TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
    CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event_type);
    CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order);
    CREATE INDEX IF NOT EXISTS idx_exp_order ON experiences(display_order);
  `)

  seedInitialData()
}

function seedInitialData() {
  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'samarthshekharmj@gmail.com'
  const adminInitialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'SamarthAdmin2026!'
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(adminEmail)
  
  if (!existingUser) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(adminInitialPassword, salt)
    db.prepare(`
      INSERT INTO users (id, email, password_hash, role, last_password_change)
      VALUES (?, ?, ?, 'admin', datetime('now'))
    `).run('usr_admin_samarth', adminEmail, hash)
    console.log(`[DB] Created default admin user: ${adminEmail}`)
  }

  // 2. Seed Site Settings
  const existingSettings = db.prepare('SELECT * FROM site_settings WHERE id = ?').get('default')
  if (!existingSettings) {
    const headerConfig = [
      { id: 'about', label: 'Home', show: true, isExternal: false, order: 1 },
      { id: 'projects', label: 'Projects', show: true, isExternal: false, order: 2 },
      { id: 'experience', label: 'Experience', show: true, isExternal: false, order: 3 },
      { id: 'extracurricular', label: 'Activities', show: true, isExternal: false, order: 4 },
      { id: 'certifications', label: 'Certifications', show: true, isExternal: false, order: 5 },
      { id: 'education', label: 'Education', show: true, isExternal: false, order: 6 },
      { id: 'skills', label: 'Skills', show: true, isExternal: false, order: 7 },
      { id: 'faq', label: 'FAQ', show: true, isExternal: false, order: 8 },
    ]

    const resumeConfig = {
      fileUrl: '/Samarth-Shekhar-Resume-2026.pdf',
      filename: 'Samarth-Shekhar-Resume-2026.pdf',
      buttonPublished: true,
      buttonLabel: 'Resume',
      downloadEnabled: true,
      lastUpdated: '2026-10-22',
    }

    const aboutConfig = {
      headline: 'I like building things that sit between technology and people.',
      bio: [
        "I'm a B.Tech Information Technology graduate from Amity University, Noida. I enjoy working at the intersection of software engineering, AI applications, and product thinking — understanding the problem first, then building something practical.",
        "Over the course of my degree, I've worked on AI-powered platforms, multi-agent orchestration systems, full-stack web applications, and data workflows. I've interned across AI automation, frontend development, IT operations, and software engineering — giving me broad exposure to how real teams build and ship.",
        "I'm drawn to projects where the technical and the practical intersect — where understanding the problem is just as important as knowing the right tool."
      ],
      domains: [
        { num: '01', name: 'Software Development' },
        { num: '02', name: 'AI & GenAI' },
        { num: '03', name: 'Data' },
        { num: '04', name: 'Product' },
      ]
    }

    const statsConfig = {
      badge: 'STATS',
      description: 'A snapshot of the projects, engineering outcomes, and industry experience behind my portfolio.',
      featuredPills: ['AI', 'Generative AI', 'Data Engineering', 'Full-Stack Development', 'Web Applications'],
      agentPassRate: '98.4%',
      agents: [
        { name: 'Planner', desc: 'Breaks down complex tasks', icon: '▤' },
        { name: 'Retriever', desc: 'Fetches relevant context', icon: '⌕' },
        { name: 'Executor', desc: 'Uses tools to complete tasks', icon: '⚙' },
        { name: 'Evaluator', desc: 'Validates and improves output', icon: '✓' },
      ],
      industryCount: '05+',
    }

    db.prepare(`
      INSERT INTO site_settings (
        id, site_title, meta_description, author_name, tagline, headline,
        statement, avatar_url, available_status, cta_label, cta_link,
        contact_email, github_url, linkedin_url, location_text, footer_text,
        header_config, resume_config, about_config, stats_config
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'default',
      'Samarth Shekhar — Software · AI · Product',
      'B.Tech IT graduate building software, exploring AI, solving real problems.',
      'Samarth Shekhar',
      'A Visionary Builder of Intelligent Digital Experiences.',
      "SAMARTH SHEKHAR",
      'A Visionary Builder of Intelligent Digital Experiences.\nBalances AI, software engineering, and product thinking.\nProfessional and distinctive.',
      '/profile/glitched-ai-visor-portrait-transparent.png',
      'Available Now',
      "Let's Talk ↗",
      'mailto:samarthshekharmj@gmail.com',
      'samarthshekharmj@gmail.com',
      'https://github.com/Samarth-Shekhar',
      'https://www.linkedin.com/in/samarth-shekhar-185ba311a',
      'Vaishali, Ghaziabad, Uttar Pradesh, India',
      'VAISHALI, GHAZIABAD, UTTAR PRADESH · B.TECH IT 2026',
      JSON.stringify(headerConfig),
      JSON.stringify(resumeConfig),
      JSON.stringify(aboutConfig),
      JSON.stringify(statsConfig)
    )
    console.log('[DB] Seeded initial site settings')
  }

  // 3. Seed Projects (6 real projects)
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count
  if (projectCount === 0) {
    const defaultProjects = [
      {
        title: 'MULTI-AGENT ORCHESTRATION SYSTEM',
        subtitle: 'Autonomous Agentic AI Workflow Platform',
        tagline: 'Autonomous multi-agent system executing non-deterministic workflows through specialized planning, retrieval, execution, and evaluation pipelines.',
        category: 'AI & Autonomous Systems',
        year: '2025',
        kind: 'project',
        description: 'A distributed agentic platform built with LangGraph and FastAPI that orchestrates specialized AI agents to autonomously plan, research, execute, and self-validate multi-step computational tasks.',
        highlights: JSON.stringify([
          '4 Autonomous Agent Personas (Planner, Retriever, Executor, Evaluator)',
          'Dynamic DAG task execution with LangGraph state machines',
          'Hybrid RAG with vector semantic search and dense chunk retrieval',
          'Self-correction loop triggered on low evaluation confidence (<95%)',
          'Asynchronous REST API service containerized with Docker',
        ]),
        features: JSON.stringify([
          'Dynamic Planner Agent decomposing high-level prompts into DAG steps',
          'Vector-based Retriever Agent querying contextual knowledge bases',
          'Sandboxed Executor Agent synthesizing code & executing API calls',
          'Evaluator / Critic Agent validating outputs against strict Pydantic schemas',
          'Persistent state management across multi-turn agent conversations',
          'Asynchronous task queues powered by FastAPI and AsyncIO',
          'Containerized deployment architecture ready for cloud scaling',
        ]),
        technologies: JSON.stringify(['Python', 'LangGraph', 'FastAPI', 'RAG', 'Llama-3', 'Pydantic', 'ChromaDB', 'Docker']),
        metrics: JSON.stringify([
          { label: 'Agent Coordination Latency', value: '<850ms' },
          { label: 'Evaluation Pass Rate', value: '98.4%' },
          { label: 'Autonomous Personas', value: '4 Agents' },
          { label: 'Deployment', value: 'Docker / FastAPI' },
        ]),
        github: 'https://github.com/Samarth-Shekhar/Multi-Agent-Orchestration-System-Project',
        liveDemo: '',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
        previewImage: '/project-previews/gitpilot-dashboard.png',
        caseStudy: JSON.stringify({
          overview: 'The Multi-Agent Orchestration System is a cutting-edge platform designed to conquer the limitations of monolithic LLM architectures. By distributing responsibilities among autonomous agents—each with dedicated memory, toolsets, and evaluation criteria—the system achieves complex problem-solving that single-prompt pipelines cannot replicate.',
          problem: 'Standard LLM implementations struggle with context saturation, compounding hallucinations, and a lack of self-correction during multi-step tasks. In enterprise workflows—such as automated research synthesis, code generation, or multi-source data auditing—monolithic models fail without modular validation boundaries.',
          approach: 'Engineered a state-graph topology using LangGraph where the Planner Agent first decomposes an ambiguous prompt into a Directed Acyclic Graph (DAG) of actionable micro-tasks. The Retriever Agent queries a local vector store (ChromaDB) for high-density domain chunks. The Executor Agent synthesizes solutions using Llama-3 and external tools, while the Evaluator Agent rigorously scores output against precision criteria.',
          contribution: 'Designed and implemented the core LangGraph state machine, built the asynchronous FastAPI REST service endpoints, engineered the hybrid RAG retrieval pipeline with custom chunking, and authored Docker containerization scripts for one-command deployment.',
          learned: 'Deepened mastery of agentic topologies, memory hierarchy design (working vs episodic memory), cyclic graph orchestration, and techniques for mitigating cascading errors in autonomous LLM networks.',
        }),
        status: 'published',
        featured: 1,
        display_order: 1,
      },
      {
        title: 'FOLATE — AI WEB APPLICATION GENERATOR',
        subtitle: 'Prompt-to-Full-Stack Next.js Application Builder',
        tagline: 'Autonomous AI engineer compiling multi-file production applications from plain English prompts with integrated sandboxed execution.',
        category: 'Generative AI & Developer Tools',
        year: '2025',
        kind: 'project',
        description: 'An AI-powered development suite that converts natural language specifications into complete, runnable multi-file web applications with dependency resolution, live preview, and export.',
        highlights: JSON.stringify([
          'Natural language to complete multi-file project generation engine',
          'Sandboxed virtual filesystem with dynamic module resolution',
          'Multi-model fallback routing across OpenAI and Claude APIs',
          'Live side-by-side component preview with Hot Module Reloading',
          'Automated dependency graph resolution and bundle generation',
        ]),
        features: JSON.stringify([
          'Zero-latency client-side workspace with virtual file tree',
          'Smart prompt compiler extracting layout, components, and state requirements',
          'Incremental code generation pipeline reducing token usage by 35%',
          'Sandboxed iframe preview with message-bus state syncing',
          'One-click GitHub repo exporter with automated commit generation',
        ]),
        technologies: JSON.stringify(['TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'OpenAI API']),
        metrics: JSON.stringify([
          { label: 'Time-to-First-Preview', value: '<4.2s' },
          { label: 'Token Efficiency Gain', value: '+35%' },
          { label: 'Multi-File Synthesis', value: 'Up to 12 files' },
          { label: 'Runtime Environment', value: 'Sandboxed VFS' },
        ]),
        github: 'https://github.com/Samarth-Shekhar/Folate---AI-Web-Application-Generator-Project',
        liveDemo: '',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85',
        previewImage: '/project-previews/folate-landing-page.png',
        caseStudy: JSON.stringify({
          overview: 'Folate lowers the barrier between product ideation and running prototypes. By combining modern LLM reasoning with a virtual browser-based filesystem, users describe desired applications in plain language and watch structured project trees generate and run in real-time.',
          problem: 'Most AI code tools emit isolated snippets or single-file scripts that require extensive developer effort to stitch together into a functioning frontend application with dependencies and styling.',
          approach: 'Created a multi-step compilation loop: Prompt Parsing -> Architecture DAG -> File-by-File Generation -> Synthetic Module Resolution -> Sandboxed Iframe Mount.',
          contribution: 'Built the client-side virtual filesystem and code editor bindings, integrated OpenAI streaming APIs with custom SSE pipelines, and implemented the iframe preview bridge.',
          learned: 'Mastered streaming parsing of structured JSON from LLMs, virtual runtime sandbox security, and client-side module bundling architectures.',
        }),
        status: 'published',
        featured: 1,
        display_order: 2,
      },
      {
        title: 'NUTRIAI — PERSONAL AI MEAL PLANNER',
        subtitle: 'Intelligent Nutrition & Dietary Intelligence System',
        tagline: 'Hyper-personalized nutrition platform delivering biologically calibrated meal plans and ingredient sourcing through retrieval-augmented generation.',
        category: 'Applied AI & Health Tech',
        year: '2024',
        kind: 'project',
        description: 'An AI-powered clinical nutrition engine that calculates individual caloric and macro requirements, adapts to dietary constraints and allergies, and generates optimized weekly meal plans with exact recipes.',
        highlights: JSON.stringify([
          'Precision macro and micronutrient algorithm based on basal metabolic rate',
          'RAG-powered culinary recipe synthesis with ingredient substitution graphs',
          'Allergy and dietary restriction safety filter with zero false-negative tolerance',
          'Interactive weekly meal calendar with one-click grocery shopping cart export',
          'Nutritional data cross-validation against USDA food composition databases',
        ]),
        features: JSON.stringify([
          'BMR and TDEE biometric calculator supporting progressive fitness goals',
          'Vector database indexing 10,000+ verified recipes with macro breakdowns',
          'Dynamic allergy exclusion filter prioritizing ingredient safety',
          'Automated grocery aggregation clustering ingredients by supermarket aisle',
          'Weekly schedule optimizer minimizing culinary prep time and food waste',
        ]),
        technologies: JSON.stringify(['Python', 'LangChain', 'FastAPI', 'React.js', 'ChromaDB', 'OpenAI API', 'Pandas', 'CSS Modules']),
        metrics: JSON.stringify([
          { label: 'Dietary Optimization', value: '100% Match' },
          { label: 'Recipe Retrieval Speed', value: '<220ms' },
          { label: 'Recipe Knowledge Base', value: '10,000+' },
          { label: 'Live Demonstration', value: 'Deployed' },
        ]),
        github: 'https://github.com/Samarth-Shekhar/NutriAI---Personal-AI-Meal-Planner-Recipe-Generator',
        liveDemo: 'https://nutriai-recipe-generator.vercel.app/',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=85',
        previewImage: '/project-previews/nutriai-meal-planner.png',
        caseStudy: JSON.stringify({
          overview: 'NutriAI solves the cognitive overload of healthy meal planning by creating deterministic nutrition goals paired with creative generative recipe synthesis.',
          problem: 'Generic meal planners rely on rigid databases that cannot adapt to personal taste preferences, overlapping allergies, and seasonal ingredient availability.',
          approach: 'Implemented biometric calculation algorithms paired with RAG retrieval of nutritional compositions to synthesize medically sound, delicious meal plans.',
          contribution: 'Engineered the LangChain RAG pipeline, built the responsive React dashboard with calorie progress gauges, and deployed the production app on Vercel.',
          learned: 'Gained deep experience in structured data validation for healthcare applications, vector embeddings for culinary datasets, and UX design for complex data input.',
        }),
        status: 'published',
        featured: 1,
        display_order: 3,
      },
      {
        title: 'COLLABORATIVE VIDEO SHARING PLATFORM',
        subtitle: 'Enterprise Media Streaming & Workflow Infrastructure',
        tagline: 'High-throughput video publishing platform featuring role-based access control, adaptive HLS video streaming, and real-time review collaboration.',
        category: 'Full-Stack & Cloud Infrastructure',
        year: '2024',
        kind: 'project',
        description: 'A cloud-native video hosting and collaboration platform designed for creative media teams, featuring time-coded review comments, granular permissions, and transcoding pipelines.',
        highlights: JSON.stringify([
          'Adaptive bitrate video streaming via HLS transcoding pipelines',
          'Granular Role-Based Access Control (RBAC) with secure session isolation',
          'Frame-accurate timestamped review comments with real-time WebSocket sync',
          'Cloud storage integration with signed URLs and expiring download links',
          'Responsive video player interface with playback speed, subtitles, and chapter markers',
        ]),
        features: JSON.stringify([
          'Chunked direct-to-cloud file upload engine bypassing server bottlenecks',
          'Asynchronous transcoding workers emitting multiple HLS resolution variants',
          'Real-time collaborative timestamped feedback threads',
          'Team workspace boundaries with project-level invitation management',
          'Audit logging and view analytics tracking audience engagement metrics',
        ]),
        technologies: JSON.stringify(['Node.js', 'Express.js', 'React.js', 'MongoDB', 'AWS S3', 'FFmpeg', 'WebSockets', 'Tailwind CSS']),
        metrics: JSON.stringify([
          { label: 'Upload Chunking Throughput', value: '45MB/s' },
          { label: 'Transcode Variants', value: '1080p/720p/480p' },
          { label: 'Comment Sync Latency', value: '<40ms' },
          { label: 'RBAC Security Tiers', value: '4 Levels' },
        ]),
        github: 'https://github.com/Samarth-Shekhar/Collaborative-Video-Sharing-Platform',
        liveDemo: '',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85',
        previewImage: '/project-previews/collaborative-video-platform.png',
        caseStudy: JSON.stringify({
          overview: 'Built to streamline post-production workflows between video creators, editors, and corporate clients without requiring insecure shared credentials.',
          problem: 'Video teams struggle with unorganized feedback dispersed across email, messaging apps, and drive links, causing missed revisions and costly re-renders.',
          approach: 'Engineered an interactive HTML5 video canvas allowing viewers to pin time-stamped feedback markers directly to the video progress timeline.',
          contribution: 'Built the REST API architecture, implemented the JWT + RBAC authorization layer, and constructed the real-time WebSocket comment pipeline.',
          learned: 'Mastered cloud storage pre-signed authorization flows, video stream containerization formats, and state synchronization across multiple concurrent viewers.',
        }),
        status: 'published',
        featured: 1,
        display_order: 4,
      },
      {
        title: 'STUDENTGRAD - STUDY ABROAD PLATFORM',
        subtitle: 'Production International Education Consultancy Ecosystem',
        tagline: 'High-conversion digital web platform and university discovery portal deployed for Student Grad educational consultancy.',
        category: 'Production Web Platforms',
        year: '2026',
        kind: 'website',
        description: 'Complete commercial digital ecosystem built from scratch for Student Grad, driving student recruitment, program discovery, and lead conversion.',
        highlights: JSON.stringify([
          'Bespoke production web application with mobile-optimized performance',
          'Custom lead-capture funnel integrated with CRM and email notifications',
          'Global university and program filter index with instant search',
          'Technical SEO architecture achieving top ranking for overseas study keywords',
          'Meta & Google Ads tracking integration driving paid acquisition conversion',
        ]),
        features: JSON.stringify([
          'High-performance static site architecture with sub-second page loads',
          'Interactive study abroad eligibility and cost calculator widget',
          'Dynamic testimonial showcase featuring verified student visa grants',
          'Integrated WhatsApp and live consultation booking scheduling interface',
          'Comprehensive analytics dashboard tracking user acquisition channels',
        ]),
        technologies: JSON.stringify(['React.js', 'Next.js', 'Tailwind CSS', 'Vite', 'Node.js', 'Meta Pixel', 'Google Analytics']),
        metrics: JSON.stringify([
          { label: 'Commercial Deployment', value: 'Live Production' },
          { label: 'Conversion Lift', value: '+42%' },
          { label: 'Core Web Vitals', value: '98/100' },
          { label: 'Lead Capture Funnels', value: '3 Portals' },
        ]),
        github: 'https://github.com/Samarth-Shekhar',
        liveDemo: 'https://studentgrad.com/',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=85',
        previewImage: '/project-previews/studentgrad-homepage.jpg',
        caseStudy: JSON.stringify({
          overview: 'Designed and deployed the full production website for Student Grad, establishing a professional digital brand for students pursuing university degrees across Europe and North America.',
          problem: 'The organization lacked a unified digital presence to capture leads from digital ad campaigns, resulting in dropped conversion and manual inquiry tracking.',
          approach: 'Collaborated directly with founders to define user personas, architect high-converting landing pages, and optimize technical performance for international mobile visitors.',
          contribution: 'Single-handedly built and launched the website from scratch, configured DNS and production hosting, and integrated Meta Ads conversion tracking.',
          learned: 'Gained valuable commercial experience in digital marketing conversion rate optimization (CRO), enterprise branding, and production client management.',
        }),
        status: 'published',
        featured: 1,
        display_order: 5,
      },
      {
        title: '4PL ACADEMY - EDUCATION PLATFORM',
        subtitle: 'Logistics & Supply Chain Professional Academy Portal',
        tagline: 'Comprehensive learning hub and corporate course catalog built for executive logistics education and certification programs.',
        category: 'Production Web Platforms',
        year: '2026',
        kind: 'website',
        description: 'Modern corporate education platform built for 4PL Academy, featuring modular course catalogs, executive certification tracks, and corporate inquiry workflows.',
        highlights: JSON.stringify([
          'Corporate learning academy interface with curriculum breakdown modules',
          'Dynamic course finder with duration, level, and accreditation filters',
          'Executive corporate brochure download and lead qualification gateway',
          'Modern glassmorphism and clean typography reflecting institutional authority',
          'Optimized for both desktop corporate procurement and mobile learners',
        ]),
        features: JSON.stringify([
          'Interactive curriculum syllabi accordion with detailed learning outcomes',
          'Faculty and industry mentor profiles with verified credentials',
          'Automated email notification pipeline for student registrations',
          'Corporate enrollment portal with multi-seat inquiry pricing',
          'Full WCAG accessibility compliance with semantic HTML hierarchy',
        ]),
        technologies: JSON.stringify(['React.js', 'JavaScript', 'CSS3', 'Vite', 'Formspree', 'Responsive UI']),
        metrics: JSON.stringify([
          { label: 'Course Catalog Modules', value: '12+ Tracks' },
          { label: 'Mobile Responsiveness', value: '100% Tested' },
          { label: 'Page Load Speed', value: '<700ms' },
          { label: 'Corporate Gateway', value: 'Integrated' },
        ]),
        github: 'https://github.com/Samarth-Shekhar',
        liveDemo: 'https://4placademy.com/',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
        previewImage: '/project-previews/4pl-academy-homepage.png',
        caseStudy: JSON.stringify({
          overview: '4PL Academy provides specialized logistics training. The portal serves as both an informational catalog and an executive lead generator for enterprise training programs.',
          problem: 'Traditional PDF course brochures failed to engage modern logistics professionals and did not allow prospective learners to review module breakdowns easily.',
          approach: 'Built an interactive, modular curriculum browser that presents complex course information clearly with fast page transitions and clean visual rhythm.',
          contribution: 'Designed and engineered the complete frontend architecture, authored the styling system, and integrated corporate enrollment contact forms.',
          learned: 'Learned techniques for structuring dense educational content, optimizing information architecture for B2B buyers, and delivering fast static web apps.',
        }),
        status: 'published',
        featured: 1,
        display_order: 6,
      },
    ]

    const insertStmt = db.prepare(`
      INSERT INTO projects (
        title, subtitle, tagline, category, year, kind, description,
        highlights, features, technologies, metrics, github, liveDemo,
        image, previewImage, caseStudy, status, featured, display_order
      ) VALUES (
        @title, @subtitle, @tagline, @category, @year, @kind, @description,
        @highlights, @features, @technologies, @metrics, @github, @liveDemo,
        @image, @previewImage, @caseStudy, @status, @featured, @display_order
      )
    `)

    for (const project of defaultProjects) {
      insertStmt.run(project)
    }
    console.log('[DB] Seeded 6 existing projects')
  }

  // 4. Seed Experiences (Work & Extracurricular)
  const expCount = db.prepare('SELECT COUNT(*) as count FROM experiences').get().count
  if (expCount === 0) {
    const defaultWork = [
      {
        type: 'work',
        role: 'AI & Digital Solutions Associate',
        company: 'Student Grad',
        duration: 'Jul 2026 – Present',
        start_date: '2026-07',
        end_date: '2026-10',
        responsibilities: JSON.stringify([
          'Built and launched company websites from scratch for three associated businesses.',
          'Introduced new web technologies and product ideas to improve the digital experience.',
          'Collaborated on website planning, interface delivery, and iterative feature improvements.',
          'Supported digital marketing with Meta Ads campaign analysis, reporting, and performance insights.',
        ]),
        description: 'Leading digital engineering, website delivery, and growth campaigns across multi-brand ventures.',
        status: 'published',
        display_order: 1,
      },
      {
        type: 'work',
        role: 'AI & Automation Intern',
        company: 'Marksman Technologies Pvt. Ltd.',
        duration: 'May 2025 – Jul 2025',
        start_date: '2025-05',
        end_date: '2025-07',
        responsibilities: JSON.stringify([
          'Supported planning and execution of AI-powered automation workflows.',
          'Gathered and documented requirements.',
          'Validated AI tools and outputs.',
          'Collaborated with cross-functional teams.',
          'Assisted in user testing and feedback analysis.',
        ]),
        description: 'Built AI meal planner project and created AI automation workflows with LLMs and LangChain.',
        status: 'published',
        display_order: 2,
      },
      {
        type: 'work',
        role: 'React.js Intern',
        company: 'Celebal Technologies',
        duration: 'May 2025 – Jul 2025',
        start_date: '2025-05',
        end_date: '2025-07',
        responsibilities: JSON.stringify([
          'Developed and optimized React.js components and pages.',
          'Participated in Agile sprint planning and task tracking.',
          'Integrated REST APIs.',
          'Worked with developers to translate requirements into functional deliverables.',
          'Supported alignment between technical and product teams.',
        ]),
        description: 'Built reusable frontend components and integrated backend APIs in Agile sprints.',
        status: 'published',
        display_order: 3,
      },
      {
        type: 'work',
        role: 'IT Intern',
        company: 'Airports Authority of India',
        duration: 'May 2025 – Jul 2025',
        start_date: '2025-05',
        end_date: '2025-07',
        responsibilities: JSON.stringify([
          'Supported IT operations and enterprise workflows.',
          'Assisted with documentation, monitoring and troubleshooting.',
          'Worked on reporting tasks using Excel and Python.',
          'Supported coordination between technical teams.',
        ]),
        description: 'Created admin system for tracking operational data and supported enterprise IT monitoring.',
        status: 'published',
        display_order: 4,
      },
      {
        type: 'work',
        role: 'Software Developer Intern',
        company: 'Essentia',
        duration: 'Jun 2024 – Jul 2024',
        start_date: '2024-06',
        end_date: '2024-07',
        responsibilities: JSON.stringify([
          'Assisted in frontend development and requirement validation.',
          'Supported task coordination between design and development teams.',
          'Gained exposure to SDLC, debugging and version control.',
          'Contributed to technical documentation and status reporting.',
        ]),
        description: 'Delivered production frontend modules, fixed UI defects, and integrated external APIs.',
        status: 'published',
        display_order: 5,
      },
      // Extracurricular items
      {
        type: 'extracurricular',
        role: 'Freelance Web Scraping Intern',
        company: 'PepeLeads',
        duration: 'Feb 2026 – Mar 2026',
        start_date: '2026-02',
        end_date: '2026-03',
        responsibilities: JSON.stringify(['Built custom scraping pipelines for social engagement tracking.']),
        description: 'Built a tool to automate Instagram comment and email data collection using hashtag- and keyword-based searches.',
        status: 'published',
        display_order: 1,
      },
      {
        type: 'extracurricular',
        role: 'Intern',
        company: 'Agirva Space Community',
        duration: 'Jan 2025 – Feb 2025',
        start_date: '2025-01',
        end_date: '2025-02',
        responsibilities: JSON.stringify(['Participated in space community outreach and technical research.']),
        description: 'Contributed to space-related tasks and engaged with community members to deepen my understanding of the field.',
        status: 'published',
        display_order: 2,
      },
      {
        type: 'extracurricular',
        role: 'Social Media Marketing Intern',
        company: 'Zen Solarciti LLC',
        duration: 'Sep 2023 – Dec 2023',
        start_date: '2023-09',
        end_date: '2023-12',
        responsibilities: JSON.stringify(['Managed digital content and client engagement channels.']),
        description: 'Managed social media content and online engagement for a US-based solar energy company.',
        status: 'published',
        display_order: 3,
      },
      {
        type: 'extracurricular',
        role: 'Volunteer',
        company: 'Chaupal Foundation',
        duration: 'Jul 2023 – Oct 2023',
        start_date: '2023-07',
        end_date: '2023-10',
        responsibilities: JSON.stringify(['Taught fundamental IT concepts to underprivileged students.']),
        description: 'Led a team during field activities and helped underprivileged children develop IT-related skills.',
        status: 'published',
        display_order: 4,
      },
    ]

    const insertExp = db.prepare(`
      INSERT INTO experiences (
        type, role, company, duration, start_date, end_date, responsibilities, description, status, display_order
      ) VALUES (
        @type, @role, @company, @duration, @start_date, @end_date, @responsibilities, @description, @status, @display_order
      )
    `)

    for (const item of defaultWork) {
      insertExp.run(item)
    }
    console.log('[DB] Seeded experiences and extracurricular activities')
  }

  // 5. Seed Skills
  const skillsCount = db.prepare('SELECT COUNT(*) as count FROM skills').get().count
  if (skillsCount === 0) {
    const defaultSkills = [
      { category: 'Programming', items: JSON.stringify(['Python', 'JavaScript (ES6+)', 'SQL', 'TypeScript basics']), display_order: 1 },
      { category: 'Frontend', items: JSON.stringify(['React.js', 'Next.js', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive UI']), display_order: 2 },
      { category: 'Backend & APIs', items: JSON.stringify(['Node.js', 'FastAPI', 'Express.js', 'RESTful API Architecture']), display_order: 3 },
      { category: 'AI & GenAI', items: JSON.stringify(['LangGraph', 'LangChain', 'RAG Pipelines', 'Llama-3', 'OpenAI API', 'Pydantic']), display_order: 4 },
      { category: 'Databases & Storage', items: JSON.stringify(['MongoDB', 'Firebase', 'SQL / PostgreSQL', 'Vector Stores']), display_order: 5 },
      { category: 'DevOps & Tooling', items: JSON.stringify(['Git & GitHub', 'Docker', 'Vite', 'Postman']), display_order: 6 },
      { category: 'Product & Agile', items: JSON.stringify(['Agile / Scrum', 'Sprint Planning', 'User Stories & Backlogs', 'SDLC']), display_order: 7 },
      { category: 'Execution Mindset', items: JSON.stringify(['Requirement Analysis', 'Architecture Design', 'Technical Documentation']), display_order: 8 },
    ]

    const insertSkill = db.prepare('INSERT INTO skills (category, items, display_order) VALUES (?, ?, ?)')
    for (const skill of defaultSkills) {
      insertSkill.run(skill.category, skill.items, skill.display_order)
    }
    console.log('[DB] Seeded skill groups')
  }

  // 6. Seed Education
  const eduCount = db.prepare('SELECT COUNT(*) as count FROM education').get().count
  if (eduCount === 0) {
    db.prepare(`
      INSERT INTO education (institution, degree, division, year, description, display_order)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(
      'Amity University',
      'Bachelor of Technology (B.Tech) in Information Technology',
      'First Division · Noida, India',
      '2022 – 2026',
      'Rigorous coursework in Data Structures & Algorithms, Database Management Systems, Computer Networks, Software Engineering, and Object-Oriented System Design.'
    )
    console.log('[DB] Seeded education details')
  }

  // 7. Seed Certifications
  const certCount = db.prepare('SELECT COUNT(*) as count FROM certifications').get().count
  if (certCount === 0) {
    const defaultCerts = [
      { title: 'Project Management Professional Certificate', issuer: 'Google', platform: 'Coursera', display_order: 1 },
      { title: 'Generative AI & Large Language Models', issuer: 'Google', platform: 'Google Cloud', display_order: 2 },
      { title: 'Fundamentals of Deep Learning', issuer: 'NVIDIA', platform: 'NVIDIA DLI', display_order: 3 },
      { title: 'Career Essentials in Software Development', issuer: 'Microsoft', platform: 'LinkedIn Learning', display_order: 4 },
      { title: 'Python Essentials', issuer: 'Cisco', platform: 'NetAcad', display_order: 5 },
      { title: 'AI Foundations Associate', issuer: 'Oracle', platform: 'Oracle University', display_order: 6 },
      { title: 'Data Fundamentals', issuer: 'IBM', platform: 'IBM SkillsBuild', display_order: 7 },
      { title: 'Cloud Foundations', issuer: 'AWS Academy', platform: 'AWS', display_order: 8 },
    ]

    const insertCert = db.prepare('INSERT INTO certifications (title, issuer, platform, display_order) VALUES (?, ?, ?, ?)')
    for (const cert of defaultCerts) {
      insertCert.run(cert.title, cert.issuer, cert.platform, cert.display_order)
    }
    console.log('[DB] Seeded certifications')
  }

  // 8. Seed FAQs
  const faqCount = db.prepare('SELECT COUNT(*) as count FROM faqs').get().count
  if (faqCount === 0) {
    const defaultFaqs = [
      {
        question: 'Are you available for full-time software engineering roles starting in 2026?',
        answer: 'Yes. I am actively interviewing for full-time Software Developer, AI Engineer, Full-Stack Engineer, and Product roles in Vaishali, Ghaziabad, remotely, or with relocation.',
        display_order: 1
      },
      {
        question: 'What is your primary technical expertise?',
        answer: 'I work across full-stack product engineering and agentic AI architecture, using React, Node.js, Python, LangGraph, RAG, FastAPI, Docker, and modern databases.',
        display_order: 2
      },
      {
        question: 'How does your industry experience inform your approach?',
        answer: 'My work across AI automation, React engineering, enterprise IT, and digital solutions has taught me to connect clear requirements with reliable implementation and business outcomes.',
        display_order: 3
      },
      {
        question: 'Can I inspect the source code or test live projects?',
        answer: 'Yes. My projects include GitHub repositories and live builds where available, including Folate and the AI Meal Planner.',
        display_order: 4
      },
      {
        question: 'How do you manage projects and requirements?',
        answer: 'I structure work through user stories, scope and priority discussions, iterative reviews, and clear technical documentation so teams can move confidently.',
        display_order: 5
      },
    ]

    const insertFaq = db.prepare('INSERT INTO faqs (question, answer, display_order) VALUES (?, ?, ?)')
    for (const faq of defaultFaqs) {
      insertFaq.run(faq.question, faq.answer, faq.display_order)
    }
    console.log('[DB] Seeded FAQs')
  }

  // 9. Seed Media Assets from public/ if not present
  const mediaCount = db.prepare('SELECT COUNT(*) as count FROM media_assets').get().count
  if (mediaCount === 0) {
    const initialMedia = [
      { id: 'med_resume_default', filename: 'Samarth-Shekhar-Resume-2026.pdf', original_name: 'Samarth-Shekhar-Resume-2026.pdf', url: '/Samarth-Shekhar-Resume-2026.pdf', mimetype: 'application/pdf', size: 68500, alt_text: 'Official Resume 2026', category: 'resume' },
      { id: 'med_avatar_visor', filename: 'glitched-ai-visor-portrait-transparent.png', original_name: 'glitched-ai-visor-portrait-transparent.png', url: '/profile/glitched-ai-visor-portrait-transparent.png', mimetype: 'image/png', size: 145000, alt_text: 'Samarth Shekhar AI Visor Portrait', category: 'image' },
      { id: 'med_nav_sunglasses', filename: 'cool-sunglasses-avatar.png', original_name: 'cool-sunglasses-avatar.png', url: '/profile/cool-sunglasses-avatar.png', mimetype: 'image/png', size: 48000, alt_text: 'Nav avatar sunglasses', category: 'image' },
      { id: 'med_preview_gitpilot', filename: 'gitpilot-dashboard.png', original_name: 'gitpilot-dashboard.png', url: '/project-previews/gitpilot-dashboard.png', mimetype: 'image/png', size: 320000, alt_text: 'Multi-Agent Orchestration System Preview', category: 'image' },
      { id: 'med_preview_folate', filename: 'folate-preview.png', original_name: 'folate-preview.png', url: '/project-previews/folate-preview.png', mimetype: 'image/png', size: 280000, alt_text: 'Folate Preview', category: 'image' },
      { id: 'med_preview_nutriai', filename: 'nutriai-mockup.png', original_name: 'nutriai-mockup.png', url: '/project-previews/nutriai-mockup.png', mimetype: 'image/png', size: 290000, alt_text: 'NutriAI Preview', category: 'image' },
      { id: 'med_preview_video', filename: 'video-platform-preview.png', original_name: 'video-platform-preview.png', url: '/project-previews/video-platform-preview.png', mimetype: 'image/png', size: 260000, alt_text: 'Video Platform Preview', category: 'image' },
      { id: 'med_preview_sg', filename: 'studentgrad-website.png', original_name: 'studentgrad-website.png', url: '/project-previews/studentgrad-website.png', mimetype: 'image/png', size: 340000, alt_text: 'StudentGrad Website Preview', category: 'image' },
      { id: 'med_preview_4pl', filename: '4pl-academy-website.png', original_name: '4pl-academy-website.png', url: '/project-previews/4pl-academy-website.png', mimetype: 'image/png', size: 310000, alt_text: '4PL Academy Website Preview', category: 'image' },
    ]

    const insertMedia = db.prepare(`
      INSERT INTO media_assets (id, filename, original_name, url, mimetype, size, alt_text, category)
      VALUES (@id, @filename, @original_name, @url, @mimetype, @size, @alt_text, @category)
    `)

    for (const m of initialMedia) {
      insertMedia.run(m)
    }
    console.log('[DB] Seeded initial media assets')
  }
}

export default db
