import { useEffect, useRef, useState, type ReactNode } from "react";
import logoImg from "@/assets/Logo.webp";
import buildingImg from "@/assets/building.webp";
import syamalaImg from "@/assets/Syamala_Devi.webp";
import anushaImg from "@/assets/anusha.webp";
import rahulImg from "@/assets/rahul.webp";
import baby1 from "@/assets/newborn.webp";
import baby2 from "@/assets/nurse.webp";
import entranceImg from "@/assets/hosp_entrance.webp";
import lapImg from "@/assets/laparoscopic.webp";

const doctors = [
  {
    name: "Dr. N. Syamala Devi",
    role: "Senior Gynaecologist",
    exp: "35 years experience",
    img: syamalaImg,
    w: 520, h: 694,
  },
  {
    name: "Dr. M. Anusha",
    role: "Obstetrician and Gynecologist · Laparoscopic Surgeon · Fertility Specialist · Cosmetic Gynecologist",
    exp: "13 years experience",
    creds: "M.B.B.S., M.S. (OBG)",
    reg: "Reg. No. 75768",
    img: anushaImg,
    w: 520, h: 591,
  },
  {
    name: "Dr. Ch. Sunil Rahul",
    role: "Paediatrician & Neonatologist",
    exp: "13 years experience",
    creds: "M.B.B.S., D.N.B. (PAED), Fellowship in Neonatology",
    reg: "Reg. No. 71965",
    img: rahulImg,
    w: 520, h: 520,
  },
];

const services = [
  { t: "Obstetrics & Gynaecology", d: "Antenatal care, safe deliveries, and complete women's health under continuous expert supervision." },
  { t: "Laparoscopic Surgery", d: "Minimally invasive surgical procedures with faster recovery and minimal scarring." },
  { t: "Fertility Care", d: "Personalised evaluation and treatment plans for couples seeking to start a family." },
  { t: "Neonatology", d: "Dedicated newborn care led by a fellowship-trained neonatologist for healthy beginnings." },
  { t: "Paediatrics", d: "Vaccinations, growth monitoring and acute paediatric care from infancy through childhood." },
  { t: "24×7 In-Patient Care", d: "Clean, hygienic rooms with attentive nursing and round-the-clock medical support." },
  { t: "Cosmetic Gynecology", d: "Advanced cosmetic gynecology procedures focused on comfort, confidence and women's intimate wellness, performed with discretion and care." },
];

const hours = [
  ["Monday", "9 AM – 9 PM"],
  ["Tuesday", "9 AM – 9 PM"],
  ["Wednesday", "9 AM – 9 PM"],
  ["Thursday", "9 AM – 9 PM"],
  ["Friday", "9 AM – 9 PM"],
  ["Saturday", "9 AM – 9 PM"],
  ["Sunday", "Closed"],
];

const reviews = [
  {
    quote:
      "We had a very good experience at Syamala Hospital. Special thanks to Dr. Syamala Devi, Dr. M. Anusha and Dr. Ch. Sunil Rahul for their excellent care and support.",
    name: "Lasya Poola",
  },
  {
    quote:
      "Recently, my wife underwent surgery with Dr. Anusha. She is friendly and supportive. Hospitality was excellent, rooms were clean and hygienic. Truly satisfied with the treatment and service.",
    name: "Harish Kumar",
  },
  {
    quote:
      "Thank you Dr. Syamala, Dr. Anusha and Dr. Sunil Rahul for making our delivery safe and smooth. Their dedication and expertise gave us comfort and confidence.",
    name: "Kamakshi Thalluri",
  },
  {
    quote:
      "Fantastic experience. Dr. Anusha and Dr. Syamala provided incredibly high quality of care. The facility was clean, quiet and relaxing.",
    name: "Krishnareddy K.",
  },
  {
    quote:
      "Exceptional care, a welcoming atmosphere and efficient service. Thank you Anusha madam, Syamala madam and staff.",
    name: "Ravi",
  },
  {
    quote:
      "Clean rooms, healthy environment, and attentive staff during my pregnancy checkups and delivery. A wonderful experience at Syamala Hospital.",
    name: "Priyanka Thalluru",
  },
];

function Reveal({ children, delay = 0, className = "", fade = false }: { children: ReactNode; delay?: number; className?: string; fade?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={visible
        ? { animation: `${fade ? "reveal-fade" : "reveal-up"} 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }
        : { opacity: 0 }}
    >
      {children}
    </div>
  );
}

const stats: { target: number; decimals?: number; suffix: string; label: string }[] = [
  { target: 35, suffix: "+", label: "Years of care" },
  { target: 3, suffix: "", label: "Specialist doctors" },
  { target: 10000, suffix: "+", label: "Safe deliveries" },
  { target: 4.9, decimals: 1, suffix: "★", label: "Patient rating" },
];

function StatsBar({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map(s => parseFloat((s.target * ease).toFixed(s.decimals ?? 0))));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 pb-12">
      <div className="glass grid grid-cols-2 rounded-2xl md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="px-6 py-8 not-first:border-l not-first:border-white/40">
            <p className="font-serif text-3xl">
              {s.target === 10000
                ? `${(counts[i] as number) >= 10000 ? "10,000" : Math.round(counts[i] as number).toLocaleString()}${s.suffix}`
                : `${counts[i]}${s.suffix}`}
            </p>
            <p className="mt-1 text-xs tracking-wider uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1000);
    const t2 = setTimeout(onDone, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={phase === "exit" ? { animation: "intro-overlay-out 0.7s ease forwards" } : undefined}
    >
      <div
        className="flex flex-col items-center gap-6"
        style={phase === "exit"
          ? { animation: "intro-shrink 0.7s cubic-bezier(0.4,0,0.2,1) forwards" }
          : undefined}
      >
        <img
          src={logoImg}
          alt=""
          width={400}
          height={589}
          className="h-48 w-48 object-contain"
          style={{ animation: "intro-logo 1s ease forwards" }}
        />
        <div className="flex flex-col items-center leading-none" style={{ animation: "intro-left 1s ease forwards" }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1B3460', fontSize: '2.8rem', fontWeight: 600, letterSpacing: '0.14em', fontVariant: 'small-caps', lineHeight: 1 }}>Syamala</span>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1B3460', fontSize: '1.6rem', fontWeight: 500, letterSpacing: '0.24em', fontVariant: 'small-caps', lineHeight: 1.4 }}>Hospital</span>
          <div style={{ borderTop: '1px solid #1B3460', marginTop: '5px', paddingTop: '5px', width: '100%', textAlign: 'center' }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1B3460', fontSize: '0.65rem', letterSpacing: '0.1em' }}>Compassion + Care - Excellence</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [introDone, setIntroDown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!introDone && <IntroOverlay onDone={() => setIntroDown(true)} />}

      {/* NAV */}
      <header className={`nav-glass sticky top-0 z-30 transition-[background,border-color,box-shadow,padding] duration-500 ${scrolled ? "scrolled py-2.5" : "py-3 sm:py-4"}`}>
        <div className="relative mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Syamala Hospital logo"
                width={400}
                height={589}
                className="shrink-0 object-contain"
                style={{
                  height: scrolled ? '2.4rem' : '5.2rem',
                  width: 'auto',
                  transition: 'height 0.4s ease',
                }}
              />
              <div className="flex flex-col items-start leading-none">
                <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1B3460', fontSize: scrolled ? '1.3rem' : '2.6rem', fontWeight: 600, letterSpacing: '0.14em', fontVariant: 'small-caps', lineHeight: 1, transition: 'font-size 0.4s ease' }}>Syamala</span>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1B3460', fontSize: scrolled ? '0.8rem' : '1.55rem', fontWeight: 500, letterSpacing: '0.24em', fontVariant: 'small-caps', lineHeight: 1.4, transition: 'font-size 0.4s ease' }}>Hospital</span>
                <div style={{ borderTop: '1px solid #1B3460', marginTop: '4px', paddingTop: '4px', width: '100%', maxHeight: scrolled ? '0' : '2rem', opacity: scrolled ? 0 : 1, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#1B3460', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Compassion + Care - Excellence</span>
                </div>
              </div>
            </div>
          </a>

          <div className="flex items-center justify-end gap-4 lg:gap-8 md:col-start-3 md:row-start-1">
            <nav className="hidden shrink-0 gap-4 text-sm text-muted-foreground md:flex lg:gap-6 xl:gap-8">
              <a href="#about" className="hover:text-foreground">About</a>
              <a href="#doctors" className="hover:text-foreground">Doctors</a>
              <a href="#services" className="hover:text-foreground">Services</a>
              <a href="#reviews" className="hover:text-foreground">Reviews</a>
              <a href="#visit" className="hover:text-foreground">Visit</a>
            </nav>
            <a
              href="tel:+919676198158"
              className="shrink-0 inline-flex min-h-[48px] items-center rounded-full border border-border bg-card px-4 py-2 text-xs tracking-wider uppercase text-foreground shadow-sm transition hover:bg-secondary sm:px-5"
            >
              Call Clinic
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="top" className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-20 pb-24 md:grid-cols-12 md:pt-28 md:pb-32">
            <Reveal className="md:col-span-7 flex flex-col justify-center">
              <p className="eyebrow text-2xl tracking-tight">Est. Nellore · Andhra Pradesh</p>
              <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Compassionate care
                <br />
                for <em className="not-italic text-primary">mothers</em> &amp; newborns.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground italic">
                Every mother who walks through our doors carries a story.
                A story of hope, of worry, of love that already runs deep.
                We have had the privilege of being part of thousands of those stories,
                offering expert gynaecological, surgical, fertility, and neonatal care
                with the kind of warmth you would expect from someone who genuinely cares.
                Because here, that is exactly who we are.
                All of it, under one roof that feels a little like home.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="tel:+919676198158"
                  className="glass-rose inline-flex min-h-[48px] items-center gap-3 rounded-full px-6 py-3 text-sm tracking-wider uppercase text-foreground transition hover:scale-[1.02]"
                >
                  Book an Appointment
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#doctors"
                  className="inline-flex min-h-[48px] items-center py-3 text-sm tracking-wider uppercase text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
                >
                  Meet the doctors
                </a>
              </div>
            </Reveal>

            <div className="relative md:col-span-5">
              <Reveal fade delay={200}>
                <div className="glass aspect-[4/5] w-full overflow-hidden rounded-3xl p-2">
                  <img
                    src={buildingImg}
                    alt="Syamala Hospital building, Nellore"
                    width={800}
                    height={850}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </Reveal>
              <div className="flex gap-3 mt-4 md:contents">
                <div className="glass-strong flex-1 md:flex-none md:absolute md:-bottom-6 md:-left-6 rounded-2xl p-4 md:p-5">
                  <p className="eyebrow">Today</p>
                  <p className="mt-2 font-serif text-xl md:text-2xl">9 AM – 9 PM</p>
                  <p className="text-xs text-muted-foreground">Open · Walk-ins welcome</p>
                </div>
                <div className="glass-strong flex-1 md:flex-none md:absolute md:-top-4 md:-right-4 rounded-2xl p-4 text-center md:p-4">
                  <p className="text-sm font-medium leading-snug text-foreground">Your Well-being is Our Priority</p>
                  <span className="mt-1 inline-block text-lg text-primary" aria-hidden="true">♥</span>
                </div>
              </div>
            </div>
          </div>

          <StatsBar ready={introDone} />
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow text-2xl tracking-tight">About the hospital</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
                A quiet practice built on trust, expertise and patience.
              </h2>
            </Reveal>
            <Reveal className="space-y-6 text-muted-foreground md:col-span-7 md:pt-3" delay={150}>
              <p className="leading-relaxed">
                For decades, families across Nellore have turned to Syamala
                Hospital for moments that matter most — from antenatal care and
                safe delivery, through the first fragile days of a newborn's life.
              </p>
              <p className="leading-relaxed">
                Led by three specialists across gynaecology, laparoscopic surgery
                and neonatology, the hospital combines clinical excellence with a
                calm, personal approach. Clean rooms, attentive nursing and
                honest communication remain the foundation of every visit.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <img
                  src={entranceImg}
                  alt="Hospital entrance"
                  width={600}
                  height={419}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                />
                <img
                  src={lapImg}
                  alt="Laparoscopic surgery in progress"
                  width={600}
                  height={579}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* DOCTORS */}
        <section id="doctors" className="relative">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Reveal className="flex items-end justify-between">
              <div>
                <p className="eyebrow text-2xl tracking-tight">Our specialists</p>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl">Three doctors. One family.</h2>
              </div>
            </Reveal>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {doctors.map((d, i) => (
                <Reveal key={d.name} delay={i * 120}>
                  <article className="glass group rounded-3xl p-5 transition hover:-translate-y-1">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
                      <img
                        src={d.img}
                        alt={d.name}
                        width={d.w}
                        height={d.h}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl">{d.name}</h3>
                    <p className="mt-1 text-sm text-primary">{d.role}</p>
                    {d.exp && (
                      <p className="mt-2 text-xs tracking-wider uppercase text-muted-foreground/80">{d.exp}</p>
                    )}
                    {d.creds && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.creds}</p>
                    )}
                    {d.reg && (
                      <p className="mt-1 text-xs tracking-wider uppercase text-muted-foreground/70">{d.reg}</p>
                    )}
                    <a
                      href={`mailto:shyamalahospital35@gmail.com?subject=Query%20regarding%20${encodeURIComponent(d.name)}`}
                      className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary/10 px-4 py-3 text-xs tracking-wider uppercase text-primary transition hover:bg-primary/20"
                    >
                      Send Query
                      <span aria-hidden="true">→</span>
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow text-2xl tracking-tight">Services</p>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl">Care across every stage.</h2>
              <p className="mt-6 text-muted-foreground">
                From pre-conception to paediatric follow-up, our team supports
                you with continuity, clarity and quiet expertise.
              </p>
            </Reveal>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((s, i) => {
                  const pastelClasses = [
                    "glass-rose",
                    "glass-lavender",
                    "glass-teal",
                    "glass-peach",
                    "glass-mint",
                    "glass-cream",
                    "glass-blush",
                  ];
                  return (
                    <Reveal key={s.t} delay={i * 80}>
                      <div className={`${pastelClasses[i % pastelClasses.length]} rounded-2xl p-7 transition hover:brightness-105`}>
                        <p className="font-serif text-xl">{s.t}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="relative">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-2xl tracking-tight">In their own words</p>
                <h2 className="mt-6 font-serif text-4xl md:text-5xl">
                  Families who trusted us with theirs.
                </h2>
              </div>
              <a
                href="https://www.google.com/search?q=Syamala+Hospital+Nellore+reviews"
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-3 rounded-full px-5 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <span className="font-serif text-2xl text-foreground">4.9</span>
                <span>★★★★★ · verified Google reviews ↗</span>
              </a>
            </Reveal>
            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.name} delay={i * 80}>
                  <figure className="glass rounded-2xl p-7">
                    <blockquote className="font-serif text-lg leading-relaxed text-foreground/85">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 text-xs tracking-wider uppercase text-muted-foreground">
                      — {r.name}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12 flex justify-center">
              <a
                href="https://www.google.com/search?q=Syamala+Hospital+Nellore+reviews"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary/10 px-8 py-3 text-sm tracking-wider uppercase text-primary transition hover:bg-primary/20"
              >
                ★ Write a Review on Google
              </a>
            </Reveal>
          </div>
        </section>

        {/* GALLERY / MOMENTS */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Reveal><p className="eyebrow text-2xl tracking-tight">Moments from the hospital</p></Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal delay={0}>
              <img
                src={baby1}
                alt="A family with their newborn"
                width={600}
                height={676}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
              />
            </Reveal>
            <Reveal delay={150}>
              <img
                src={baby2}
                alt="Nurse with a newborn"
                width={600}
                height={643}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl md:translate-y-12"
              />
            </Reveal>
            <Reveal delay={300}>
              <img
                src={lapImg}
                alt="Operating theatre"
                width={600}
                height={579}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
              />
            </Reveal>
          </div>
        </section>

        {/* VISIT / CONTACT */}
        <section id="visit" className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:py-32">
            <Reveal className="md:col-span-5">
              <p className="eyebrow text-2xl tracking-tight">Visit us</p>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl">Plan your visit.</h2>

              <div className="mt-10 space-y-8 text-sm">
                <div>
                  <p className="eyebrow !text-muted-foreground">Address</p>
                  <p className="mt-3 font-serif text-lg leading-snug">
                    Syamalamma Veedi, 3/452, Stonehousepet Rd,
                    <br />
                    Lakshmipuram, Nellore,
                    <br />
                    Andhra Pradesh 524002, India
                  </p>
                </div>
                <div>
                  <p className="eyebrow !text-muted-foreground">Phone</p>
                  <a href="tel:+919676198158" className="mt-3 block font-serif text-2xl transition hover:opacity-70">
                    +91 96761 98158
                  </a>
                </div>
                <div>
                  <p className="eyebrow !text-muted-foreground">Email</p>
                  <a href="mailto:shyamalahospital35@gmail.com" className="mt-3 block font-serif text-xl transition hover:opacity-70 break-all">
                    shyamalahospital35@gmail.com
                  </a>
                </div>
                <div>
                  <p className="eyebrow !text-muted-foreground">Hours</p>
                  <dl className="mt-3 divide-y divide-border border-y border-border">
                    {hours.map(([day, time]) => (
                      <div key={day} className="flex justify-between py-2.5 text-sm">
                        <dt className="text-muted-foreground">{day}</dt>
                        <dd className={time === "Closed" ? "text-destructive" : "text-foreground"}>{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Syamala+Hospital+Stonehousepet+Nellore"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-rose inline-flex min-h-[48px] items-center gap-3 rounded-full px-6 py-3 text-xs tracking-wider uppercase text-foreground transition hover:scale-[1.02]"
                  >
                    Get Directions <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="https://www.google.com/search?q=Syamala+Hospital+Nellore+reviews"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-xs tracking-wider uppercase text-primary transition hover:bg-primary/20"
                  >
                    ★ Review on Google
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-7" delay={200}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Syamala+Hospital+Stonehousepet+Nellore"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Syamala Hospital location in Google Maps"
                className="glass group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl p-2 md:aspect-auto md:h-full"
              >
                <iframe
                  title="Syamala Hospital location"
                  src="https://www.google.com/maps?q=Syamala+Hospital+Stonehousepet+Nellore&output=embed"
                  className="pointer-events-none h-full min-h-[500px] w-full rounded-2xl"
                  loading="lazy"
                />
                <span className="glass-strong absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-wider uppercase text-foreground transition group-hover:scale-[1.02]">
                  Open in Maps <span aria-hidden="true">↗</span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <div className="glass-teal rounded-3xl px-8 py-12 text-center md:px-16 md:py-16">
              <p className="font-serif text-3xl leading-snug md:text-4xl">Take the first step today.</p>
              <p className="mt-3 font-serif text-xl text-primary md:text-2xl">We are here for you.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+919676198158"
                  className="glass inline-flex min-h-[48px] items-center gap-3 rounded-full px-6 py-3 text-sm tracking-wider uppercase text-foreground transition hover:scale-[1.02]"
                >
                  Book an Appointment
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="mailto:shyamalahospital35@gmail.com"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary/10 px-5 py-3 text-xs tracking-wider uppercase text-primary transition hover:bg-primary/20"
                >
                  Email Us
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-8 border-t border-white/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10 text-xs tracking-wider uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} Syamala Hospital · Nellore</p>
          <a
            href="https://www.google.com/search?q=Syamala+Hospital+Nellore+reviews"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            ★ Review us on Google
          </a>
          <p>Care that begins with listening.</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
