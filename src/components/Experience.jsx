export default function Experience({ experience = [] }) {
  // Fallback data from your cv.json if no prop is passed
  const jobs = experience.length > 0 ? experience : [
    {
      title: "DATA AND OPERATIONS SPECIALIST",
      company: "Lord Anthony Funeral Homes",
      responsibilities: [
        "Accurately input and maintain client data to ensure all records are complete, up-to-date, and easily accessible.",
        "Generate detailed monthly reports for sales, expenses, and accounts payable using Microsoft Excel and Python for data analysis and automation.",
        "Prepare employee pay slip and comprehensive salary reports while tracking attendance and monitoring absences.",
        "Serve as a customer service representative by providing clients with accurate information about services offered, including guidance on how to access government assistance and other available support.",
        "Support day-to-day administrative operations by maintaining organized financial and personnel documentation to assist management in effective decision-making.",
      ],
    },
    {
      title: "MAINTENANCE SPECIALIST",
      company: "APM Help (Remote)",
      responsibilities: [
        "Managed client maintenance requests by promptly assessing issues, providing troubleshooting guidance, and delivering high-quality service.",
        "Improved client satisfaction and reduced recurring maintenance issues through proactive communication and preventive solutions.",
        "Enhanced operational efficiency by overseeing end-to-end maintenance processes while ensuring full compliance with safety standards and company policies.",
        "Utilized MS Office, G Suite, Appfolio CRM, and other tools to streamline communication and support client operations.",
      ],
    },
  ]

  return (
    <section
      id="experience"
      className="section-full relative flex flex-col justify-center items-center overflow-hidden px-5 pt-24 pb-10 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />

      <div className="relative z-10 w-full max-w-275">
        {/* Section header */}
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-center mb-1.5">
          Experience
        </h2>
        <p className="text-center text-text-secondary mb-10 text-base">
          Roles where I’ve applied data, operations, and problem-solving skills
        </p>

        {/* Experience cards */}
        <div className="flex flex-col gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group relative bg-card-bg border border-card-border rounded-(--radius-card) p-7 md:p-8 transition-all duration-350 shadow-(--shadow-card) hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_30px_rgba(124,92,255,0.2)]"
            >
              {/* Accent bar on the left */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-1 opacity-80" />

              <div className="pl-5">
                {/* Title + Company */}
                <h3 className="font-display text-xl font-semibold text-text-primary mb-1">
                  {job.title}
                </h3>
                <p className="text-accent-2 font-medium text-sm mb-5">
                  {job.company}
                </p>

                {/* Responsibilities */}
                <ul className="space-y-2.5">
                  {job.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}