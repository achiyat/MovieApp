// App.jsx
import React from "react";
import "./App.css";
import { Footer } from "./components/Footer/footer";
import { Header } from "./components/Header/header";
import { RouterComponent } from "./components/RouterComponent/routerComponent";

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
