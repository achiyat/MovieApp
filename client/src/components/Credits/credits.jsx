// client/src/components/Credits/credits.jsx
import React from "react";
import "./credits.css";
import { getActors, getDirectors, imgUrl } from "../../Utils/movieUtils";

export const Credits = ({ movie }) => {
  const actors = getActors(movie);
  const profile = "/media/images/profile.jpg";
  const directors = getDirectors(movie);

  return (
    <div className="credits-main-div">
      <div className="credits-directorsList">
        <h2 className="sectionTitle">Directors</h2>
        <ul>
          {directors?.map((director) => {
            const image = director.profile_path
              ? `${imgUrl}${director.profile_path}`
              : profile;

            return (
              <li key={director.id}>
                <img src={image} alt={director.name} />
                <span>{director.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="credits-actorsList">
        <h2 className="sectionTitle">Main Actors</h2>
        <ul>
          {actors?.map((actor) => {
            const image = actor.profile_path
              ? `${imgUrl}${actor.profile_path}`
              : profile;

            return (
              <li key={actor.id}>
                <img src={image} alt={actor.name} />
                <span>{actor.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
