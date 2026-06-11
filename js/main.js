/**
 * portfolio/js/main.js
 *
 * Entry point — bootstraps all modules after DOM is ready.
 * Each module is a self-contained IIFE that owns one concern.
 */

'use strict';

/* ============================================================
   MODULE: Theme
   Persists dark/light preference via localStorage.
   ============================================================ */
const Theme = (() => {
  const STORAGE_KEY = 'portfolio-theme';
  const ROOT        = document.documentElement;
  const TOGGLE_BTN  = document.getElementById('themeToggle');
  const ICON_SUN    = '☀️';
  const ICON_MOON   = '🌙';

  const isDark = () => !ROOT.classList.contains('light-mode');

  const apply = (dark) => {
    ROOT.classList.toggle('light-mode', !dark);
    if (TOGGLE_BTN) TOGGLE_BTN.textContent = dark ? ICON_MOON : ICON_SUN;
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  };

  const init = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(saved ? saved === 'dark' : prefersDark);
    TOGGLE_BTN?.addEventListener('click', () => apply(!isDark()));
  };

  return { init };
})();


/* ============================================================
   MODULE: Nav
   Scroll-shadow, active link highlighting, mobile menu.
   ============================================================ */
const Nav = (() => {
  const nav        = document.getElementById('mainNav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks   = document.querySelectorAll('.nav__link');
  const sections   = document.querySelectorAll('section[id]');

  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
    highlightActiveLink();
  };

  const highlightActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  const toggleMobile = () => {
    const open = hamburger?.classList.toggle('open');
    mobileMenu?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const closeMobile = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  };

  const init = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    hamburger?.addEventListener('click', toggleMobile);
    document.querySelectorAll('.nav__mobile-link').forEach(l =>
      l.addEventListener('click', closeMobile)
    );
    onScroll();
  };

  return { init };
})();


/* ============================================================
   MODULE: ScrollReveal
   Intersection Observer — fades in .reveal elements.
   ============================================================ */
const ScrollReveal = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  const init = () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  return { init };
})();


/* ============================================================
   MODULE: TypeWriter
   Cycles through role strings in the hero.
   ============================================================ */
const TypeWriter = (() => {
  const ROLES = [
    'Java Developer',
    'Spring Boot Engineer',
    'Backend Developer',
    'Enterprise Systems Dev',
    'API Architect',
  ];

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  const el = document.getElementById('typedRole');

  const tick = () => {
    if (!el) return;

    const current = ROLES[roleIndex];
    el.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    isDeleting ? charIndex-- : charIndex++;

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % ROLES.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  };

  const init = () => {
    if (el) setTimeout(tick, 800);
  };

  return { init };
})();


/* ============================================================
   MODULE: CountUp
   Animates numeric stat counters when scrolled into view.
   ============================================================ */
const CountUp = (() => {
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateSingle = (el) => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSingle(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const init = () => {
    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
  };

  return { init };
})();


/* ============================================================
   MODULE: TechBars
   Animates skill proficiency bars on scroll.
   ============================================================ */
const TechBars = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.tech-bar__fill');
          if (fill) fill.style.width = fill.dataset.width;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const init = () => {
    document.querySelectorAll('.tech-bar').forEach(bar => observer.observe(bar));
  };

  return { init };
})();


/* ============================================================
   MODULE: ProjectFilter
   Filters project cards by category tag.
   ============================================================ */
const ProjectFilter = (() => {
  const init = () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards   = document.querySelectorAll('.project-card[data-category]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach(card => {
          const cats = card.dataset.category.split(',');
          const show = filter === 'all' || cats.includes(filter);
          card.style.display = show ? '' : 'none';
          if (show) {
            card.style.animation = 'none';
            card.offsetHeight; // force reflow
            card.style.animation = '';
          }
        });
      });
    });
  };

  return { init };
})();


/* ============================================================
   MODULE: GitHubAPI
   Fetches public GitHub data, README content per repo, and
   language stats. Populates the GitHub section of the page.
   ============================================================ */
const GitHubAPI = (() => {
  const USERNAME = 'kyliecuadra';
  const BASE_URL = 'https://api.github.com';

  // Repos to highlight at the top, in preferred order.
  // Any repo not listed here is shown after, sorted by stars.
  const PINNED_REPOS = [
    'ppe_scanner',
    'Web-Based-Document-Flow-using-Image-Processing',
    'web-based-contribution-monitoring-system',
    'WebPortfolio',
    'Into-the-Void',
    'Web-Based-Management-System',
  ];

  const LANG_COLORS = {
    Java:       '#f89820',
    Python:     '#3776ab',
    JavaScript: '#f7df1e',
    PHP:        '#777bb4',
    HTML:       '#e34c26',
    CSS:        '#563d7c',
    TypeScript: '#3178c6',
    Default:    '#8892b0',
  };

  const headers = { 'Accept': 'application/vnd.github.v3+json' };

  // ── Fetch helpers ──────────────────────────────────────────

  const fetchJSON = async (url) => {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`);
    return res.json();
  };

  /**
   * Fetch the README for a single repo.
   * Returns the first non-empty, non-heading line as a summary,
   * or null if no README exists.
   */
  const fetchReadmeSummary = async (repoName) => {
    try {
      const data = await fetchJSON(
        `${BASE_URL}/repos/${USERNAME}/${repoName}/readme`
      );

      // README content is base64-encoded
      const raw = atob(data.content.replace(/\n/g, ''));

      // Extract a clean one-paragraph summary:
      // - skip blank lines and markdown headings / badges / code fences
      const lines = raw.split('\n');
      const summary = lines.find(line => {
        const trimmed = line.trim();
        return (
          trimmed.length > 20 &&
          !trimmed.startsWith('#') &&
          !trimmed.startsWith('!') &&   // images / badges
          !trimmed.startsWith('<') &&   // HTML tags
          !trimmed.startsWith('```') && // code fences
          !trimmed.startsWith('|') &&   // tables
          !trimmed.startsWith('-') &&   // list items (usually short)
          !trimmed.startsWith('*')      // bold markers / list items
        );
      });

      return summary ? summary.trim().slice(0, 200) : null;
    } catch {
      // 404 = no README — not an error worth surfacing
      return null;
    }
  };

  // ── Sort repos: pinned first, then by stars ───────────────

  const sortRepos = (repos) => {
    const pinIndex = (repo) => {
      const idx = PINNED_REPOS.indexOf(repo.name);
      return idx === -1 ? Infinity : idx;
    };

    return [...repos].sort((a, b) => {
      const pinDiff = pinIndex(a) - pinIndex(b);
      if (pinDiff !== 0) return pinDiff;
      return b.stargazers_count - a.stargazers_count;
    });
  };

  // ── Render functions ──────────────────────────────────────

  const renderProfile = (user) => {
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setText('gh-name',      user.name || user.login);
    setText('gh-username',  `@${user.login}`);
    setText('gh-repos',     user.public_repos);
    setText('gh-followers', user.followers);
    setText('gh-following', user.following);

    const avatar = document.getElementById('gh-avatar');
    if (avatar) {
      avatar.src = user.avatar_url;
      avatar.alt = user.name || user.login;
    }
  };

  /**
   * Render a single repo card into the container.
   * Called once the README summary resolves so cards appear
   * progressively rather than all at once after a long wait.
   */
  const renderRepoCard = (container, repo, description, isPinned) => {
    const langColor = LANG_COLORS[repo.language] || LANG_COLORS.Default;
    const updated   = new Date(repo.updated_at).toLocaleDateString('en-US', {
      month: 'short', year: 'numeric',
    });

    const card = document.createElement('div');
    card.className = 'repo-card glass-card reveal';

    card.innerHTML = `
      <div class="repo-card__header">
        <span class="repo-card__name">
          ${isPinned ? '⭐' : '📁'} ${repo.name}
        </span>
        <a href="${repo.html_url}" target="_blank" rel="noopener"
           class="btn btn--sm btn--ghost" aria-label="Open ${repo.name} on GitHub">
          ↗ View
        </a>
      </div>
      <p class="repo-card__description">${description}</p>
      <div class="repo-card__meta">
        ${repo.language ? `
          <span>
            <span class="repo-card__lang-dot" style="background:${langColor}"></span>
            ${repo.language}
          </span>` : ''}
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
        <span>Updated ${updated}</span>
      </div>
    `;

    container.appendChild(card);

    // Wire up scroll-reveal on the freshly inserted card
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 }).observe(card);
  };

  /**
   * Fetch README summaries concurrently and render each card
   * as soon as its data arrives (progressive rendering).
   */
  const renderRepos = async (repos) => {
    const container = document.getElementById('gh-repos-list');
    if (!container) return;

    container.innerHTML = ''; // clear skeletons

    const sorted  = sortRepos(repos).slice(0, 6);
    const pinned  = new Set(PINNED_REPOS);

    // Kick off all README fetches at once; render as each resolves
    await Promise.all(
      sorted.map(async (repo) => {
        const readmeSummary = await fetchReadmeSummary(repo.name);
        const description   = readmeSummary || repo.description || 'No description provided.';
        renderRepoCard(container, repo, description, pinned.has(repo.name));
      })
    );
  };

  const renderLanguages = (repos) => {
    const counts = {};
    repos.forEach(repo => {
      if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

    const total  = Object.values(counts).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);

    const container = document.getElementById('gh-languages');
    if (!container) return;

    container.innerHTML = sorted.map(([lang, count]) => {
      const pct   = Math.round((count / total) * 100);
      const color = LANG_COLORS[lang] || LANG_COLORS.Default;
      return `
        <div class="tech-bar">
          <span class="tech-bar__label">${lang}</span>
          <div class="tech-bar__track">
            <div class="tech-bar__fill" data-width="${pct}%" style="background:${color}"></div>
          </div>
          <span class="tech-bar__percent">${pct}%</span>
        </div>
      `;
    }).join('');

    // Animate bars as they scroll into view
    container.querySelectorAll('.tech-bar').forEach(bar => {
      new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const fill = e.target.querySelector('.tech-bar__fill');
            if (fill) fill.style.width = fill.dataset.width;
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 }).observe(bar);
    });
  };

  const showError = (message) => {
    const container = document.getElementById('gh-repos-list');
    if (container) {
      container.innerHTML = `
        <div class="glass-card" style="padding:var(--space-6);text-align:center;">
          <p style="color:var(--color-text-muted);font-family:var(--font-mono);font-size:var(--text-sm);">
            ${message}
          </p>
        </div>`;
    }
  };

  // ── Public init ───────────────────────────────────────────

  const init = async () => {
    try {
      const [user, repos] = await Promise.all([
        fetchJSON(`${BASE_URL}/users/${USERNAME}`),
        fetchJSON(`${BASE_URL}/users/${USERNAME}/repos?per_page=100&sort=updated`),
      ]);

      renderProfile(user);
      renderLanguages(repos);
      await renderRepos(repos); // async — cards appear progressively
    } catch (err) {
      console.warn('GitHub API unavailable:', err.message);
      showError('GitHub data temporarily unavailable. Visit github.com/kyliecuadra directly.');
    }
  };

  return { init };
})();


/* ============================================================
   MODULE: ContactForm
   Handles form validation and submission feedback.
   ============================================================ */
const ContactForm = (() => {
  const validate = (data) => {
    const errors = {};
    if (!data.name.trim())                errors.name    = 'Name is required.';
    if (!data.email.trim())               errors.email   = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Enter a valid email.';
    if (!data.message.trim())             errors.message = 'Message is required.';
    return errors;
  };

  const setFieldError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = message ? 'var(--color-warning)' : '';

    const errorEl = document.getElementById(`${fieldId}-error`);
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.style.display = message ? 'block' : 'none';
    }
  };

  const init = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name:    form.querySelector('#contactName').value,
        email:   form.querySelector('#contactEmail').value,
        subject: form.querySelector('#contactSubject').value,
        message: form.querySelector('#contactMessage').value,
      };

      const errors = validate(data);
      ['contactName', 'contactEmail', 'contactMessage'].forEach(id =>
        setFieldError(id, errors[id.replace('contact', '').toLowerCase()] || '')
      );

      if (Object.keys(errors).length) return;

      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate send (replace with real endpoint)
      await new Promise(r => setTimeout(r, 1200));

      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--color-success)';
      form.reset();

      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  };

  return { init };
})();


/* ============================================================
   BOOTSTRAP
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Nav.init();
  ScrollReveal.init();
  TypeWriter.init();
  CountUp.init();
  TechBars.init();
  ProjectFilter.init();
  ContactForm.init();
  GitHubAPI.init();
});
