

export default function Projects({projects}) {

  return (
    <section id="projects" className="section-full relative flex flex-col justify-center items-center overflow-hidden px-5 pt-24 pb-10 md:px-8">
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />
      <div className="relative z-10 w-full max-w-275">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-center mb-1.5">
          Projects
        </h2>
        <p className="text-center text-text-secondary mb-10 text-base">
          Selected work that showcases my skills
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card-bg border border-card-border rounded-(--radius-card) p-7 text-inherit no-underline overflow-hidden transition-all duration-350 shadow-(--shadow-card) hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_16px_40px_rgba(124,92,255,0.2)]"
            >
              <div className="absolute inset-0 project-card-overlay opacity-0 transition-opacity duration-350 group-hover:opacity-[0.12] z-0" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-1 flex items-center justify-center mb-5 text-[1.4rem]">
                  {project.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.7rem] px-2.5 py-1 bg-[rgba(124,92,255,0.15)] text-accent rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-4 text-xs text-accent-2 flex items-center gap-1 opacity-0 -translate-x-2 transition-all duration-350 group-hover:opacity-100 group-hover:translate-x-0">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 text-xs text-accent-2 flex items-center gap-1 opacity-0 -translate-x-2 transition-all duration-350 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    View on GitHub →
                  </a>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}