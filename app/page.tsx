"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Section {
  id: string;
  startPct: number;
  endPct: number;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "hero",
    startPct: 0,
    endPct: 0.15,
    content: (
      <div className="text-center">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-6 opacity-0 translate-y-4 section-line">
          Christian André Pettersen presents
        </p>
        <h1 className="font-[var(--font-heading)] text-[clamp(3rem,10vw,9rem)] font-light leading-[0.9] tracking-tight opacity-0 translate-y-6 section-line">
          ALTER
          <br />
          <em className="font-normal italic">EGO</em>
        </h1>
        <div className="w-24 h-px bg-[var(--gold)] mx-auto my-8 scale-x-0 section-line" />
        <p className="font-sans text-lg md:text-xl text-[var(--text)]/60 max-w-lg mx-auto opacity-0 translate-y-4 section-line">
          Two decades. One obsession. The world&apos;s greatest culinary stage.
        </p>
      </div>
    ),
  },
  {
    id: "about",
    startPct: 0.15,
    endPct: 0.35,
    content: (
      <div className="max-w-2xl">
        <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4 opacity-0 translate-y-4 section-line">
          Hvem er jeg
        </p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-8 opacity-0 translate-y-6 section-line">
          Christian André <em className="italic">Pettersen</em>
        </h2>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-6 opacity-0 translate-y-4 section-line">
          Født 21. juli 1989 i Bodø, nord for Polarsirkelen. Som elleveåring
          vasket han sine første tallerkener på Turisthytta. Som 21-åring ble
          han den yngste vinneren av NM i kokkekunst noensinne. I dag er han
          Norges mest meritterte konkurransekokk.
        </p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-8 opacity-0 translate-y-4 section-line">
          Sønn av en norsk fisker-kokk og en filippinsk mor. To kulinariske
          tradisjoner i sitt DNA. Norsk langustin med asiatisk teknikk. Arktiske
          råvarer med tropisk instinkt. Presisjon med sjel.
        </p>
        <div className="flex gap-10 flex-wrap opacity-0 translate-y-4 section-line">
          {[
            { num: "14", label: "Gullmedaljer" },
            { num: "2×", label: "Europamester" },
            { num: "3×", label: "Årets Kokk" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-[var(--font-heading)] text-4xl text-[var(--gold)]">
                {s.num}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-[var(--text)]/50 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "experience",
    startPct: 0.35,
    endPct: 0.55,
    content: (
      <div className="max-w-2xl">
        <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4 opacity-0 translate-y-4 section-line">
          Erfaring
        </p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-10 opacity-0 translate-y-6 section-line">
          Veien til <em className="italic">Lyon</em>
        </h2>
        <div className="space-y-6">
          {[
            {
              year: "2011",
              title: "Yngste NM-vinner",
              badge: "Gull",
            },
            {
              year: "2017",
              title: "Årets Kokk · Forbes 30 Under 30",
              badge: "Gull",
            },
            {
              year: "2018",
              title: "Bocuse d'Or Europa, Torino",
              badge: "Gull",
            },
            {
              year: "2020",
              title: "Bocuse d'Or Europa, Tallinn — Back-to-back",
              badge: "Gull",
            },
            {
              year: "2025",
              title: "Årets Kokk for tredje gang",
              badge: "Gull",
            },
            {
              year: "2027",
              title: "Lyon — Den siste dansen",
              badge: "Finalen",
            },
          ].map((item) => (
            <div
              key={item.year}
              className="flex items-baseline gap-6 opacity-0 translate-y-4 section-line"
            >
              <span className="font-[var(--font-heading)] text-2xl text-[var(--gold)] shrink-0 w-16">
                {item.year}
              </span>
              <span className="font-sans text-base text-[var(--text)]/80">
                {item.title}
              </span>
              <span className="ml-auto text-xs tracking-[0.15em] uppercase border border-[var(--gold)]/30 text-[var(--gold)] px-3 py-1 rounded-full shrink-0">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "projects",
    startPct: 0.55,
    endPct: 0.75,
    content: (
      <div className="max-w-2xl">
        <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4 opacity-0 translate-y-4 section-line">
          Prosjekter
        </p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-10 opacity-0 translate-y-6 section-line">
          Alter <em className="italic">Ego</em>
        </h2>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-8 opacity-0 translate-y-4 section-line">
          I konkurranse blir Christian en annen — fokusert, uredd, opererer
          utenfor vanlige grenser. Alter Ego fanger den transcendente
          tilstanden. Hans lekeplass. Det lekne og det profesjonelle.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              title: "Restaurant Alter Ego",
              desc: "Smaksmeny — en reise gjennom det arktiske Norge med asiatisk sjel. Sandnes.",
            },
            {
              title: "Restaurant ATTME",
              desc: "Bodø. Nordnorsk matkultur med internasjonalt perspektiv.",
            },
            {
              title: "Chef's Table",
              desc: "Seks plasser. Første rad til mesterskap. Presisjon på konkurransenivå.",
            },
            {
              title: "The Last Dance",
              desc: "Lyon 2027. Hans tredje og siste forsøk på Bocuse d'Or-gull.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="opacity-0 translate-y-4 section-line"
            >
              <h3 className="font-[var(--font-heading)] text-xl text-[var(--gold)] mb-2">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-[var(--text)]/60 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    startPct: 0.75,
    endPct: 1,
    content: (
      <div className="text-center max-w-xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4 opacity-0 translate-y-4 section-line">
          Kontakt
        </p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-8 opacity-0 translate-y-6 section-line">
          La oss <em className="italic">snakke</em>
        </h2>
        <p className="font-sans text-base md:text-lg text-[var(--text)]/60 mb-10 opacity-0 translate-y-4 section-line">
          For samarbeid, private arrangementer eller pressehenvendelser.
        </p>
        <div className="space-y-4 opacity-0 translate-y-4 section-line">
          <a
            href="mailto:press@alterego.no"
            className="block font-[var(--font-heading)] text-2xl text-[var(--gold)] hover:text-[var(--text)] transition-colors duration-500"
          >
            press@alterego.no
          </a>
          <a
            href="https://www.instagram.com/capnorway/"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-sans text-base text-[var(--text)]/50 hover:text-[var(--gold)] transition-colors duration-500"
          >
            @capnorway
          </a>
          <p className="font-sans text-sm text-[var(--text)]/30 mt-8">
            Sandnes, Norway &middot; Bodø, Norway
          </p>
        </div>
        <div className="mt-16 opacity-0 translate-y-4 section-line">
          <p className="font-[var(--font-heading)] text-sm tracking-[0.4em] uppercase text-[var(--gold)]/40">
            Winners never quit
          </p>
        </div>
      </div>
    ),
  },
];

const PASSWORD = "alterego";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [shake, setShake] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef<string>("");

  const animateSection = useCallback((sectionId: string) => {
    if (activeSectionRef.current === sectionId) return;
    activeSectionRef.current = sectionId;

    // Fade out all sections
    document.querySelectorAll(".scroll-section").forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (el.getAttribute("data-section") !== sectionId) {
        gsap.to(htmlEl, { opacity: 0, duration: 0.4, ease: "power2.out" });
      }
    });

    // Fade in + animate lines of active section
    const active = document.querySelector(
      `[data-section="${sectionId}"]`
    ) as HTMLElement;
    if (!active) return;

    gsap.to(active, { opacity: 1, duration: 0.5, ease: "power2.out" });

    const lines = active.querySelectorAll(".section-line");
    gsap.to(lines, {
      opacity: 1,
      y: 0,
      scaleX: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const video = videoRef.current;
    if (!video) return;

    // Wait for video metadata
    const onLoadedMetadata = () => {
      // Main scroll-driven video scrub
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }

          // Determine active section
          const progress = self.progress;
          for (const section of SECTIONS) {
            if (progress >= section.startPct && progress < section.endPct) {
              animateSection(section.id);
              break;
            }
          }
          // Handle last section at exactly 1
          if (progress >= SECTIONS[SECTIONS.length - 1].startPct) {
            animateSection(SECTIONS[SECTIONS.length - 1].id);
          }
        },
      });
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    // Custom cursor with spring physics
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    const spring = 0.08;

    const handleMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", handleMouse);

    let raf: number;
    function tick() {
      cx += (mx - cx) * spring;
      cy += (my - cy) * spring;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    // Animate first section on load
    setTimeout(() => animateSection("hero"), 300);

    return () => {
      document.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [animateSection, unlocked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput.toLowerCase() === PASSWORD) {
      setUnlocked(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPwInput("");
    }
  };

  if (!unlocked) {
    return (
      <div className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center z-50">
        <form onSubmit={handleSubmit} className="text-center">
          <p className="font-[var(--font-heading)] text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-6">
            Privat visning
          </p>
          <h1 className="font-[var(--font-heading)] text-5xl font-light mb-10 text-[var(--text)]">
            ALTER <em className="italic">EGO</em>
          </h1>
          <div className={`${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
            <input
              type="password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Passord"
              autoFocus
              className="bg-transparent border-b border-[var(--gold)]/30 text-center text-[var(--text)] font-sans text-lg py-3 px-6 outline-none focus:border-[var(--gold)] transition-colors w-64 placeholder:text-[var(--text)]/20"
            />
          </div>
          <button
            type="submit"
            className="mt-8 text-xs tracking-[0.2em] uppercase text-[var(--gold)]/60 hover:text-[var(--gold)] transition-colors cursor-none"
          >
            Gå inn →
          </button>
        </form>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-4px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--gold)]/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--gold)] pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />

      {/* Fixed video background */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/videos/christian.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Dark overlay on video */}
      <div className="fixed inset-0 bg-black/50 z-[1]" />

      {/* Scroll container — 600vh tall */}
      <div ref={containerRef} className="relative z-[2]" style={{ height: "600vh" }}>
        {/* Progress bar */}
        <div className="fixed top-0 right-6 h-screen w-px bg-[var(--text)]/10 z-[10]">
          <div
            className="w-px bg-[var(--gold)] origin-top transition-none"
            id="progress-bar"
            style={{ height: "0%" }}
          />
        </div>

        {/* Section labels on right */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[10] hidden md:flex flex-col gap-3 items-end">
          {SECTIONS.map((s) => (
            <div
              key={s.id}
              data-nav={s.id}
              className="text-[10px] tracking-[0.2em] uppercase text-[var(--text)]/20 transition-all duration-500 font-sans"
            >
              {s.id === "hero"
                ? "Intro"
                : s.id === "about"
                  ? "Bio"
                  : s.id === "experience"
                    ? "Erfaring"
                    : s.id === "projects"
                      ? "Prosjekter"
                      : "Kontakt"}
            </div>
          ))}
        </div>

        {/* Content sections — fixed overlay positioning */}
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            data-section={section.id}
            className="scroll-section fixed inset-0 flex items-center justify-center px-8 md:px-16 z-[5] opacity-0"
            style={{ pointerEvents: "none" }}
          >
            {section.content}
          </div>
        ))}
      </div>
    </>
  );
}
