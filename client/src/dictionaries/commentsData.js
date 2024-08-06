import profile from "../media/images/profile.jpg";

const date = new Date();
const dateOptions = { year: "numeric", month: "long", day: "numeric" };
const timeOptions = { hour: "2-digit", minute: "2-digit" };

const getDate = (days) => {
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", dateOptions);
};

const getTime = (hours) => {
  date.setHours(date.getHours() + hours);
  return date.toLocaleTimeString("en-US", timeOptions);
};

const randomCount = Math.floor(Math.random() * 101) + 100;

export const commentsData = {
  count: randomCount,
  comments: [
    {
      id: 1234,
      written_by: "Lala2",
      image: profile,
      created_at: `${getDate(-2)} at ${getTime(-5)}`,
      like: 7,
      comment: "Loved the storyline! The ending was unexpected.",
    },
    {
      id: 5678,
      written_by: "pipokay1998",
      image: profile,
      created_at: `${getDate(-5)} at ${getTime(-3)}`,
      like: 5,
      comment: "Great acting! Do you think there will be a sequel?",
    },
    {
      id: 9101,
      written_by: "SamManJam",
      image: profile,
      created_at: `${getDate(-1)} at ${getTime(-2)}`,
      like: 8,
      comment: "Really enjoyed it! The special effects were amazing.",
    },
    {
      id: 1121,
      written_by: "MovieBuff77",
      image: profile,
      created_at: `${getDate(-4)} at ${getTime(-6)}`,
      like: 6,
      comment: "Amazing visuals! The cinematography was top-notch.",
    },
    {
      id: 3141,
      written_by: "CinephileJane",
      image: profile,
      created_at: `${getDate(-3)} at ${getTime(-1)}`,
      like: 9,
      comment: "A must-watch. What did everyone think of the plot twist?",
    },
    {
      id: 5161,
      written_by: "FanaticFilmGuy",
      image: profile,
      created_at: `${getDate(-6)} at ${getTime(-4)}`,
      like: 4,
      comment: "Pretty good! The pacing was a bit slow though.",
    },
    {
      id: 7181,
      written_by: "MovieLover85",
      image: profile,
      created_at: `${getDate(-7)} at ${getTime(-7)}`,
      like: 7,
      comment: "Great soundtrack! The music fit the scenes perfectly.",
    },
    {
      id: 9202,
      written_by: "CinemaFan42",
      image: profile,
      created_at: `${getDate(-8)} at ${getTime(-9)}`,
      like: 5,
      comment: "Quite entertaining. Was anyone else surprised by the ending?",
    },
    {
      id: 1222,
      written_by: "FlickWatcher",
      image: profile,
      created_at: `${getDate(-9)} at ${getTime(-8)}`,
      like: 8,
      comment: "Very thrilling! What did you think of the main character?",
    },
    {
      id: 3242,
      written_by: "FilmCritic2024",
      image: profile,
      created_at: `${getDate(-10)} at ${getTime(-6)}`,
      like: 10,
      comment: "Incredible movie! Would you recommend it to friends?",
    },
  ],
};

// console.log(comments);
