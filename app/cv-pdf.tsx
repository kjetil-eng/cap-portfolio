"use client";

import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

/* ─── Design tokens ─── */
const GOLD = "#c9a96e";
const SILVER = "#c0c0c0";
const BRONZE = "#cd7f32";
const BG = "#0a0a0a";
const TEXT = "#f5f0e8";
const DIM = `${TEXT}aa`;
const FAINT = `${TEXT}55`;
const GHOST = `${TEXT}33`;

/* A4 at 2× for retina: 794 × 1122 px at 96dpi */
const PAGE_W = 794;
const PAGE_H = 1122;
const PAD_X = 64;
const PAD_TOP = 56;
const PAD_BOT = 56;

interface Merit {
  year: string;
  medal: string;
  title: string;
}

const ALL_MERITS: Merit[] = [
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
  { year: "2018", medal: "Gold", title: "Bocuse d'Or Europe, Torino" },
  { year: "2019", medal: "Gold", title: "Årets Kokk — Norwegian Bocuse d'Or Classification" },
  { year: "2019", medal: "Bronze", title: "Bocuse d'Or World Final, Lyon" },
  { year: "2020", medal: "Gold", title: "Bocuse d'Or Europe, Tallinn" },
  { year: "2021", medal: "Bronze", title: "Bocuse d'Or World Final, Lyon" },
  { year: "2025", medal: "Gold", title: "Årets Kokk — 3rd time" },
  { year: "2026", medal: "Silver", title: "Bocuse d'Or Europe, Marseille" },
  { year: "2027", medal: "Qualified", title: "Bocuse d'Or World Final, Lyon" },
];

function medalColor(medal: string) {
  if (medal === "Silver") return SILVER;
  if (medal === "Bronze") return BRONZE;
  return GOLD;
}

/* ─── Shared styles ─── */
const serif = "'Cormorant Garamond', serif";
const sans = "'Outfit', sans-serif";

const pageStyle: React.CSSProperties = {
  width: PAGE_W,
  height: PAGE_H,
  padding: `${PAD_TOP}px ${PAD_X}px ${PAD_BOT}px`,
  background: BG,
  color: TEXT,
  fontFamily: sans,
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
};

const label: React.CSSProperties = {
  fontSize: "9px",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: GOLD,
  opacity: 0.8,
  marginBottom: "10px",
};

const h2Style: React.CSSProperties = {
  fontFamily: serif,
  fontSize: "24px",
  fontWeight: 300,
  marginBottom: "16px",
  lineHeight: 1.2,
};

const bodyText: React.CSSProperties = {
  fontSize: "11px",
  lineHeight: 1.85,
  color: DIM,
  marginBottom: "8px",
};

const separator: React.CSSProperties = {
  width: "100%",
  height: "1px",
  background: `${GOLD}18`,
  margin: "28px 0",
};

const pageFooter: React.CSSProperties = {
  position: "absolute",
  bottom: PAD_BOT,
  left: PAD_X,
  right: PAD_X,
  height: "1px",
  background: `linear-gradient(90deg, transparent, ${GOLD}33, transparent)`,
};

/* ─── Component ─── */
export default function CvPdfGenerator() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const generatePdf = useCallback(async () => {
    if (generating) return;
    setGenerating(true);

    try {
      const pages = [page1Ref.current, page2Ref.current, page3Ref.current];
      const pdf = new jsPDF("p", "mm", "a4");

      for (let i = 0; i < pages.length; i++) {
        const el = pages[i];
        if (!el) continue;

        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: BG,
          useCORS: true,
          logging: false,
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      }

      pdf.save("Christian-Andre-Pettersen-CV.pdf");
    } finally {
      setGenerating(false);
    }
  }, [generating]);

  return (
    <>
      {/* Download button */}
      <button
        onClick={generatePdf}
        disabled={generating}
        className="inline-block font-sans text-[11px] tracking-[0.25em] uppercase border border-[var(--gold)]/30 text-[var(--gold)] px-8 py-3 hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/60 transition-all duration-500 disabled:opacity-30"
        style={{ cursor: "pointer" }}
      >
        {generating ? "Generating..." : "Download CV"}
      </button>

      {/* ─── Hidden pages rendered off-screen ─── */}
      <div style={{ position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>

        {/* ════════════════════════════════════════════
            PAGE 1 — Header · Origins · Philosophy
            ════════════════════════════════════════════ */}
        <div ref={page1Ref} style={pageStyle}>
          {/* Top accent */}
          <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, marginBottom: "44px" }} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: GOLD, opacity: 0.6, marginBottom: "18px" }}>
              Curriculum Vitae
            </p>
            <h1 style={{ fontFamily: serif, fontSize: "52px", fontWeight: 300, lineHeight: 0.88, margin: "0 0 10px" }}>
              Mr. <span style={{ fontStyle: "italic" }}>CAP</span>
            </h1>
            <p style={{ fontSize: "15px", color: `${TEXT}88`, letterSpacing: "0.12em", marginBottom: "18px" }}>
              Christian André Pettersen
            </p>
            <div style={{ width: "40px", height: "1px", background: `${GOLD}55`, margin: "0 auto" }} />
          </div>

          {/* Key figures */}
          <div style={{ display: "flex", justifyContent: "center", gap: "52px", marginBottom: "36px" }}>
            {[
              { num: "15", sub: "Gold Medals" },
              { num: "2×", sub: "European Champion" },
              { num: "3×", sub: "Chef of the Year" },
              { num: "28", sub: "Competitions" },
            ].map((s) => (
              <div key={s.sub} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: serif, fontSize: "26px", color: GOLD, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase", color: FAINT, marginTop: "5px" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={separator} />

          {/* Origins */}
          <div style={{ marginBottom: "4px" }}>
            <p style={label}>Origins</p>
            <h2 style={h2Style}>
              Born north of the <span style={{ fontStyle: "italic" }}>Arctic Circle</span>
            </h2>
            <p style={bodyText}>
              July 21, 1989. Bodø, Northern Norway. Son of a Norwegian fisherman-chef and a Filipino mother — two culinary traditions woven into his DNA from the very beginning.
            </p>
            <p style={bodyText}>
              At age eleven, he washed his first dishes at Turisthytta. By twelve, he was running the dessert station. The kitchen chose him before he chose it.
            </p>
            <p style={{ ...bodyText, marginBottom: 0 }}>
              Norwegian langoustine with Asian technique. Arctic ingredients with tropical instinct. Precision with soul. East meets West — on every plate.
            </p>
          </div>

          <div style={separator} />

          {/* Philosophy */}
          <div>
            <p style={label}>Philosophy</p>
            <h2 style={h2Style}>
              The devil in the <span style={{ fontStyle: "italic" }}>details</span>
            </h2>
            <div style={{ display: "flex", gap: "32px" }}>
              {[
                { t: "Precision", d: "Every element placed with purpose. Every flavor balanced with intention. Adding caviar doesn't make you a good chef — understanding your ingredient and executing perfectly does." },
                { t: "East Meets West", d: "Two cultures, one kitchen. Filipino warmth and Norwegian precision on every plate. Arctic seaweed with tropical instinct. A dialogue between worlds." },
                { t: "Flavor is Everything", d: "Less is more. Respect the essence of the product. Local ingredients from the fjords and Arctic waters, prepared with care that honors the land." },
              ].map((p) => (
                <div key={p.t} style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: serif, fontSize: "13px", color: GOLD, fontStyle: "italic", marginBottom: "6px" }}>{p.t}</h3>
                  <p style={{ fontSize: "9.5px", lineHeight: 1.75, color: `${TEXT}77` }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={pageFooter} />
        </div>

        {/* ════════════════════════════════════════════
            PAGE 2 — Career · Merit List
            ════════════════════════════════════════════ */}
        <div ref={page2Ref} style={pageStyle}>
          {/* Career */}
          <p style={label}>Career</p>
          <h2 style={h2Style}>
            The <span style={{ fontStyle: "italic" }}>Path</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "4px" }}>
            {[
              { role: "Apprentice → Sous Chef", place: "Under Bocuse d'Or champion Charles Tjessem" },
              { role: "Head Chef", place: "Spiseriet Konserthuset, Stavanger" },
              { role: "Head Chef", place: "Mondo Restaurant, Sandnes" },
              { role: "Culinary Director", place: "Thon Hotels" },
              { role: "Menu & Concept Development", place: "Restaurant ATTME, Bodø" },
              { role: "Founder & Owner", place: "Alter Ego, Sandnes — Opening 2027" },
            ].map((item, i) => (
              <p key={i} style={{ fontSize: "10.5px", color: `${TEXT}bb`, margin: 0 }}>
                <span style={{ color: GOLD }}>{item.role}</span>
                <span style={{ color: `${TEXT}33`, margin: "0 8px" }}>—</span>
                {item.place}
              </p>
            ))}
          </div>

          <div style={separator} />

          {/* Merit List */}
          <p style={label}>Merit List</p>
          <h2 style={h2Style}>
            The <span style={{ fontStyle: "italic" }}>Record</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "4.5px", marginBottom: "20px" }}>
            {ALL_MERITS.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontFamily: serif, fontSize: "12px", color: medalColor(item.medal), width: "34px", flexShrink: 0 }}>
                  {item.year}
                </span>
                <span style={{ fontSize: "7.5px", letterSpacing: "0.15em", textTransform: "uppercase", color: medalColor(item.medal), width: "50px", flexShrink: 0 }}>
                  {item.medal}
                </span>
                <span style={{ fontSize: "9.5px", color: `${TEXT}bb` }}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* Summary bar */}
          <div style={{ textAlign: "center", padding: "16px 0", borderTop: `1px solid ${GOLD}22`, borderBottom: `1px solid ${GOLD}22` }}>
            <p style={{ fontFamily: serif, fontSize: "18px", color: GOLD, letterSpacing: "0.04em", margin: 0 }}>
              28 competitions &nbsp;·&nbsp; 15 gold &nbsp;·&nbsp; 8 silver &nbsp;·&nbsp; 2 bronze
            </p>
          </div>

          <div style={pageFooter} />
        </div>

        {/* ════════════════════════════════════════════
            PAGE 3 — Quote · Alter Ego · Last Dance · Contact
            ════════════════════════════════════════════ */}
        <div ref={page3Ref} style={{ ...pageStyle, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Quote */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontFamily: serif, fontSize: "22px", fontWeight: 300, fontStyle: "italic", color: `${TEXT}cc`, lineHeight: 1.6, maxWidth: "540px", margin: "0 auto 20px" }}>
              &ldquo;My father inspired me to do great things. He taught me that life has no limitations except the ones you create for yourself.&rdquo;
            </p>
            <div style={{ width: "32px", height: "1px", background: `${GOLD}44`, margin: "0 auto 12px" }} />
            <p style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}66`, margin: 0 }}>
              Christian André Pettersen
            </p>
          </div>

          <div style={separator} />

          {/* Alter Ego */}
          <div style={{ marginBottom: "28px" }}>
            <p style={label}>Alter Ego</p>
            <h2 style={h2Style}>
              Alter <span style={{ fontStyle: "italic" }}>Ego</span>
            </h2>
            <p style={bodyText}>
              In competition, Christian becomes someone else entirely — focused, fearless, operating beyond normal limits. Alter Ego captures that transcendent state.
            </p>
            <p style={{ ...bodyText, marginBottom: 0 }}>
              His next chapter. A brand new restaurant opening in Sandnes after Lyon 2027 — the culmination of twenty years at the absolute pinnacle of competitive cooking.
            </p>
          </div>

          <div style={separator} />

          {/* The Last Dance */}
          <div style={{ marginBottom: "28px" }}>
            <p style={label}>The Last Dance</p>
            <h2 style={h2Style}>
              &ldquo;This is my <span style={{ fontStyle: "italic" }}>last dance.</span>&rdquo;
            </h2>
            <p style={bodyText}>
              He said it in 2021. The feelings were mixed. One hopes for gold. Then in 2025 he came back — won Årets Kokk for the third time.
            </p>
            <p style={{ ...bodyText, marginBottom: 0 }}>
              Lyon 2027. January 24–25. His third and final Bocuse d&apos;Or world final. After twenty years and a promise to his late father — this is where the story reaches its climax.
            </p>
          </div>

          <div style={separator} />

          {/* Contact */}
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <p style={label}>Contact</p>
            <p style={{ fontFamily: serif, fontSize: "22px", fontWeight: 300, marginBottom: "18px" }}>
              Christian André <span style={{ fontStyle: "italic" }}>Pettersen</span>
            </p>
            <p style={{ fontSize: "13px", color: GOLD, marginBottom: "6px" }}>CAP@alterego.no</p>
            <p style={{ fontSize: "11px", color: `${TEXT}66`, marginBottom: "4px" }}>+47 478 65 351</p>
            <p style={{ fontSize: "11px", color: FAINT, marginBottom: "0" }}>@capnorway</p>
          </div>

          {/* Footer */}
          <div style={{ position: "absolute", bottom: PAD_BOT, left: PAD_X, right: PAD_X, textAlign: "center" }}>
            <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, marginBottom: "14px" }} />
            <p style={{ fontSize: "7px", letterSpacing: "0.45em", textTransform: "uppercase", color: `${GOLD}44`, margin: 0 }}>
              Alter Ego · Sandnes &nbsp;&nbsp;·&nbsp;&nbsp; Winners never quit
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
