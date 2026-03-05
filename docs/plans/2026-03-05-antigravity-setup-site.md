# Antigravity Setup Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 4-page static site that serves as a professional cheatsheet and onboarding guide for the Google Antigravity + Claude Code setup.

**Architecture:** Pure static HTML/CSS — no build tools, no framework, no JavaScript dependencies beyond minimal vanilla JS for clipboard copy. Each page is self-contained. Dark developer aesthetic throughout.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (clipboard API only)

**Font CDNs (exact imports):**
- Geist: `https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/style.css`
- Satoshi (fallback): `https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600&display=swap`
- JetBrains Mono: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap`
- Use Geist as primary. If CDN unavailable, fall back to `system-ui, -apple-system, sans-serif`

**Hosting:** GitHub Pages — after Task 7, push repo to GitHub and enable Pages on `main` branch, root directory. The shareable URL will be `https://<username>.github.io/<repo-name>/`

**Skills to invoke during implementation:**
- `frontend-design` — invoke before writing any HTML/CSS for design quality guidance
- `taste-skill-main/taste-skill/SKILL.md` — read directly via Read tool before each HTML/CSS task

---

## Requirements

### Site Structure

| File | Purpose |
|---|---|
| `index.html` | Main cheatsheet — plugins, models, workflow, project-scale comparison table |
| `hobby.html` | Hobby Projects deep-dive + tailored setup prompt |
| `solo.html` | Serious Solo Projects deep-dive + tailored setup prompt |
| `team.html` | Team & Client Projects deep-dive + tailored setup prompt |

No `setup.html` — setup prompts live at the bottom of each project subpage.

---

### Visual Design

**Skill file (source of truth):** `taste-skill-main/taste-skill/SKILL.md` — read this file in full before writing any HTML or CSS. Also reference `taste-skill-main/output-skill/SKILL.md` to avoid incomplete code blocks.

Design parameters (taste-skill scale): **Design Variance: 8 / Motion Intensity: 6 / Visual Density: 4**

#### Colors
- Background: `#0a0a0f` (deep near-black, not pure #000000)
- Surface: `#111118` with `border-white/8` inner borders (liquid glass effect)
- Border: `#1e1e2e`
- Accent: single color — cold white `#f0f0f5` with one electric accent `#4f8ef7` (saturation < 80%, no AI purple/blue clichés)
- Text primary: `#e8e8f0`
- Text muted: `#6e6e8a`
- Success: `#3fb950`
- No neon glows, no pure black, no oversaturated accents

#### Typography
- NO Inter font (banned by taste-skill for premium contexts)
- Body: `Geist` via jsDelivr CDN (see exact URL in Tech Stack above), fallback `Satoshi` via fontshare, final fallback `system-ui`
- Mono: `JetBrains Mono`
- Headlines: `tracking-tighter`, large scale (`clamp(2.5rem, 6vw, 5rem)`)
- No oversized H1s, no serif fonts

#### Layout
- Max content width: `900px`, centered
- Hero: **asymmetric / split-screen** (centered hero banned at variance > 4)
- No 3-column card grids — use `divide-y`, `border-t`, or negative space for grouping
- Tables preferred over cards for data-dense sections
- Sticky top nav with anchor links

#### Motion & Interactions
- CSS Spring physics for transitions (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Staggered reveal on scroll (`animation-delay: calc(var(--i) * 80ms)`)
- Hover: subtle `-translate-y-1` + shadow lift (no scale transforms)
- Copy button: tactile press feel (`translate-y-[1px]` on active)
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Shimmer effect on code boxes
- No custom cursors, no particle effects

#### Materiality
- Liquid glass surfaces: `background: rgba(255,255,255,0.03)` + `border: 1px solid rgba(255,255,255,0.08)` + subtle `box-shadow: inset 0 1px 0 rgba(255,255,255,0.06)`
- Grain texture on hero via fixed pseudo-element (pointer-events: none)
- No cards for the comparison table — use `divide-y` rows instead

---

### `index.html` — Sections

#### 1. Hero
- Site title: "Antigravity + Claude Code Setup"
- Subtitle: one-line description
- "Last updated" badge with date

#### 2. Plugins (Tier 1 only)
Table with columns: Plugin name | What it does | Why it's essential

| Plugin | What it does | Why essential |
|---|---|---|
| `superpowers` | Core runtime for skills, git worktrees, brainstorming, debugging | Everything else builds on this |
| `episodic-memory` | Gives Claude memory across sessions | Without this, Claude forgets everything |
| `context7` | Pulls live library docs into context | Prevents hallucinated APIs |
| `commit-commands` | Commit + push + PR in one step | Daily time saver, minimal overhead |
| `github` | GitHub integration | Required if code lives on GitHub |

Rule of thumb callout: *"If you can't name a concrete use case from the last week, don't enable it."*

#### 3. Models
When to reach for each model in Antigravity:
- Gemini 3.1 Pro — default, long context, codebase-wide reasoning
- Claude Sonnet 4.6 — nuanced writing, complex logic, architecture decisions
- GPT-4o — when specifically requested by client/team

#### 4. Workflow
Habits & best practices for agent-first development. 5–7 short bullet points.

#### 5. "How much setup do I need?"
Comparison table — 3 columns, one per project scale:

| Practice | Hobby | Serious Solo | Team & Client Projects |
|---|---|---|---|
| Git branches | `main` only | `main` + feature branches | `main` + `dev` + feature branches |
| Merging | Direct commit | Squash merge via PR | Protected branches, required PR |
| Testing | None | Unit tests for critical paths | Unit + integration + e2e |
| Documentation | README | README + inline comments | README + ADRs + feature docs |
| CI/CD | None | Lint + test on push | Full pipeline |
| Environments | Local only | Local + production | Local + staging + production |
| Commit style | Anything | Conventional commits | Conventional commits, enforced |
| Code review | None | Self-review before merge | Required peer review |

Each column ends with a CTA button: "→ Learn more" linking to its subpage.

---

### Subpages — Shared Structure (`hobby.html`, `solo.html`, `team.html`)

Each subpage follows this structure:

1. **Back link** — "← Back to main"
2. **Project type character** — 2–3 sentences describing what this type of project looks like in the real world, with concrete examples
3. **Step-by-step workflow** — Day 1 / Before each feature / Before shipping. Buzzwords explained inline the first time they appear (e.g., "create a feature branch — an isolated copy of the codebase for one piece of work")
4. **Why it matters** — one sentence per practice explaining the cost of skipping it
5. **Superpowers skills** — light mention of which skills help, linked back to index
6. **Setup Prompt** — copyable code box at the bottom

---

### Setup Prompts (one per subpage)

Each subpage contains **two copyable prompts**:

#### Prompt 1 — Project Bootstrap
Pre-configured for its project scale. Asks a few questions to customize, then:
- Suggests relevant plugins to enable
- Scaffolds git structure (branches, protection rules)
- Creates initial README
- Sets up folder structure appropriate to the stack

**`hobby.html` prompt asks:**
- What are you building? (1 sentence)
- What language/framework?

**`solo.html` prompt asks:**
- What are you building?
- Language/framework?
- Fresh repo or existing?

**`team.html` prompt asks:**
- What are you building?
- Team size?
- Language/framework?
- Fresh repo or existing?

#### Prompt 2 — Generate CLAUDE.md
A universal prompt (same behavioral base for all project types) that generates a project-specific `CLAUDE.md` file. Structure it generates:

```
# CLAUDE.md

## Workflow & Behavior        ← fixed for all (from Workflow Orchestration template)
## Essential Commands         ← filled in based on user's stack
## Architecture Overview      ← filled in based on user's answers
## Data Model                 ← filled in if relevant
## Development Patterns       ← filled in based on project scale
## Critical Rules             ← sensible defaults + user additions
```

The prompt asks ~5 questions:
1. What is this project? (1 sentence)
2. What is your tech stack?
3. What are the most important files/directories to know about?
4. Any hard rules Claude must never break? (e.g. "never commit directly to main")
5. Any external services or APIs involved?

Then it writes the full `CLAUDE.md` to the project root.

**Note:** The `CLAUDE.md` structure is inspired by real project examples but generated fresh for each project — it is not a copy-paste of any existing file.

---

### Task 0: Initialize git repo

**Files:** none

**Step 1: Init repo and first commit**
```bash
git init
git add docs/
git commit -m "chore: initial commit with project plan"
```

**Step 2: Create GitHub repo and push**
```bash
gh repo create antigravity-setup --public --source=. --remote=origin --push
```

**Step 3: Verify**
Confirm repo is live on GitHub. Note the URL for GitHub Pages setup later.

---

### Task 1: Shared CSS + nav component

> **Skills:** Invoke `frontend-design` skill before writing any code. Then read `taste-skill-main/taste-skill/SKILL.md` and `taste-skill-main/output-skill/SKILL.md` via Read tool.

> **Design reference:** Skill already invoked above. Read `taste-skill-main/taste-skill/SKILL.md` and `taste-skill-main/output-skill/SKILL.md` via Read tool before writing a single line. Then re-read the **Visual Design** section above. The skill file is the source of truth — not generic dark-mode defaults. No incomplete code blocks (output-skill rule). Use exact font CDN URLs from Tech Stack section above.

**Files:**
- Create: `style.css`

**Step 1: Write `style.css`**

Full CSS with — all values taken directly from the Visual Design section:
- CSS custom properties: colors (`--bg`, `--surface`, `--border`, `--accent`, `--text`, `--muted`), fonts, spacing scale
- Geist or Satoshi loaded via `@import` from CDN + JetBrains Mono for mono
- Base reset and typography (headlines use `clamp(2.5rem, 6vw, 5rem)` + `letter-spacing: -0.04em`)
- `.nav` — sticky, liquid glass background (`rgba(10,10,15,0.8)` + `backdrop-filter: blur(12px)`)
- `.container` — max-width `900px`, centered
- `.table` — no card borders, use `border-top` row dividers (`divide-y` style)
- `.btn` — primary + ghost variants, hover: `translateY(-1px)` + shadow lift, active: `translateY(1px)` (tactile press)
- `.code-box` — liquid glass surface, shimmer animation on load, copy button with tactile press
- `.badge` — small pill labels
- `.callout` — highlighted note block with left border accent
- Staggered reveal keyframe: `@keyframes fadeUp` + `animation-delay: calc(var(--i) * 80ms)`
- Grain texture on `.hero-grain` pseudo-element: `position: fixed`, `pointer-events: none`, SVG noise filter
- Spring transition: `cubic-bezier(0.34, 1.56, 0.64, 1)` as `--spring`
- Responsive: single column below 640px

**Forbidden (taste-skill rules):**
- No Inter font
- No pure `#000000`
- No neon glows or oversaturated accents
- No animating `top`, `left`, `width`, or `height`
- No custom cursor

**Step 2: Commit**
```bash
git add style.css
git commit -m "feat: add shared CSS design system"
```

---

### Task 2: Build `index.html`

> **Design reference:** Re-read `taste-skill-main/taste-skill/SKILL.md` before starting. Hero must be asymmetric/split-screen (not centered — banned at variance > 4). Comparison table uses `divide-y` row separators — no cards. Apply staggered `fadeUp` reveal with `--i` CSS variable per section. All surface elements use liquid glass treatment from `style.css`.

**Files:**
- Create: `index.html`

**Step 1: Write `index.html`**

Structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- meta, title, Geist/Satoshi + JetBrains Mono via CDN, style.css link -->
</head>
<body>
  <div class="hero-grain"></div> <!-- fixed grain texture overlay -->
  <nav><!-- sticky: Plugins | Models | Workflow | Setup --></nav>
  <main class="container">
    <section id="hero">
      <!-- ASYMMETRIC: left = title + subtitle + badge, right = key stats or visual -->
    </section>
    <section id="plugins" style="--i:1"><!-- Tier 1 table, divide-y rows --></section>
    <section id="models" style="--i:2"><!-- Model comparison, divide-y rows --></section>
    <section id="workflow" style="--i:3"><!-- Habits bullet list --></section>
    <section id="setup" style="--i:4">
      <!-- 3-column comparison: divide-y rows, CTA button per column at bottom -->
    </section>
  </main>
</body>
</html>
```

**Step 2: Verify in browser**
Open `index.html`. Check: grain visible on hero, hero is NOT centered, nav is sticky + blurred, table rows use dividers (not card borders), CTA buttons have spring hover, stagger animation plays on load.

**Step 3: Commit**
```bash
git add index.html
git commit -m "feat: add index.html main cheatsheet"
```

---

### Task 3: Build `hobby.html`

> **Design reference:** Re-read `taste-skill-main/taste-skill/SKILL.md` before starting. Same liquid glass surfaces, staggered reveal, and asymmetric layout principles as `index.html`. Code boxes use shimmer + copy button with tactile press. Back link uses ghost `.btn` style.

**Files:**
- Create: `hobby.html`

**Step 1: Write `hobby.html`**

Sections:
1. Back link to `index.html`
2. Hero: "Hobby Projects"
3. Character: weekend projects, learning experiments, personal tools you use alone
4. Workflow: Day 1 (init repo, push to GitHub, write README) / Before each feature (commit often, don't overthink) / Before shipping (manual test, push)
5. Why it matters: one sentence per practice
6. Skills callout: light mention of `episodic-memory`, `commit-commands`
7. Project Bootstrap prompt in `.code-box` with copy button
8. Generate CLAUDE.md prompt in `.code-box` with copy button

**Step 2: Commit**
```bash
git add hobby.html
git commit -m "feat: add hobby.html subpage"
```

---

### Task 4: Build `solo.html`

> **Design reference:** Re-read `taste-skill-main/taste-skill/SKILL.md` before starting. Same design system as Tasks 2–3. Workflow steps should use `border-t` dividers, not bullet-list defaults. Ensure the two code boxes (Bootstrap + CLAUDE.md prompts) are visually distinct — different label badges, same shimmer treatment.

**Files:**
- Create: `solo.html`

**Step 1: Write `solo.html`**

Sections:
1. Back link
2. Hero: "Serious Solo Projects"
3. Character: real apps, SaaS products, client work you do alone, portfolio projects
4. Workflow: Day 1 (init repo, create `dev` branch, set up CI) / Before each feature (create feature branch, write tests first) / Before shipping (PR to main, self-review, merge)
5. Why it matters
6. Skills callout: `superpowers:test-driven-development`, `superpowers:writing-plans`, `commit-commands`
7. Project Bootstrap prompt in `.code-box` with copy button
8. Generate CLAUDE.md prompt in `.code-box` with copy button

**Step 2: Commit**
```bash
git add solo.html
git commit -m "feat: add solo.html subpage"
```

---

### Task 5: Build `team.html`

> **Design reference:** Re-read `taste-skill-main/taste-skill/SKILL.md` before starting. Same design system. This is the most content-heavy page — use Visual Density 4 spacing generously. Workflow phases (Day 1 / Before feature / Before shipping) use `border-t` section separators. Two code boxes at the bottom: Bootstrap prompt + CLAUDE.md prompt, both with copy buttons and distinct labels.

**Files:**
- Create: `team.html`

**Step 1: Write `team.html`**

Sections:
1. Back link
2. Hero: "Team & Client Projects"
3. Character: production apps, paid client work, open source with contributors, startup codebases
4. Workflow: Day 1 (protected `main`, `dev` branch, CI/CD pipeline, branch naming conventions) / Before each feature (feature branch from `dev`, write tests, open draft PR early) / Before shipping (PR to `dev`, peer review, merge to `main` via release PR)
5. Why it matters
6. Skills callout: `superpowers:requesting-code-review`, `superpowers:writing-plans`, `superpowers:test-driven-development`
7. Project Bootstrap prompt in `.code-box` with copy button
8. Generate CLAUDE.md prompt in `.code-box` with copy button

**Step 2: Commit**
```bash
git add team.html
git commit -m "feat: add team.html subpage"
```

---

### Task 6: Copy button JS

**Files:**
- Create: `copy.js`

**Step 1: Write `copy.js`**

```javascript
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.closest('.code-box').querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    });
  });
});
```

Add `<script src="copy.js"></script>` to all 3 subpages.

**Step 2: Verify**
Open a subpage, click Copy, paste into a text editor. Confirm full prompt is copied.

**Step 3: Commit**
```bash
git add copy.js hobby.html solo.html team.html
git commit -m "feat: add clipboard copy for setup prompts"
```

---

### Task 7: Final review pass

**Step 1: Open all 4 pages in browser**
- Check dark theme is consistent
- Check all links work (nav anchors, back links, CTA buttons)
- Check tables are readable on narrow viewport
- Check copy buttons work on all 3 subpages

**Step 2: Commit any fixes**
```bash
git add -A
git commit -m "fix: final review adjustments"
```

---

### Task 8: Deploy to GitHub Pages

**Step 1: Push all commits**
```bash
git push origin main
```

**Step 2: Enable GitHub Pages**
```bash
gh api repos/:owner/:repo/pages -X POST -f source='{"branch":"main","path":"/"}'
```

**Step 3: Verify deployment**
```bash
gh api repos/:owner/:repo/pages --jq '.html_url'
```
Open the URL in browser. Confirm all 4 pages load, fonts render, copy buttons work.

**Step 4: Note the shareable URL**
Format: `https://<username>.github.io/antigravity-setup/`
