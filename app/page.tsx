"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("backyard");

  const headerRef = useRef<HTMLElement>(null);
  const toTopRef = useRef<HTMLButtonElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const floatCtaRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const tabs = [
    { id: "backyard", label: "Backyard Transformations" },
    { id: "turf", label: "Artificial Turf" },
    { id: "pavers", label: "Pavers" },
    { id: "living", label: "Outdoor Living" },
    { id: "commercial", label: "Commercial Projects" },
    { id: "design", label: "Landscape Design" },
  ];

  const galleries: Record<string, { after: string; before: string; altAfter: string; altBefore: string }> = {
    backyard: {
      after: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
      before: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
      altAfter: "After: backyard transformed into a modern outdoor living space",
      altBefore: "Before: outdated backyard in need of landscaping",
    },
    turf: {
      after: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80",
      before: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80",
      altAfter: "After: lush artificial turf lawn installation",
      altBefore: "Before: worn lawn before turf replacement",
    },
    pavers: {
      after: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1600&q=80",
      before: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1600&q=80",
      altAfter: "After: modern paver patio and outdoor entertaining area",
      altBefore: "Before: plain concrete area before paver patio installation",
    },
    living: {
      after: "https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=1600&q=80",
      before: "https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=1600&q=80",
      altAfter: "After: luxury outdoor living space with elegant lighting",
      altBefore: "Before: dark unused outdoor space before lighting and design",
    },
    commercial: {
      after: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
      before: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
      altAfter: "After: professionally landscaped commercial property",
      altBefore: "Before: commercial grounds before landscaping",
    },
    design: {
      after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      altAfter: "After: custom landscape design with curated planting and hardscape",
      altBefore: "Before: property before custom landscape design",
    },
  };

  // --- Scroll effects ---
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (headerRef.current) headerRef.current.classList.toggle("scrolled", y > 24);
      if (toTopRef.current) toTopRef.current.classList.toggle("show", y > 600);
      if (floatCtaRef.current) floatCtaRef.current.style.display = y > 600 ? "block" : "none";
      if (scrollProgressRef.current) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? (y / docH) * 100 : 0;
        scrollProgressRef.current.style.width = pct + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Hero video ---
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = heroVideoRef.current;
    if (video && !reduceMotion) {
      const onCanPlay = () => video.classList.add("playing");
      const onError = () => video.remove();
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.addEventListener("error", onError, { once: true });
      const id = setTimeout(() => {
        video.preload = "auto";
        video.load();
      }, 400);
      return () => {
        clearTimeout(id);
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("error", onError);
      };
    } else if (video) {
      video.remove();
    }
  }, []);

  // --- Reveal on scroll ---
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
  }, []);

  // --- Animated counters ---
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counters = document.querySelectorAll<HTMLElement>(".counter");
    if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
      const counterIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const target = parseInt(el.getAttribute("data-target") || "0", 10);
            const duration = 1800;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = String(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            counterIO.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => counterIO.observe(c));
      return () => counterIO.disconnect();
    } else {
      counters.forEach((c) => {
        c.textContent = c.getAttribute("data-target");
      });
    }
  }, []);

  // --- Scroll to top ---
  const scrollToTop = useCallback(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  // --- Before/After slider ---
  const initSlider = useCallback((stage: HTMLElement) => {
    const beforeWrap = stage.querySelector<HTMLElement>(".ba-before-wrap");
    const handle = stage.querySelector<HTMLElement>(".ba-handle");
    if (!beforeWrap || !handle) return;
    let pos = 50;

    const setPos = (p: number) => {
      pos = Math.max(0, Math.min(100, p));
      beforeWrap.style.width = pos + "%";
      handle.style.left = pos + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(pos)));
    };

    const posFromEvent = (e: PointerEvent | React.PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      return (x / rect.width) * 100;
    };

    let dragging = false;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      setPos(posFromEvent(e));
      e.preventDefault();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      setPos(posFromEvent(e));
    };
    const onUp = () => {
      dragging = false;
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    const onKeyDown = (e: KeyboardEvent) => {
      let step = 0;
      if (e.key === "Home") step = -100;
      else if (e.key === "End") step = 100;
      else if (e.key === "ArrowLeft") step = -5;
      else if (e.key === "ArrowRight") step = 5;
      if (step !== 0) {
        e.preventDefault();
        setPos(pos + step);
      }
    };
    handle.addEventListener("keydown", onKeyDown);
    setPos(50);
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".ba-stage").forEach(initSlider);
  }, [initSlider]);

  // --- FAQ ---
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqAnswerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    faqAnswerRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.maxHeight = openFaq === i ? ref.scrollHeight + "px" : "";
      }
    });
  }, [openFaq]);

  // --- Form ---
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadZoneRef = useRef<HTMLDivElement>(null);

  const updateFormProgress = useCallback(() => {
    const dots = document.querySelectorAll("#formProgress .step-dot");
    let filled = 0;
    if (formData.name.trim().length >= 2) filled++;
    if (/^[+()\-.\s\d]{7,}$/.test(formData.phone.trim())) filled++;
    if (formData.service !== "") filled++;
    dots.forEach((dot, i) => {
      dot.classList.remove("active", "done");
      if (i < filled) dot.classList.add("done");
      else if (i === filled) dot.classList.add("active");
    });
  }, [formData.name, formData.phone, formData.service]);

  useEffect(() => {
    updateFormProgress();
  }, [formData, updateFormProgress]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameOk = formData.name.trim().length >= 2;
    const phoneOk = /^[+()\-.\s\d]{7,}$/.test(formData.phone.trim());
    const emailOk = formData.email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const serviceOk = formData.service !== "";

    setFormErrors({
      name: !nameOk,
      phone: !phoneOk,
      email: !emailOk,
      service: !serviceOk,
    });

    if (!nameOk || !phoneOk || !emailOk || !serviceOk) return;
    setFormSubmitted(true);
  };

  const handleFileDrop = useCallback((files: FileList | null) => {
    if (!files) return;
    const shown: string[] = [];
    for (let i = 0; i < files.length && shown.length < 4; i++) {
      const f = files[i];
      if (!f.type.startsWith("image/")) continue;
      shown.push(URL.createObjectURL(f));
    }
    if (shown.length) setUploadPreviews((prev) => [...prev, ...shown]);
  }, []);

  // --- Upload drag handlers ---
  const [dragOver, setDragOver] = useState(false);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileDrop(e.target.files);
  };

  // --- Button ripple ---
  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // --- Close menu on Escape ---
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const faqData = [
    { q: "Do you offer free estimates?", a: "Yes, we provide free consultations to understand your project and recommend the best solution." },
    { q: "What landscaping services do you provide?", a: "We offer complete landscaping services including maintenance, design, turf installation, irrigation, patios, lighting, and more." },
    { q: "Do you work with commercial properties?", a: "Yes, we provide landscaping solutions for both residential and commercial clients." },
    { q: "How quickly can my project start?", a: "Project timelines depend on size and scope. Contact us for availability." },
  ];

  const services = [
    { title: "Lawn Maintenance", desc: "Keep your property looking clean, healthy, and professionally maintained year-round.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22c4.4 0 8-3.6 8-8 0-5-4-9-8-12-4 3-8 7-8 12 0 4.4 3.6 8 8 8Z"/><path d="m6 12 3 3 3-7 3 5 3-2"/></svg> },
    { title: "Landscape Design", desc: "Custom outdoor designs created to improve beauty, functionality, and property value.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18.7 8.5 21 11v3h-4v4h-4v3H7V5h14v5"/><path d="M7 14h4v3H7z"/><path d="M11 9h4v4h-4z"/></svg> },
    { title: "Artificial Turf", desc: "Beautiful, low-maintenance lawns designed to save water and stay green.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 15c3-6 6-9 9-9s6 3 9 9"/><path d="M3 19c3-5 6-8 9-8s6 3 9 8"/><path d="M3 11c2-3 4-4 5-4"/></svg> },
    { title: "Sod Installation", desc: "Fresh, professionally installed lawns that instantly transform your property.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 16h4v6H2z"/><path d="M10 9h4v13h-4z"/><path d="M18 5h4v17h-4z"/><path d="M3 16 12 2l9 14"/></svg> },
    { title: "Irrigation & Sprinkler Repair", desc: "Efficient watering systems that keep your landscape healthy.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-2.5-5.5S13.5 5 13 3c-2 3-8 8.5-8 12a7 7 0 0 0 7 7Z"/><path d="M2 22h20"/><path d="M8 15c2-1 4-1 5 1"/></svg> },
    { title: "Pavers & Patios", desc: "Create stunning outdoor spaces perfect for entertaining and relaxing.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 21 4-8 4 3 4-6 3 4 3-3v10H3Z"/><path d="M3 21h18"/><path d="M13 9h4"/><path d="M15 7v4"/></svg> },
    { title: "Retaining Walls", desc: "Functional and beautiful solutions designed for durability.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/></svg> },
    { title: "Outdoor Lighting", desc: "Enhance your property with elegant lighting that creates the perfect atmosphere.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg> },
    { title: "Tree Services", desc: "Professional trimming, removal, and landscape improvement.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22V9"/><path d="M12 22c0-4-3-7-7-8 1-5 4-9 7-11 3 2 6 6 7 11-4 1-7 4-7 8Z"/><path d="M12 22v0"/></svg> },
  ];

  const whyCards = [
    { title: "Free Estimates", desc: "Get a clear understanding of your project with a no-obligation consultation.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg> },
    { title: "Quality Craftsmanship", desc: "We focus on details that create beautiful results built to last.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3c3 2 6 2 9 2v7c0 4-3.5 7-9 9-5.5-2-9-5-9-9V5c3 0 6 0 9-2Z"/><path d="m9 12 2 2 4-4"/></svg> },
    { title: "Complete Outdoor Solutions", desc: "One trusted team for maintenance, design, installation, and improvements.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/></svg> },
    { title: "Residential & Commercial", desc: "Solutions designed for homes, businesses, and property managers.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21V8l9-5 9 5v13"/><path d="M3 21h18"/><path d="M9 21v-8h6v8"/></svg> },
  ];

  const steps = [
    { num: 1, title: "Schedule Your Free Estimate", desc: "Tell us about your outdoor project and your goals." },
    { num: 2, title: "Property Consultation", desc: "We evaluate your space and discuss the best solutions." },
    { num: 3, title: "Custom Plan & Quote", desc: "Receive a clear plan designed around your needs." },
    { num: 4, title: "Professional Installation", desc: "Our team brings your vision to life." },
    { num: 5, title: "Enjoy Your New Outdoor Space", desc: "Relax and enjoy a landscape built to last." },
  ];

  const testimonials = [
    {
      quote: "Sunset Landscape Co. completely transformed our backyard. The team was professional, reliable, and the final result exceeded our expectations.",
      name: "Jennifer M.",
      meta: "Homeowner \u00B7 Los Angeles County",
      initials: "JM",
    },
    {
      quote: "Great communication, amazing attention to detail, and beautiful craftsmanship.",
      name: "Mark T.",
      meta: "Property Manager \u00B7 Orange County",
      initials: "MT",
    },
  ];

  const areas = [
    {
      title: "Los Angeles County",
      county: "LA COUNTY",
      items: [
        "Los Angeles & surrounding cities",
        "Pasadena \u00B7 Glendale \u00B7 Burbank",
        "San Gabriel Valley",
        "South Bay & Santa Clarita",
      ],
    },
    {
      title: "Orange County",
      county: "ORANGE COUNTY",
      items: [
        "Irvine \u00B7 Newport Beach",
        "Anaheim \u00B7 Huntington Beach",
        "Fullerton \u00B7 Costa Mesa",
        "Mission Viejo & Laguna",
      ],
    },
    {
      title: "Inland Empire",
      county: "RIVERSIDE & SAN BERNARDINO",
      items: [
        "Riverside \u00B7 Corona",
        "Ontario \u00B7 Rancho Cucamonga",
        "Redlands \u00B7 Temecula",
        "Victorville & surrounding areas",
      ],
    },
  ];

  return (
    <>
      <div className="scroll-progress" ref={scrollProgressRef} />
      <a className="skip-link" href="#main">Skip to main content</a>

      {/* Header */}
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Sunset Landscape Co. home">
            <svg className="brand-mark" width="42" height="42" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect width="64" height="64" rx="14" fill="#245036"/>
              <circle cx="32" cy="29" r="13" stroke="#A67C52" strokeWidth="3.5"/>
              <path d="M32 16v-6M14 29h-6M50 29h-6M20.5 17.5l-4-4M43.5 17.5l4-4" stroke="#A67C52" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M32 34c-3.5 0-6.5-2-8.5-5.5 3 0 5.5-1 7.5-3.5 2 2.5 4.5 3.5 7.5 3.5C36.5 32 33.5 34 32 34Z" fill="#6DBE8F"/>
            </svg>
            <span className="brand-name">Sunset Landscape<em>Co.</em><span className="brand-sub">Southern California</span></span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#why-us">Why Us</a>
            <a href="#gallery">Gallery</a>
            <a href="#process">Process</a>
            <a href="#areas">Service Areas</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-cta">
            <a className="header-phone" href="tel:+16265550134">
              <PhoneIcon />
              (626) 555-0134
            </a>
            <a href="#quote" className="btn btn--gold btn--sm">Get Free Estimate</a>
            <button className="nav-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Mobile">
        <button className="m-close" onClick={closeMenu} aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <a className="m-link" href="#services" onClick={closeMenu}><span>Services</span></a>
        <a className="m-link" href="#why-us" onClick={closeMenu}><span>Why Us</span></a>
        <a className="m-link" href="#gallery" onClick={closeMenu}><span>Gallery</span></a>
        <a className="m-link" href="#process" onClick={closeMenu}><span>Process</span></a>
        <a className="m-link" href="#areas" onClick={closeMenu}><span>Service Areas</span></a>
        <a className="m-link" href="#faq" onClick={closeMenu}><span>FAQ</span></a>
        <div className="m-cta">
          <a href="#quote" className="btn btn--gold" onClick={closeMenu}>Get Your Free Estimate</a>
          <a href="tel:+16265550134" className="btn btn--outline">
            <PhoneIcon />
            Call (626) 555-0134
          </a>
        </div>
      </nav>

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top">
          <div className="hero-bg" role="img" aria-label="Cinematic aerial view of a luxury Southern California backyard with turf, stone pavers, outdoor lighting and a patio at golden hour" />
          <video className="hero-video" ref={heroVideoRef} autoPlay muted loop playsInline preload="none" poster="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920&q=80" aria-hidden="true">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-inner">
              <span className="hero-tag"><span className="dot" /> Serving Southern California</span>
              <h1>Beautiful Landscapes.<br /><span className="serif-accent">Built to Last.</span></h1>
              <p className="hero-sub">Transforming Southern California properties with expert landscaping, design, and outdoor solutions.</p>
              <div className="hero-actions">
                <a href="#quote" className="btn btn--gold">
                  Get Your Free Estimate
                  <ArrowIcon />
                </a>
                <a href="tel:+16265550134" className="btn btn--outline">
                  <PhoneIcon />
                  Call Now
                </a>
              </div>
              <ul className="trust-row">
                <li className="trust-item"><CheckIcon /> Free Estimates</li>
                <li className="trust-item"><CheckIcon /> Residential &amp; Commercial</li>
                <li className="trust-item"><CheckIcon /> Serving Southern California</li>
                <li className="trust-item"><CheckIcon /> Quality Craftsmanship</li>
              </ul>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true"><span className="line" /><span>Scroll</span></div>
        </section>

        {/* Stats Bar */}
        <section className="stats-bar" aria-label="Company statistics">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-num"><span className="counter" data-target="500">0</span><span className="plus">+</span></div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><span className="counter" data-target="15">0</span><span className="plus">+</span></div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><span className="counter" data-target="187">0</span><span className="plus">+</span></div>
                <div className="stat-label">5-Star Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-num"><span className="counter" data-target="98">0</span><span className="plus">%</span></div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="trust-badges" aria-label="Trust and certifications">
          <div className="container">
            <div className="badges-row">
              <div className="badge-item">
                <div className="badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></div>
                Licensed &amp; Insured
              </div>
              <div className="badge-item">
                <div className="badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg></div>
                Satisfaction Guaranteed
              </div>
              <div className="badge-item">
                <div className="badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                Same-Day Response
              </div>
              <div className="badge-item">
                <div className="badge-icon"><CheckIcon /></div>
                Free Estimates
              </div>
              <div className="badge-item">
                <div className="badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2 3.7 7v10L12 22l8.3-5V7L12 2z"/></svg></div>
                Eco-Friendly Options
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section section--white">
          <div className="container intro-grid">
            <div className="intro-copy reveal">
              <span className="eyebrow">The Sunset Difference</span>
              <h2>Creating Outdoor Spaces That Make <span className="serif-accent">Every Property Stand Out</span></h2>
              <p>At Sunset Landscape Co., we transform ordinary outdoor areas into beautiful, functional spaces designed around your lifestyle.</p>
              <p>From landscape design and lawn maintenance to complete outdoor renovations, our team delivers reliable service, quality craftsmanship, and results built to last.</p>
              <a href="#services" className="btn btn--dark">
                Explore Our Services
                <ArrowIcon />
              </a>
            </div>
            <div className="intro-media reveal d2">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" alt="Completed luxury landscape project on a Southern California residential property" width={600} height={750} loading="lazy" decoding="async" />
              <div className="intro-badge">
                <span className="num">4.9<span style={{ fontSize: 20, color: "#A67C52" }}>&#9733;</span></span>
                <span className="lbl">Rated by local<br />homeowners &amp; businesses</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section section--sand" id="services">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow eyebrow--center">What We Do</span>
              <h2>Complete <span className="serif-accent">Landscaping Solutions</span></h2>
              <p>From routine maintenance to full outdoor transformations, we bring your vision to life.</p>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <article key={s.title} className={`service-card reveal${i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""}`}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
            <div className="section-foot reveal">
              <a href="#quote" className="btn btn--dark">View All Services &amp; Get Your Quote <ArrowIcon /></a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section section--dark" id="why-us">
          <div className="container">
            <div className="section-head section-head--dark reveal">
              <span className="eyebrow eyebrow--center eyebrow--light">Why Choose Us</span>
              <h2>Why Southern California Chooses <span className="serif-accent serif-accent--gold">Sunset Landscape Co.</span></h2>
            </div>
            <div className="why-grid">
              {whyCards.map((w, i) => (
                <article key={w.title} className={`why-card reveal${i > 0 ? ` d${i}` : ""}`}>
                  <div className="why-icon">{w.icon}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </article>
              ))}
            </div>
            <div className="section-foot reveal">
              <a href="#quote" className="btn btn--gold">Request Your Free Estimate <ArrowIcon /></a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section section--white" id="gallery">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow eyebrow--center">Transformations</span>
              <h2>See The <span className="serif-accent">Transformation</span></h2>
              <p>Every project starts with a vision. Explore how we transform outdoor spaces into beautiful environments our clients love.</p>
              <p style={{ fontSize: 14, color: "#9a8f77", marginTop: 10 }}>Drag the slider to reveal the transformation.</p>
            </div>
            <div className="gallery-tabs reveal" role="tablist" aria-label="Transformation categories">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`g-tab${activeTab === t.id ? " active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {tabs.map((t) => {
              const g = galleries[t.id];
              return (
                <div key={t.id} className={`ba${activeTab === t.id ? " active" : ""}`} data-cat={t.id} role="tabpanel">
                  <div className="ba-stage" data-ba>
                    <img className="ba-after" src={g.after} alt={g.altAfter} width={1600} height={900} loading="lazy" decoding="async" />
                    <div className="ba-before-wrap">
                      <img className="ba-before" src={g.before} alt={g.altBefore} width={1600} height={900} loading="lazy" decoding="async" />
                    </div>
                    <div className="ba-label before">Before</div>
                    <div className="ba-label after">After</div>
                    <div className="ba-handle" role="slider" aria-label="Before and after comparison slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50} tabIndex={0}>
                      <div className="ba-grip">
                        <svg className="l" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6 3 12l6 6"/><path d="M21 12H3"/></svg>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6 6 6-6 6"/><path d="M3 12h18"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="section section--sand" id="process">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow eyebrow--center">How It Works</span>
              <h2>Our Simple <span className="serif-accent">Process</span></h2>
            </div>
            <div className="process-grid">
              {steps.map((s, i) => (
                <article key={s.num} className={`step reveal${i > 0 ? ` d${i}` : ""}`}>
                  <div className="step-num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section section--white" id="reviews">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow eyebrow--center">Testimonials</span>
              <h2>What Our <span className="serif-accent">Customers Say</span></h2>
            </div>
            <div className="testi-grid">
              {testimonials.map((t, i) => (
                <article key={t.name} className={`testi-card reveal${i === 1 ? " d1" : ""}`}>
                  <span className="quote-mark" aria-hidden="true">&rdquo;</span>
                  <div className="stars" aria-label="Rated 5 out of 5 stars">
                    {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                  </div>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="testi-author">
                    <div className="testi-avatar">{t.initials}</div>
                    <div>
                      <div className="name">{t.name}</div>
                      <div className="meta">{t.meta}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="google-strip reveal">
              <span className="g-logo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1-.9 2.6-2.6 3.7l-.1.1 3.8 3 .1.1c2.4-2.3 3.8-5.6 3.8-8.8z"/><path fill="#34A853" d="M12 24c3.3 0 6-1.1 8-3l-4-3.1c-1 .7-2.4 1.2-4 1.2-3 0-5.6-2-6.5-4.8l-.1.1-4 3.1-.1.1C3.8 20.7 7.6 24 12 24z"/><path fill="#FBBC05" d="M5.5 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3l-.1-.1-4-3.1-.1-.1C.4 7.9 0 9.9 0 12s.4 4.1 1.3 5.6l4-3.3z"/><path fill="#EA4335" d="M12 4.9c2.2 0 3.6 1 4.4 1.8l3.2-3.1C18 1.2 15.3 0 12 0 7.6 0 3.8 3.3 1.3 6.4l4.1 3.3C6.4 6.9 9 4.9 12 4.9z"/></svg>
                Google Reviews
              </span>
              <span className="g-stars" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
              </span>
              <span className="g-text"><strong>4.9 / 5</strong> from 187+ verified reviews</span>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section section--sand" id="areas">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow eyebrow--center">Coverage</span>
              <h2>Proudly Serving <span className="serif-accent">Southern California</span></h2>
              <p>Sunset Landscape Co. provides professional landscaping services throughout Los Angeles County, Orange County, and the Inland Empire.</p>
            </div>
            <div className="areas-grid">
              {areas.map((a, i) => (
                <article key={a.title} className={`area-card reveal${i > 0 ? ` d${i}` : ""}`}>
                  <div className="pin"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                  <h3>{a.title}</h3>
                  <p className="county">{a.county}</p>
                  <ul>
                    {a.items.map((item) => (
                      <li key={item}><CheckIcon /> {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="section-foot reveal">
              <a href="#quote" className="btn btn--dark">Get Your Free Estimate Today <ArrowIcon /></a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section--white" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow eyebrow--center">FAQ</span>
              <h2>Frequently Asked <span className="serif-accent">Questions</span></h2>
            </div>
            <div className="faq-wrap">
              {faqData.map((f, i) => (
                <div key={i} className={`faq-item reveal${openFaq === i ? " open" : ""}`}>
                  <button
                    className="faq-q"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span>
                  </button>
                  <div className="faq-a" ref={(el) => { faqAnswerRefs.current[i] = el; }}>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA + Quote Form */}
        <section className="section section--white" id="quote">
          <div className="container">
            <div className="cta-wrap reveal">
              <div className="cta-grid">
                <div className="cta-copy">
                  <span className="urgency-badge"><span className="blink-dot" /> Limited availability &mdash; book your free estimate now</span>
                  <span className="eyebrow eyebrow--light">Get Started</span>
                  <h2>Ready To Transform Your <span className="serif-accent serif-accent--gold">Outdoor Space?</span></h2>
                  <p>Create a landscape you&rsquo;ll enjoy for years with Sunset Landscape Co.</p>
                  <ul className="cta-points">
                    <li><CheckIcon /> Free, no-obligation estimates</li>
                    <li><CheckIcon /> Fast response &mdash; usually within 24 hours</li>
                    <li><CheckIcon /> Residential &amp; commercial projects</li>
                  </ul>
                  <div className="cta-actions">
                    <a href="tel:+16265550134" className="btn btn--outline">
                      <PhoneIcon />
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="quote-form">
                  <h3>Request Your Free Estimate</h3>
                  <p className="form-sub">Tell us about your project &mdash; we&rsquo;ll get back to you within 24 hours.</p>

                  <div className="form-progress" id="formProgress">
                    <div className="step-dot active" />
                    <div className="step-dot" />
                    <div className="step-dot" />
                  </div>

                  {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit} noValidate>
                      <div className="form-row">
                        <div className={`field${formErrors.name ? " invalid" : ""}`}>
                          <label htmlFor="f-name">Full Name <span className="req">*</span></label>
                          <input type="text" id="f-name" name="name" autoComplete="name" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                          <p className="error-msg">Please enter your name.</p>
                        </div>
                        <div className={`field${formErrors.phone ? " invalid" : ""}`}>
                          <label htmlFor="f-phone">Phone <span className="req">*</span></label>
                          <input type="tel" id="f-phone" name="phone" autoComplete="tel" placeholder="(555) 555-5555" required value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                          <p className="error-msg">Please enter a valid phone number.</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className={`field${formErrors.email ? " invalid" : ""}`}>
                          <label htmlFor="f-email">Email</label>
                          <input type="email" id="f-email" name="email" autoComplete="email" placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                          <p className="error-msg">Please enter a valid email address.</p>
                        </div>
                        <div className={`field${formErrors.service ? " invalid" : ""}`}>
                          <label htmlFor="f-service">Service Needed <span className="req">*</span></label>
                          <select id="f-service" name="service" required value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}>
                            <option value="">Select a service&hellip;</option>
                            <option>Lawn Maintenance</option>
                            <option>Landscape Design</option>
                            <option>Artificial Turf</option>
                            <option>Sod Installation</option>
                            <option>Irrigation &amp; Sprinkler Repair</option>
                            <option>Pavers &amp; Patios</option>
                            <option>Retaining Walls</option>
                            <option>Outdoor Lighting</option>
                            <option>Tree Services</option>
                            <option>Other / Full Renovation</option>
                          </select>
                          <p className="error-msg">Please select a service.</p>
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="f-message">Tell Us About Your Project</label>
                        <textarea id="f-message" name="message" placeholder="Describe your property, goals, and any details we should know\u2026" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} />
                      </div>
                      <div className="field">
                        <label>Photo of Your Property (optional)</label>
                        <div
                          className={`upload-zone${dragOver ? " drag-over" : ""}`}
                          ref={uploadZoneRef}
                          onClick={handleUploadClick}
                          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileDrop(e.dataTransfer.files); }}
                        >
                          <input type="file" ref={fileInputRef} accept="image/*" multiple onChange={handleFileChange} style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} />
                          <div className="up-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg></div>
                          <p><strong>Click to upload</strong> or drag &amp; drop &mdash; JPG, PNG up to 10MB</p>
                        </div>
                        {uploadPreviews.length > 0 && (
                          <div className="upload-preview" style={{ display: "flex" }} aria-live="polite">
                            {uploadPreviews.map((src, i) => (
                              <img key={i} src={src} alt={`Uploaded photo preview ${i + 1}`} />
                            ))}
                          </div>
                        )}
                      </div>
                      <button type="submit" className="btn btn--gold" style={{ width: "100%" }} onClick={addRipple}>
                        Get Your Free Estimate
                        <ArrowIcon />
                      </button>
                      <p className="form-note">By submitting, you agree to be contacted about your estimate. We never share your information.</p>
                    </form>
                  ) : (
                    <div className="form-success" style={{ display: "block" }} role="status">
                      <div className="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></div>
                      <h4>Request Received!</h4>
                      <p>Thanks for reaching out. A member of our team will contact you within 24 hours to schedule your free estimate.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#top" className="brand" style={{ marginBottom: 18 }}>
                <svg width="42" height="42" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <rect width="64" height="64" rx="14" fill="#245036"/>
                  <circle cx="32" cy="29" r="13" stroke="#A67C52" strokeWidth="3.5"/>
                  <path d="M32 16v-6M14 29h-6M50 29h-6M20.5 17.5l-4-4M43.5 17.5l4-4" stroke="#A67C52" strokeWidth="3.5" strokeLinecap="round"/>
                  <path d="M32 34c-3.5 0-6.5-2-8.5-5.5 3 0 5.5-1 7.5-3.5 2 2.5 4.5 3.5 7.5 3.5C36.5 32 33.5 34 32 34Z" fill="#6DBE8F"/>
                </svg>
                <span className="brand-name">Sunset Landscape<em>Co.</em><span className="brand-sub">Southern California</span></span>
              </a>
              <p>Beautiful landscapes, built to last. Premium landscaping, design, and outdoor living solutions for homes and businesses across Southern California.</p>
              <div className="f-social">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V14h2.7v8h3.2z"/></svg></a>
                <a href="#" aria-label="Yelp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 3.7 7v10L12 22l8.3-5V7L12 2zm0 2.3 6.3 3.9v7.6L12 19.7 5.7 15.8V8.2L12 4.3z"/></svg></a>
              </div>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Lawn Maintenance</a></li>
                <li><a href="#services">Landscape Design</a></li>
                <li><a href="#services">Artificial Turf</a></li>
                <li><a href="#services">Pavers &amp; Patios</a></li>
                <li><a href="#services">Outdoor Lighting</a></li>
                <li><a href="#services">Irrigation &amp; Sprinklers</a></li>
              </ul>
            </div>
            <div>
              <h4>Service Areas</h4>
              <ul>
                <li><a href="#areas">Los Angeles County</a></li>
                <li><a href="#areas">Orange County</a></li>
                <li><a href="#areas">Inland Empire</a></li>
                <li><a href="#areas">Riverside County</a></li>
                <li><a href="#areas">San Bernardino County</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="f-contact">
                <li>
                  <PhoneIcon />
                  <a href="tel:+16265550134">(626) 555-0134</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 6-10 7L2 6"/></svg>
                  <a href="mailto:hello@sunsetlandscapeco.com">hello@sunsetlandscapeco.com</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  <span>Serving Los Angeles, Orange County &amp; the Inland Empire</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>Mon&ndash;Sat &middot; 7:00 AM &ndash; 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Sunset Landscape Co. All rights reserved.</p>
            <p><a href="#quote">Free Estimates</a> &middot; <a href="#faq">FAQ</a> &middot; <a href="#top">Back to top &uarr;</a></p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky call bar */}
      <div className="mobile-bar">
        <div className="mbar-inner">
          <a href="tel:+16265550134" className="btn call">
            <PhoneIcon />
            Call Now
          </a>
          <a href="#quote" className="btn btn--gold">Get Free Estimate</a>
        </div>
      </div>

      {/* Back to top */}
      <button className="to-top" ref={toTopRef} onClick={scrollToTop} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
      </button>

      {/* Floating CTA */}
      <div className="float-cta" ref={floatCtaRef}>
        <a href="#quote">
          <ArrowIcon />
          Get Free Estimate
          <span className="pulse-ring" />
        </a>
      </div>
    </>
  );
}
