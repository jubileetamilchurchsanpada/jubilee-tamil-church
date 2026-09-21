import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Radio, Youtube } from "lucide-react";
import "./LatestSermonEnhancer.css";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@jubileetamilchurch232";
const UPLOADS_PLAYLIST = "UUMQwsPfqhArn2R3-mn2UHNg";
const EMBED_URL = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}&rel=0`;

export default function LatestSermonEnhancer() {
  const [host, setHost] = useState(null);

  useEffect(() => {
    const section = document.getElementById("sermons");
    if (!section) return undefined;

    const grid = section.querySelector(".sermon-grid");
    const container = section.querySelector(".container");
    if (!grid || !container) return undefined;

    const portalHost = document.createElement("div");
    portalHost.className = "latest-service-portal-host";
    container.insertBefore(portalHost, grid);
    setHost(portalHost);

    const heroSermonLink = document.querySelector(".hero-actions a");
    const originalHref = heroSermonLink?.getAttribute("href");
    const originalTarget = heroSermonLink?.getAttribute("target");

    const scrollToLatest = (event) => {
      event.preventDefault();
      document.getElementById("sermons")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (heroSermonLink) {
      heroSermonLink.setAttribute("href", "#sermons");
      heroSermonLink.removeAttribute("target");
      heroSermonLink.addEventListener("click", scrollToLatest);
    }

    return () => {
      portalHost.remove();
      if (heroSermonLink) {
        heroSermonLink.removeEventListener("click", scrollToLatest);
        if (originalHref) heroSermonLink.setAttribute("href", originalHref);
        else heroSermonLink.removeAttribute("href");
        if (originalTarget) heroSermonLink.setAttribute("target", originalTarget);
      }
    };
  }, []);

  if (!host) return null;

  return createPortal(
    <section className="latest-service-feature" aria-label="Latest Jubilee Tamil Church service">
      <div className="latest-service-copy">
        <span className="latest-service-kicker"><Radio size={15} /> LATEST SERVICE</span>
        <h3>Watch Our Latest Sunday Service</h3>
        <p>
          Watch the newest service from the official Jubilee Tamil Church YouTube channel.
          The player automatically follows the latest uploads from the church.
        </p>
        <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="latest-service-channel-link">
          <Youtube size={18} /> Visit YouTube Channel <ExternalLink size={15} />
        </a>
      </div>

      <div className="latest-service-player-wrap">
        <iframe
          className="latest-service-player"
          src={EMBED_URL}
          title="Latest Jubilee Tamil Church service"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>,
    host
  );
}
