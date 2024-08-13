// client/src/App.js
import React from "react";
import "./App.css";
import { Footer, Header, RouterComponent } from "./components";

function App() {
  return (
    <div className="app">
      <header>
        <Header />
      </header>

      <main>
        <RouterComponent />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
