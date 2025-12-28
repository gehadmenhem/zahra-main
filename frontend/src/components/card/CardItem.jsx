import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <li className="cards__item">
      <Link className="cards__item__link" to={props.path}>
        <div className="cards__icon-wrap">
          <img
            className="cards__icon"
            src={props.src}
            alt={props.label}
          />
        </div>
        <div className="cards__item__info">
          <h3 className="cards__item__label">{props.label}</h3>
          <p className="cards__item__text">{props.text}</p>
          <button className="cards__read-more">READ MORE</button>
        </div>
      </Link>
    </li>
  );
}

export default CardItem;
