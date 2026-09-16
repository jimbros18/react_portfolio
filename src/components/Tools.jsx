export default function Tools({ skills, theme }) {
  return (
    <section id="tools" className="section-full min-h-0 md:min-h-screen relative flex flex-col justify-center items-center overflow-hidden px-5 pt-16 pb-6 md:pt-24 md:pb-10 md:px-8">
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />
      <div className="relative z-10 w-full max-w-275">
        <h2 className="font-display text-[clamp(1.4rem,4vw,2.4rem)] font-bold text-center mb-1">
          Tools & Skills
        </h2>
        <p className="text-center text-text-secondary mb-4 text-sm md:text-base md:mb-10">
          Commonly Used Technologies and Tools
        </p>

        <div className="flex flex-col gap-2 md:gap-5 w-full mx-auto">
          {Object.entries(skills).map(([category, tools]) => (
            <div key={category} className="flex flex-col gap-2 md:gap-3 w-full">
              <h3 className="text-center font-semibold text-accent text-sm md:text-base md:p-5">
                {category}
              </h3>
            <div className="grid grid-cols-4 gap-x-0 gap-y-2 md:flex md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-6 w-full">
                {tools.map((tool) => (
                  <div key={tool.tool} className="flex flex-col items-center gap-1 md:gap-2 md:w-20 ">
                    {tool.icon && (
                      <img
                        src={theme === "light"
                          ? (tool.icon.light || tool.icon.dark)
                          : (tool.icon.dark || tool.icon.light)}
                        alt={tool.tool}
                        className="w-7 h-7 md:w-10 md:h-10 object-contain"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                    <span className="text-[10px] md:text-sm text-text-secondary text-center leading-tight">
                      {tool.tool}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}