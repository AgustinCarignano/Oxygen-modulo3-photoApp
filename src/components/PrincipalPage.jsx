import React from "react";
import { Link } from "react-router-dom";
import "./componentsStyle.css";
import MyButton from "./MyButton";

function PrincipalPage() {
  return (
    <div className="principalPage">
      <section className="principalPage__brand">
        <div className="principalPage__brand-bgContainer">
          <div className="principalPage__brand-bg"></div>
          <h1 className="principalPage__brand-title">
            Search through thousands of photos. Save them to your personal
            collection, add a description, or download them.
            <strong>It's totally free!</strong>
          </h1>
        </div>
        <h2 className="principalPage__brand-subTitle">
          Start searching now or browse your collection.
        </h2>
        <div className="principalPage__brand-btns">
          <Link to="/photo-app/searchPhotos">
            <MyButton text="Search" margin={{ top: "-5px", btm: "50px" }} />
          </Link>
          <Link to="/photo-app/myCollection">
            <MyButton
              text="My Collection"
              margin={{ top: "-5px", btm: "50px" }}
            />
          </Link>
        </div>
      </section>
      <section className="principalPage__catalog">
        <h2 className="principalPage__catalog-title">
          Find the photo you are looking for, it's as simple as that.
        </h2>
        <figure className="principalPage__catalog-figure figure_1">
          <img src="https://i.imgur.com/T2YVU0H.jpg" alt="cute cat" />
          <figcaption>Cute photos</figcaption>
        </figure>
        <figure className="principalPage__catalog-figure figure_2">
          <img src="https://i.imgur.com/eBs9KmW.jpg" alt="buble background" />
          <figcaption>Backgrounds</figcaption>
        </figure>
        <figure className="principalPage__catalog-figure figure_3">
          <img
            src="https://i.imgur.com/pOIrHyk.jpg"
            alt="lake and mountain landscape"
          />
          <figcaption>Amazing landscapes</figcaption>
        </figure>
        <span className="shape1"></span>
        <span className="shape2"></span>
      </section>
      <section className="principalPage__endPage">
        <h3 className="principalPage__endPage-title">And much more...</h3>
        <Link to="/photo-app/searchPhotos">
          <MyButton text="Start now" margin={{ top: "-5px", btm: "50px" }} />
        </Link>
      </section>
    </div>
  );
}

export default PrincipalPage;
