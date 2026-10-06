import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/yaari-bagh-logo.png";
import gallery1 from "./assets/gallery-1.png";
import gallery2 from "./assets/gallery-2.png";
import gallery3 from "./assets/gallery-3.png";
import yarriEvent from "./assets/yarri-bagh-event.jpeg";
import instagramQR from "./assets/instagram-qr.jpeg";
function App() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rulesLoading, setRulesLoading] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rulesProgress, setRulesProgress] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
const [formSubmitted, setFormSubmitted] = useState(false);
const [applicationNumber, setApplicationNumber] = useState("");
const [qrZoom, setQrZoom] = useState(false);
const [applications, setApplications] = useState([]);
const [selectedApplication, setSelectedApplication] = useState(null);
const [adminOpen, setAdminOpen] = useState(false);
const [adminLoggedIn, setAdminLoggedIn] = useState(false);
const [adminStatus, setAdminStatus] = useState("login");
const [formData, setFormData] = useState({
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  address: "",
  timeSlot: "",
  emergencyContact: "",
});
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
  useEffect(() => {
  const handleAdminShortcut = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "x") {
      e.preventDefault();
      setAdminOpen(true);
    }
  };

  window.addEventListener("keydown", handleAdminShortcut);

  return () => {
    window.removeEventListener("keydown", handleAdminShortcut);
  };
}, []);

  return (
    <main className="website">
      {adminOpen && (
  <div className="admin-overlay">
    <div className="admin-login">
      {!adminLoggedIn ? (
        <>
          <button
            className="admin-close"
            onClick={() => setAdminOpen(false)}
          >
            ×
          </button>

          <div className="admin-kicker">YAARI BAGH · ADMIN</div>

          <h2>Admin<br /><i>Login.</i></h2>

          <input
            type="text"
            placeholder="Username"
            id="adminUsername"
          />

          <input
            type="password"
            placeholder="Password"
            id="adminPassword"
          />

          <button
            className="admin-login-btn"
            onClick={() => {
              const username =
                document.getElementById("adminUsername").value;

              const password =
                document.getElementById("adminPassword").value;

              if (
  username === "yarribagh@123" &&
  password === "Ssuraj@123okie"
) {
  setAdminStatus("granted");

  setTimeout(() => {
    setAdminLoggedIn(true);
    setAdminStatus("dashboard");
  }, 1800);

} else {
  setAdminStatus("failed");

  setTimeout(() => {
    setAdminStatus("login");
  }, 1800);
}
            }}
          >
            LOGIN →
          </button>
        </>
      ) : adminStatus === "granted" ? (

  <div className="admin-status-screen">

    <div className="status-icon success">✓</div>

    <div className="status-kicker">
      SECURITY VERIFICATION
    </div>

    <h1>
      Access<br />
      <i>Granted.</i>
    </h1>

    <p>
      Authentication successful.<br />
      Preparing management dashboard...
    </p>

    <div className="status-progress"></div>

  </div>

) : adminStatus === "failed" ? (

  <div className="admin-status-screen">

    <div className="status-icon failed">×</div>

    <div className="status-kicker">
      SECURITY VERIFICATION
    </div>

    <h1>
      Access<br />
      <i>Failed.</i>
    </h1>

    <p>
      Invalid username or password.<br />
      Returning to secure login...
    </p>

    <div className="status-progress failed-progress"></div>

  </div>

) : (
        
       <div className="admin-dashboard">

  <div className="dashboard-header">
    <div>
      <div className="admin-kicker">YAARI BAGH · MANAGEMENT</div>
      <h1>Applications.</h1>
      <p>Badminton registration management dashboard</p>
    </div>

    <button
      className="dashboard-logout"
      onClick={() => {
        setAdminLoggedIn(false);
        setAdminOpen(false);
      }}
    >
      LOGOUT ↗
    </button>
    
  </div>

  <div className="dashboard-stats">

    <div className="dashboard-stat">
      <span>TOTAL APPLICATIONS</span>
      <strong>{applications.length}</strong>
    </div>

    <div className="dashboard-stat">
      <span>SPORT</span>
      <strong>BADMINTON</strong>
    </div>

    <div className="dashboard-stat">
      <span>STATUS</span>
      <strong>ACTIVE</strong>
    </div>

  </div>

  <div className="dashboard-table-section">

    <div className="dashboard-table-header">
      <h2>Registration List</h2>
      <span>{applications.length} APPLICATIONS</span>
    </div>

    {applications.length === 0 ? (
      <div className="dashboard-empty">
        <div>NO APPLICATIONS YET</div>
        <p>
          Submitted badminton registrations will appear here.
        </p>
      </div>
    ) : (
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>APPLICATION NO.</th>
              <th>NAME</th>
              <th>MOBILE</th>
              <th>AGE</th>
              <th>TIME SLOT</th>
              <th>SUBMITTED</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr
  key={index}
  onClick={() => setSelectedApplication(app)}
  className="application-row"
>
                <td>{app.applicationNumber}</td>
                <td>{app.fullName}</td>
                <td>{app.mobile}</td>
                <td>{app.age}</td>
                <td>{app.timeSlot}</td>
                <td>{app.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

  </div>

</div>
      )}
    </div>
    {selectedApplication && (
  <div
    className="applicant-detail-overlay"
    onClick={() => setSelectedApplication(null)}
  >
    <div
      className="applicant-detail-card"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="applicant-detail-close"
        onClick={() => setSelectedApplication(null)}
      >
        ×
      </button>

      <div className="admin-kicker">
        YAARI BAGH · APPLICANT PROFILE
      </div>

      <h2>
        Applicant<br />
        <i>Details.</i>
      </h2>

      <div className="applicant-number">
        <span>APPLICATION NUMBER</span>
        <strong>{selectedApplication.applicationNumber}</strong>
      </div>

      <div className="applicant-details-grid">

        <div>
          <span>FULL NAME</span>
          <strong>{selectedApplication.fullName}</strong>
        </div>

        <div>
          <span>MOBILE NUMBER</span>
          <strong>{selectedApplication.mobile}</strong>
        </div>

        <div>
          <span>EMAIL ADDRESS</span>
          <strong>{selectedApplication.email}</strong>
        </div>

        <div>
          <span>AGE</span>
          <strong>{selectedApplication.age}</strong>
        </div>

        <div className="detail-wide">
          <span>ADDRESS</span>
          <strong>{selectedApplication.address}</strong>
        </div>

        <div>
          <span>PREFERRED TIME SLOT</span>
          <strong>{selectedApplication.timeSlot}</strong>
        </div>

        <div>
          <span>EMERGENCY CONTACT</span>
          <strong>{selectedApplication.emergencyContact}</strong>
        </div>

        <div>
          <span>SPORT</span>
          <strong>BADMINTON</strong>
        </div>

        <div>
          <span>SUBMITTED ON</span>
          <strong>{selectedApplication.submittedAt}</strong>
        </div>

      </div>

    </div>
  </div>
)}
  </div>
)}
     {qrZoom && (
  <div
    className="qr-zoom-overlay"
    onClick={() => setQrZoom(false)}
  >
    <button
      className="qr-zoom-close"
      onClick={() => setQrZoom(false)}
    >
      ×
    </button>

    <div
      className="qr-zoom-card"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="qr-zoom-label">
        SCAN TO JOIN
      </div>

      <img
        src={instagramQR}
        alt="Yaari Bagh Instagram QR Code"
      />

      <p>
        Scan this QR code to join the
        Yaari Bagh Instagram channel.
      </p>
    </div>
  </div>
)}
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
          {formOpen && (
  <div className="application-overlay">
    <div className="application-modal">

      {!formSubmitted ? (
        <>
          <button
            className="application-close"
            onClick={() => setFormOpen(false)}
          >
            ×
          </button>

          <div className="application-kicker">
            YAARI BAGH · BADMINTON
          </div>

          <h2>
            Registration
            <br />
            <i>Application.</i>
          </h2>

          <p className="application-intro">
            Fill in your details to apply for badminton access at Yaari Bagh.
          </p>

          <form
            onSubmit={(e) => {
  e.preventDefault();

  const number = `YB-${new Date().getFullYear()}-${String(
    Date.now()
  ).slice(-6)}`;

  setApplicationNumber(number);

setApplications((prev) => [
  ...prev,
  {
    ...formData,
    applicationNumber: number,
    sport: "Badminton",
    submittedAt: new Date().toLocaleString(),
  },
]);

setFormSubmitted(true);
}}
          >

            <div className="application-grid">

              <div className="application-field">
                <label>FULL NAME</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className="application-field">
                <label>MOBILE NUMBER</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value,
                    })
                  }
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="application-field">
                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div className="application-field">
                <label>AGE</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: e.target.value,
                    })
                  }
                  placeholder="Age"
                />
              </div>

              <div className="application-field application-full">
                <label>ADDRESS</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter your address"
                />
              </div>

              <div className="application-field">
                <label>PREFERRED TIME SLOT</label>
                <input
                  type="text"
                  required
                  value={formData.timeSlot}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeSlot: e.target.value,
                    })
                  }
                  placeholder="e.g. 6 PM – 7 PM"
                />
              </div>

              <div className="application-field">
                <label>EMERGENCY CONTACT</label>
                <input
                  type="tel"
                  required
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: e.target.value,
                    })
                  }
                  placeholder="Emergency contact number"
                />
              </div>

            </div>

            <div className="application-sport">
              <span>SPORT</span>
              <strong>🏸 BADMINTON</strong>
            </div>

            <button
              type="submit"
              className="application-submit"
            >
              SUBMIT APPLICATION
              <span>↗</span>
            </button>

          </form>
        </>
      ) : (
        <div className="application-success">

          <div className="success-icon">✓</div>

          <div className="application-kicker">
            APPLICATION RECEIVED
          </div>

          <h2>
            Thank You.
            <br />
            <i>You're In.</i>
          </h2>

          <p>
            Your badminton registration application has been
            successfully submitted.
          </p>

          <div className="contact-box">
            <span>CONTACT PERSON</span>
            <strong>AYUSH SHARMA</strong>
          </div>

          <div className="application-number-box">
  <span>APPLICATION NUMBER</span>
  <strong>{applicationNumber}</strong>
</div>

          <div className="qr-box">
            <img
             src={instagramQR}
            alt="Yaari Bagh Instagram QR Code"
            className="instagram-qr"
            onClick={() => setQrZoom(true)}
            />

            <div>
              <strong>Further Queries & Registration</strong>
              <p>
                Scan the QR code and join our Instagram channel
                for further information and registration-related queries.
              </p>
            </div>
          </div>

          <div className="receipt-note">
            <strong>IMPORTANT</strong>
            <p>
              Please save the receipt generated after registration.
              Take a screenshot or print the receipt and share it
              after joining the Instagram channel for further assistance.
            </p>
          </div>

          <div className="receipt-actions">

  <button
    className="receipt-print"
    onClick={() => window.print()}
  >
    PRINT / SAVE PDF
  </button>

  <button
    className="application-done"
    onClick={() => {
      setFormOpen(false);
      setFormSubmitted(false);
    }}
  >
    CLOSE
  </button>

</div>

        </div>
      )}

    </div>
  </div>
)}
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
    BADMINTON REGISTRATION
========================= */}

<section className="registration-section" id="registration">

  <div className="registration-inner">

    <div className="registration-number">
      07
    </div>

    <div className="registration-content">

      <div className="section-tag">
        YAARI BAGH · BADMINTON
      </div>

      <h2>
        Ready to
        <br />
        <i>Play?</i>
      </h2>

      <p>
        Join the Yaari Bagh badminton community.
        Register your details and get started with
        your preferred playing time.
      </p>

      <button
        className="registration-button"
        onClick={() => {
          setFormOpen(true);
          setFormSubmitted(false);
        }}
      >
        <span>APPLY FOR BADMINTON</span>
        <strong>↗</strong>
      </button>

    </div>

    <div className="registration-side">

      <div className="registration-line"></div>

      <span>
        BADMINTON
        <br />
        REGISTRATION
      </span>

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