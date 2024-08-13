// client/src/components/Comments/comments.jsx
import React, { useState } from "react";
import { commentsData as data } from "../../dictionaries/commentsData";
import "./comments.css";

export const Comments = (props) => {
  const [likedComments, setLikedComments] = useState({});

  const handleLikeClick = (id) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !(id in prev) ? true : !prev[id],
    }));
  };

  const renderHearts = (id, like) => {
    const isLiked = likedComments[id];
    const likes = isLiked ? like + 1 : like;
    const heartSymbol = isLiked ? "❤️" : "🤍";

    return (
      <span className="comments-likes" onClick={() => handleLikeClick(id)}>
        {`${likes} ${heartSymbol}`}
      </span>
    );
  };

  return (
    <>
      <h2 className="sectionTitle">{`💬 ${data.count} Comments`}</h2>
      <div className="comments-scroll">
        {data?.comments.map((comment) => {
          return (
            <div className="comments-card" key={comment.id}>
              <img
                src={`${comment.image}`}
                alt={`${comment.written_by}'s profile`}
                className="comments-profileImg"
              />
              <div className="comments-details">
                <div className="comments-header">
                  <span>
                    <span className="comments-username">
                      {comment.written_by}
                    </span>
                    <span className="comments-createdAt">
                      {comment.created_at}
                    </span>
                  </span>
                  {renderHearts(comment.id, comment.like)}
                </div>
                <div className="comments-text">{comment.comment}</div>
              </div>
            </div>
          );
        })}
        <button className="load-more-button">Load more comments</button>
      </div>
    </>
  );
};
