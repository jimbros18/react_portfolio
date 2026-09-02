export default function About({ me }) {
  const highlights = [
    {
      title: "Data & Reporting",
      desc: "Automated sales, expense, and payroll reports using Python, Excel, and Power BI.",
    },
    {
      title: "Web Development",
      desc: "Built full systems with React, FastAPI, and Tailwind — from client records to billing.",
    },
    {
      title: "Operations Support",
      desc: "Streamlined processes, maintained accurate records, and supported decision-making.",
    },
  ]

  return (
    <section
      id="about"
      className="section-full relative flex flex-col justify-center items-center overflow-hidden px-5 pt-24 pb-10 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />

      <div className="relative z-10 w-full max-w-275">
        {/* Section header */}
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-center mb-1.5">
          About Me
        </h2>
        <p className="text-center text-text-secondary mb-10 text-base">
          A bit more about who I am and what I do
        </p>

        {/* Main content card */}
        <div className="bg-card-bg border border-card-border rounded-(--radius-card) p-8 md:p-10 shadow-(--shadow-card) mb-8">
          <p className="text-text-secondary text-[1.05rem] leading-relaxed mb-5">
            I’m{" "}
            <span className="text-text-primary font-medium">
              {me?.first_name} {me?.middle_name} {me?.last_name}
            </span>
            , a data-focused professional and web developer based in{" "}
            {me?.address || "Montevista, Davao de Oro"}. I specialize in turning
            raw data into clear reports and building practical web systems that
            make day-to-day operations smoother.
          </p>

          <p className="text-text-secondary text-[1.05rem] leading-relaxed mb-5">
            With hands-on experience as a Data and Operations Specialist, I’ve
            automated monthly sales, expense, and payroll reports using Python
            and Excel, maintained accurate client records, and supported
            administrative decision-making. I also developed a full Funeral
            Management System using React, FastAPI, and SQLite.
          </p>

          <p className="text-text-secondary text-[1.05rem] leading-relaxed">
            I enjoy solving real problems — whether it’s creating interactive
            dashboards, streamlining processes with automation, or building
            clean, functional web applications. I’m currently open to
            opportunities as a{" "}
            <span className="text-text-primary font-medium">
              Data Analyst, Reports Analyst, or Web Developer
            </span>
            .
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-card-bg border border-card-border rounded-(--radius-card) p-6 transition-all duration-350 shadow-(--shadow-card) hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_30px_rgba(124,92,255,0.2)]"
            >
              <h3 className="font-display text-lg font-semibold mb-2 text-text-primary">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}