import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";
import "./JubileeAlbumsEnhancements.css";

import churchImg from "../assets/church.jpg";
import worshipImg from "../assets/worship.jpg";
import communityImg from "../assets/community.jpg";
import eventImg from "../assets/event.png";

import anniversary01 from "../assets/jubilee-albums/anniversary/anniversary-01.jpg";
import anniversary02 from "../assets/jubilee-albums/anniversary/anniversary-02.jpg";

import mdcm01 from "../assets/jubilee-albums/mdcm/mdcm-01.jpg";
import mdcm02 from "../assets/jubilee-albums/mdcm/mdcm-02.jpg";
import mdcm03 from "../assets/jubilee-albums/mdcm/mdcm-03.jpg";

import mens01 from "../assets/jubilee-albums/mens-fellowship/mens-01.jpg";
import mens02 from "../assets/jubilee-albums/mens-fellowship/mens-02.jpg";
import mens03 from "../assets/jubilee-albums/mens-fellowship/mens-03.jpg";

import womensFellowship01 from "../assets/jubilee-albums/womens-fellowship/womens-fellowship-01.jpg";
import womensFellowship02 from "../assets/jubilee-albums/womens-fellowship/womens-fellowship-02.jpg";

import womensDay01 from "../assets/jubilee-albums/womens-day/womens-day-01.jpg";
import womensDay02 from "../assets/jubilee-albums/womens-day/womens-day-02.jpg";

import sundaySchool01 from "../assets/jubilee-albums/sunday-school/sunday-school-01.jpg";
import sundaySchool02 from "../assets/jubilee-albums/sunday-school/sunday-school-02.jpg";

import christmas01 from "../assets/jubilee-albums/christmas-carols/christmas-01.jpg";
import christmas02 from "../assets/jubilee-albums/christmas-carols/christmas-02.jpg";

const drivePhoto = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const DRIVE_PHOTOS = {
  mdcm: [
    drivePhoto("1-4-RFiFmKppfEzs_q7LCze0wazdL1O1e"),
    drivePhoto("1LBTvxZS4qe7daUu0Z-C6ZVX96JpKFKeL"),
    drivePhoto("1DMXpSb-i2GaArYo5vXaGi5CpRFKLVBaa"),
  ],
  mens: [
    drivePhoto("1CXItNKVzsnZAJl_eneVG-CCnpNsNikH_"),
    drivePhoto("1JccAMqV4p4UDRUqlEvQKodkbOnEHJeB8"),
    drivePhoto("1tHaWJXPEapHfWMm_2YkvEOjACx_r7vMj"),
  ],
  womensFellowship: [
    drivePhoto("1RUWHXbH0-xKT2_4O_yC-3LRS4KqB4QI1"),
    drivePhoto("14CApskE9TT7H4P8RGdfA9J-Q7dP6u8Bz"),
  ],
  womensDay: [drivePhoto("1dlBTr0RGYVLp4KQhmVGH1mNyb5mL8qBe")],
  christmas: [
    drivePhoto("1Uk_HyPZhcYaCm5HL5UZ9uYrX1MQEDLiG"),
    drivePhoto("1uZv7E9njdNLDDdO7qhX7jEsPJkSokBOi"),
    drivePhoto("1EiMd-B5UJ55K7nZWaFR6IJPxC4zUNoBh"),
  ],
};

const albums = [
  {
    id: "anniversary-30",
    title: "30th Jubilee Tamil Church Anniversary",
    group: "Anniversary",
    comingSoon: false,
    cover: anniversary01,
    fallback: anniversary02,
    images: [anniversary01, anniversary02],
    folderUrl:
      "https://drive.google.com/drive/folders/1HzRW60bqdak-8GauUZ9ltp0bb27VWQRY",
  },
  {
    id: "mdcm-children-2026",
    title: "25th MDCM Children Sunday 2026",
    group: "Fellowship Sundays",
    comingSoon: false,
    cover: DRIVE_PHOTOS.mdcm[0],
    fallback: mdcm02,
    images: [...DRIVE_PHOTOS.mdcm, mdcm01, mdcm02, mdcm03],
    folderUrl:
      "https://drive.google.com/drive/folders/16EAQhCqoJfFoNmPaVF_Slg09lHMRxIPb",
  },
  {
    id: "womens-fellowship",
    title: "Women's Fellowship Sunday",
    group: "Fellowship Sundays",
    comingSoon: false,
    cover: DRIVE_PHOTOS.womensFellowship[0],
    fallback: womensFellowship01,
    images: [
      ...DRIVE_PHOTOS.womensFellowship,
      womensFellowship01,
      womensFellowship02,
    ],
    folderUrl:
      "https://drive.google.com/drive/folders/1lqJmRlfSeBqqnnELEhtmKmjgpV3C2DIX",
  },
  {
    id: "mens-fellowship",
    title: "Men's Fellowship Sunday",
    group: "Fellowship Sundays",
    comingSoon: false,
    cover: DRIVE_PHOTOS.mens[0],
    fallback: mens01,
    images: [...DRIVE_PHOTOS.mens, mens01, mens02, mens03],
    folderUrl:
      "https://drive.google.com/drive/folders/1tYQGxYhpP-UnIbMk13NgB5UTlynQRLcj",
  },
  {
    id: "youth-sunday",
    title: "Youth Sunday",
    group: "Fellowship Sundays",
    comingSoon: true,
    art: "youth",
    artIcon: "Y",
    images: [],
  },
  {
    id: "harvest-festival",
    title: "Harvest Festival",
    group: "Harvest Festival",
    comingSoon: true,
    art: "harvest",
    artIcon: "✦",
    images: [],
  },
  {
    id: "vbs",
    title: "Vacation Bible School",
    group: "VBS",
    comingSoon: true,
    art: "vbs",
    artIcon: "VBS",
    images: [],
  },
  {
    id: "christmas-carols",
    title: "Christmas Carols Service & Program",
    group: "Christmas",
    comingSoon: false,
    cover: DRIVE_PHOTOS.christmas[0],
    fallback: christmas01,
    images: [...DRIVE_PHOTOS.christmas, christmas01, christmas02],
    folderUrl:
      "https://drive.google.com/drive/folders/1WVM7uk_uY9ebR58Sai81XwtPmSLdOaCH",
  },
  {
    id: "womens-day",
    title: "Women's Day 2026",
    group: "Others",
    comingSoon: false,
    cover: DRIVE_PHOTOS.womensDay[0],
    fallback: womensDay02,
    images: [...DRIVE_PHOTOS.womensDay, womensDay01, womensDay02],
    folderUrl:
      "https://drive.google.com/drive/folders/1IexENfCDAB9-ncGB7RIU2kkF3uI0OWfi",
  },
  {
    id: "sunday-school-exhibition",
    title: "Sunday School Exhibition 2026",
    group: "Others",
    comingSoon: false,
    cover: sundaySchool01,
    fallback: sundaySchool02,
    images: [sundaySchool01, sundaySchool02],
    folderUrl:
      "https://drive.google.com/drive/folders/1KvEwmd0NzSOWAK863Ikcb5KDcpGymCqE",
  },
  {
    id: "palm-sunday",
    title: "Palm Sunday 2026",
    group: "Others",
    comingSoon: true,
    art: "palm",
    artIcon: "✝",
    images: [],
    folderUrl:
      "https://drive.google.com/drive/folders/1Ta-wmtP2usQyP5JjMmDtJ4Rbc_Vv0lPw",
  },
  {
    id: "new-year",
    title: "New Year Celebration",
    group: "Others",
    comingSoon: true,
    art: "newyear",
    artIcon: "2027",
    images: [],
  },
];

const filters = [
  "All",
  "Fellowship Sundays",
  "Harvest Festival",
  "VBS",
  "Christmas",
  "Anniversary",
  "Others",
];

export default function JubileeAlbums() {
  const [filter, setFilter] = useState("All");
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const visibleAlbums = useMemo(() => {
    if (filter === "All") return albums;
    return albums.filter((album) => album.group === filter);
  }, [filter]);

  const closeAlbum = () => {
    setActiveAlbum(null);
    setActiveImage(0);
  };

  const previousImage = () => {
    if (!activeAlbum || activeAlbum.comingSoon || !activeAlbum.images.length) return;
    setActiveImage((current) =>
      current === 0 ? activeAlbum.images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    if (!activeAlbum || activeAlbum.comingSoon || !activeAlbum.images.length) return;
    setActiveImage((current) =>
      current === activeAlbum.images.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (!activeAlbum) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") closeAlbum();
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeAlbum]);

  const handleImageError = (event, fallback = eventImg) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") return;
    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallback || eventImg;
  };

  return (
    <>
      <section id="gallery" className="section jubilee-gallery-section">
        <div className="container">
          <div className="jubilee-gallery-heading">
            <span className="eyebrow">MOMENTS TOGETHER</span>
            <h2>Life at Jubilee</h2>
            <p>
              Explore fellowship Sundays, celebrations and church family moments.
              Albums with available photos open full-screen; upcoming albums are
              clearly marked as Coming Soon.
            </p>
          </div>

          <div className="jubilee-album-filters">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <motion.div layout className="jubilee-album-grid">
            <AnimatePresence mode="popLayout">
              {visibleAlbums.map((album, index) => (
                <motion.button
                  layout
                  key={album.id}
                  type="button"
                  className="jubilee-album-card"
                  onClick={() => {
                    setActiveAlbum(album);
                    setActiveImage(0);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: index * 0.025 }}
                >
                  <div className="jubilee-album-image">
                    {album.comingSoon ? (
                      <div className={`jubilee-coming-art ${album.art || ""}`}>
                        <span className="coming-icon">{album.artIcon || "✦"}</span>
                        <strong>{album.title}</strong>
                        <small>Photos Coming Soon</small>
                      </div>
                    ) : (
                      <img
                        className={String(album.cover).includes("drive.google.com") ? "drive-photo" : ""}
                        src={album.cover}
                        alt={album.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(event) => handleImageError(event, album.fallback)}
                      />
                    )}

                    <div className="jubilee-album-shade" />

                    {album.comingSoon && (
                      <span className="jubilee-coming-badge">Coming Soon</span>
                    )}

                    <span className="jubilee-photo-count">
                      <Images size={15} />
                      {album.comingSoon ? "Photos Soon" : `${album.images.length} Photos`}
                    </span>
                  </div>

                  <div className="jubilee-album-body">
                    <span className="jubilee-album-category">{album.group}</span>
                    <h3>{album.title}</h3>

                    <div className="jubilee-album-open">
                      {album.comingSoon ? "Preview" : "View Photos"}
                      <ArrowRight size={17} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeAlbum && (
          <motion.div
            className="jubilee-album-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <header className="jubilee-viewer-header">
              <button
                className="jubilee-viewer-back"
                onClick={closeAlbum}
                type="button"
              >
                <ArrowLeft size={18} />
                Back to Gallery
              </button>

              <div className="jubilee-viewer-title">
                <span>{activeAlbum.group}</span>
                <h3>{activeAlbum.title}</h3>
              </div>

              <button
                type="button"
                className="jubilee-viewer-close"
                onClick={closeAlbum}
                aria-label="Close album"
              >
                <X />
              </button>
            </header>

            <div className="jubilee-viewer-stage">
              {activeAlbum.comingSoon ? (
                <div className="jubilee-viewer-coming-art">
                  <span>Coming Soon</span>
                  <h4>{activeAlbum.title}</h4>
                  <p>
                    We are preparing this album. Photos from this event will be
                    added here as soon as they are available.
                  </p>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="jubilee-viewer-arrow previous"
                    onClick={previousImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </button>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeAlbum.id}-${activeImage}`}
                      src={activeAlbum.images[activeImage]}
                      alt={`${activeAlbum.title} photo ${activeImage + 1}`}
                      className="jubilee-viewer-main-image"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.3 }}
                      referrerPolicy="no-referrer"
                      onError={(event) => handleImageError(event, activeAlbum.fallback)}
                    />
                  </AnimatePresence>

                  <button
                    type="button"
                    className="jubilee-viewer-arrow next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            <div className="jubilee-viewer-bottom">
              {!activeAlbum.comingSoon && (
                <>
                  <div className="jubilee-viewer-counter">
                    <strong>{activeImage + 1}</strong>
                    <span>/</span>
                    <span>{activeAlbum.images.length}</span>
                  </div>

                  <div className="jubilee-viewer-thumbnails">
                    {activeAlbum.images.map((image, index) => (
                      <button
                        type="button"
                        key={`${activeAlbum.id}-${index}`}
                        className={activeImage === index ? "active" : ""}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View photo ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(event) => handleImageError(event, activeAlbum.fallback)}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeAlbum.folderUrl && (
                <a
                  href={activeAlbum.folderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jubilee-drive-link"
                >
                  Open Full Drive Album
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
