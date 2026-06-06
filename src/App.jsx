import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

const SKILLS = {
  "Reporting & Analytics": ["Power BI", "Tableau", "Advanced Excel", "SQL", "Python"],
  "Advanced Excel": ["Pivot Tables", "VLOOKUP / XLOOKUP", "Power Query", "Dashboard Creation", "Report Automation", "Conditional Formatting"],
  "Databases & Tools": ["SQL", "Snowflake", "Databricks", "GitHub"],
  "Operations & Ticketing": ["SLA Monitoring", "KPI Reporting", "Incident Reporting", "Operational Analytics"],
};

const EXPERIENCE = [
  {
    company: "HCLTech",
    role: "Lead Analyst – Reporting & Analytics",
    period: "Nov 2025 – Present",
    domain: "Telecom",
    color: "#1F4E79",
    responsibilities: [
      "Managed and analyzed large operational datasets for SLA & KPI reporting",
      "Prepared daily, weekly, and monthly performance reports for client and leadership",
      "Monitored ticket volumes, backlog aging, and resolution trends via Power BI dashboards",
      "Conducted trend analysis delivering actionable insights to improve efficiency",
      "Collaborated with stakeholders to automate recurring reports",
    ],
    achievements: [
      "Improved reporting turnaround by standardizing and automating Excel-based reports",
      "Built interactive Power BI dashboards enabling faster leadership decisions",
      "Achieved consistently high SLA reporting accuracy with zero client escalations",
    ],
  },
  {
    company: "Tata Consultancy Services",
    role: "Senior Process Associate | Quality Analyst",
    period: "May 2016 – Dec 2024",
    domain: "UK Pension Administration",
    color: "#2E75B6",
    responsibilities: [
      "Conducted quality audits and compliance reviews for Defined Benefit pension schemes",
      "Performed root cause analysis and recommended corrective actions",
      "Reviewed pension calculations, member records, retirements, and transfers",
      "Monitored quality metrics and prepared QA and operational reports",
      "Ensured adherence to client SLAs, quality standards, and regulatory requirements",
    ],
    achievements: [
      "Maintained consistently high quality scores across pension schemes",
      "Reduced operational errors through targeted quality control measures",
      "Recognized for analytical problem-solving and deep domain expertise",
      "Contributed to continuous improvement initiatives across multiple processes",
    ],
  },
];

const PROJECTS = [
  { title: "Sales Performance Dashboard", tools: "Power BI", icon: "📊", desc: "Developed interactive dashboards to monitor sales KPIs and trends. Automated reporting processes to reduce manual effort and improve turnaround time.", color: "#1F4E79" },
  { title: "Customer Insights Analysis", tools: "SQL & Excel", icon: "🔍", desc: "Performed data cleaning, validation, and behavioral analysis to generate actionable business insights and management performance summaries.", color: "#2E75B6" },
  { title: "Business Reporting Dashboard", tools: "Power BI & Excel", icon: "📈", desc: "Designed executive-level dashboards with KPI scorecards to track and improve visibility into operational performance metrics.", color: "#1F4E79" },
  { title: "Forecasting & Trend Analysis", tools: "Excel & Power BI", icon: "🎯", desc: "Analyzed historical data to identify business trends and generate forecasting reports, supporting strategic planning and decision-making.", color: "#2E75B6" },
];

const CERTIFICATIONS = [
  { name: "Data Science & AI Certification", issuer: "Meritshot", icon: "🤖" },
  { name: "Data Analytics Program", issuer: "Intellipaat", icon: "📉" },
  { name: "Power BI Certification", issuer: "SkillCourse", icon: "📊" },
  { name: "SQL Certification", issuer: "SkillCourse", icon: "🗃️" },
  { name: "Advanced Excel Certification", issuer: "SkillCourse", icon: "📋" },
  { name: "Excel, SQL & Power BI Bundle", issuer: "SkillCourse", icon: "🎓" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeExp, setActiveExp] = useState(0);
  const [expTab, setExpTab] = useState("responsibilities");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(l => l.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F0F4F8", minHeight: "100vh", color: "#1a2a3a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #e8eef4; }
        ::-webkit-scrollbar-thumb { background: #2E75B6; border-radius: 3px; }
        .nav-link { cursor: pointer; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; transition: all 0.2s; color: #334155; }
        .nav-link:hover, .nav-link.active { background: #1F4E79; color: white; }
        .skill-tag { background: white; border: 1.5px solid #BDD7EE; color: #1F4E79; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; display: inline-block; margin: 4px; transition: all 0.2s; }
        .skill-tag:hover { background: #1F4E79; color: white; border-color: #1F4E79; transform: translateY(-2px); }
        .proj-card { background: white; border-radius: 16px; padding: 28px; border: 1px solid #dde8f2; transition: all 0.3s; cursor: default; }
        .proj-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(31,78,121,0.12); border-color: #2E75B6; }
        .cert-card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #dde8f2; transition: all 0.25s; display: flex; align-items: center; gap: 16px; }
        .cert-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(31,78,121,0.1); border-color: #2E75B6; }
        .exp-tab-btn { padding: 8px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; }
        .timeline-dot { width: 14px; height: 14px; border-radius: 50%; background: #2E75B6; border: 3px solid white; box-shadow: 0 0 0 2px #2E75B6; flex-shrink: 0; margin-top: 4px; }
        .contact-link { display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: white; border-radius: 12px; border: 1px solid #dde8f2; text-decoration: none; color: #1F4E79; font-weight: 500; font-size: 15px; transition: all 0.2s; }
        .contact-link:hover { background: #1F4E79; color: white; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(31,78,121,0.15); }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(46,117,182,0.3); } 70% { box-shadow: 0 0 0 20px rgba(46,117,182,0); } 100% { box-shadow: 0 0 0 0 rgba(46,117,182,0); } }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(240,244,248,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #dde8f2", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: "#1F4E79", letterSpacing: "-0.5px" }}>
          Ajay<span style={{ color: "#2E75B6" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map(l => (
            <button key={l} className={`nav-link${activeSection === l.toLowerCase() ? " active" : ""}`} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none" }}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 40px 60px", background: "linear-gradient(135deg, #EBF3FB 0%, #F0F4F8 50%, #E8F0F8 100%)", position: "relative", overflow: "hidden" }}>
        {/* BG Decoration */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,117,182,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,78,121,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "#1F4E79", color: "white", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, marginBottom: 24, letterSpacing: "0.5px" }}>
              📍 Nagpur, Maharashtra, India
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 58, fontWeight: 800, lineHeight: 1.1, color: "#0d1f35", marginBottom: 16 }}>
              Ajay<br /><span style={{ color: "#2E75B6" }}>Sharnagat</span>
            </h1>
            <h2 style={{ fontSize: 20, fontWeight: 500, color: "#2E75B6", marginBottom: 20 }}>Lead Analyst – Reporting & Analytics</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4a5f75", marginBottom: 32, maxWidth: 480 }}>
              9+ years of experience turning raw data into actionable insights. Specialising in MIS Reporting, Power BI dashboards, SLA analytics, and operational excellence across Telecom and UK Pension domains.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} style={{ background: "#1F4E79", color: "white", border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#163a5f"} onMouseLeave={e => e.target.style.background = "#1F4E79"}>
                View Projects →
              </button>
              <button onClick={() => scrollTo("contact")} style={{ background: "white", color: "#1F4E79", border: "2px solid #1F4E79", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "#1F4E79"; e.target.style.color = "white"; }} onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#1F4E79"; }}>
                Contact Me
              </button>
            </div>
          </div>

          {/* Stats card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { num: "9+", label: "Years Experience", icon: "🏆" },
              { num: "2", label: "Domains Expertise", icon: "🌐" },
              { num: "4+", label: "Projects Delivered", icon: "📊" },
              { num: "6+", label: "Certifications", icon: "🎓" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "28px 20px", textAlign: "center", border: "1px solid #dde8f2", boxShadow: "0 4px 16px rgba(31,78,121,0.06)", animation: `float ${2.5 + i * 0.3}s ease-in-out infinite` }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: "#1F4E79" }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#7a90a4", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 40px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ color: "#2E75B6", fontWeight: 600, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase" }}>What I work with</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#0d1f35", marginTop: 8 }}>Technical Skills</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {Object.entries(SKILLS).map(([cat, skills], i) => (
              <FadeIn key={cat} delay={i * 0.1}>
                <div style={{ background: "#F7FAFD", borderRadius: 16, padding: 28, border: "1px solid #dde8f2" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 4, height: 24, background: "#2E75B6", borderRadius: 2 }} />
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1F4E79" }}>{cat}</h3>
                  </div>
                  <div>{skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "80px 40px", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ color: "#2E75B6", fontWeight: 600, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase" }}>My journey</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#0d1f35", marginTop: 8 }}>Professional Experience</h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }}>
            {/* Company selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {EXPERIENCE.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <button onClick={() => { setActiveExp(i); setExpTab("responsibilities"); }} style={{ background: activeExp === i ? "#1F4E79" : "white", color: activeExp === i ? "white" : "#334155", border: `2px solid ${activeExp === i ? "#1F4E79" : "#dde8f2"}`, borderRadius: 14, padding: "20px 20px", textAlign: "left", cursor: "pointer", transition: "all 0.25s", width: "100%" }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{exp.company}</div>
                    <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>{exp.period}</div>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: activeExp === i ? "rgba(255,255,255,0.2)" : "#EBF3FB", color: activeExp === i ? "white" : "#2E75B6", fontWeight: 600 }}>
                      {exp.domain}
                    </span>
                  </button>
                </FadeIn>
              ))}
            </div>

            {/* Detail panel */}
            <FadeIn>
              <div style={{ background: "white", borderRadius: 20, padding: 36, border: "1px solid #dde8f2", boxShadow: "0 4px 20px rgba(31,78,121,0.06)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: "#0d1f35", marginBottom: 6 }}>{EXPERIENCE[activeExp].role}</h3>
                <p style={{ color: "#2E75B6", fontWeight: 600, marginBottom: 24 }}>{EXPERIENCE[activeExp].company} · {EXPERIENCE[activeExp].period}</p>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#F0F4F8", padding: 6, borderRadius: 10, width: "fit-content" }}>
                  {["responsibilities", "achievements"].map(tab => (
                    <button key={tab} className="exp-tab-btn" onClick={() => setExpTab(tab)} style={{ background: expTab === tab ? "#1F4E79" : "transparent", color: expTab === tab ? "white" : "#4a5f75" }}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {EXPERIENCE[activeExp][expTab].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div className="timeline-dot" />
                      <span style={{ fontSize: 15, lineHeight: 1.7, color: "#3a5168" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "80px 40px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ color: "#2E75B6", fontWeight: 600, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase" }}>What I've built</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#0d1f35", marginTop: 8 }}>Key Projects</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="proj-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ fontSize: 32 }}>{p.icon}</div>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0d1f35", marginBottom: 4 }}>{p.title}</h3>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#2E75B6", background: "#EBF3FB", padding: "3px 10px", borderRadius: 20 }}>{p.tools}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "#5a6f83" }}>{p.desc}</p>
                  <div style={{ marginTop: 16, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" style={{ padding: "80px 40px", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ color: "#2E75B6", fontWeight: 600, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase" }}>Credentials</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#0d1f35", marginTop: 8 }}>Certifications</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {CERTIFICATIONS.map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="cert-card">
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0d1f35", marginBottom: 4 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: "#2E75B6", fontWeight: 500 }}>{c.issuer}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 40px", background: "linear-gradient(135deg, #1F4E79 0%, #2E75B6 100%)", color: "white" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase" }}>Get in touch</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, marginTop: 8, marginBottom: 16 }}>Let's Connect</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: 40 }}>
              Open to new opportunities in Data Analytics & Reporting. Available as an immediate joiner.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420, margin: "0 auto" }}>
              <a href="mailto:ajaysharnagat@gmail.com" className="contact-link">
                <span style={{ fontSize: 20 }}>✉️</span> ajaysharnagat@gmail.com
              </a>
              <a href="tel:+917620620290" className="contact-link">
                <span style={{ fontSize: 20 }}>📞</span> +91 7620620290
              </a>
              <a href="https://www.linkedin.com/in/ajay-sharnagat-85281110a" target="_blank" rel="noreferrer" className="contact-link">
                <span style={{ fontSize: 20 }}>💼</span> linkedin.com/in/ajay-sharnagat-85281110a
              </a>
            </div>
            <div style={{ marginTop: 32, padding: "12px 24px", background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "inline-block", fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
              🟢 Available · Immediate Joiner · Nagpur, India
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0d1f35", padding: "20px 40px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        © 2026 Ajay Sharnagat · Lead Analyst – Reporting & Analytics
      </footer>
    </div>
  );
}
