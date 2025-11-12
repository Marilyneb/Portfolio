/* ---------- Hero Animations ---------- */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") return;
  
    // Initial hero fades
    gsap.from(".logo", { opacity: 0, y: 40, duration: 1.1, ease: "power2.out" });
    gsap.from(".tagline", { opacity: 0, y: 20, delay: 0.4, duration: 0.9, ease: "power2.out" });
    gsap.to(".cta-down", { opacity: 1, y: 0, delay: 0.8, duration: 1, ease: "power1.out" });
  
    // Scroll animations for elements
    const targets = document.querySelectorAll(".card, .about-container, .section-title");
    targets.forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" }
      });
    });
  
    // Parallax effect for hero background
    gsap.to(".hero-section", {
      backgroundPositionY: "40%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });
  
  /* ---------- Custom Cursor ---------- */
  (function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("div");
    c.id = "cursor";
    Object.assign(c.style, {
      position: "fixed",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: "rgba(0,255,255,.25)",
      boxShadow: "0 0 10px rgba(0,255,255,.25)",
      transform: "translate(-50%,-50%)",
      pointerEvents: "none",
      zIndex: "1000",
    });
    document.body.appendChild(c);
    window.addEventListener("mousemove", e => {
      c.style.left = e.clientX + "px";
      c.style.top = e.clientY + "px";
    }, { passive: true });
  })();
  
  /* ---------- Navbar Active Link ---------- */
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  }, { threshold: 0.5 });
  ["home", "projects", "sketches", "about"].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
  
  /* ---------- Scroll Progress Bar ---------- */
  const progress = document.getElementById("progress");
  function setProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, docHeight ? scrollTop / docHeight : 0)) * 100;
    progress.style.width = pct + "%";
  }
  window.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);
  setProgress();
  
  /* ---------- Scroll to Projects ---------- */
  document.querySelector(".cta-down").addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });
  
  /* ---------- Particle Shimmer ---------- */
  (function () {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();
  
    const COUNT = reduce ? 0 : 60;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.4 + 0.25
      });
    }
  
    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(0,255,255,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      requestAnimationFrame(tick);
    }
    tick();
  })();
  
  /* ---------- Filters ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#projects .card");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("is-active"); btn.setAttribute("aria-selected","true");
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.category.split(" ");
        const show = f === "all" || cats.includes(f);
        card.style.display = show ? "" : "none";
      });
    });
  });
  
  /* ---------- Modal Viewer (Projects & Sketches) ---------- */
  
  window.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    if (!modal) return;
  
    const stage = modal.querySelector("#modal-stage");
    const closeBtn = modal.querySelector(".modal-close");
    const prevBtn = modal.querySelector(".modal-prev");
    const nextBtn = modal.querySelector(".modal-next");
  
    // Wait for all media to load
    window.addEventListener("load", () => {
      const triggers = Array.from(document.querySelectorAll(".media-trigger"));
      let currentIndex = -1;
      let gallery = [];
  
      function buildGallery(fromEl) {
        const container = fromEl.closest(".portfolio-grid");
        if (!container) {
          console.warn("⚠️ Could not find portfolio-grid for:", fromEl);
          gallery = [];
          return;
        }
      
        // Build gallery fresh each time
        gallery = Array.from(container.querySelectorAll(".media-trigger"));
      }
      
    
      
      function renderModal(trigger) {
        stage.innerHTML = "";
        if (!trigger || !trigger.dataset) return;
      
        const type = trigger.dataset.type;
        const src = trigger.dataset.src;
        const poster = trigger.dataset.poster || "";
        const titleText = trigger.closest(".card")?.querySelector("h3, .card-title, .card-caption")?.textContent.trim() || "";
        const info = modalDescriptions[titleText];
      
        // Update title and description
        const modalTitle = document.getElementById("modal-title");
        const modalDesc = document.getElementById("modal-description");
        const modalLink = document.getElementById("modal-link");
      
        if (modalTitle && modalDesc) {
          modalTitle.textContent = titleText || "";
          modalDesc.textContent = info?.desc || "";
          if (info?.link) {
            modalLink.href = info.link;
            modalLink.style.display = "inline-block";
          } else {
            modalLink.style.display = "none";
          }
        }
      
        // Render media
        if (type === "image") {
          const img = document.createElement("img");
          img.src = src;
          img.alt = titleText || "Artwork";
          stage.appendChild(img);
        } else {
          const vid = document.createElement("video");
          vid.controls = true;
          vid.autoplay = true;
          if (poster) vid.poster = poster;
          const source = document.createElement("source");
          source.src = src;
          source.type = src.endsWith(".mov") ? "video/quicktime" : "video/mp4";
          vid.appendChild(source);
          stage.appendChild(vid);
        }
      }
      
      
      function openModal(index, fromEl) {
        if (!fromEl) return;
      
        // Always rebuild the gallery fresh from where the user clicked
        buildGallery(fromEl);
      
        // Ensure index is within range
        if (index < 0 || index >= gallery.length) index = 0;
      
        currentIndex = index;
        renderModal(gallery[currentIndex]);
      
        // Open modal
        modal.classList.add("is-open");
        modal.removeAttribute("aria-hidden"); // Accessibility-friendly
        document.body.style.overflow = "hidden";
      
        // Focus safely (after frame)
        requestAnimationFrame(() => closeBtn.focus());
      }
      
      function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        stage.innerHTML = "";
      
        // Remove focus to avoid aria-hidden warning
        if (document.activeElement === closeBtn) closeBtn.blur();
      }
      
      // Attach click listeners
      triggers.forEach((t, i) => {
        t.addEventListener("click", () => openModal(i, t));
        t.style.cursor = "pointer";
      });
  
      // Controls
      closeBtn.addEventListener("click", closeModal);
      modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  
      prevBtn.addEventListener("click", () => {
        if (!gallery.length) return;
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        renderModal(gallery[currentIndex]);
      });
  
      nextBtn.addEventListener("click", () => {
        if (!gallery.length) return;
        currentIndex = (currentIndex + 1) % gallery.length;
        renderModal(gallery[currentIndex]);
      });
  
      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("is-open")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
      });
    });
  });
  
  
  /* ---------- Card Accessibility ---------- */
  (function () {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.style.cursor = "pointer";
      card.addEventListener("click", e => {
        if (e.target.closest("button, a, video, img")) return;
        const trigger = card.querySelector(".media-trigger");
        if (trigger) trigger.click();
      });
      card.setAttribute("tabindex", "0");
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const trigger = card.querySelector(".media-trigger");
          if (trigger) trigger.click();
        }
      });
    });
  })();
  
  
  /* ---------- Resume Modal ---------- */
  /* ---------- View Resume Modal (final fixed version) ---------- */
  /* ---------- Resume Modal ---------- */
  const viewBtn = document.getElementById("viewResumeBtn");
  
  if (viewBtn) {
    // create modal container only once
    const resumeModal = document.createElement("div");
    resumeModal.id = "resumeModal";
    resumeModal.innerHTML = `
      <div class="resume-backdrop"></div>
      <div class="resume-box">
        <button class="close-resume" aria-label="Close Resume">×</button>
        <iframe src="" title="Resume" loading="lazy"></iframe>
      </div>
    `;
  
    document.body.appendChild(resumeModal);
  
    const closeBtn = resumeModal.querySelector(".close-resume");
    const backdrop = resumeModal.querySelector(".resume-backdrop");
  
    // Open modal
    viewBtn.addEventListener("click", () => {
      resumeModal.classList.add("is-open");
      const iframe = resumeModal.querySelector("iframe");
      iframe.src = "assets/Marilyne Bassoulou CV.pdf";
      document.body.style.overflow = "hidden";
    });
  
    // Close modal
    const closeResumeModal = () => {
      const iframe = resumeModal.querySelector("iframe");
      resumeModal.classList.remove("is-open");
      document.body.style.overflow = "";
      iframe.src = ""; // unload PDF
    };
  
    closeBtn.addEventListener("click", closeResumeModal);
    backdrop.addEventListener("click", closeResumeModal);
  
    // Close with ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && resumeModal.classList.contains("is-open")) {
        closeResumeModal();
      }
    });
  
    // Cleanup after transition
    const iframe = resumeModal.querySelector("iframe");
    resumeModal.addEventListener("transitionend", () => {
      if (!resumeModal.classList.contains("is-open")) {
        iframe.src = "";
        setTimeout(() => (iframe.src = "assets/Marilyne Bassoulou CV.pdf"), 1000);
      }
    });
  }
  /* ---------- Modal Descriptions ---------- */
  const modalDescriptions = {
    "The Elevator Pitch": {
      desc: "A collaborative short film project focused on delivering a powerful and concise narrative within a limited time frame. It explores storytelling, teamwork, and visual communication.",
      link: ""
    },
    "Interactive Shader Editor": {
      desc: "An interactive tool for designing and testing shaders in real-time, built to make complex shader concepts intuitive and accessible.",
      link: "https://github.com/Marilyneb/Shader-Editor-MSc-Project"
    },
    "Coffee Advertisement": {
      desc: "A cinematic coffee ad emphasizing motion design, texture, and visual storytelling.",
      link: ""
    },
    "Avocado RenderMan": {
      desc: "A RenderMan lighting and shading project featuring a photorealistic avocado, demonstrating OSL and RIB integration.",
      link: "https://github.com/Marilyneb/Renderman-Project"
    },
    "Bouncing Ball": {
      desc: "A physics-based animation inspired by M.C. Escher’s impossible staircase, blending realism with illusion.",
      link: ""
    },
    "The Inn at the Edge of the World": {
      desc: "A short film adaptation from a script, created in collaboration to explore mood, lighting, and character emotion.",
      link: ""
    },
    "Houdini Digital Asset (HDA)": {
      desc: "A procedural garden generator built as a Houdini Digital Asset, showcasing parametric design and asset reusability.",
      link: ""
    },
    "Asset Library": {
      desc: "A web-based 3D asset manager that allows users to upload, tag, and organize models in a central library.",
      link: "https://github.com/NCCA/msccavepipelineandtdproject24-Marilyneb/tree/main"
    },
    "Character Animation": {
      desc: "A fully rigged and animated character scene focusing on expressive motion and personality.",
      link: ""
    }
  };
  
  
  /* ---------- Contact Form Success Popup ---------- */
  /* ---------- Contact Form Handling ---------- */
  const contactForm = document.getElementById("contact-form");
  
  if (contactForm) {
    const successBox = document.createElement("div");
    successBox.id = "form-success";
    successBox.textContent = "✅ Message sent successfully!";
    contactForm.appendChild(successBox);
  
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
  
      try {
        const res = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { Accept: "application/json" },
        });
  
        if (res.ok) {
          successBox.textContent = "✅ Message sent successfully!";
          successBox.classList.add("show");
          contactForm.reset();
        } else {
          successBox.textContent = "⚠️ Oops! Something went wrong.";
          successBox.classList.add("show");
        }
      } catch (error) {
        successBox.textContent = "⚠️ Network error, please try again.";
        successBox.classList.add("show");
      }
  
      // Hide after 4 seconds
      setTimeout(() => {
        successBox.classList.remove("show");
      }, 4000);
    });
  }
  
  
  /* ---------- Favicon Animation ---------- */
  const favicon = document.querySelector("link[rel='icon']");
  if (favicon) {
    const original = favicon.href;
    const alt = "assets/favicon_alt.ico"; // optional alternate icon
    document.addEventListener("visibilitychange", () => {
      favicon.href = document.hidden ? alt : original;
    });
  }
  
  /* ---------- Load Fade-In ---------- */
  window.addEventListener("load", () => document.body.classList.add("loaded"));
  

/* ---------- Google Analytics Event Tracking ---------- */

// Resume Download
document.querySelectorAll('.resume-button').forEach(btn => {
    btn.addEventListener('click', () => {
      gtag('event', 'download_resume', {
        event_category: 'Engagement',
        event_label: 'Resume Download'
      });
    });
  });
  
  // Resume View
  document.querySelectorAll('.view-resume-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gtag('event', 'view_resume', {
        event_category: 'Engagement',
        event_label: 'Resume Modal Opened'
      });
    });
  });
  
  // GitHub Project Click
  document.addEventListener('click', e => {
    const link = e.target.closest('#modal-link');
    if (link && link.href.includes('github.com')) {
      gtag('event', 'project_github_click', {
        event_category: 'Projects',
        event_label: link.href
      });
    }
  });
  
  // Contact Form Submit (no redeclaration)
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      gtag('event', 'contact_form_submitted', {
        event_category: 'Contact',
        event_label: 'Form Submitted'
      });
    });
  }
  