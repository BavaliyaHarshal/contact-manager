import React from "react";

const Header = () => {
  return (
    <>
      <style>
        {`
          .header-fade-in {
            animation: fadeInHeader 0.8s;
          }
          @keyframes fadeInHeader {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="container-fluid py-3 header-fade-in">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h1
              style={{
                letterSpacing: "2px",
                marginBottom: "0.5rem",
                fontSize: "2rem",
              }}
            >
              Contact Manager
            </h1>
            <div
              style={{
                width: "80px",
                height: "5px",
                margin: "0 auto",
                background:
                  "linear-gradient(90deg, #4f8cff 0%, #38c6ff 100%)",
                borderRadius: "3px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
