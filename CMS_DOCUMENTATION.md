# Samarth Portfolio 2k26 — CMS, Admin Dashboard & Analytics Documentation

This document describes the complete architecture, features, security setup, and deployment instructions for your newly upgraded **Portfolio CMS, Admin Dashboard & Analytics**.

---

## 1. Preserved Portfolio Public Design

The public website retains its exact visual design, layout, typography, animations, and responsiveness:
- **Hero & Selected Work**: Glitched AI visor portrait, name branding, live project count, and interactive workbench.
- **Stats Dashboard**: Agent validation pass rate, active autonomous personas terminal, industry role gauges, and technology tags.
- **Case Studies & Projects**: Expandable editorial accordions for all 6 projects with metrics, highlights, technology tags, and live repository links.
- **Experience & Extracurriculars**: Timeline-ordered accordions (ordered strictly latest $\rightarrow$ oldest).
- **Education & Certifications**: Academic degrees and verified accreditations from Google, NVIDIA, Microsoft, Cisco, and Oracle.
- **Skills Grid**: Multi-category technology and tool breakdown.
- **Header & Navigation**: Fixed blurred navigation with active section tracking, mobile drawer, and dynamic Resume button.
- **Dynamic Section Support**: Any new custom section created in the **Section Manager** automatically appears on the public site and in the navigation without editing code or redeploying!

---

## 2. Admin Authentication & Security

- **Admin Login Route**: `/admin/login`
- **Admin Dashboard Route**: `/admin`
- **Initial Admin Credentials**:
  - **Email**: `samarthshekharmj@gmail.com` (configured in `.env` via `ADMIN_EMAIL`)
  - **Initial Password**: `SamarthAdmin2026!` (configured in `.env` via `ADMIN_INITIAL_PASSWORD`)
- **Security Features**:
  - Passwords hashed using standard `bcryptjs` with salt rounds.
  - JWT tokens with 72-hour configurable session lifetimes stored in HttpOnly cookies and client storage.
  - Rate limiting on login attempts (maximum 10 attempts per 15-minute window) and sensitive write operations.
  - Active session tracking: view IP address, browser/device user agent, last active date, and revoke individual or all other active sessions with a single click.
  - Password change requires verification of current password.
  - Password recovery flow with cryptographically random recovery tokens (`crypto.randomBytes(32)`).
  - All write operations require server-side session authentication.

### Creating or Resetting Admin via CLI
You can run the dedicated administrative setup command at any time:
```bash
npm run setup:admin
```
This prompts for an admin email and new password, securely hashing and storing the credentials in SQLite.

---

## 3. Database & File Persistence

- **Database**: SQLite powered by `better-sqlite3`, located in `data/portfolio.db`.
- **Zero Cloud Configuration Required**: The database runs locally with zero external services to configure or pay for.
- **Automated Seeding**: Automatically seeds on first launch from your existing data files (`src/data/projects.js`, `src/data/experience.js`, `src/data/extracurricular.js`, `src/data/certifications.js`, etc.) so all your actual work is preserved out of the box.
- **Persistent Media Storage**: Uploaded files (resumes, project thumbnails, avatars) are saved to `uploads/` and served at `/uploads/*`.
- **Content Backups**: One-click JSON backup export and restore available under **SEO & Website Settings**.

---

## 4. Admin Dashboard Sections (15 Modules)

Access the dashboard at `http://localhost:5173/admin` (or `http://localhost:5000/admin` in production).

| Module | Features & Capabilities |
|---|---|
| **Overview** | Quick welcome banner, summary KPI cards (Page Views, Unique Visitors, Resume Downloads, Active Projects), recent activity stream, quick actions. |
| **Hero & Home** | Edit author name, headline, subtitle statement, profile avatar URL / file upload, availability status pill, hero CTA label and destination link. |
| **About** | Edit biography headline quote, 3 narrative paragraphs, and domain focus areas. |
| **Projects** | Full CRUD for projects: title, subtitle, tagline, category, year, kind ('project' / 'website'), description, highlights, features, technology tags, metrics, GitHub URL, live demo URL, preview image, gallery, and case study. Reorder with $\uparrow$/$\downarrow$ buttons. Set status to **Published**, **Draft** (admin-only preview), or **Unpublished**. |
| **Experience** | Manage both **Work Experience** and **Extracurricular Activities**. Timeline reordering, dates, role titles, organizations, and bulleted responsibilities. |
| **Skills** | Create, edit, and organize skill groups and technology badges. |
| **Education** | Manage academic degrees, universities, division/honors, graduation years, and coursework descriptions. |
| **Certifications** | Manage verified accreditations from Google, NVIDIA, Microsoft, Cisco, Oracle, IBM, AWS Academy, credential links, and issuers. |
| **Section Manager** | Website Builder: Create brand-new custom sections (e.g. Research & Publications, Open Source, Achievements). Customize headings, descriptions, and modular content blocks (Text, Images, Stat Cards, Feature Cards, Action Buttons). Supports Draft, Published, and Unpublished states. |
| **Media Library** | Central asset hub for images and documents. Upload, preview, copy URLs, edit alt text, and delete assets. |
| **Resume** | Upload updated resume PDFs, preview the published PDF, toggle Resume button visibility in header, customize button text, and view real-time download counts. |
| **Header & Navigation** | Reorder public header links, toggle visibility, customize link labels, preview desktop and mobile navigation menus. Automatically hides links to unpublished sections. |
| **SEO & Settings** | Edit `<title>` tag, meta description, contact emails, GitHub/LinkedIn URLs, location, and copyright notice. Download full database JSON backup. |
| **Analytics & Insights** | First-party, privacy-respecting analytics: Total page views, unique visitors, sessions, avg engagement time, daily traffic timeline charts, top pages, referrers, device distribution, outbound link clicks, and one-click CSV export. |
| **Profile & Security** | View account ID, update admin email, change password with current password verification, reset password flow, view last password change date, review active sessions, and revoke sessions. |

---

## 5. Development & Production Commands

### Running Locally
To run both the backend API server and Vite frontend concurrently:
```bash
npm run dev
```
- **Public Site**: [http://localhost:5173/](http://localhost:5173/)
- **Admin Login**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

### Building and Running in Production
```bash
# 1. Build client bundle
npm run build

# 2. Start unified production server (serves API + static SPA)
npm start
```
The application will run on port `5000` (or `PORT` environment variable).

---

## 6. Environment Variables (`.env`)

```ini
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secret_jwt_key_change_in_production_portfolio_2026
ADMIN_EMAIL=samarthshekharmj@gmail.com
ADMIN_INITIAL_PASSWORD=SamarthAdmin2026!
SESSION_EXPIRY_HOURS=72
```
