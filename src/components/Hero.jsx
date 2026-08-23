export default function Hero({pi}) {
  return (
    <section id="main" className="section-full relative flex flex-col justify-center items-center overflow-hidden px-5 pt-24 pb-10 md:px-8">
      <div className="absolute inset-0 bg-gradient-2 opacity-60 z-0" />
      <div className="relative z-10 w-full max-w-275 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider text-accent-2 bg-card-bg border border-card-border rounded-full">
          Available for opportunities
        </span>
        <h1 className="font-display text-[clamp(2.8rem,7vw,4.5rem)] font-bold tracking-tighter leading-tight mb-2 text-gradient-1">
          {pi.first_name} {pi.middle_name} {pi.last_name}
        </h1>
        <p className="text-[clamp(1.1rem,2.5vw,1.4rem)] font-medium text-text-secondary mb-5">
          {pi.job_title}
        </p>
        <p className="max-w-140 mx-auto mb-10 text-[1.05rem] leading-relaxed text-text-secondary">
          I craft clean, performant web experiences with modern technologies.
          Passionate about turning ideas into polished products that users love.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="your-cv.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[0.95rem] text-white bg-gradient-1 shadow-[0_4px_20px_rgba(124,92,255,0.35)] transition-all duration-350 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(124,92,255,0.5)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
          <a
            href="your-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[0.95rem] text-text-primary bg-card-bg border border-card-border transition-all duration-350 hover:border-accent hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View CV
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-secondary text-xs animate-bounce-hint z-20">
        <span>Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}