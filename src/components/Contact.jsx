
export default function Contact({contact}) {
  return (
    <section id="contact" className="section-full relative flex flex-col justify-center items-center overflow-hidden px-5 pt-24 pb-10 md:px-8">
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />
      <div className="relative z-10 w-full max-w-[1100px]">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-center mb-1.5">
          Contact
        </h2>
        <p className="text-center text-[var(--color-text-secondary)] mb-10 text-base">
          Let's connect — feel free to reach out
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[900px] mx-auto">
          {Object.entries(contact).map(([type, item]) => {
            const href =
              type === 'phone'
                ? `tel:${item.value}`
                : type === 'mail'
                  ? `mailto:${item.value}`
                  : item.url;

            const external = ['linkedin', 'github'].includes(type);

            return (
                    <a
                      key={type}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="
                        group relative
                        flex flex-col items-center justify-center gap-2
                        rounded-(--radius-card)
                        p-7
                        text-inherit no-underline
                        overflow-hidden
                        border border-transparent
                        bg-card-bg
                        transition-all duration-350 ease-out
                        hover:-translate-y-1.5
                        hover:border-[rgba(124,92,255,0.35)]
                        hover:shadow-[0_0_15px_rgba(124,92,255,0.45),0_0_35px_rgba(124,92,255,0.25),0_0_70px_rgba(124,92,255,0.15)]
                      "
                    >
                    <div
                      className="
                        absolute inset-0
                        z-0
                        opacity-0
                        transition-opacity duration-500
                        group-hover:opacity-100
                        bg-[linear-gradient(120deg,rgba(124,92,255,0.18),rgba(45,212,191,0.14),rgba(168,85,247,0.18),rgba(45,212,191,0.14),rgba(124,92,255,0.18))]
                        bg-[length:300%_300%]
                        group-hover:animate-gradient
                      "
                    />
                      <div className="relative z-10">
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt={item.label}
                            className="w-6 h-6"
                          />
                        ) : (
                          item.label
                        )}
                      </div>

                      <span className="relative z-10">
                        {item.label}
                      </span>

                      <span className="relative z-10">
                        {item.value}
                      </span>
                    </a>
            );
          })}
        </div>
      </div>
    </section>
  )
}
