export const projects = [
  {
    id: 1,
    number: "01",
    title: "MULTI-AGENT ORCHESTRATION SYSTEM",
    subtitle: "AI Workflow Platform",
    category: "AI",
    description:
      "A multi-agent AI workflow system designed to automate complex tasks using specialized agents.",
    features: [
      "Planner agent",
      "Retriever agent",
      "Executor agent",
      "Evaluator agent",
      "RAG-based retrieval",
      "Context sharing",
      "Memory management",
      "Task routing",
      "LLM integration",
      "REST APIs",
      "Containerized deployment",
    ],
    technologies: [
      "Python",
      "LangGraph",
      "FastAPI",
      "RAG",
      "Llama",
      "Pydantic",
      "Docker",
    ],
    github: "https://github.com/Samarth-Shekhar/Multi-Agent-Orchestration-System",
    liveDemo: "https://ai-meal-recipe-planner.streamlit.app/",
    caseStudy: {
      overview:
        "A multi-agent AI workflow system that orchestrates specialized agents to automate complex tasks through intelligent planning, retrieval, execution, and evaluation pipelines.",
      problem:
        "Complex AI tasks require coordination between multiple specialized components — planning what to do, retrieving relevant context, executing actions, and evaluating results. A single monolithic approach lacks the modularity and scalability needed for real-world workflows.",
      approach:
        "Designed a multi-agent architecture where each agent has a specific role — Planner, Retriever, Executor, and Evaluator. Used LangGraph for orchestration, FastAPI for API endpoints, and RAG for context-aware retrieval. Each agent communicates through a shared context and memory management system.",
      contribution:
        "Designed the agent architecture and workflow pipeline. Implemented the RAG-based retrieval system, built REST API endpoints with FastAPI, and containerized the application with Docker.",
      learned:
        "Gained practical understanding of multi-agent orchestration patterns, RAG pipeline design, LLM integration challenges, and the importance of clear agent boundaries and communication protocols.",
    },
  },
  {
    id: 2,
    number: "02",
    title: "FOLATE — AI WEB APPLICATION GENERATOR",
    subtitle: "AI-Powered Web Generator",
    category: "AI",
    description:
      "An AI-powered application that converts natural-language prompts into responsive web experiences.",
    features: [
      "Natural-language input",
      "AI-assisted generation",
      "Workflow planning",
      "API integration",
      "Responsive web generation",
      "Real-time preview",
      "User-focused interface",
    ],
    technologies: ["Node.js", "Express.js", "LangChain", "OpenAI API"],
    github: "https://github.com/Samarth-Shekhar/Folate",
    liveDemo: "http://folate.pro",
    caseStudy: {
      overview:
        "An AI-powered application that takes natural-language descriptions and generates responsive web applications, bridging the gap between idea and implementation.",
      problem:
        "Turning an idea into a working web application requires significant development time and technical knowledge. Non-technical users and rapid prototyping scenarios need a faster path from concept to code.",
      approach:
        "Built a Node.js backend with Express.js that processes natural-language prompts through LangChain and OpenAI API. The system plans the application structure, generates components, and produces a real-time preview of the resulting web application.",
      contribution:
        "Built the full-stack application including the Express.js backend, LangChain workflow integration, and the real-time preview system.",
      learned:
        "Learned about prompt engineering for code generation, managing LLM output quality, building real-time preview systems, and the challenges of generating production-quality code from natural language.",
    },
  },
  {
    id: 3,
    number: "03",
    title: "AI MEAL PLANNER & RECIPE GENERATOR",
    subtitle: "AI-Powered Nutrition App",
    category: "AI",
    description:
      "An AI-powered application that generates personalized meal plans and recipes based on user preferences.",
    features: [
      "Personalized recommendations",
      "Prompt engineering",
      "Data processing",
      "AI-generated content",
      "User-focused workflows",
    ],
    technologies: ["Python", "LangChain", "OpenAI API", "Pandas", "NumPy"],
    github: "https://github.com/Samarth-Shekhar/AI-Meal-Planner",
    liveDemo: "",
    caseStudy: {
      overview:
        "An AI-powered meal planning application that generates personalized meal plans and recipes tailored to user dietary preferences, restrictions, and goals.",
      problem:
        "Creating personalized meal plans manually is time-consuming and requires nutritional knowledge. Users need an intelligent system that can consider their preferences and constraints to generate practical, customized meal plans.",
      approach:
        "Used Python with LangChain and OpenAI API for intelligent meal plan generation. Implemented data processing with Pandas and NumPy to handle nutritional data and user preference matching. Focused on prompt engineering to produce high-quality, actionable recipes.",
      contribution:
        "Developed the complete application including prompt engineering pipeline, data processing workflows, and the recipe generation system.",
      learned:
        "Gained experience in prompt engineering for structured output, data processing with Pandas, and building user-focused AI applications that produce practical, actionable results.",
    },
  },
  {
    id: 4,
    number: "04",
    title: "COLLABORATIVE VIDEO SHARING PLATFORM",
    subtitle: "Full-Stack Web Application",
    category: "SOFTWARE",
    description:
      "A collaborative web application focused on role-based workflows, content management and user interaction.",
    features: [
      "Role-based workflows",
      "User interaction",
      "Content management",
      "Feature prioritization",
      "Project execution",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/Samarth-Shekhar/Collaborative-Video-Sharing",
    liveDemo: "",
    caseStudy: {
      overview:
        "A collaborative video sharing platform with role-based access control, content management, and user interaction features.",
      problem:
        "Content sharing platforms need structured workflows where different users have different permissions and capabilities. Building a system that handles role-based access while maintaining a smooth user experience presents interesting technical challenges.",
      approach:
        "Built a full-stack application using React.js for the frontend and Node.js with Express.js for the backend. Used MongoDB for data storage with role-based access control implemented across the stack.",
      contribution:
        "Developed the full-stack application including frontend components, backend API, database schema design, and role-based access control system.",
      learned:
        "Learned about implementing role-based access control, managing content workflows, and building collaborative features in a full-stack application.",
    },
  },
];
