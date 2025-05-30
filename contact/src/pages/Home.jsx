import React, { memo } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const Home = memo(() => {
  return (
    <>
      <Header />
      <Navbar />

      <style>
        {`
          .home-fade-in {
            animation: fadeInHome 0.8s;
          }
          @keyframes fadeInHome {
            from { opacity: 0; transform: scale(0.98) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>

      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center home-fade-in"
        style={{ minHeight: "60vh" }}
      >
        <h1 style={{ color: "#4f8cff", fontWeight: 700 }}>Home</h1>
        <p style={{ fontSize: "1.2rem", color: "#2d3a4b" }}>
          Welcome to{" "}
          <span style={{ color: "#38c6ff", fontWeight: 600 }}>
            Contact Manager
          </span>
          .<br />
          Please navigate to the Contact List page.
        </p>

        <div className="mt-4" style={{ maxWidth: 500 }}>
          <div
            className="alert alert-info text-start"
            style={{ fontSize: "1rem" }}
          >
            <strong>New Features:</strong>
            <ul className="mb-0">
              <li>Filter, sort, and paginate your contacts</li>
              <li>Mark contacts as favorites</li>
              <li>Assign contacts to groups</li>
              <li>Bulk select and delete contacts</li>
              <li>Dark mode toggle</li>
              <li>Responsive design for all devices</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
});

export default Home;
