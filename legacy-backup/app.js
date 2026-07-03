const { useEffect, useRef, useState } = React;

const logoSrc = './logo.png';

// Enhanced animation utility for scroll reveal
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return { ref, isVisible };
};

// Individual products for category grid
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
    image: './Sweatpants.jpg',
  },
  {
    name: 'Tailored Dress Pants',
    category: 'Dress Pants',
    image: './Dress Pants.jpg',
  },
  {
    name: 'Traditional Kurta',
    category: 'Kurta',
    image: './kurta.jpg',
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
    image: './Pant & Shirt Combination.jpg',
  },
  {
    title: 'T-Shirt & Jeans with Jacket',
    tag: 'Best Seller',
    image: './T-Shirt, Jeans with Jacket.jpg',
  },
  {
    title: 'Kurta pajama',
    tag: 'Premium',
    image: './Kurta pajama.jpg',
  },
];

const whyUs = [
  { icon: 'fa-diamond', title: 'Premium Quality', text: 'Curated fabrics and precise cuts.' },
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

// Ripple Button Component
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

// Enhanced Navbar Component
const Navbar = ({ theme, onToggleTheme, searchQuery, setSearchQuery, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setOpen(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand" onClick={handleNavClick}>
          <img className="brand-logo" src={logoSrc} alt="The Vibe Vault logo" loading="lazy" />
          <div className="brand-mark">VV</div>
          <div className="brand-text">
            <div>THE VIBE</div>
            <div>VAULT</div>
          </div>
        </a>

        <div className={`nav-links ${open ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button type="button" onClick={onSearch} aria-label="Search">
            <i className="fa-solid fa-search" />
          </button>
        </div>

        <div className="nav-actions">
          <button
            className={`theme-toggle-btn ${theme}`}
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <div className="toggle-circle">
              <i className={`fa-solid fa-${theme === 'light' ? 'moon' : 'sun'}`} />
            </div>
          </button>
          <a
            className="icon-btn insta-btn"
            href="https://www.instagram.com/_the_vibe_vault01?igsh=dzd3YXhiMnR3NmJy"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" />
          </a>

          <button
            className={`hamburger ${open ? 'active' : ''}`}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu-overlay" onClick={() => setOpen(false)} />
      )}
    </nav>
  );
};

// Enhanced Hero Component
const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <header id="home" className={`hero ${isVisible ? 'hero-visible' : ''}`} ref={ref} onMouseMove={handleMouseMove}>
      <div className="hero-blur hero-blur-1" />
      <div className="hero-blur hero-blur-2" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <i className="fa-solid fa-sparkles" />
            Where fashion meets energy
          </div>
          <h1 className="hero-title">
            THE <span className="accent-gradient">VIBE</span> VAULT
          </h1>
          <p className="hero-tagline">
            Premium men's fits curated in Indore. Bold streetwear, tailored layers, and everyday essentials built to keep your vibe high.
          </p>
          <div className="cta-row">
            <RippleButton className="btn-primary" as="a" href="#categories">
              <i className="fa-solid fa-arrow-right-long" />
              Explore Collections
            </RippleButton>
            <RippleButton className="btn-outline" as="a" href="#featured">
              <i className="fa-solid fa-star" />
              Best Sellers
            </RippleButton>
          </div>
        </div>

        <div className="hero-card" style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${-mousePos.x * 5}deg)`,
          transition: 'transform 0.1s ease-out',
        }}>
          <img className="hero-logo" src={logoSrc} alt="The Vibe Vault logo" loading="lazy" />
          <div className="logo-mark">
            <div className="hoodie-icon">VV</div>
            <span>THE VIBE VAULT</span>
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

// Product Card Component with Enhanced Animations
const CategoryCard = ({ name, category, image }) => {
  const { ref, isVisible } = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`card ${isVisible ? 'card-visible' : ''}`}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-image-wrapper">
        <img src={image} alt={name} loading="lazy" />
        <div className="card-overlay" />
      </div>
      <div className="card-body">
        <div className="card-title">{name}</div>
        <div className="chip">
          <i className="fa-solid fa-shirt" />
          {category}
        </div>
        <button className="view-btn">
          <span>View More</span>
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

// Categories Section
const Categories = ({ searchQuery }) => {
  const { ref, isVisible } = useScrollReveal();
  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : products;

  return (
    <section id="categories" className={`section-categories ${isVisible ? 'section-visible' : ''}`} ref={ref}>
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
        {filteredProducts.length === 0 ? (
          <p className="section-sub no-results">No products found for &ldquo;{searchQuery}&rdquo;</p>
        ) : (
          <div className="grid">
            {filteredProducts.map((p) => (
              <CategoryCard key={p.name} {...p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Featured Carousel
const Featured = () => {
  const { ref, isVisible } = useScrollReveal();
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % featured.length;
      setCurrentIndex(index);
      const cardWidth = el.firstChild?.offsetWidth || 0;
      el.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="featured" className={`section-featured ${isVisible ? 'section-visible' : ''}`} ref={ref}>
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
            {featured.map((item, idx) => (
              <div className={`carousel-card ${idx === currentIndex ? 'active' : ''}`} key={item.title}>
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


// Why Choose Us Section
const WhyChoose = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={`section-features ${isVisible ? 'section-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">Why The Vibe Vault</div>
            <h2 className="section-title">Dress with energy</h2>
          </div>
        </div>
        <div className="features">
          {whyUs.map((item, idx) => (
            <div className={`feature feature-${idx}`} key={item.title}>
              <div className="feature-icon">
                <i className={`fa-solid ${item.icon}`} />
              </div>
              <strong>{item.title}</strong>
              <p className="section-sub">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className={`section-about ${isVisible ? 'section-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">About Us</div>
            <h2 className="section-title">Fashion meets energy</h2>
          </div>
        </div>
        <div className="about">
          <p>
            The Vibe Vault is Indore's premium destination for men's fashion. We blend street-ready silhouettes with elevated tailoring so you can carry energy from day to night. Every drop is curated to keep your look sharp, confident, and authentically you.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className={`section-contact ${isVisible ? 'section-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="pill">Contact</div>
            <h2 className="section-title">Let's connect</h2>
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
              <i className="fa-brands fa-instagram" />
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

// Footer Component
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

// Main App Component
const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('vv-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = () => {
    const categories = document.getElementById('categories');
    if (categories) {
      categories.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <Hero />
      <Categories searchQuery={searchQuery} />
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
