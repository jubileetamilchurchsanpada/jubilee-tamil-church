import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import churchImg from "../assets/church.jpg";

export default function ChurchInfoCorrections() {
  const [weeklyTarget, setWeeklyTarget] = useState(null);

  useEffect(() => {
    const yearBadge = document.querySelector(".church-story-year-badge strong");
    const storyFounded = document.querySelector(".church-story-lead strong");
    const foundedStat = document.querySelector(".church-story-stats > div:first-child strong");
    const weeklyCopy = document.querySelector("#events .section-title p");
    const target = document.querySelector("#events .weekly-event-stack");

    if (yearBadge) yearBadge.textContent = "1996";
    if (storyFounded) storyFounded.textContent = "15 August 1996";
    if (foundedStat) foundedStat.textContent = "1996";
    if (weeklyCopy) {
      weeklyCopy.textContent =
        "Regular weekly gatherings at our Sanpada and Ulwe churches for worship, Bible study and fellowship.";
    }

    setWeeklyTarget(target);
  }, []);

  if (!weeklyTarget) return null;

  return createPortal(
    <article className="event-row weekly-event-row ulwe-weekly-gathering">
      <div className="event-day">
        <CalendarDays size={20} />
        <span>SUNDAY</span>
      </div>

      <img src={churchImg} alt="Jubilee Tamil Church Ulwe Sunday Service" />

      <div className="event-info">
        <span>8:00 AM – 9:30 AM</span>
        <h3>Sunday Service – Ulwe</h3>
        <p>Sunday worship at Jubilee Tamil Church – Ulwe.</p>
      </div>

      <button
        type="button"
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Learn more about the Ulwe Sunday Service"
      >
        <ArrowRight />
      </button>
    </article>,
    weeklyTarget
  );
}
