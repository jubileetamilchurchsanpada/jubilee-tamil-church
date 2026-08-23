import React, { useState } from "react";
import { motion } from "framer-motion";
import churchLogo from "../assets/logo.png";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Cross,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Play,
  Quote,
  Youtube,
} from "lucide-react";

import Navbar from "../components/Navbar";
import SectionTitle from "../components/SectionTitle";
import Chatbot from "../components/Chatbot";
import JubileeAlbums from "../components/JubileeAlbums";

import churchImg from "../assets/church.jpg";
import worshipImg from "../assets/worship.jpg";
import communityImg from "../assets/community.jpg";
import eventImg from "../assets/event.png";
import churchHistoryExterior from "../assets/church-history-exterior.jpg";
import churchHistorySanctuary from "../assets/church-history-sanctuary.jpg";

const MAP_URL = "https://share.google/sFuYwDhJwRCh5MdB1";
const YOUTUBE_URL = "https://www.youtube.com/@jubileetamilchurch232";
const CHURCH_EMAIL = "jubileetamilchurchsanpada@gmail.com";

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65 },
};

const serviceTimes = [
  {
    day: "Sunday",
    title: "Sunday Service",
    time: "9:45 AM – 11:30 AM",
    note: "Sunday worship, Word and fellowship",
  },
  {
    day: "Wednesday",
    title: "Bible Study",
    time: "8:00 PM – 9:00 PM",
    note: "Midweek Bible study and fellowship",
  },
];

const sermons = [
  { tag: "LATEST", title: "Watch Our Latest Sermons", speaker: "Jubilee Tamil Church", image: worshipImg },
  { tag: "WORSHIP", title: "Sunday Worship Messages", speaker: "Jubilee Tamil Church", image: churchImg },
  { tag: "WORD", title: "Messages For Faith & Life", speaker: "Jubilee Tamil Church", image: communityImg },
];

const events = [
  {
    day: "SUNDAY",
    title: "Sunday Service",
    meta: "9:45 AM – 11:30 AM",
    note: "Sunday worship, Word and fellowship",
    image: churchImg,
  },
  {
    day: "WEDNESDAY",
    title: "Bible Study",
    meta: "8:00 PM – 9:00 PM",
    note: "Midweek Bible study and fellowship",
    image: worshipImg,
  },
];

const churchLeadership = [
  { name: "Rev. Daniel", role: "Presbyter-in-Charge", image: null, initials: "RD" },
  { name: "Mr. D. L. Peter", role: "Catechist", image: null, initials: "DP" },
  { name: "Mr. P. C. Shekhar", role: "Secretary", image: null, initials: "PS" },
  { name: "Mr. Alex Rajamani", role: "Treasurer", image: null, initials: "AR" },
];

export default function Home() {
  const [contactType, setContactType] = useState("Prayer Request");

  return (
    <div className="site">
      <Navbar />
      <main>
        <section id="home" className="hero">
          <img src={churchImg} alt="Jubilee Tamil Church" className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-glow" />
          <div className="container hero-content">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
              <span className="hero-kicker"><Cross size={16} /> Welcome Home</span>
              <h1>A Church To <em>Believe.</em><br />A Family To <em>Belong.</em></h1>
              <p>A Christ-centered Tamil church community devoted to worship, the Word, prayer, discipleship and transforming lives through the love of Jesus.</p>
              <div className="hero-actions">
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-glass"><Play size={18} /> Watch Sermons</a>
              </div>
            </motion.div>

            <motion.div className="hero-card glass-card" initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <span className="eyebrow">NEXT GATHERING</span>
              <h3>Sunday Celebration</h3>
              <div className="hero-card-row"><CalendarDays /> Every Sunday</div>
              <div className="hero-card-row"><Clock3 /> 9:45 AM – 11:30 AM</div>
              <div className="hero-card-row"><MapPin /> Jubilee Tamil Church</div>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="hero-directions-link">Get Directions <ArrowRight size={16} /></a>
            </motion.div>
          </div>
          <button className="scroll-cue" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}><span>Discover</span><ChevronDown /></button>
        </section>

        <section id="about" className="section church-story-section">
          <div className="container church-story-grid">
            <motion.div className="church-story-visual" {...reveal}>
              <div className="church-story-main-image">
                <img
                  src={churchHistoryExterior}
                  alt="Jubilee Tamil Church building"
                />
                <div className="church-story-year-badge">
                  <span>Founded</span>
                  <strong>1997</strong>
                  <small>15 August</small>
                </div>
              </div>

              <div className="church-story-sanctuary">
                <img
                  src={churchHistorySanctuary}
                  alt="Jubilee Tamil Church sanctuary"
                />
              </div>
            </motion.div>

            <motion.div className="church-story-copy" {...reveal}>
              <span className="eyebrow">OUR STORY</span>

              <h2 className="display-title">
                From A Few Faithful Members
                <br />
                <span>To 100+ Families.</span>
              </h2>

              <p className="church-story-lead">
                Jubilee Tamil Church was founded on <strong>15 August 1997</strong>,
                beginning as a small gathering of a few faithful members with a
                shared desire to worship God, grow in His Word and build a Tamil
                Christian community together.
              </p>

              <p>
                What began with a few families has, by God's grace, grown into a
                vibrant church family of more than <strong>100 families</strong>.
                Through every season, the Lord has continued to strengthen the
                church through worship, prayer, fellowship, discipleship and
                service.
              </p>

              <p>
                Today, Jubilee Tamil Church continues to be a place where every
                generation can worship together, learn from Scripture, build
                meaningful relationships and grow in faith. Whether you are new
                to the area, searching for a church family or simply wish to join
                us for worship, <strong>you are warmly welcome.</strong>
              </p>

              <div className="church-story-stats">
                <div>
                  <strong>1997</strong>
                  <span>Founded</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>Church Families</span>
                </div>
                <div>
                  <strong>One</strong>
                  <span>Growing Family</span>
                </div>
              </div>

              <div className="church-story-actions">
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  Visit Jubilee Tamil Church
                  <ArrowRight size={18} />
                </a>

                <button
                  className="church-story-service-link"
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Service Timings
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <SectionTitle eyebrow="GATHER WITH US" title="Gather With Us" text="Join us every Sunday for worship and every Wednesday for Bible Study." light />
            <div className="service-grid">
              {serviceTimes.map((item,index) => (
                <motion.article className="service-card" key={item.title} {...reveal} transition={{ duration: 0.6, delay: index * 0.08 }}>
                  <span className="service-day">{item.day}</span><h3>{item.title}</h3><strong className="service-time">{item.time}</strong><p>{item.note}</p><div className="service-line" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="sermons" className="section sermons-section">
          <div className="container">
            <SectionTitle eyebrow="LATEST MESSAGES" title="Watch Jubilee Sermons" text="Watch messages, worship and church videos from our official Jubilee Tamil Church YouTube channel." />
            <div className="sermon-grid">
              {sermons.map((sermon,index) => (
                <motion.a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="sermon-card" key={sermon.title} {...reveal} transition={{ duration: 0.6, delay: index * 0.08 }}>
                  <div className="sermon-image"><img src={sermon.image} alt={sermon.title} /><div className="sermon-overlay" /><span className="play-button"><Play fill="currentColor" /></span><span className="sermon-tag">{sermon.tag}</span></div>
                  <div className="sermon-body"><h3>{sermon.title}</h3><p>{sermon.speaker}</p></div>
                </motion.a>
              ))}
            </div>
            <div className="youtube-cta-wrap"><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold"><Youtube size={19} /> Open Latest Sermons on YouTube</a></div>
          </div>
        </section>

        <section className="quote-band"><div className="container quote-inner"><Quote /><p>“Come, let us bow down in worship, let us kneel before the Lord our Maker.”</p><span>Psalm 95:6</span></div></section>

        <section id="events" className="section events-section">
          <div className="container">
            <SectionTitle
              eyebrow="GATHER WITH US"
              title="Weekly Gatherings"
              text="Two regular gatherings where we worship, study the Word and grow together."
            />

            <div className="event-stack weekly-event-stack">
              {events.map((event, index) => (
                <motion.article
                  className="event-row weekly-event-row"
                  key={event.title}
                  {...reveal}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <div className="event-day">
                    <CalendarDays size={20} />
                    <span>{event.day}</span>
                  </div>

                  <img src={event.image} alt={event.title} />

                  <div className="event-info">
                    <span>{event.meta}</span>
                    <h3>{event.title}</h3>
                    <p>{event.note}</p>
                  </div>

                  <button
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    aria-label={`Learn more about ${event.title}`}
                  >
                    <ArrowRight />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <JubileeAlbums />

        <section id="leadership" className="section leadership-section">
          <div className="container">
            <SectionTitle eyebrow="SERVING THE HOUSE" title="Our Church Leadership" text="Meet the people faithfully serving, guiding and supporting the ministry of Jubilee Tamil Church." />
            <div className="leadership-cards">
              {churchLeadership.map((leader,index) => (
                <motion.article key={leader.name} className="leader-card" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.08 }}>
                  <div className="leader-photo">{leader.image ? <img src={leader.image} alt={leader.name} /> : <div className="leader-placeholder"><div className="leader-initials">{leader.initials}</div><span>Leadership</span></div>}<div className="leader-photo-overlay" /><div className="leader-cross"><Cross size={18} /></div></div>
                  <div className="leader-content"><span className="leader-role">{leader.role}</span><h3>{leader.name}</h3><div className="leader-gold-line" /></div>
                </motion.article>
              ))}
            </div>
            <div className="leadership-scripture"><Cross size={19} /><p>Serving Christ. Serving His Church.<span> Leading with faith, humility and love.</span></p></div>
          </div>
        </section>

        <section className="map-section">
          <div className="container"><div className="map-card"><div className="map-info"><span className="eyebrow">FIND US</span><h2>Visit Jubilee<br />Tamil Church</h2><p>Join us for worship, prayer and fellowship. We would love to welcome you and your family.</p><div className="map-details"><div><MapPin /><span><strong>Church Location</strong>Jubilee Tamil Church</span></div><div><Clock3 /><span><strong>Sunday Service</strong><span className="detail-value">9:45 AM – 11:30 AM</span></span></div></div><a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="map-button">Open in Google Maps <ArrowRight size={18} /></a></div><a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="map-preview" aria-label="Open Jubilee Tamil Church in Google Maps"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-pin"><MapPin size={34} /></div><div className="map-label">
                  <strong>Jubilee Tamil Church</strong>
                  <span>Click to open Google Maps</span>
                </div></a></div></div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>

              <h2 className="display-title light-title">
                You Belong
                <br />
                <span>Here.</span>
              </h2>

              <p>
                Whether you would like us to pray with you, have a question,
                or want to know more about Jubilee Tamil Church, send us a
                message. Our church team would be glad to hear from you.
              </p>

              <div className="contact-list">
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-link"
                >
                  <MapPin />

                  <span>
                    <strong>Visit Jubilee Tamil Church</strong>
                    Click here to open church location in Google Maps
                  </span>

                  <ArrowRight className="location-arrow" />
                </a>

                <div className="contact-detail-row">
                  <Clock3 />
                  <span className="contact-detail-copy">
                    <strong>Sunday Service</strong>
                    <span className="contact-detail-value">9:45 AM – 11:30 AM</span>
                  </span>
                </div>

                <div className="contact-detail-row">
                  <Mail />
                  <span className="contact-detail-copy">
                    <strong>Email</strong>
                    <span className="contact-detail-value">{CHURCH_EMAIL}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <div className="contact-type-switch" role="tablist" aria-label="Contact type">
                <button
                  type="button"
                  role="tab"
                  aria-selected={contactType === "Prayer Request"}
                  className={contactType === "Prayer Request" ? "active" : ""}
                  onClick={() => setContactType("Prayer Request")}
                >
                  Prayer Request
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={contactType === "Enquiry"}
                  className={contactType === "Enquiry" ? "active" : ""}
                  onClick={() => setContactType("Enquiry")}
                >
                  Enquiry
                </button>
              </div>

              <form
                className="contact-form glass-card"
                action={`https://formsubmit.co/${CHURCH_EMAIL}`}
                method="POST"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value={`Jubilee Tamil Church Website - ${contactType}`}
                />

                <input
                  type="hidden"
                  name="Request Type"
                  value={contactType}
                />

                <input
                  type="text"
                  name="_honey"
                  className="contact-honey"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="contact-form-heading">
                  <span>
                    {contactType === "Prayer Request"
                      ? "HOW CAN WE PRAY?"
                      : "HOW CAN WE HELP?"}
                  </span>

                  <h3>
                    {contactType === "Prayer Request"
                      ? "Send a Prayer Request"
                      : "Send an Enquiry"}
                  </h3>

                  <p>
                    {contactType === "Prayer Request"
                      ? "Share your prayer request with our church team."
                      : "Ask us anything about services, ministries, visits or church life."}
                  </p>
                </div>

                <label>
                  Name
                  <input
                    name="Name"
                    required
                    placeholder="Your name"
                  />
                </label>

                <label>
                  Email
                  <input
                    name="Email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Phone <span className="optional-label">(Optional)</span>
                  <input
                    name="Phone"
                    type="tel"
                    placeholder="Your phone number"
                  />
                </label>

                <label>
                  {contactType === "Prayer Request" ? "Prayer Request" : "Your Enquiry"}

                  <textarea
                    name="Message"
                    required
                    rows="5"
                    placeholder={
                      contactType === "Prayer Request"
                        ? "Please share how we can pray for you..."
                        : "Please write your enquiry here..."
                    }
                  />
                </label>

                <button className="btn btn-gold" type="submit">
                  {contactType === "Prayer Request"
                    ? "Send Prayer Request"
                    : "Send Enquiry"}

                  <ArrowRight size={18} />
                </button>

                <small className="contact-privacy-note">
                  Your message will be sent to Jubilee Tamil Church.
                </small>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><span className="brand-mark brand-logo"><img src={churchLogo} alt="Jubilee Tamil Church logo" /></span><div><strong>JUBILEE</strong><small>TAMIL CHURCH</small></div><p>Worship. Word. Community. Mission.</p></div><div><strong>Explore</strong>{["about","services","sermons","events","gallery"].map((id) => <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>{id[0].toUpperCase()+id.slice(1)}</button>)}</div><div><strong>Connect</strong><a href={`mailto:${CHURCH_EMAIL}`}>Email Us</a><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Prayer Request</button><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Plan a Visit</a><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">Watch Sermons</a></div><div><strong>Follow</strong><div className="socials"><a href="#" aria-label="Facebook"><Facebook /></a><a href="#" aria-label="Instagram"><Instagram /></a><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="Jubilee Tamil Church YouTube"><Youtube /></a></div></div></div><div className="container footer-bottom">© {new Date().getFullYear()} Jubilee Tamil Church. All rights reserved.</div></footer>
      <Chatbot />
    </div>
  );
}
