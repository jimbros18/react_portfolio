export default function Tools({skills}) {
  return (
    <section id="tools" className="section-full relative flex flex-col justify-center items-center overflow-hidden px-5 pt-24 pb-10 md:px-8">
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />
      <div className="relative z-10 w-full max-w-275">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-center mb-1.5">
          Tools
        </h2>
        <p className="text-center text-text-secondary mb-10 text-base">
          Technologies I work with daily
        </p>
        <div className="flex flex-col gap-5 max-w-200 mx-auto">
            {Object.entries(skills).map(([category, tools]) => (
                <div key={category} className="flex flex_col border border-card-border py-4 gap-6">
                  <div className="items w-40 font-semibold text-accent">{category}</div>
                  <div className="flex flex-row border gap-6 flex-1">
                    {tools.map((tool) => (
                      <div key={tool.tool} className="flex flex-col items-center gap-1 min-w-17.5">
                        {tool.icon && (
                          <img
                            src={tool.icon}
                            alt={tool.tool}
                            className="w-10 h-10 object-contain"
                            onError={(e) => (e.target.style.display = 'none')}
                          />
                        )}
                        <span className="text-sm text-text-secondary text-center">{tool.tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}