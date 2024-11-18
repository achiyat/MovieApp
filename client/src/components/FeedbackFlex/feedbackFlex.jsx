// client/src/components/FeedbackFlex/feedbackFlex.jsx
import React from "react";
import { Comments } from "../Comments/comments";
import { Reviews } from "../Reviews/reviews";
import "./feedbackFlex.css";

export const FeedbackFlex = (props) => {
  return (
    <div className="flex-container gap-feedback">
      <section className="sub-container" id="comments">
        <Comments />
      </section>
      <section className="sub-container" id="reviews">
        <Reviews />
      </section>
    </div>
  );
};
