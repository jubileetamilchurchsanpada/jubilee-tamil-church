import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import "./UlweBranch.css";

const ULWE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Jubilee+Tamil+Church+Ulwe+Bay+Bliss+Sector+9+Ulwe+Gavthan+Maharashtra+410206";

export default function UlweBranch() {
  const [aboutTarget, setAboutTarget] = useState(null);
  const [mapHost, setMapHost] = useState(null);
  const [sanpadaHeadingTarget, setSanpadaHeadingTarget] = useState(null);
  const [sanpadaLocationTarget, setSanpadaLocationTarget] = useState(null);
  const [sanpadaMapLabelTarget, setSanpadaMapLabelTarget] = useState(null);

  useEffect(() => {
    const about = document.querySelector(".church-story-copy");
    const sanpadaMapSection = document.querySelector(".map-section");

    setAboutTarget(about);

    if (!sanpadaMapSection) return undefined;

    setSanpadaHeadingTarget(sanpadaMapSection.querySelector(".map-info h2"));
    setSanpadaLocationTarget(
      sanpadaMapSection.querySelector(".map-details > div:first-child > span")
    );
    setSanpadaMapLabelTarget(sanpadaMapSection.querySelector(".map-label strong"));

    const host = document.createElement("div");
    host.className = "ulwe-map-host";
    sanpadaMapSection.insertAdjacentElement("afterend", host);
    setMapHost(host);

    return () => {
      host.remove();
    };
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

  const ulweMapContent = (
    <section className="map-section ulwe-map-section" aria-label="Jubilee Tamil Church Ulwe location">
      <div className="container">
        <div className="map-card ulwe-map-card">
          <div className="map-info">
            <span className="eyebrow">ULWE BRANCH</span>
            <h2>
              Visit Jubilee
              <br />
              Tamil Church – Ulwe
            </h2>
            <p>
              Join us at our Ulwe branch for worship, prayer, fellowship and the Word.
              We would love to welcome you and your family.
            </p>

            <div className="map-details">
              <div>
                <MapPin />
                <span>
                  <strong>Church Location</strong>
                  <span className="detail-value ulwe-address">
                    Bay Bliss, Sector 9, Ulwe, Gavthan, Maharashtra 410206
                  </span>
                </span>
              </div>

              <div>
                <Clock3 />
                <span>
                  <strong>Sunday Service</strong>
                  <span className="detail-value">8:00 AM – 9:30 AM</span>
                </span>
              </div>

              <div>
                <CalendarDays />
                <span>
                  <strong>Founded</strong>
                  <span className="detail-value">14 September 2023</span>
                </span>
              </div>
            </div>

            <a
              href={ULWE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="map-button"
            >
              Open Ulwe in Google Maps <ArrowRight size={18} />
            </a>
          </div>

          <a
            href={ULWE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="map-preview ulwe-map-preview"
            aria-label="Open Jubilee Tamil Church Ulwe in Google Maps"
          >
            <div className="map-grid" />
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-pin"><MapPin size={34} /></div>
            <div className="map-label">
              <strong>Jubilee Tamil Church – Ulwe</strong>
              <span>Click to open Google Maps</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {aboutTarget && createPortal(aboutContent, aboutTarget)}

      {sanpadaHeadingTarget &&
        createPortal(<span className="sanpada-suffix"> – Sanpada</span>, sanpadaHeadingTarget)}

      {sanpadaLocationTarget &&
        createPortal(<span className="sanpada-inline-suffix"> – Sanpada</span>, sanpadaLocationTarget)}

      {sanpadaMapLabelTarget &&
        createPortal(<span className="sanpada-inline-suffix"> – Sanpada</span>, sanpadaMapLabelTarget)}

      {mapHost && createPortal(ulweMapContent, mapHost)}
    </>
  );
}
