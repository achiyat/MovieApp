# 💻 Movie App

Here is a video presentation of the project:
[Watch the video](https://www.youtube.com/watch?v=EjpljOppoMI)

View the project on the live website:
[View the Live Website](https://movieapp-lgry.onrender.com/)

Or you can visit my website and watch it there:
[Click here](https://resume-achiya-tzuriel.netlify.app/)

The project was tested and scored: ⭐⭐⭐⭐⭐

## Overview
**The Movies App** is a full web application that allows users to explore and discover movies by displaying detailed information taken from a third-party API (TMDB). Users can browse different movie categories, get an overview of the movie, watch trailers, cast details, reviews and even read comments from other users. The app is designed with a responsive layout to ensure a smooth experience on all devices.

## 📝 Key Features
### 1. **Interactive User Interface**
The app features an intuitive interface that provides users with a search engine for each movie and get relevant data collected directly from the API. On the home page, carousels of movies classified according to different categories are displayed. You can also click on any movie to view in-depth details such as movie overview, cast, trailer, reviews and similar movies.

### 2. **Back-End Integration**
- **API Handling:** The application integrates with the TMDB API to fetch real-time data about movies. The back-end securely handles API keys and acts as a middle layer between the client and external services to ensure security.
  
### 3. **Responsive Design**
The app is fully responsive, ensuring a seamless experience on desktops, tablets, and mobile devices. The layout adapts based on the device screen size to maintain usability and aesthetic appeal.

## 🛠️ Technologies Used

- **Frontend:** React, Router-DOM for page navigation and routing, CSS for styling
- **Backend:** Node.js, Express
- **API:** The Movie Database (TMDB) API

## 📸 Image Gallery

<p align="center">
  <img src="https://resume-achiya-tzuriel.netlify.app/static/media/movie1.4330e29e89c990899f2a.jpg" width="350"/>
  <img src="https://resume-achiya-tzuriel.netlify.app/static/media/movie2.4fa5c7fbaab2265e3244.jpg" width="350"/>
  <img src="https://resume-achiya-tzuriel.netlify.app/static/media/movie3.980045da10927a16237c.jpg" width="350"/>
  <img src="https://resume-achiya-tzuriel.netlify.app/static/media/movie4.730c1d9de1df7d125627.jpg" width="350"/>
</p>

## 📥 Installation

To set up and run the Movie App locally, follow these steps:

### Prerequisites
Make sure you have Node.js and npm installed.

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/achiyat/MovieApp.git
    ```
    
2. **Set up environment variables**:
   - Create a `.env` file in the `server` directory and add your API key for TMDB:
    ```plaintext
    PIXABAY_API_KEY=your_pixabay_api_key
    PORT=5000
    ```
    
3. **Install dependencies for the client**:
   Navigate to the `client` directory and run:
   ```bash
   cd client
   npm install
   ```

4. **Install dependencies for the server**:
   Navigate to the `server` directory and run:
   ```bash
   cd server
   npm install
   ```

5. **Start the backend server:**
    ```sh
    npm start
    ```

6. **Start the React application:**
    ```sh
    cd ../client
    npm start
    ```

7. **Open the application:**
    - Navigate to `http://localhost:3000` in your web browser.

## 📡 API
The application uses **The Movie Database (TMDB) API** to fetch all movie-related information. This includes details like movie titles, overviews, cast and crew, trailers, and similar movies.

## 🗂️ Project Structure

The project is divided into two main parts: **client** and **server**.
```
MovieApp/
│
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Comments/
│   │   │   │   ├── comments.css
│   │   │   │   └── comments.jsx
│   │   │   ├── Credits/
│   │   │   │   ├── credits.css
│   │   │   │   └── credits.jsx
│   │   │   ├── FeedbackFlex/
│   │   │   │   ├── feedbackFlex.css
│   │   │   │   └── feedbackFlex.jsx
│   │   │   ├── Footer/
│   │   │   │   ├── footer.css
│   │   │   │   └── footer.jsx
│   │   │   ├── Header/
│   │   │   │   ├── header.css
│   │   │   │   └── header.jsx
│   │   │   ├── HeaderCarousel/
│   │   │   │   ├── headerCarousel.css
│   │   │   │   └── headerCarousel.jsx
│   │   │   ├── InfoMovie/
│   │   │   │   ├── infoMovie.css
│   │   │   │   └── infoMovie.jsx
│   │   │   ├── InformationFlex/
│   │   │   │   ├── informationFlex.css
│   │   │   │   └── informationFlex.jsx
│   │   │   ├── Reviews/
│   │   │   │   ├── reviews.css
│   │   │   │   └── reviews.jsx
│   │   │   ├── RouterComponent/
│   │   │   │   ├── routerComponent.css
│   │   │   │   └── routerComponent.jsx
│   │   │   ├── ScrollGallery/
│   │   │   │   ├── scrollGallery.css
│   │   │   │   └── scrollGallery.jsx
│   │   │   ├── Search/
│   │   │   │   ├── search.css
│   │   │   │   └── search.jsx
│   │   │   ├── SimilarMovies/
│   │   │   │   ├── similarMovies.css
│   │   │   │   └── similarMovies.jsx
│   │   │   └── index.js
│   │   ├── dictionaries/
│   │   │   ├── byMovieData.js
│   │   │   ├── commentsData.js
│   │   │   ├── genresDict.js
│   │   │   └── movieData.js
│   │   ├── media/
│   │   │   └── images/
│   │   ├── pages/
│   │   │   ├── ByMoviePage/
│   │   │   │   ├── byMoviePage.css
│   │   │   │   └── byMoviePage.jsx
│   │   │   ├── GenrePage/
│   │   │   │   ├── genrePage.css
│   │   │   │   └── genrePage.jsx
│   │   │   ├── HomePage/
│   │   │   │   ├── homePage.css
│   │   │   │   └── homePage.jsx
│   │   ├── services/
│   │   │   └── services.js
│   │   ├── Utils/
│   │   │   ├── axiosMessage.js
│   │   │   └── movieUtils.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package-lock.json
│   └── package.json
│
├── server/
│   ├── Backend/
│   ├── server.js
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   └── package.json
│
├── .gitignore
└── README.md
```

## 📞 Contact

📧 **Email:** [achiya308@gmail.com](mailto:achiya308@gmail.com)

🔗 **LinkedIn:** [Achiya Tzuriel](https://www.linkedin.com/in/achiya-tzuriel/)

🔗 **Personal website Link:** [Personal website](https://resume-achiya-tzuriel.netlify.app/)

🔗 **Live website Link:** [Live website](https://movieapp-lgry.onrender.com/)

🔗 **Project Link:** [MovieApp](https://github.com/achiyat/MovieApp)

Thanks for visiting my GitHub profile! 😊

**Achiya Tzuriel**
