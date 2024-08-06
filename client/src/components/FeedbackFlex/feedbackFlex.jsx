// feedbackFlex.jsx
import React from "react";
import { Comments } from "../Comments/comments";
import { Reviews } from "../Reviews/reviews";
import "./feedbackFlex.css";

export const FeedbackFlex = (props) => {
  return (
    <div className="flex-container-2">
      <section className="sub-container" id="comments">
        <Comments />
      </section>
      <section className="sub-container" id="reviews">
        <Reviews />
      </section>
    </div>
  );
};
