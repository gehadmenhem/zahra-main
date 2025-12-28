import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./carcard.css";
import ImageCarouselModal from "../imageCarouselModal/ImageCarouselModal";

export default function CarCard({
  path,
  label,
  imageBase64,
  status,
  title,
  description = "No description provided.",
  year,
  model,
  imageCount,
  price,
  newPrice,
  carInfo // <-- add images array of base64 strings
}) {
  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isLong = description?.length > 200;
  const displayedText = showMore ? description : description?.slice(0, 200);

  // Open modal at first image (index 0)
  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <li className="card">
    <Link className="card__link" to={path}>
          <div className="card__image-wrapper" data-category={label}>
            <img
              className="card__image"
              alt={title}
              src={`data:image/jpeg;base64,${imageBase64}`}
              onClick={openModal }
              style={{ cursor: "pointer" }}
            />
            <div className="card__image-count">
                  📷   1 / {imageCount}
            </div>
            {!status && (
              <span className={`card__ribbon ${status}`}>
                SOLD
              </span>
            )}
          </div>
          <div className="card__info">
            <h5 className="card__title">{title?.toUpperCase()}</h5>
            <h5 className="card__model">{model?.toUpperCase() + " " + year}</h5>
            <h5 className="card__model">
              {newPrice ? (
                <>
                  <span className="old-price">{price} CAD</span>{" "}
                  <span className="new-price">{newPrice} CAD</span>
                </>
              ) : (
                <span className="new-price">{price} CAD</span>
              )}
            </h5>
            {/* <p className={`card__description ${showMore ? "expanded" : ""}`}>
              {displayedText}
            </p> */}
            {/* {isLong && (
              <span
                className="card__toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show less" : "... Show more"}
              </span>
            )} */}
          </div>
        </Link>
      </li>

      {/* Modal for image carousel */}
      {modalOpen && (
  <ImageCarouselModal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    startIndex={0}
    carInfo={carInfo}
  />
)}

    </>
  );
}
