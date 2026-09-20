import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import "./UlweBranch.css";

const ULWE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Jubilee+Tamil+Church+Ulwe+Bay+Bliss+Sector+9+Ulwe+Gavthan+Maharashtra+410206";

export default function UlweBranch() {
  const [aboutTarget, setAboutTarget] = useState(null);
  const [footerTarget, setFooterTarget] = useState(null);

  useEffect(() => {
    setAboutTarget(document.querySelector(".church-story-copy"));
    setFooterTarget(document.querySelector(".footer .footer-grid"));
  }, []);

  const aboutContent = (
    <div className="ulwe-story-note">
      <span className="ulwe-story-kicker">OUR ULWE BRANCH</span>
      <h3>Jubilee Tamil Church – Ulwe</h3>
      <p>
        As the Jubilee family continued to grow, the Ulwe branch was founded on
        <strong> 14 September 2023</strong>, extending the church's ministry of
        worship, prayer, fellowship and the Word to families in and around Ulwe.
      </p>

      <div className="ulwe-story-meta">
        <span><CalendarDays /> Founded 14 September 2023</span>
        <span><Clock3 /> Sunday Service: 8:00 AM – 9:30 AM</span>
      </div>

      <a
        className="ulwe-story-link"
        href={ULWE_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Ulwe Location <ArrowRight />
      </a>
    </div>
  );

  const footerContent = (
    <div className="ulwe-footer-branch">
      <span className="ulwe-footer-kicker">ULWE BRANCH</span>
      <h3>Jubilee Tamil Church – Ulwe</h3>

      <a
        href={ULWE_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ulwe-footer-address"
      >
        <MapPin />
        <span>
          Bay Bliss, Sector 9, Ulwe, Gavthan,
          <br />
          Maharashtra 410206
        </span>
      </a>

      <div className="ulwe-footer-meta">
        <span><Clock3 /> Sunday Service: 8:00 AM – 9:30 AM</span>
        <span><CalendarDays /> Founded 14 September 2023</span>
      </div>

      <a
        href={ULWE_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ulwe-footer-map-link"
      >
        Open Ulwe Location in Google Maps <ArrowRight />
      </a>
    </div>
  );

  return (
    <>
      {aboutTarget && createPortal(aboutContent, aboutTarget)}
      {footerTarget && createPortal(footerContent, footerTarget)}
    </>
  );
}
