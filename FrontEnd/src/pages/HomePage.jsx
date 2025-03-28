import { Link } from "react-router-dom";
import "../styles/HomePage.css" 

function HomePage() {
  return (
    <>
      <div className="homepage-container"></div>
      <section className="homepage-content">
        <header className="homepage-header">
          <h1 className="homepage-title">React Tasks</h1>
          <p className="homepage-description">
            This is a web application project that uses React for the frontend, with a Node.js backend utilizing Express and MongoDB as the database (MERN Stack). The platform is designed for task management, allowing users to create, store, edit, and delete tasks efficiently.
          </p>
          <Link className="homepage-button" to="/register">
            Get Started
          </Link>
        </header>
      </section>
    </>
  );
}

export default HomePage;

