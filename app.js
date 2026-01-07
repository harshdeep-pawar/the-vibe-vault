const { useEffect, useRef, useState } = React;

// local logo file path (place provided logo as logo.png in project root)
const logoSrc = './logo.png';

// individual products for category grid
const products = [
  {
    name: 'Classic Street T‑Shirt',
    category: 'T-Shirts',
    image:
      'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Weekend Polo Fit',
    category: 'Polo Shirts',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sharp Dress Shirt',
    category: 'Dress Shirts',
    image: './Dress Shirts.webp',
  },
  {
    name: 'Cozy Street Sweatshirt',
    category: 'Sweatshirts',
    image: './Sweatshirts.webp',
  },
  {
    name: 'Layered Knit Sweater',
    category: 'Sweaters',
    image: './Sweaters.jpg',
  },
  {
    name: 'Essential Street Hoodie',
    category: 'Hoodies',
    image: './Hoodies.jpg',
  },
  // Bottoms
  {
    name: 'Everyday Slim Jeans',
    category: 'Jeans',
    image: './jeans.jpg',
  },
  {
    name: 'Utility Cargo Pants',
    category: 'Cargo Pants',
    image: './cargo pants.webp',
  },
  {
    name: 'Clean Sweatpants',
    category: 'Sweatpants',
    image:
      './Sweatpants.jpg',
  },
  {
    name: 'Tailored Dress Pants',
    category: 'Dress Pants',
    image: './Dress Pants.jpg',
  },
  {
    name: 'Traditional Kurta',
    category: 'Kurta',
    image:
      './kurta.jpg',
  },
  {
    name: 'Luxury winter jackets',
    category: 'Jackets',
    image: './Jackets.jpg',
  },
  {
    name: 'Professional Blazers',
    category: 'Blazers',
    image: './blazers.jpg',
  },
];

const featured = [
  {
    title: 'Pant & Shirt Combination',
    tag: 'Trending',
    image:
      './Pant & Shirt Combination.jpg',
  },
  {
    title: 'T-Shirt & Jeans with Jacket',
    tag: 'Best Seller',
    image:
      './T-Shirt, Jeans with Jacket.jpg',
  },
  {
    title: 'Kurta pajama',
    tag: 'Premium',
    image:
      './Kurta pajama.jpg',
  },
];

const whyUs = [
  { icon: 'fa-star', title: 'Premium Quality', text: 'Curated fabrics and precise cuts.' },
  { icon: 'fa-bolt', title: 'Trendy Styles', text: 'Energy-packed street and classic fits.' },
  { icon: 'fa-tags', title: 'Affordable Prices', text: 'Luxury vibe without the markup.' },
  { icon: 'fa-location-dot', title: 'Local Trusted Store', text: 'Indore-based, easy to reach.' },
];

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#categories', label: 'Categories' },
  { href: '#featured', label: 'Collections' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const useInView = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const RippleButton = ({ children, className = '', as = 'button', href, ...rest }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => setRipples((prev) => prev.slice(1)), 500);
    if (rest.onClick) rest.onClick(e);
  };

  const Component = as === 'a' ? 'a' : 'button';

  return (
    <Component className={`${className} btn`} onClick={handleClick} href={href} {...rest}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ width: ripple.size, height: ripple.size, top: ripple.y, left: ripple.x }}
        />
      ))}
    </Component>
  );
};

const Navbar = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <img className="brand-logo" src={logoSrc} alt="The Vibe Vault logo" loading="lazy" />
          <div className="brand-mark">VV</div>
          <div>
            <div>THE VIBE</div>
            <div>VAULT</div>
          </div>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-btn theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle light / dark mode"
            title="Toggle light / dark mode"
          >
            <i className={theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'} />
          </button>
          <a
  className="icon-btn"
  href="https://www.instagram.com/_the_vibe_vault01?igsh=dzd3YXhiMnR3NmJy"
  target="_blank"
  rel="noreferrer"
>
  <img
    src="./instagram.png"
    alt="Instagram"
    className="btn-img"
  />
</a>

          <div className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className={`container mobile-menu ${open ? 'show' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          className="icon-instagram"
          href="https://www.instagram.com/_the_vibe_vault01?igsh=dzd3YXhiMnR3NmJy"
          target="_blank"
          rel="noreferrer"
          aria-label="Store Instagram"
          title="Store Instagram"
        >
          <i className="fa-brands fa-instagram" />
          Instagram
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const ref = useInView();
  return (
    <header id="home" className="hero fade-up" ref={ref}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Where fashion meets energy</div>
          <h1 className="hero-title">
            THE <span>VIBE VAULT</span>
          </h1>
          <p className="hero-tagline">
            Premium men’s fits curated in Indore. Bold streetwear, tailored layers, and everyday essentials built to keep your vibe high.
          </p>
          <div className="cta-row">
            <RippleButton className="btn-primary" as="a" href="#categories">
            Explore Collections
            </RippleButton>
            <RippleButton className="btn-outline" as="a" href="#featured">
              Best Sellers
            </RippleButton>
          </div>
        </div>

        <div className="hero-card">
          <img className="hero-logo" src={logoSrc} alt="The Vibe Vault logo" loading="lazy" />
          <div className="logo-mark">
            <div className="hoodie-icon">VV
              <i className="fa-solid fa-shirt" />
            </div>
            THE VIBE VAULT
          </div>
          <div className="hero-socials">
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>New Drop</h3>
              <p>Street + Tailored layers</p>
            </div>
            <div className="stat">
              <h3>Indore</h3>
              <p>Station Road, Rau</p>
            </div>
            <div className="stat">
              <h3>DM</h3>
              <p>Instagram orders</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const CategoryCard = ({ name, category, image }) => {
  const ref = useInView();
  return (
    <div className="card fade-up" ref={ref}>
      <img src={image} alt={name} loading="lazy" />
      <div className="card-body">
        <div className="card-title">{name}</div>
        <div className="chip">
          <i className="fa-solid fa-shirt" />
          {category}
        </div>
        <button className="view-btn">View More</button>
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <section id="categories">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">Categories</div>
            <h2 className="section-title">Built for every vibe</h2>
            <p className="section-sub">Street staples, refined classics, layered essentials.</p>
          </div>
          <RippleButton className="btn-outline" as="a" href="#contact">
            Visit Store
          </RippleButton>
        </div>
        <div className="grid">
           {products.map((p) => (
             <CategoryCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Featured = () => {
  const ref = useInView();
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % featured.length;
      const cardWidth = el.firstChild?.offsetWidth || 0;
      el.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="featured" className="fade-up" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">Featured</div>
            <h2 className="section-title">Curated collections</h2>
            <p className="section-sub">Trending picks and best sellers from The Vibe Vault.</p>
          </div>
        </div>
        <div className="carousel">
          <div className="carousel-track" ref={trackRef}>
            {featured.map((item) => (
              <div className="carousel-card" key={item.title}>
                <span className="badge">{item.tag}</span>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="carousel-info">
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChoose = () => {
  const ref = useInView();
  return (
    <section className="fade-up" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">Why The Vibe Vault</div>
            <h2 className="section-title">Dress with energy</h2>
          </div>
        </div>
        <div className="features">
          {whyUs.map((item) => (
            <div className="feature" key={item.title}>
              <i className={`fa-solid ${item.icon}`} />
              <strong>{item.title}</strong>
              <p className="section-sub">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useInView();
  return (
    <section id="about" className="fade-up" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">About Us</div>
            <h2 className="section-title">Fashion meets energy</h2>
          </div>
        </div>
        <div className="about">
          <p>
            The Vibe Vault is Indore’s premium destination for men’s fashion. We blend street-ready silhouettes with elevated tailoring so you can carry energy from day to night. Every drop is curated to keep your look sharp, confident, and authentically you.
          </p>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const ref = useInView();
  return (
    <section id="contact" className="fade-up" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">Contact</div>
            <h2 className="section-title">Let’s connect</h2>
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Visit Us</h3>
            <p>Infront of Paliwal Clinic, Station Road, Rau, Indore</p>
            <p>
              Call/WhatsApp: <a href="tel:9691676366">9691676366</a>
            </p>
            <RippleButton
              className="btn-outline"
              as="a"
              href="https://www.instagram.com/_the_vibe_vault01?igsh=dzd3YXhiMnR3NmJy"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </RippleButton>
          </div>
          <div className="map">
            <iframe
              title="The Vibe Vault Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.423704329823!2d75.813!3d22.626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963033ee6afa807%3A0x4da2f805dcc31d22!2sRau%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v0000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer>
    <div className="container footer-grid footer-dev-only">
      <div className="credits">
        Built by{' '}
        <a
          href="https://www.linkedin.com/in/harshdeep-pawar-harshdeep16"
          target="_blank"
          rel="noreferrer"
        >
          Harshdeep Pawar
        </a>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('vv-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light');
    window.localStorage.setItem('vv-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleLink = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const id = e.target.getAttribute('href').substring(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleLink);
    return () => document.removeEventListener('click', handleLink);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="page">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Categories />
      <Featured />
      <WhyChoose />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

