import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import cv from './cv.json'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const cvData = cv;

const data = {
  // Map projects to include id, category, tag, link, etc.
  projects: cvData.projects.map((proj, index) => {
    // Determine category based on tech stack
    let category = 'dev';
    let tag = 'Development';
    const techLower = proj.tech_stack.map(t => t.toLowerCase());
    if (techLower.some(t => t.includes('react') || t.includes('fastapi'))) {
      category = 'fullstack';
      tag = 'Full‑Stack';
    } else if (techLower.some(t => t.includes('power bi') || t.includes('excel') || t.includes('sql'))) {
      category = 'data';
      tag = 'Data Analytics';
    }
    return {
      id: index + 1,
      title: proj.name,
      desc: proj.description,
      tech: proj.tech_stack,
      tag: tag,
      link: '#', // placeholder
      category: category,
    };
  }),
  // Experience: map responsibilities to a single description string
  experience: cvData.experience.map(exp => ({
    year: '2022 – Present', // approximate; we could set based on order, but keep static
    title: exp.title,
    company: exp.company,
    desc: exp.responsibilities.join(' '), // combine into one paragraph
    tags: exp.responsibilities.flatMap(r => r.split(' ').filter(w => w.match(/[A-Z]/))).slice(0, 5), // crude tag extraction
  })),
  education: cvData.education.map(edu => ({
    title: edu.degree,
    year: edu.year,
    icon: edu.degree.includes('Bachelor') ? 'graduation-cap' : edu.degree.includes('Programming') ? 'laptop-code' : 'tools',
  })),
  // Skills: transform into groups with levels (approximate)
  skills: Object.entries(cvData.skills).map(([groupTitle, skillList]) => {
    // Assign icons based on group
    let icon = 'code';
    if (groupTitle.includes('Data')) icon = 'chart-pie';
    else if (groupTitle.includes('Others')) icon = 'tools';
    return {
      title: groupTitle,
      icon: icon,
      skills: skillList.map(skill => {
        // Estimate a level based on length or keywords (just for demo)
        let level = 70 + Math.floor(Math.random() * 20);
        if (skill.toLowerCase().includes('python')) level = 88;
        else if (skill.toLowerCase().includes('excel')) level = 90;
        else if (skill.toLowerCase().includes('power bi')) level = 85;
        else if (skill.toLowerCase().includes('react')) level = 75;
        else if (skill.toLowerCase().includes('sql')) level = 82;
        else if (skill.toLowerCase().includes('customer')) level = 90;
        // Add icon class (approximate)
        let iconClass = 'fas fa-code';
        if (skill.toLowerCase().includes('python')) iconClass = 'fab fa-python';
        else if (skill.toLowerCase().includes('react')) iconClass = 'fab fa-react';
        else if (skill.toLowerCase().includes('sql')) iconClass = 'fas fa-database';
        else if (skill.toLowerCase().includes('excel')) iconClass = 'fas fa-file-excel';
        else if (skill.toLowerCase().includes('power bi')) iconClass = 'fas fa-chart-bar';
        else if (skill.toLowerCase().includes('google')) iconClass = 'fab fa-google';
        else if (skill.toLowerCase().includes('customer')) iconClass = 'fas fa-headset';
        else if (skill.toLowerCase().includes('payroll')) iconClass = 'fas fa-file-invoice';
        else if (skill.toLowerCase().includes('automation')) iconClass = 'fas fa-cog';
        else if (skill.toLowerCase().includes('appfolio')) iconClass = 'fas fa-cloud';
        else if (skill.toLowerCase().includes('visualization')) iconClass = 'fas fa-chart-line';
        return { name: skill, level: level, icon: iconClass };
      })
    };
  })
};

function App() {
  // ----- State -----
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [filter, setFilter] = useState('all');
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const toastTimeout = useRef(null);

  // ----- Theme toggle -----
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // ----- Filter projects -----
  const filteredProjects =
    filter === 'all'
      ? data.projects
      : data.projects.filter((p) => p.category === filter);

  // ----- Toast -----
  const showToast = (message, type = 'success') => {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setToast({ show: true, message, type });
    toastTimeout.current = setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // ----- Form submit -----
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    form.reset();
  };

  // ----- Chart data -----
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (₱k)',
        data: [320, 345, 370, 395, 420, 450, 470, 500, 530, 560, 590, 620],
        borderColor: '#7c6cf0',
        backgroundColor: 'rgba(124, 108, 240, 0.12)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#7c6cf0',
        pointBorderColor: theme === 'dark' ? '#0b0b14' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Clients Served',
        data: [85, 92, 98, 105, 112, 120, 128, 135, 142, 150, 158, 168],
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22d3ee',
        pointBorderColor: theme === 'dark' ? '#0b0b14' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#b0b0cc' : '#3a3a5a',
          font: { family: 'Inter', size: 11 },
          boxWidth: 12,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
        titleColor: theme === 'dark' ? '#e8e8f0' : '#11111f',
        bodyColor: theme === 'dark' ? '#b0b0cc' : '#3a3a5a',
        borderColor: theme === 'dark' ? '#2a2a44' : '#dce0ea',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { color: theme === 'dark' ? '#2a2a44' : '#dce0ea', drawBorder: false },
        ticks: { color: theme === 'dark' ? '#b0b0cc' : '#3a3a5a', font: { family: 'Inter' } },
      },
      y: {
        grid: { color: theme === 'dark' ? '#2a2a44' : '#dce0ea', drawBorder: false },
        ticks: { color: theme === 'dark' ? '#b0b0cc' : '#3a3a5a', font: { family: 'Inter' } },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // ----- Nav links -----
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Analytics', href: '#data' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-(--bg-body) text-(--text-primary) transition-colors duration-300 font-sans antialiased">
      {/* ----- Navbar ----- */}
      <nav className="fixed top-0 left-0 w-full z-50 py-3 px-4 backdrop-blur-lg border-b border-(--border) bg-(--bg-body)/80 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-xl font-bold flex items-center gap-1">
            <span className="text-(--primary-light)">{cvData.personal_info.first_name}</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-(--text-secondary)">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-(--text-primary) transition relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-[#7c6cf0] after:to-[#22d3ee] after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-(--border) bg-(--bg-card) text-(--text-secondary) hover:border-(--primary) hover:text-(--primary-light) transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden flex flex-col gap-1 p-1"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-(--text-primary) transition"></span>
              <span className="block w-6 h-0.5 bg-(--text-primary) transition"></span>
              <span className="block w-6 h-0.5 bg-(--text-primary) transition"></span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden ${navOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-(--bg-surface) border-b border-(--border) px-6 py-4 shadow-lg`}
        >
          <ul className="flex flex-col gap-4 text-sm font-medium text-(--text-secondary)">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  className="hover:text-(--text-primary) transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ----- Main Content ----- */}
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-(--primary)/10 text-(--primary-light) text-xs font-semibold px-4 py-1.5 rounded-full border border-(--primary)/10 mb-5">
                <i className="fas fa-bolt"></i> {cvData.personal_info.job_title}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                {cvData.personal_info.first_name} <br />
                <span className="bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent">
                 {cvData.personal_info.middle_name} {cvData.personal_info.last_name}
                </span>
              </h1>
              <p className="text-(--text-secondary) text-lg mt-3 max-w-lg">
                Bridging data analytics, operations, and full‑stack development to drive efficiency and insight.
              </p>
              <div className="flex items-center gap-3 text-sm text-(--text-muted) mt-2">
                <i className="fas fa-map-pin text-(--primary-light)"></i> {cvData.personal_info.address}
                <span className="text-(--border)">|</span>
                <i className="fas fa-phone-alt text-(--primary-light)"></i> {cvData.personal_info.phone}
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] text-white shadow-lg shadow-[#7c6cf0]/30 hover:shadow-[#7c6cf0]/50 transition hover:-translate-y-0.5"
                >
                  <i className="fas fa-rocket"></i> View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm border border-(--border) text-(--text-secondary) hover:border-(--primary) hover:text-(--primary-light) transition"
                >
                  <i className="fas fa-paper-plane"></i> Get in Touch
                </a>
              </div>
              <div className="flex gap-8 mt-8 flex-wrap">
                <div>
                  <span className="text-xl font-bold text-(--text-primary)">3+</span>
                  <p className="text-xs text-(--text-muted)">Years of Experience</p>
                </div>
                <div>
                  <span className="text-xl font-bold text-(--text-primary)">{data.projects.length}+</span>
                  <p className="text-xs text-(--text-muted)">Projects Delivered</p>
                </div>
                <div>
                  <span className="text-xl font-bold text-(--text-primary)">2</span>
                  <p className="text-xs text-(--text-muted)">Data Dashboards</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full bg-linear-to-br from-[#7c6cf0] to-[#22d3ee] flex items-center justify-center text-6xl text-white shadow-2xl shadow-[#7c6cf0]/30 animate-[float_6s_ease-in-out_infinite] border-2 border-[#7c6cf0]/20 select-none">
                👨‍💻
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> About
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-2">
              Who I Am
            </h2>
            <div className="grid md:grid-cols-2 gap-10 mt-8">
              <div>
                <p className="text-(--text-secondary) text-base leading-relaxed mb-4">
                  I'm a <span className="text-(--primary-light) font-semibold">Data &amp; Operations Specialist</span> with a strong foundation in full‑stack development and data analytics. I thrive at the intersection of technology and business — building systems that streamline operations, automate reporting, and surface actionable insights.
                </p>
                <p className="text-(--text-secondary) text-base leading-relaxed">
                  With experience spanning <span className="text-(--primary-light) font-semibold">Python</span>, <span className="text-(--primary-light) font-semibold">React</span>, <span className="text-(--primary-light) font-semibold">Power BI</span>, and <span className="text-(--primary-light) font-semibold">SQL</span>, I design end‑to‑end solutions that reduce manual effort and empower decision‑making. I'm passionate about using data to tell stories and solve real‑world problems.
                </p>
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-(--border) text-sm text-(--text-secondary)">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-envelope text-(--primary-light)"></i> {cvData.personal_info.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-phone-alt text-(--primary-light)"></i> {cvData.personal_info.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-map-pin text-(--primary-light)"></i> {cvData.personal_info.address}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'chart-line', title: 'Data & Analytics', desc: 'Power BI, Python, SQL, Excel, Data Visualization' },
                  { icon: 'code', title: 'Full‑Stack Dev', desc: 'React, FastAPI, Tailwind CSS, SQLite, Python' },
                  { icon: 'cogs', title: 'Operations & CRM', desc: 'AppFolio, Google Workspace, Process Automation' },
                  { icon: 'users', title: 'Customer Service', desc: 'Troubleshooting, Client Support, Payroll Processing' },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="bg-(--bg-card) border border-(--border) rounded-xl p-5 text-center hover:border-(--primary) hover:-translate-y-1 transition shadow hover:shadow-(--shadow-hover)"
                  >
                    <i className={`fas fa-${card.icon} text-2xl text-(--primary-light) mb-2`}></i>
                    <h4 className="font-semibold text-sm">{card.title}</h4>
                    <p className="text-xs text-(--text-muted)">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> Expertise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-2">
              Skills &amp; Technologies
            </h2>
            <p className="text-(--text-secondary) max-w-lg mb-8">
              Tools and languages I use daily — from data pipelines to frontend.
            </p>

            <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-8">
                {data.skills.map((group) => (
                  <div key={group.title}>
                    <h4 className="text-xs uppercase tracking-wider text-(--text-muted) font-semibold mb-4 flex items-center gap-2">
                      <i className={`fas fa-${group.icon} text-(--primary-light)`}></i> {group.title}
                    </h4>
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between py-2 border-b border-(--border) last:border-0"
                      >
                        <span className="flex items-center gap-2 text-sm text-(--text-secondary)">
                          <i className={`${skill.icon} text-(--primary-light) w-5`}></i> {skill.name}
                        </span>
                        <div className="w-28 h-1.5 bg-(--border) rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> Career
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-2">
              Experience
            </h2>
            <p className="text-(--text-secondary) max-w-lg mb-8">
              My professional journey in data, operations, and tech.
            </p>

            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div
                  key={exp.title}
                  className="grid md:grid-cols-[160px_1fr] gap-6 p-6 bg-(--bg-card) border border-(--border) rounded-xl hover:border-(--primary) hover:shadow-(--shadow-hover) transition hover:translate-x-1"
                >
                  <div className="font-semibold text-(--primary-light) text-sm">
                    {index === 0 ? '2023 – Present' : '2022 – 2023'}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-(--text-primary)">{exp.title}</h4>
                    <div className="text-sm text-(--text-secondary) flex items-center gap-1 mb-2">
                      <i className="fas fa-building text-(--primary-light) text-xs"></i> {exp.company}
                    </div>
                    <p className="text-sm text-(--text-muted) leading-relaxed">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-(--bg-elevated) border border-(--border) px-3 py-1 rounded-full text-(--text-secondary)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-16 px-4 pt-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> Education
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-6">
              Learning &amp; Certification
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.education.map((edu) => (
                <div
                  key={edu.title}
                  className="bg-(--bg-card) border border-(--border) rounded-xl p-6 text-center hover:border-(--primary) hover:-translate-y-1 transition shadow hover:shadow-(--shadow-hover)"
                >
                  <i className={`fas fa-${edu.icon} text-3xl text-(--primary-light) mb-2`}></i>
                  <h4 className="font-semibold">{edu.title}</h4>
                  <p className="text-sm text-(--text-muted)">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-2">
              Projects
            </h2>
            <p className="text-(--text-secondary) max-w-lg mb-6">
              A selection of my work — from full‑stack apps to data dashboards.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['all', 'fullstack', 'data', 'dev'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    filter === cat
                      ? 'bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] text-white border-transparent shadow-md shadow-[#7c6cf0]/30'
                      : 'border-(--border) text-(--text-secondary) hover:border-(--primary) hover:text-(--primary-light)'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat === 'fullstack' ? 'Full‑Stack' : cat === 'data' ? 'Data Analytics' : 'Development'}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-(--text-muted)">
                  <i className="fas fa-search text-3xl block mb-3"></i>
                  No projects in this category.
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 hover:border-(--primary) hover:-translate-y-2 transition shadow hover:shadow-(--shadow-hover) relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] opacity-0 hover:opacity-100 transition"></div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-(--primary)/10 text-(--primary-light) px-3 py-0.5 rounded-full border border-(--primary)/10 mb-3">
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm text-(--text-secondary) mt-1 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-(--bg-elevated) border border-(--border) px-3 py-1 rounded-full text-(--text-secondary)"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="text-sm font-medium text-(--primary-light) hover:text-(--accent) transition inline-flex items-center gap-1.5"
                    >
                      <i className="fas fa-external-link-alt"></i> View project
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Data Viz */}
        <section id="data" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> Analytics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-2">
              Data in Action
            </h2>
            <p className="text-(--text-secondary) max-w-lg mb-8">
              An interactive dashboard snapshot showcasing key operational metrics.
            </p>

            <div className="bg-(--bg-card) border border-(--border) rounded-2xl p-6 md:p-10">
              <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2 text-(--text-primary)">
                    <i className="fas fa-lightbulb text-(--primary-light)"></i> Key Metrics
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {[
                      { icon: 'arrow-up', label: 'Revenue growth', value: '+28% YoY' },
                      { icon: 'users', label: 'Client satisfaction', value: '94%' },
                      { icon: 'clock', label: 'Avg. response time', value: '2.4 min' },
                      { icon: 'file-invoice', label: 'Payroll accuracy', value: '99.7%' },
                      { icon: 'chart-line', label: 'Operational efficiency', value: '+18%' },
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-3 text-sm text-(--text-secondary) border-b border-(--border) pb-2 last:border-0"
                      >
                        <i className={`fas fa-${item.icon} text-(--primary-light) w-5`}></i>
                        {item.label}: <strong className="text-(--text-primary)">{item.value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-(--primary-light) mb-2">
              <span className="w-7 h-0.5 bg-linear-to-r from-[#7c6cf0] to-[#22d3ee]"></span> Connect
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] bg-clip-text text-transparent inline-block mb-2">
              Let's Work Together
            </h2>
            <p className="text-(--text-secondary) max-w-lg mb-8">
              Have a project, a data challenge, or an opportunity? I'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold">Get in touch</h3>
                <p className="text-(--text-secondary) mt-2 mb-6">
                  I'm open to full‑time roles, freelance projects, and collaborations. Reach out — let's build something great.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: 'envelope', text: cvData.personal_info.email },
                    { icon: 'phone-alt', text: cvData.personal_info.phone },
                    { icon: 'map-marker-alt', text: cvData.personal_info.address },
                    { icon: 'github', text: 'github.com/melchizedek' },
                    { icon: 'linkedin', text: 'linkedin.com/in/melchizedek' },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 text-sm text-(--text-secondary) border-b border-(--border) py-2.5"
                    >
                      <i className={`fas fa-${item.icon} text-(--primary-light) w-5`}></i> {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-body) text-(--text-primary) focus:border-(--primary) focus:ring-(--primary)/20 outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-body) text-(--text-primary) focus:border-(--primary) focus:ring-(--primary)/20 outline-none transition"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-body) text-(--text-primary) focus:border-(--primary) focus:ring-(--primary)/20 outline-none transition"
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your project or opportunity…"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-body) text-(--text-primary) focus:border-(--primary) focus:ring-(--primary)/20 outline-none transition resize-y"
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-linear-to-r from-[#7c6cf0] to-[#22d3ee] text-white shadow-lg shadow-[#7c6cf0]/30 hover:shadow-[#7c6cf0]/50 transition hover:-translate-y-0.5"
                >
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border) py-6 px-4 mt-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-(--text-muted)">
            &copy; 2026 Melchizedek S. Mondez. Built with <i className="fas fa-heart text-(--primary-light)"></i> and data.
          </p>
          <div className="flex gap-3">
            {['github', 'linkedin-in', 'twitter', 'youtube'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-(--text-muted) hover:border-(--primary) hover:text-(--primary-light) transition hover:-translate-y-0.5"
              >
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 bg-(--bg-card) border border-(--border) rounded-xl shadow-(--shadow-hover) px-5 py-3 flex items-center gap-3 animate-[slideUp_0.5s_ease]">
          <i
            className={`fas ${
              toast.type === 'warning' ? 'fa-exclamation-circle text-yellow-500' : 'fa-check-circle text-green-500'
            }`}
          ></i>
          <span className="text-sm text-(--text-primary)">{toast.message}</span>
        </div>
      )}

      {/* Inline keyframes for float and slideUp */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;