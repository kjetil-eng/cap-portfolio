"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CvPdfGenerator from "./cv-pdf";

gsap.registerPlugin(ScrollTrigger);

/* ─── Merit data ─── */
interface Merit {
  year: string;
  medal: "Gold" | "Silver" | "Bronze" | "Selected" | "Qualified";
  title: string;
}

const MERITS_RISE: Merit[] = [
  { year: "2007", medal: "Gold", title: "Norwegian Chef Association National Apprentice Championship" },
  { year: "2008", medal: "Gold", title: "Norwegian Chef Association National Apprentice Championship" },
  { year: "2008", medal: "Silver", title: "Nordic Apprentice Championship" },
  { year: "2009", medal: "Gold", title: "Norwegian Chef Association National Apprentice Championship" },
  { year: "2010", medal: "Gold", title: "Culinary World Cup — Cold Food (Norwegian Culinary Team)" },
  { year: "2010", medal: "Silver", title: "Culinary World Cup — Overall (Norwegian Culinary Team)" },
  { year: "2011", medal: "Gold", title: "Norwegian Chef Association National Culinary Championship" },
  { year: "2012", medal: "Gold", title: "Nordic Chef of the Year" },
  { year: "2012", medal: "Silver", title: "Norwegian Chef Association National Culinary Championship" },
  { year: "2013", medal: "Gold", title: "Seafood Chef of the Year, Norway" },
];

const MERITS_PEAK: Merit[] = [
  { year: "2014", medal: "Gold", title: "Norwegian Chef Association National Culinary Championship" },
  { year: "2014", medal: "Gold", title: "Linie Awards — Cordon Bleu" },
  { year: "2014", medal: "Gold", title: "Championship Young Chef of the Year, Norway" },
  { year: "2015", medal: "Gold", title: "San Pellegrino Young Chef — Semi Final" },
  { year: "2015", medal: "Silver", title: "San Pellegrino Young Chef — Final, Norwegian Candidate" },
  { year: "2015", medal: "Silver", title: "Nordic Chef of the Year — Candidate" },
  { year: "2015", medal: "Silver", title: "Årets Kokk — Norwegian Bocuse d'Or Classification" },
  { year: "2016", medal: "Silver", title: "Right Hand, Team CWD — Bocuse d'Or Europe" },
  { year: "2017", medal: "Silver", title: "Right Hand, Team CWD — Bocuse d'Or" },
  { year: "2017", medal: "Gold", title: "Årets Kokk — Norwegian Bocuse d'Or Classification" },
  { year: "2017", medal: "Selected", title: "Forbes 30 Under 30 Europe — The Arts" },
];

const MERITS_LEGEND: Merit[] = [
  { year: "2018", medal: "Gold", title: "Bocuse d'Or Europe, Torino" },
  { year: "2019", medal: "Gold", title: "Årets Kokk — Norwegian Bocuse d'Or Classification" },
  { year: "2019", medal: "Bronze", title: "Bocuse d'Or World Final, Lyon" },
  { year: "2020", medal: "Gold", title: "Bocuse d'Or Europe, Tallinn" },
  { year: "2021", medal: "Bronze", title: "Bocuse d'Or World Final, Lyon" },
  { year: "2025", medal: "Gold", title: "Årets Kokk — 3rd time" },
  { year: "2026", medal: "Silver", title: "Bocuse d'Or Europe, Marseille" },
  { year: "2027", medal: "Qualified", title: "Bocuse d'Or World Final, Lyon" },
];

const MEDAL_COLOR: Record<string, string> = {
  Gold: "var(--gold)",
  Silver: "var(--silver)",
  Bronze: "var(--bronze)",
  Selected: "var(--gold)",
  Qualified: "var(--gold)",
};

function MeritRow({ item }: { item: Merit }) {
  const color = MEDAL_COLOR[item.medal];
  return (
    <div className="opacity-0 translate-y-4 section-line">
      <div className="hidden sm:flex items-baseline gap-6">
        <span className="font-[var(--font-heading)] text-xl shrink-0 w-14" style={{ color }}>{item.year}</span>
        <span className="shrink-0 text-xs tracking-[0.15em] uppercase font-sans font-medium w-[4.5rem]" style={{ color }}>{item.medal}</span>
        <span className="font-sans text-sm text-white/90 leading-snug">{item.title}</span>
      </div>
      <div className="sm:hidden">
        <div className="flex items-baseline gap-3 mb-0.5">
          <span className="font-[var(--font-heading)] text-lg shrink-0" style={{ color }}>{item.year}</span>
          <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-medium" style={{ color }}>{item.medal}</span>
        </div>
        <p className="font-sans text-xs text-white/80 leading-relaxed pl-0.5">{item.title}</p>
      </div>
    </div>
  );
}

/* ─── Section config ─── */
interface Section {
  id: string;
  nav: string;
  startPct: number;
  endPct: number;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "intro",
    nav: "Intro",
    startPct: 0,
    endPct: 0.08,
    content: (
      <div className="text-center">
        <h1 className="font-[var(--font-heading)] text-[clamp(3.5rem,12vw,10rem)] font-light leading-[0.85] tracking-tight opacity-0 translate-y-6 section-line">
          Mr.
          <br />
          <em className="font-normal italic">CAP</em>
        </h1>
        <div className="w-20 h-px bg-[var(--gold)]/60 mx-auto my-8 scale-x-0 section-line" />
        <p className="font-sans text-base sm:text-lg md:text-xl text-[var(--text)]/50 max-w-md mx-auto opacity-0 translate-y-4 section-line tracking-wide">
          Christian André Pettersen
        </p>
        <div className="flex justify-center gap-8 sm:gap-12 mt-10 opacity-0 translate-y-4 section-line">
          <div className="text-center">
            <span className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--gold)]">15</span>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[var(--text)]/30 mt-1">Gold</p>
          </div>
          <div className="text-center">
            <span className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--gold)]">2×</span>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[var(--text)]/30 mt-1">European Champion</p>
          </div>
          <div className="text-center">
            <span className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--gold)]">3×</span>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[var(--text)]/30 mt-1">Chef of the Year</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "origins",
    nav: "Origins",
    startPct: 0.08,
    endPct: 0.18,
    content: (
      <div className="max-w-2xl">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Origins</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-8 opacity-0 translate-y-6 section-line">
          Born north of the <em className="italic">Arctic Circle</em>
        </h2>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">July 21, 1989. Bodø, Northern Norway. Son of a Norwegian fisherman-chef and a Filipino mother — two culinary traditions woven into his DNA from the very beginning.</p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">At age eleven, he washed his first dishes at Turisthytta. By twelve, he was running the dessert station. The kitchen chose him before he chose it.</p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 opacity-0 translate-y-4 section-line">Norwegian langoustine with Asian technique. Arctic ingredients with tropical instinct. Precision with soul. East meets West — on every plate.</p>
      </div>
    ),
  },
  {
    id: "philosophy",
    nav: "Philosophy",
    startPct: 0.18,
    endPct: 0.26,
    content: (
      <div className="max-w-2xl">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Philosophy</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-10 opacity-0 translate-y-6 section-line">
          The devil in the <em className="italic">details</em>
        </h2>
        <div className="space-y-6">
          <div className="opacity-0 translate-y-4 section-line">
            <h3 className="font-[var(--font-heading)] text-xl text-[var(--gold)] mb-2 italic">Precision</h3>
            <p className="font-sans text-sm sm:text-base text-[var(--text)]/70 leading-relaxed">Every element placed with purpose. Every flavor balanced with intention. Adding caviar doesn&apos;t make you a good chef — understanding your ingredient and executing perfectly does.</p>
          </div>
          <div className="opacity-0 translate-y-4 section-line">
            <h3 className="font-[var(--font-heading)] text-xl text-[var(--gold)] mb-2 italic">East Meets West</h3>
            <p className="font-sans text-sm sm:text-base text-[var(--text)]/70 leading-relaxed">Two cultures, one kitchen. Filipino warmth and Norwegian precision on every plate. Arctic seaweed with tropical instinct. A dialogue between worlds.</p>
          </div>
          <div className="opacity-0 translate-y-4 section-line">
            <h3 className="font-[var(--font-heading)] text-xl text-[var(--gold)] mb-2 italic">Flavor is Everything</h3>
            <p className="font-sans text-sm sm:text-base text-[var(--text)]/70 leading-relaxed">Less is more. Respect the essence of the product. Local ingredients from the fjords and Arctic waters, prepared with care that honors the producers and the land itself.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "career",
    nav: "Career",
    startPct: 0.26,
    endPct: 0.34,
    content: (
      <div className="max-w-2xl">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Career</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-10 opacity-0 translate-y-6 section-line">
          The <em className="italic">Path</em>
        </h2>
        <div className="space-y-5">
          {[
            { role: "Apprentice → Sous Chef", place: "Under Bocuse d'Or champion Charles Tjessem", note: "Where discipline met ambition" },
            { role: "Head Chef", place: "Spiseriet Konserthuset, Stavanger", note: "" },
            { role: "Head Chef", place: "Mondo Restaurant, Sandnes", note: "" },
            { role: "Culinary Director", place: "Thon Hotels", note: "Creative development across the chain" },
            { role: "Founder & Owner", place: "Alter Ego, Sandnes", note: "Opening 2027 — his own vision, finally taking shape" },
            { role: "Menu & Concept Development", place: "Restaurant ATTME, Bodø", note: "Northern Norwegian cuisine with international perspective" },
          ].map((item, i) => (
            <div key={i} className="opacity-0 translate-y-4 section-line">
              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed">
                <span className="text-[var(--gold)]">{item.role}</span>
                <span className="text-[var(--text)]/40 mx-2">—</span>
                {item.place}
              </p>
              {item.note && <p className="font-sans text-xs text-[var(--text)]/30 mt-0.5 italic">{item.note}</p>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "merits-rise", nav: "2007–13", startPct: 0.34, endPct: 0.44,
    content: (
      <div className="max-w-3xl w-full">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Merit List</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(1.8rem,4vw,3.5rem)] font-light leading-tight mb-3 opacity-0 translate-y-6 section-line">The <em className="italic">Rise</em><span className="text-[var(--text)]/20 text-lg sm:text-2xl ml-3 sm:ml-4">2007–2013</span></h2>
        <p className="font-sans text-xs sm:text-sm text-[var(--text)]/30 mb-6 sm:mb-8 opacity-0 translate-y-4 section-line">From apprentice to the youngest National Champion in Norwegian history at just 21.</p>
        <div className="space-y-3 sm:space-y-2.5">{MERITS_RISE.map((item, i) => <MeritRow key={i} item={item} />)}</div>
      </div>
    ),
  },
  {
    id: "merits-peak", nav: "2014–17", startPct: 0.44, endPct: 0.54,
    content: (
      <div className="max-w-3xl w-full">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Merit List</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(1.8rem,4vw,3.5rem)] font-light leading-tight mb-3 opacity-0 translate-y-6 section-line">The <em className="italic">Peak</em><span className="text-[var(--text)]/20 text-lg sm:text-2xl ml-3 sm:ml-4">2014–2017</span></h2>
        <p className="font-sans text-xs sm:text-sm text-[var(--text)]/30 mb-6 sm:mb-8 opacity-0 translate-y-4 section-line">Three golds in a single year. Forbes 30 Under 30. Chef of the Year for the first time.</p>
        <div className="space-y-3 sm:space-y-2.5">{MERITS_PEAK.map((item, i) => <MeritRow key={i} item={item} />)}</div>
      </div>
    ),
  },
  {
    id: "merits-legend", nav: "2018–27", startPct: 0.54, endPct: 0.64,
    content: (
      <div className="max-w-3xl w-full">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Merit List</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(1.8rem,4vw,3.5rem)] font-light leading-tight mb-3 opacity-0 translate-y-6 section-line">The <em className="italic">Legend</em><span className="text-[var(--text)]/20 text-lg sm:text-2xl ml-3 sm:ml-4">2018–2027</span></h2>
        <p className="font-sans text-xs sm:text-sm text-[var(--text)]/30 mb-6 sm:mb-8 opacity-0 translate-y-4 section-line">Back-to-back European Champion. Two Bocuse d&apos;Or world finals. Norway&apos;s most decorated competition chef in history.</p>
        <div className="space-y-3 sm:space-y-2.5">{MERITS_LEGEND.map((item, i) => <MeritRow key={i} item={item} />)}</div>
        <div className="mt-10 pt-8 border-t border-[var(--gold)]/10 opacity-0 translate-y-4 section-line">
          <p className="font-[var(--font-heading)] text-xl sm:text-2xl md:text-3xl text-[var(--gold)] text-center tracking-wide">28 competitions. 15 gold. 8 silver. 2 bronze.</p>
        </div>
      </div>
    ),
  },
  {
    id: "quote", nav: "Words", startPct: 0.64, endPct: 0.72,
    content: (
      <div className="max-w-3xl text-center">
        <div className="opacity-0 translate-y-6 section-line">
          <p className="font-[var(--font-heading)] text-[clamp(1.5rem,4vw,3rem)] font-light leading-snug italic text-[var(--text)]/80 mb-8">&ldquo;My father inspired me to do great things. He taught me that life has no limitations except the ones you create for yourself.&rdquo;</p>
          <div className="w-12 h-px bg-[var(--gold)]/30 mx-auto mb-4" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--gold)]/50">Christian André Pettersen</p>
        </div>
      </div>
    ),
  },
  {
    id: "alterego", nav: "Alter Ego", startPct: 0.72, endPct: 0.8,
    content: (
      <div className="max-w-2xl">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Alter Ego</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-8 opacity-0 translate-y-6 section-line">Alter <em className="italic">Ego</em></h2>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">In competition, Christian becomes someone else entirely — focused, fearless, operating beyond normal limits. Alter Ego captures that transcendent state.</p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">His next chapter. A brand new restaurant opening in Sandnes after Lyon 2027 — the culmination of twenty years at the top. A tasting menu that is a journey through Arctic Norway with Asian soul.</p>
      </div>
    ),
  },
  {
    id: "lastdance", nav: "Last Dance", startPct: 0.8, endPct: 0.9,
    content: (
      <div className="max-w-2xl text-center">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-6 opacity-0 translate-y-4 section-line">The Last Dance</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4rem)] font-light leading-tight mb-10 opacity-0 translate-y-6 section-line">&ldquo;This is my <em className="italic">last dance.</em>&rdquo;</h2>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">He said it in 2021. The feelings were mixed. One hopes for gold.</p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">Then in 2025 he came back. Won Årets Kokk for the third time. &ldquo;I&apos;m not finished. The motivation is strong.&rdquo;</p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/70 mb-5 opacity-0 translate-y-4 section-line">Lyon 2027. January 24–25. His third and final attempt at the Bocuse d&apos;Or world final.</p>
        <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--text)]/40 italic opacity-0 translate-y-4 section-line">After twenty years and a promise to his late father — this is where the story reaches its climax.</p>
        <div className="mt-10 opacity-0 translate-y-4 section-line">
          <p className="font-[var(--font-heading)] text-sm tracking-[0.4em] uppercase text-[var(--gold)]/30">Winners never quit</p>
        </div>
      </div>
    ),
  },
  {
    id: "contact", nav: "Contact", startPct: 0.9, endPct: 1,
    content: (
      <div className="text-center max-w-xl mx-auto">
        <p className="text-[11px] sm:text-sm tracking-[0.35em] uppercase text-[var(--gold)]/80 mb-4 opacity-0 translate-y-4 section-line">Contact</p>
        <h2 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,4.5rem)] font-light leading-tight mb-10 opacity-0 translate-y-6 section-line">Christian André <em className="italic">Pettersen</em></h2>
        <div className="space-y-5 opacity-0 translate-y-4 section-line">
          <a href="mailto:CAP@alterego.no" className="block font-[var(--font-heading)] text-2xl text-[var(--gold)] hover:text-[var(--text)] transition-colors duration-500">CAP@alterego.no</a>
          <a href="tel:+4747865351" className="block font-sans text-base text-[var(--text)]/50 hover:text-[var(--gold)] transition-colors duration-500">+47 478 65 351</a>
          <a href="https://www.instagram.com/capnorway/" target="_blank" rel="noopener noreferrer" className="block font-sans text-base text-[var(--text)]/40 hover:text-[var(--gold)] transition-colors duration-500">@capnorway</a>
          <div className="pt-8"><CvPdfGenerator /></div>
          <p className="font-sans text-xs text-[var(--text)]/20 mt-6 tracking-widest uppercase">Alter Ego &middot; Sandnes</p>
        </div>
      </div>
    ),
  },
];

const PASSWORD = "bama";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [shake, setShake] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef<string>("");

  const animateSection = useCallback((sectionId: string) => {
    if (activeSectionRef.current === sectionId) return;
    const prevSection = activeSectionRef.current;
    activeSectionRef.current = sectionId;

    // Fade-to-black between sections (kill previous to prevent stacking)
    if (prevSection && blackoutRef.current) {
      gsap.killTweensOf(blackoutRef.current);
      const tl = gsap.timeline();
      tl.to(blackoutRef.current, { opacity: 0.35, duration: 0.25, ease: "power2.in" })
        .to(blackoutRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" }, "+=0.05");
    }

    // Reset previous section — including parallax transform
    if (prevSection) {
      const prev = document.querySelector(`[data-section="${prevSection}"]`) as HTMLElement;
      if (prev) {
        gsap.killTweensOf(prev);
        gsap.set(prev, { opacity: 0 });
        prev.style.transform = "";
        const prevLines = prev.querySelectorAll(".section-line");
        gsap.set(prevLines, { opacity: 0, y: 16, scaleX: 0 });
      }
    }

    // Fade out all other sections
    document.querySelectorAll(".scroll-section").forEach((el) => {
      if (el.getAttribute("data-section") !== sectionId) {
        gsap.to(el as HTMLElement, { opacity: 0, duration: 0.4, ease: "power2.inOut", overwrite: true });
      }
    });

    // Fade in active section
    const active = document.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;
    if (!active) return;

    gsap.to(active, { opacity: 1, duration: 0.5, ease: "power2.out", overwrite: true, delay: 0.1 });

    const lines = active.querySelectorAll(".section-line");
    gsap.to(lines, {
      opacity: 1, y: 0, scaleX: 1,
      duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true, delay: 0.15,
    });

    // Nav highlights
    document.querySelectorAll("[data-nav]").forEach((nav) => {
      nav.classList.toggle("nav-active", nav.getAttribute("data-nav") === sectionId);
    });

    // Pointer events on active section
    document.querySelectorAll(".scroll-section").forEach((el) => {
      (el as HTMLElement).style.pointerEvents = el.getAttribute("data-section") === sectionId ? "auto" : "none";
    });

    // Track active index for arrows
    const idx = SECTIONS.findIndex((s) => s.id === sectionId);
    if (idx !== -1) setActiveIndex(idx);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* #1 — LENIS SMOOTH SCROLL */
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const lenisTickFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTickFn);
    gsap.ticker.lagSmoothing(0);

    /* ScrollTrigger + video scrub + #4 parallax */
    const onReady = () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          // Video scrub
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }

          // Progress bar
          const bar = document.getElementById("progress-bar");
          if (bar) bar.style.height = `${self.progress * 100}%`;

          // Parallax: active section text drifts subtly
          if (!prefersReduced) {
            const activeId = activeSectionRef.current;
            const section = SECTIONS.find((s) => s.id === activeId);
            if (section) {
              const range = section.endPct - section.startPct;
              const sectionProgress = Math.max(0, Math.min(1, (self.progress - section.startPct) / range));
              const parallaxY = (sectionProgress - 0.5) * -16;
              const el = document.querySelector(`[data-section="${activeId}"]`) as HTMLElement;
              if (el) el.style.transform = `translateY(${parallaxY}px)`;
            }
          }

          // Section detection
          const p = self.progress;
          for (const section of SECTIONS) {
            if (p >= section.startPct && p < section.endPct) {
              animateSection(section.id);
              break;
            }
          }
          if (p >= SECTIONS[SECTIONS.length - 1].startPct) {
            animateSection(SECTIONS[SECTIONS.length - 1].id);
          }
        },
      });
    };

    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady);

    /* Custom cursor */
    let mx = 0, my = 0, cx = 0, cy = 0;
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
    raf = requestAnimationFrame(tick);

    setTimeout(() => animateSection("intro"), 400);

    return () => {
      document.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
      gsap.ticker.remove(lenisTickFn);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      video.removeEventListener("loadedmetadata", onReady);
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

  /* Force autoplay on mobile — iOS needs user interaction first */
  const loginVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (unlocked) return;
    const video = loginVideoRef.current;
    if (!video) return;

    // Try immediate play
    video.play().catch(() => {});

    // Fallback: play on first user interaction (required by iOS)
    const playOnInteraction = () => {
      video.play().catch(() => {});
      document.removeEventListener("touchstart", playOnInteraction);
      document.removeEventListener("click", playOnInteraction);
    };
    document.addEventListener("touchstart", playOnInteraction, { once: true });
    document.addEventListener("click", playOnInteraction, { once: true });

    return () => {
      document.removeEventListener("touchstart", playOnInteraction);
      document.removeEventListener("click", playOnInteraction);
    };
  }, [unlocked]);

  /* ─── Login ─── */
  if (!unlocked) {
    return (
      <div className="grain">
        <div className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center z-50">
          <video ref={loginVideoRef} className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" src="/videos/christian.mp4" muted playsInline autoPlay loop preload="auto" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
          <form onSubmit={handleSubmit} className="text-center relative z-10">
            <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[var(--gold)]/60 mb-8 fade-up">Private viewing</p>
            <h1 className="font-[var(--font-heading)] text-5xl sm:text-7xl font-light text-[var(--text)] fade-up-delay-1">Mr. <em className="italic">CAP</em></h1>
            <div className="w-16 h-px bg-[var(--gold)]/40 mx-auto my-8 line-draw" />
            <div className={`fade-up-delay-2 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
              <input type="password" value={pwInput} onChange={(e) => setPwInput(e.target.value)} placeholder="Password" autoFocus className="bg-transparent border-b border-[var(--gold)]/20 text-center text-[var(--text)] font-sans text-lg py-3 px-6 outline-none focus:border-[var(--gold)]/60 transition-colors w-64 placeholder:text-[var(--text)]/15" />
            </div>
            <button type="submit" className="mt-10 text-[10px] tracking-[0.25em] uppercase text-[var(--gold)]/40 hover:text-[var(--gold)] transition-colors duration-500 fade-up-delay-3">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  /* ─── Main experience ─── */
  return (
    <div className="grain vignette">
      {/* #3 — Cinematic letterbox bars */}
      <div className="fixed top-0 left-0 right-0 h-[30px] sm:h-[40px] bg-black z-[90] pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-[30px] sm:h-[40px] bg-black z-[90] pointer-events-none" />

      {/* Arrow navigation — up arrow (hidden on first section) */}
      {activeIndex > 0 && (
        <button
          onClick={() => {
            const prev = SECTIONS[activeIndex - 1];
            const midPct = (prev.startPct + prev.endPct) / 2;
            const scrollTarget = midPct * (document.documentElement.scrollHeight - window.innerHeight);
            window.scrollTo({ top: scrollTarget, behavior: "smooth" });
          }}
          className="fixed top-[36px] sm:top-[48px] left-1/2 -translate-x-1/2 z-[15] bg-transparent border-none p-3 group"
          aria-label="Previous section"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="opacity-25 group-hover:opacity-60 transition-opacity duration-500">
            <path d="M1 11L10 2L19 11" stroke="var(--gold)" strokeWidth="1" />
          </svg>
        </button>
      )}

      {/* Arrow navigation — down arrow (hidden on last section) */}
      {activeIndex < SECTIONS.length - 1 && (
        <button
          onClick={() => {
            const next = SECTIONS[activeIndex + 1];
            const midPct = (next.startPct + next.endPct) / 2;
            const scrollTarget = midPct * (document.documentElement.scrollHeight - window.innerHeight);
            window.scrollTo({ top: scrollTarget, behavior: "smooth" });
          }}
          className="fixed bottom-[36px] sm:bottom-[48px] left-1/2 -translate-x-1/2 z-[15] bg-transparent border-none p-3 group"
          aria-label="Next section"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="opacity-25 group-hover:opacity-60 transition-opacity duration-500 animate-pulse">
            <path d="M1 1L10 10L19 1" stroke="var(--gold)" strokeWidth="1" />
          </svg>
        </button>
      )}

      {/* #5 — Fade-to-black overlay between sections */}
      <div
        ref={blackoutRef}
        className="fixed inset-0 bg-black z-[4] pointer-events-none opacity-0"
      />

      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--gold)]/40 pointer-events-none z-[9999] mix-blend-difference hidden md:block" style={{ willChange: "transform" }} />
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--gold)] pointer-events-none z-[9999] hidden md:block" style={{ willChange: "transform" }} />

      {/* Video */}
      <video ref={videoRef} className="fixed inset-0 w-full h-full object-cover z-0" src="/videos/christian.mp4" muted playsInline preload="auto" />

      {/* Gradient overlay */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/40 to-black/60" />

      {/* Scroll container */}
      <div ref={containerRef} className="relative z-[3]" style={{ height: "900vh" }}>
        {/* Progress bar — between letterbox bars */}
        <div className="fixed top-[30px] sm:top-[40px] right-3 sm:right-6 z-[10] h-[calc(100vh-60px)] sm:h-[calc(100vh-80px)]">
          <div className="w-px h-full bg-[var(--text)]/5">
            <div className="w-px bg-[var(--gold)]/60 origin-top" id="progress-bar" style={{ height: "0%", transition: "height 0.1s linear" }} />
          </div>
        </div>

        {/* Nav — clickable */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[10] hidden md:flex flex-col gap-2 items-end">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              data-nav={s.id}
              onClick={() => {
                const midPct = (s.startPct + s.endPct) / 2;
                const scrollTarget = midPct * (document.documentElement.scrollHeight - window.innerHeight);
                window.scrollTo({ top: scrollTarget, behavior: "smooth" });
              }}
              className="text-[9px] tracking-[0.2em] uppercase text-[var(--text)]/15 transition-all duration-700 font-sans hover:text-[var(--gold)]/60 cursor-pointer bg-transparent border-none p-0"
            >
              {s.nav}
            </button>
          ))}
        </div>

        {/* Content sections */}
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            data-section={section.id}
            className={`scroll-section fixed inset-0 flex justify-center px-6 sm:px-10 md:px-20 pt-[46px] pb-[46px] sm:pt-[56px] sm:pb-[56px] z-[5] opacity-0 ${
              section.id.startsWith("merits") ? "items-start overflow-y-auto pt-[60px] sm:pt-[72px]" : "items-center"
            }`}
            style={{ pointerEvents: "none", willChange: "transform, opacity" }}
          >
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
