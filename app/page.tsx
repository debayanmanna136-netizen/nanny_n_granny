"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";

const menuCategories = [
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: "🥪",
    items: [
      { name: "Veg Sandwich", price: 65, desc: "Classic fresh veggie sandwich with green chutney", tag: "veg" },
      { name: "Mayo Sandwich", price: 70, desc: "Creamy mayo with crunchy veggies & herbs", tag: "popular" },
      { name: "Cheese Sandwich", price: 80, desc: "Melted cheese goodness on toasted bread", tag: "popular" },
      { name: "Schezwan Sandwich", price: 75, desc: "Fiery Schezwan sauce with mixed vegetables", tag: "hot" },
      { name: "Paneer Sandwich", price: 85, desc: "Grilled paneer with onion & capsicum", tag: "veg" },
      { name: "Schezwan Cheese Sandwich", price: 85, desc: "Schezwan heat meets melted cheese", tag: "hot" },
      { name: "Cheese Corn Sandwich", price: 85, desc: "Sweet corn & melted cheese on toasted bread", tag: "popular" },
      { name: "Masala Sandwich", price: 85, desc: "Spiced masala filling with tangy chutney", tag: "veg" },
      { name: "Cheese Masala Sandwich", price: 99, desc: "Spiced masala filling with gooey cheese", tag: "hot" },
      { name: "Paneer Cheese Sandwich", price: 99, desc: "Double loaded with paneer & melted cheese", tag: "popular" },
      { name: "Maharaja Sandwich", price: 129, desc: "The ultimate loaded sandwich with all the fixings", tag: "popular" },
    ],
  },
  {
    id: "maggi",
    name: "Maggi",
    icon: "🍜",
    items: [
      { name: "Masala Maggi", price: 30, desc: "Classic masala Maggi — comfort in a bowl", tag: "veg" },
      { name: "Veg Maggi", price: 40, desc: "Loaded with fresh vegetables & spices", tag: "veg" },
      { name: "Cheese Maggi", price: 50, desc: "Creamy melted cheese over hot Maggi", tag: "popular" },
      { name: "Paneer Maggi", price: 55, desc: "Soft paneer cubes in spiced Maggi", tag: "popular" },
      { name: "Schezwan Peri Peri Maggi", price: 55, desc: "Fiery Schezwan with peri peri punch", tag: "hot" },
      { name: "Schezwan Cheese Maggi", price: 60, desc: "Schezwan spice meets gooey cheese", tag: "hot" },
      { name: "Special Cheese Maggi", price: 65, desc: "Extra cheese, extra special!", tag: "popular" },
    ],
  },
  {
    id: "vadapav",
    name: "Vada Pav",
    icon: "🫔",
    items: [
      { name: "Chutney Pav", price: 15, desc: "Soft pav with green chutney", tag: "veg" },
      { name: "Vada Pav", price: 30, desc: "Mumbai's iconic street food — spiced potato fritter in pav", tag: "popular" },
      { name: "Mayo Vada Pav", price: 35, desc: "Classic vada pav with creamy mayo twist", tag: "popular" },
      { name: "Schezwan Vada Pav", price: 40, desc: "Fiery Schezwan vada pav", tag: "hot" },
      { name: "Tandoori Vada Pav", price: 40, desc: "Smoky tandoori flavoured vada pav", tag: "hot" },
      { name: "Cheese Vada Pav", price: 45, desc: "Vada pav loaded with melted cheese", tag: "popular" },
    ],
  },
  {
    id: "pizzas",
    name: "Pizzas",
    icon: "🍕",
    items: [
      { name: "Onion Pizza (6\"/8\")", price: 99, desc: "Caramelized onions on signature sauce — 6\" ₹99 / 8\" ₹140", tag: "veg" },
      { name: "Tomato Pizza (6\"/8\")", price: 99, desc: "Fresh tomatoes with mozzarella & herbs — 6\" ₹99 / 8\" ₹140", tag: "veg" },
      { name: "Capsicum Pizza (6\"/8\")", price: 99, desc: "Bell peppers and cheese on hand-tossed crust — 6\" ₹99 / 8\" ₹140", tag: "veg" },
      { name: "Corn Pizza (6\"/8\")", price: 110, desc: "Sweet corn & cheese on our signature base — 6\" ₹110 / 8\" ₹150", tag: "veg" },
      { name: "Veg Pizza (6\"/8\")", price: 120, desc: "All fresh veggies, loaded cheese — 6\" ₹120 / 8\" ₹160", tag: "popular" },
      { name: "Paneer Pizza (6\"/8\")", price: 140, desc: "Soft paneer with veggies & cheese — 6\" ₹140 / 8\" ₹180", tag: "popular" },
      { name: "Tandoori Pizza (6\"/8\")", price: 150, desc: "Smoky tandoori flavour, oven baked — 6\" ₹150 / 8\" ₹180", tag: "hot" },
      { name: "Mexican Pizza (6\"/8\")", price: 150, desc: "Jalapeños, corn, olives & salsa base — 6\" ₹150 / 8\" ₹180", tag: "hot" },
      { name: "Double Cheese Pizza (6\"/8\")", price: 170, desc: "Extra cheese for the cheese lovers — 6\" ₹170 / 8\" ₹220", tag: "popular" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    icon: "🍔",
    items: [
      { name: "Aloo Tikki Burger", price: 79, desc: "Classic spiced potato tikki burger", tag: "veg" },
      { name: "Veg Burger", price: 89, desc: "Fresh veggie patty with crisp lettuce & sauces", tag: "veg" },
      { name: "Cheese Burger", price: 99, desc: "Crispy patty with melted cheese & fresh veggies", tag: "popular" },
      { name: "Paneer Burger", price: 99, desc: "Grilled paneer patty with smoky sauce", tag: "popular" },
      { name: "Jumbo Burger", price: 130, desc: "Extra-large burger loaded with all the fixings", tag: "popular" },
    ],
  },
  {
    id: "breadpizza",
    name: "Bread Pizza",
    icon: "🍞",
    items: [
      { name: "Veg Loaded Bread Pizza", price: 69, desc: "Loaded with fresh veggies & cheese on crispy bread", tag: "veg" },
      { name: "Cheese Burst Bread Pizza", price: 79, desc: "Oozing cheese on a perfectly toasted bread base", tag: "popular" },
    ],
  },
  {
    id: "momos",
    name: "Momos",
    icon: "🥟",
    items: [
      { name: "Steam Momo", price: 50, desc: "Soft steamed veg momos with red chutney", tag: "veg" },
      { name: "Fried Momo", price: 65, desc: "Crispy fried momos with tangy sauce", tag: "popular" },
      { name: "Pan Fried Momo", price: 80, desc: "Pan-tossed momos with spicy sauce", tag: "popular" },
      { name: "Tandoori Momo", price: 85, desc: "Smoky tandoori flavoured momos", tag: "hot" },
      { name: "Schezwan Pan Fried Momo", price: 85, desc: "Pan fried momos in fiery Schezwan sauce", tag: "hot" },
      { name: "Cheese Fried Momo", price: 99, desc: "Crispy fried momos smothered in cheese", tag: "popular" },
    ],
  },
  {
    id: "snacks",
    name: "Snacks & More",
    icon: "🍟",
    items: [
      { name: "French Fries (S/L)", price: 65, desc: "Crispy golden fries — Small ₹65 / Large ₹99", tag: "popular" },
      { name: "Peri Peri Fries (S/L)", price: 80, desc: "Fries with peri peri spice — Small ₹80 / Large ₹119", tag: "hot" },
      { name: "Cheesy Fries", price: 129, desc: "Golden fries drenched in cheese sauce", tag: "popular" },
      { name: "Chilli Sweet Corn", price: 49, desc: "Buttery sweet corn tossed with chilli", tag: "veg" },
      { name: "Masala Sweet Corn", price: 55, desc: "Street-style buttery spiced corn", tag: "veg" },
      { name: "Butter Masala Corn", price: 59, desc: "Rich buttery masala corn in a cup", tag: "popular" },
      { name: "Matka Pizza", price: 55, desc: "Unique pizza served in a matka", tag: "popular" },
      { name: "Cheese Nachos", price: 65, desc: "Crispy nachos smothered in nacho cheese", tag: "popular" },
      { name: "Garlic Bread", price: 65, desc: "Toasted garlic bread with herbs", tag: "veg" },
      { name: "Crunchy Rolls", price: 75, desc: "Crispy rolled snacks with dipping sauce", tag: "popular" },
      { name: "Cheese Garlic Bread", price: 95, desc: "Garlic bread loaded with melted cheese", tag: "popular" },
      { name: "Nuggets with Cheese", price: 75, desc: "Crispy nuggets with a cheesy dip", tag: "popular" },
    ],
  },
  {
    id: "mocktails",
    name: "Mocktails",
    icon: "🍹",
    items: [
      { name: "Blue Lagoon", price: 79, desc: "Refreshing blue curaçao with lemon & soda", tag: "popular" },
      { name: "Virgin Mojito", price: 79, desc: "Minty lime soda with crushed ice", tag: "popular" },
      { name: "Fresh Lime Soda", price: 69, desc: "Classic sweet or salted lime soda", tag: "veg" },
      { name: "Sunrise", price: 89, desc: "Tropical sunrise with a citrus punch", tag: "popular" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "☕",
    items: [
      { name: "Thumsup", price: 30, desc: "Classic Thumsup cola", tag: "veg" },
      { name: "Sprite", price: 30, desc: "Refreshing lemon-lime soda", tag: "veg" },
      { name: "Maaza", price: 30, desc: "Mango drink classic", tag: "veg" },
      { name: "Masala Thumsup", price: 50, desc: "Thumsup with a spicy masala twist", tag: "hot" },
      { name: "Nimbu Pani", price: 50, desc: "Fresh homemade lemonade", tag: "veg" },
      { name: "Lassi", price: 50, desc: "Traditional creamy yogurt drink", tag: "popular" },
      { name: "Flavoured Lassi", price: 70, desc: "Lassi with your choice of flavour", tag: "popular" },
    ],
  },
];

const stats = [
  { value: "200+", label: "Menu Items" },
  { value: "500+", label: "Happy Customers" },
  { value: "100%", label: "Vegetarian" },
  { value: "5★", label: "Reviews" },
  { value: "Fast", label: "Delivery" },
];

const tagConfig: Record<string, { label: string; cls: string }> = {
  veg: { label: "Veg", cls: "badge-veg" },
  hot: { label: "🌶 Spicy", cls: "badge-hot" },
  popular: { label: "★ Popular", cls: "badge-popular" },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("sandwiches");
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const activeItems = menuCategories.find((c) => c.id === activeCategory)?.items ?? [];

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className={`${styles.navbar} ${navScrolled ? styles.navbarScrolled : ""}`}>
        <div className="container">
          <div className={styles.navInner}>
            <a href="#hero" onClick={() => scrollTo("hero")} className={styles.logo}>
              <Image src="/logo.png" alt="Nani N Granny Logo" width={44} height={44} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              <span className={styles.logoNani}>NANI</span>
              <span className={styles.logoDivider}>N</span>
              <span className={styles.logoGranny}>GRANNY</span>
            </a>
            <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
              {["hero", "about", "menu", "gallery", "contact"].map((id) => (
                <button key={id} onClick={() => scrollTo(id)} className={styles.navLink}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <a
                href="tel:+917003267894"
                className="btn-primary"
                style={{ fontSize: "13px", padding: "12px 24px" }}
              >
                📞 Order Now
              </a>
            </div>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" className={styles.hero} ref={heroRef}>
        <div className={styles.heroBg}>
          <Image src="/hero-food.png" alt="Nani N Granny hero food" fill style={{ objectFit: "cover" }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <p className="section-label animate-fadeInUp">Hindmotor · Konnagar · West Bengal</p>
            <h1 className={`${styles.heroTitle} animate-fadeInUp delay-1`}>
              Fast Flavor.<br />
              <span className="gradient-text">No Compromise.</span>
            </h1>
            <p className={`${styles.heroSubtitle} animate-fadeInUp delay-2`}>
              Bold smash burgers, loaded pizzas, gourmet sandwiches & thick milkshakes.
              Purely vegetarian. Always unapologetic.
            </p>
            <div className={`${styles.heroCta} animate-fadeInUp delay-3`}>
              <button onClick={() => scrollTo("menu")} className="btn-primary">
                Explore Menu →
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-outline">
                Find Us
              </button>
            </div>
            <div className={`${styles.heroStats} animate-fadeInUp delay-4`}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <div className={styles.scrollIndicator} />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className={styles.marqueeBar}>
        <div className={styles.marqueeTrack}>
          {["Sandwiches", "Maggi", "Vada Pav", "Pizzas", "Burgers", "Momos", "Fries", "Nachos", "Mocktails", "100% Veg"].map(
            (t, i) => (
              <span key={i} className={styles.marqueeItem}>
                ★ {t}
              </span>
            )
          ).concat(
            ["Sandwiches", "Maggi", "Vada Pav", "Pizzas", "Burgers", "Momos", "Fries", "Nachos", "Mocktails", "100% Veg"].map(
              (t, i) => (
                <span key={`d-${i}`} className={styles.marqueeItem}>
                  ★ {t}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className={`${styles.about} section`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={`${styles.aboutImage} scroll-reveal from-left`}>
              <div className={styles.aboutImgWrapper}>
                <Image src="/ambiance.png" alt="Nani N Granny restaurant ambiance" fill style={{ objectFit: "cover" }} />
              </div>
              <div className={styles.aboutImgAccent}>
                <span>EST.</span>
                <span className={styles.accentYear}>2020</span>
              </div>
            </div>
            <div className={`${styles.aboutContent} scroll-reveal from-right delay-200`}>
              <p className="section-label">Our Story</p>
              <h2 className={styles.aboutTitle}>
                Born From Late-Night<br />
                <span className="gradient-text">Cravings & Bold Ideas</span>
              </h2>
              <p className={styles.aboutText}>
                Nani N Granny wasn&apos;t born in a boardroom — it was forged in the fire of late-night
                cravings and a flat-out refusal to eat boring food. We took the classic diner concept,
                stripped it bare, and injected it with massive flavor and zero pretense.
              </p>
              <p className={styles.aboutText}>
                We source bold ingredients. We cook fast. We serve loud. Whether you&apos;re grabbing a
                smash burger on the run or diving into our loaded signature pizza, expect maximum impact.
                It&apos;s fast food — elevated. 100% vegetarian. Always.
              </p>
              <div className={styles.aboutTags}>
                {["100% Veg", "Fast Delivery", "Dine-In", "Takeaway", "Budget Friendly"].map((t) => (
                  <span key={t} className={styles.aboutTag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TORN PAGE DIVIDER ─── */}
      <div className="torn-divider" aria-hidden="true">
        <div className="torn-divider-top" />
        <div className="torn-divider-bottom" />
      </div>

      {/* ─── MENU ─── */}
      <section id="menu" className={`${styles.menuSection} section`}>
        <div className="container">
          <div className={`${styles.sectionHeader} scroll-reveal`}>
            <p className="section-label">The Menu</p>
            <h2 className={styles.sectionTitle}>
              High-Voltage Flavor.<br />
              <span className="gradient-text">Choose Your Weapon.</span>
            </h2>
          </div>

          {/* Category tabs */}
          <div className={styles.categoryTabs}>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.categoryTabActive : ""}`}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className={styles.menuGrid}>
            {activeItems.map((item) => (
              <div key={item.name} className={`card ${styles.menuCard}`}>
                <div className={styles.menuCardContent}>
                  <div className={styles.menuCardTop}>
                    <h3 className={styles.menuItemName}>{item.name}</h3>
                    <span className={styles.menuItemPrice}>₹{item.price}</span>
                  </div>
                  <p className={styles.menuItemDesc}>{item.desc}</p>
                  <span className={`badge ${tagConfig[item.tag].cls}`}>{tagConfig[item.tag].label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TORN PAGE DIVIDER ─── */}
      <div className="torn-divider" aria-hidden="true">
        <div className="torn-divider-top" />
        <div className="torn-divider-bottom" />
      </div>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className={`${styles.gallery} section`}>
        <div className="container">
          <div className={`${styles.sectionHeader} scroll-reveal`}>
            <p className="section-label">Food Shots</p>
            <h2 className={styles.sectionTitle}>
              Made to be <span className="gradient-text">Photographed</span>
            </h2>
          </div>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryItem} scroll-reveal scale-in`} style={{ gridColumn: "span 2" }}>
              <Image src="/hero-food.png" alt="Nani N Granny spread" fill style={{ objectFit: "cover" }} />
              <div className={styles.galleryOverlay}><span>The Full Spread</span></div>
            </div>
            <div className={`${styles.galleryItem} scroll-reveal delay-100`}>
              <Image src="/burger.png" alt="Veg Burger" fill style={{ objectFit: "cover" }} />
              <div className={styles.galleryOverlay}><span>Burgers</span></div>
            </div>
            <div className={`${styles.galleryItem} scroll-reveal delay-200`}>
              <Image src="/pizza.png" alt="Veg Pizza" fill style={{ objectFit: "cover" }} />
              <div className={styles.galleryOverlay}><span>Pizzas</span></div>
            </div>
            <div className={`${styles.galleryItem} scroll-reveal delay-300`}>
              <Image src="/sandwich.png" alt="Veg Sandwich" fill style={{ objectFit: "cover" }} />
              <div className={styles.galleryOverlay}><span>Sandwiches</span></div>
            </div>
            <div className={`${styles.galleryItem} scroll-reveal delay-400`}>
              <Image src="/milkshake.png" alt="Milkshakes" fill style={{ objectFit: "cover" }} />
              <div className={styles.galleryOverlay}><span>Shakes</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TORN PAGE DIVIDER ─── */}
      <div className="torn-divider" aria-hidden="true">
        <div className="torn-divider-top" />
        <div className="torn-divider-bottom" />
      </div>

      {/* ─── CONTACT ─── */}
      <section id="contact" className={`${styles.contact} section`}>
        <div className="container">
          <div className={`${styles.sectionHeader} scroll-reveal`}>
            <p className="section-label">Find Us</p>
            <h2 className={styles.sectionTitle}>
              Come Hungry. <span className="gradient-text">Leave Happy.</span>
            </h2>
          </div>
          <div className={styles.contactGrid}>
            {/* Info cards */}
            <div className={`${styles.contactInfo} scroll-reveal from-left delay-100`}>
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <h4>Location</h4>
                  <p>41/15, R.G. Nagar Road, Ward 4</p>
                  <p>Hindmotor, Konnagar</p>
                  <p>Hooghly, West Bengal — 712233</p>
                </div>
              </div>
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+917003267894" className={styles.contactLink}>+91 70032 67894</a>
                  <a href="tel:+918100117894" className={styles.contactLink}>+91 81001 17894</a>
                </div>
              </div>
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>🕐</span>
                <div>
                  <h4>Hours</h4>
                  <p>Tue – Thu: 9:30 AM – 9:30 PM</p>
                  <p>Fri – Sat: 11:00 AM – 2:00 AM</p>
                  <p>Sun: 12:00 PM – 9:30 PM</p>
                  <p style={{ color: "#f87171" }}>Closed on Mondays</p>
                </div>
              </div>
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>🛵</span>
                <div>
                  <h4>Order Online</h4>
                  <div className={styles.deliveryLinks}>
                    <a
                      href="https://www.swiggy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.deliveryBtn}
                    >
                      Swiggy
                    </a>
                    <a
                      href="https://www.zomato.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.deliveryBtn}
                    >
                      Zomato
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5!2d88.3456!3d22.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNani+N+Granny%2C+Hindmotor!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nani N Granny location map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div className={styles.footerLogo}>
              <span className={styles.logoNani}>NANI</span>
              <span className={styles.logoDivider}>N</span>
              <span className={styles.logoGranny}>GRANNY</span>
              <p>Fast Flavor. No Compromise.</p>
            </div>
            <div className={styles.footerLinks}>
              {["about", "menu", "gallery", "contact"].map((id) => (
                <button key={id} onClick={() => scrollTo(id)} className={styles.footerLink}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()} Nani N Granny. All rights reserved. 100% Pure Veg 🌿
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
