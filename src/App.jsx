import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/yaari-bagh-logo.png";
import gallery1 from "./assets/gallery-1.png";
import gallery2 from "./assets/gallery-2.png";
import gallery3 from "./assets/gallery-3.png";
import yarriEvent from "./assets/yarri-bagh-event.jpeg";
function App() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rulesLoading, setRulesLoading] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rulesProgress, setRulesProgress] = useState(0);
  // =========================
  // CINEMATIC NAVIGATION
  // =========================
  const navigateTo = (id) => {
  setMenuOpen(false);
  setTransitioning(true);

  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => {
      setTransitioning(false);
    }, 700);
  }, 600);
};
const openRules = () => {
  setMenuOpen(false);
  setRulesProgress(0);
  setRulesLoading(true);

  let current = 0;

  const timer = setInterval(() => {
    current += 2;

    setRulesProgress(current);

    if (current >= 100) {
      clearInterval(timer);

      setTimeout(() => {
        setRulesLoading(false);
        setRulesOpen(true);
      }, 500);
    }
  }, 35);
};
  // =========================
  // LOADER
  // =========================
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            setLoaded(true);
          }, 600);

          return 100;
        }

        return prev + 1;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="website">

      {/* =========================
          LOADER
      ========================= */}

      {!loaded && (
        <div className="loader">

          <div className="loader-glow glow-one"></div>
          <div className="loader-glow glow-two"></div>

          <div className="loader-center">

            <div className="loader-brand">
              EST. 2026
            </div>

            <div className="loader-logo">
              <img src={logo} alt="Yaari Bagh" />
            </div>

            <div className="loader-title">
              YAARI BAGH
            </div>

            <div className="loader-subtitle">
              BADMINTON · FITNESS · COMMUNITY
            </div>

          </div>

          <div className="loader-progress-area">

            <div className="loader-progress-top">
              <span>
                WELCOME TO YAARI BAGH
              </span>

              <strong>
                {String(progress).padStart(3, "0")}
              </strong>
            </div>

            <div className="loader-line">
              <div
                className="loader-progress"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="loader-progress-bottom">
              <span>
                JAMMU · JAGTI · NAGROTA
              </span>

              <span>
                OPEN 24 HOURS
              </span>
            </div>

          </div>

        </div>
      )}

      {/* =========================
          CINEMATIC PAGE TRANSITION
      ========================= */}

      {transitioning && (
        <div className="page-transition">

          <div className="transition-logo">
            <img src={logo} alt="Yaari Bagh" />
          </div>

          <div className="transition-name">
            YAARI BAGH
          </div>

          <div className="transition-line"></div>

        </div>
      )}

      {/* =========================
          MAIN WEBSITE
      ========================= */}
       {/* =========================
    PARK RULES LOADING
========================= */}

{rulesLoading && (
  <div className="rules-loader">

    <div className="rules-loader-content">

      <div className="rules-loader-logo">
        <img src={logo} alt="Yaari Bagh" />
      </div>

      <div className="rules-loader-kicker">
        YAARI BAGH PARK
      </div>

      <div className="rules-loader-title">
        PARK RULES
      </div>

      <div className="rules-loader-status">
        Preparing park guidelines
      </div>

      <div className="rules-loader-bar">
        <div
          className="rules-loader-progress"
          style={{ width: `${rulesProgress}%` }}
        ></div>
      </div>

      <div className="rules-loader-percent">
        <span>PLEASE WAIT</span>

        <strong>
          {String(rulesProgress).padStart(3, "0")}%
        </strong>
      </div>

    </div>

  </div>
)}


{/* =========================
    PARK RULES PAGE
========================= */}

{rulesOpen && (
  <div className="rules-page">

    <div className="rules-page-inner">

      <div className="rules-top">

        <div>
          <div className="rules-kicker">
            YAARI BAGH PARK · COMMUNITY GUIDELINES
          </div>

          <h1 className="rules-title">
            Park
            <br />
            <i>Rules.</i>
          </h1>
        </div>

        <button
          className="rules-close"
          onClick={() => setRulesOpen(false)}
          aria-label="Close rules"
        >
          ×
        </button>

      </div>


      <div className="rules-grid">

        <div className="rule-card">
          <div className="rule-number">01</div>

          <div className="rule-icon">🗑️</div>

          <h3>Keep It Clean</h3>

          <p>
            Please do not throw garbage in the park.
            Always use the dustbins provided.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">02</div>

          <div className="rule-icon">🗣️</div>

          <h3>No Abusive Language</h3>

          <p>
            Please maintain a respectful environment.
            Abusive or bad language is not allowed.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">03</div>

          <div className="rule-icon">⏰</div>

          <h3>Respect Your Time Slot</h3>

          <p>
            Everyone must play according to their
            assigned badminton court time slot.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">04</div>

          <div className="rule-icon">🏸</div>

          <h3>Protect The Court</h3>

          <p>
            Please do not damage the badminton court
            or any other park property.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">05</div>

          <div className="rule-icon">🤝</div>

          <h3>No Fighting</h3>

          <p>
            Misbehaviour, arguments and fighting with
            anyone are strictly not acceptable.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">06</div>

          <div className="rule-icon">❤️</div>

          <h3>Respect Everyone</h3>

          <p>
            Treat everyone with respect and maintain
            a friendly and polite atmosphere.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">07</div>

          <div className="rule-icon">👫</div>

          <h3>Play Peacefully</h3>

          <p>
            Cooperate with other players and enjoy
            the park together peacefully.
          </p>
        </div>


        <div className="rule-card">
          <div className="rule-number">08</div>

          <div className="rule-icon">🌳</div>

          <h3>Keep The Park Safe</h3>

          <p>
            Help us keep Yaari Bagh clean, safe and
            welcoming for everyone.
          </p>
        </div>

      </div>


      <div className="rules-warning">

        <div className="rules-warning-label">
          IMPORTANT · DISCIPLINE POLICY
        </div>

        <h3>
          3-Warning Policy
        </h3>
        <p>
          Anyone who breaks the park rules will receive
          up to three warnings. After three warnings,
          the person will no longer be allowed to enter
          the park.
        </p>

      </div>


      <div className="rules-footer">
        Follow the rules · Respect the game · Respect the community ❤️🏸
      </div>

    </div>

  </div>
)}
      {loaded && (
        <>

          {/* =========================
              HERO
          ========================= */}

          <section className="hero" id="home">

            <div className="hero-background"></div>

            {/* NAVBAR */}

            <nav className="navbar">

              <button
                className="nav-logo"
                onClick={() => navigateTo("home")}
              >
                <img src={logo} alt="Yaari Bagh" />
              </button>

              <div className="nav-links">

                <button onClick={() => navigateTo("about")}>
                  About
                </button>

                <button onClick={() => navigateTo("experience")}>
                  Experience
                </button>

                <button onClick={() => navigateTo("gallery")}>
                  Gallery
                </button>

                <button onClick={() => navigateTo("facilities")}>
                Facilities
                </button>

                <button onClick={() => navigateTo("inauguration")}>
                 Inauguration
                </button>

                <button onClick={() => navigateTo("location")}>
                  Location
                </button>

              </div>

              <button
                className="visit-button"
                onClick={() => navigateTo("location")}
              >
                Find Us
              </button>
                {/* MOBILE MENU BUTTON */}

  <button
    className="mobile-menu-button"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Open menu"
  >
    <span></span>
    <span></span>
  </button>


  {/* MOBILE MENU */}

  {menuOpen && (
    <div className="mobile-menu">

      <div className="mobile-menu-top">

        <span>MENU</span>

        <button
          onClick={() => setMenuOpen(false)}
          className="mobile-menu-close"
        >
          ×
        </button>

      </div>

      <div className="mobile-menu-links">

  <button onClick={() => navigateTo("about")}>
    <span>01</span>
    ABOUT
  </button>

  <button onClick={() => navigateTo("experience")}>
    <span>02</span>
    EXPERIENCE
  </button>

  <button onClick={() => navigateTo("gallery")}>
    <span>03</span>
    GALLERY
  </button>

  <button onClick={() => navigateTo("facilities")}>
    <span>04</span>
    FACILITIES
  </button>

  <button onClick={() => navigateTo("inauguration")}>
    <span>05</span>
    INAUGURATION
  </button>

  <button onClick={() => navigateTo("location")}>
    <span>06</span>
    LOCATION
  </button>

</div>

      <button
        className="mobile-menu-find"
        onClick={() => navigateTo("location")}
      >
        FIND US
        <span>↗</span>
      </button>

    </div>
  )}
            </nav>


            {/* HERO CONTENT */}

            <div className="hero-content">

              <div className="hero-label">
                <span></span>
                JAMMU · JAGTI · NAGROTA
              </div>

              <h1>
                Your Space.
                <br />
                Your <i>Game.</i>
                <br />
                Your <i>Yaari.</i>
              </h1>

              <p>
                A neighborhood space built for
                badminton, fitness, family and
                the people you love spending time with.
              </p>

              <div className="hero-actions">

                <button
                  className="hero-primary"
                  onClick={() => navigateTo("experience")}
                >
                  Explore Yaari Bagh
                  <span>↗</span>
                </button>

                <button
                  className="hero-secondary"
                  onClick={() => navigateTo("location")}
                >
                  Get Directions
                </button>
                <button
                className="rules-button"
                onClick={openRules}
                >
                <span>🏸</span>
                 PARK RULES
                  <span>↗</span>
                  </button>
              </div>

            </div>


            {/* SIDE INFO */}

            <div className="hero-side-text">

              <span>
                01
              </span>

              <div></div>

              <span>
                YAARI BAGH
              </span>

            </div>


            {/* HERO BOTTOM */}

            <div className="hero-bottom">

              <div className="hero-stat">

                <strong>
                  24/7
                </strong>

                <span>
                  OPEN
                </span>

              </div>


              <div className="hero-stat">

                <strong>
                  SPORT
                </strong>

                <span>
                  FITNESS
                </span>

              </div>


              <button
                className="hero-scroll"
                onClick={() => navigateTo("about")}
              >
                SCROLL TO EXPLORE
                <span>↓</span>
              </button>

            </div>

          </section>


          {/* =========================
              ABOUT
          ========================= */}

          <section
            className="about-section"
            id="about"
          >

            <div className="section-tag">
              01 — THE YAARI BAGH EXPERIENCE
            </div>

            <h2>
              More than a place
              <br />
              to play.
              <br />
              A place to <i>belong.</i>
            </h2>

            <p className="about-description">
              Yaari Bagh is an open neighborhood
              space created for sports, fitness,
              family time and community.
            </p>

          </section>


          {/* =========================
              EXPERIENCE
          ========================= */}

          <section
            className="experience-section"
            id="experience"
          >

            <div className="section-tag">
              02 — EXPERIENCE
            </div>

            <h2>
              Play.
              <br />
              Move.
              <br />
              <i>Connect.</i>
            </h2>


            <div className="experience-grid">

              <div className="experience-card">

                <span>
                  01
                </span>

                <h3>
                  Badminton
                </h3>

                <p>
                  Pick up your racket,
                  bring your friends and
                  enjoy the game.
                </p>

              </div>


              <div className="experience-card">

                <span>
                  02
                </span>

                <h3>
                  Fitness
                </h3>

                <p>
                  Stay active and make
                  movement part of your day.
                </p>

              </div>


              <div className="experience-card">

                <span>
                  03
                </span>

                <h3>
                  Community
                </h3>

                <p>
                  A space where friends,
                  families and neighbors connect.
                </p>

              </div>

            </div>

          </section>
           
           {/* =========================
    FACILITIES
========================= */}

<section
  className="facilities-section"
  id="facilities"
>
  <div className="section-tag">
    03 — WHAT'S HERE
  </div>

  <h2>
    Everything you need
    <br />
    to <i>enjoy the game.</i>
  </h2>

  <div className="facilities-grid">

    <div className="facility-card">
      <span>01</span>
      <h3>Badminton</h3>
      <p>
        A dedicated space to play,
        practice and enjoy badminton
        with your friends.
      </p>
    </div>

    <div className="facility-card">
      <span>02</span>
      <h3>Fitness</h3>
      <p>
        Stay active, keep moving and
        make fitness part of your
        everyday routine.
      </p>
    </div>

    <div className="facility-card">
      <span>03</span>
      <h3>Community</h3>
      <p>
        A welcoming neighborhood space
        for friends, families and
        the local community.
      </p>
    </div>

    <div className="facility-card">
      <span>04</span>
      <h3>Open 24/7</h3>
      <p>
        A space designed to fit your
        routine, with access available
        around the clock.
      </p>
    </div>

  </div>
</section>

          {/* =========================
              GALLERY
          ========================= */}

          <section
            className="gallery-section"
            id="gallery"
          >

            <div className="gallery-grid">

  <div className="gallery-item gallery-large">
    <img
      src={gallery1}
      alt="Yaari Bagh Badminton Court"
      onClick={() => setSelectedImage(gallery1)}
    />
    <div className="gallery-overlay">
      <span>01</span>
      <strong>THE COURT</strong>
    </div>
  </div>

  <div className="gallery-item">
    <img
  src={gallery2}
  alt="Yaari Bagh Sports Area"
  onClick={() => setSelectedImage(gallery2)}
/>
    <div className="gallery-overlay">
      <span>02</span>
      <strong>PLAY</strong>
    </div>
  </div>

  <div className="gallery-item">
    <img
  src={gallery3}
  alt="Yaari Bagh Community Space"
  onClick={() => setSelectedImage(gallery3)}
/>
    <div className="gallery-overlay">
      <span>03</span>
      <strong>COMMUNITY</strong>
    </div>
  </div>

</div>
          </section>
          {/* =========================
    INAUGURATION
========================= */}

<section
  className="inauguration-section"
  id="inauguration"
>
  <div className="section-tag">
    04 — A NEW BEGINNING
  </div>

  <div className="inauguration-content">

    <div className="inauguration-text">
      <h2>
        A new chapter.
        <br />
        A moment to <i>remember.</i>
      </h2>

      <p>
        A special moment from the inauguration of
        Yaari Bagh, marking the beginning of a new
        chapter built around sport, fitness and community.
      </p>
    </div>

    <div className="inauguration-image">
      <img
      src={yarriEvent}
      alt="Yaari Bagh Inauguration"
      onClick={() => setSelectedImage(yarriEvent)}
      />
    </div>

  </div>
</section>

          {/* =========================
              LOCATION
          ========================= */}

          <section
            className="location-section"
            id="location"
          >

            <div className="section-tag">
              04 — FIND US
            </div>

            <h2>
              Come visit
              <br />
              <i>Yaari Bagh.</i>
            </h2>


            <div className="location-details">

              <p>
                Flat No. 4, Block No. 114,
                <br />
                Lane No. 20, Nagrota, Jagti,
                <br />
                Jammu & Kashmir — 181221
              </p>


              <div className="open-status">

                <span></span>

                OPEN 24 HOURS

              </div>


              <a
  href="https://maps.app.goo.gl/DGxHGvswzR7gWwbN9"
  target="_blank"
  rel="noreferrer"
  className="location-button"
>
  Get Directions →
</a>

            </div>

          </section>


          {/* =========================
              FOOTER
          ========================= */}

          <footer>

            <img
              src={logo}
              alt="Yaari Bagh"
            />

            <p>
              YAARI BAGH · JAMMU
            </p>

            <span>
              © 2026 Yaari Bagh
            </span>

          </footer>
         {selectedImage && (
  <div
    className="image-lightbox"
    onClick={() => setSelectedImage(null)}
  >
    <button
      className="lightbox-close"
      onClick={() => setSelectedImage(null)}
      aria-label="Close image"
    >
      ×
    </button>

    <img
      src={selectedImage}
      alt="Yaari Bagh"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}
        </>
      )}

    </main>
  );
}

export default App;