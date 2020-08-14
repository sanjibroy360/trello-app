import React, { Component } from "react";

function Home() {
  return (
    <section className="hero_section">
      <div className="container">
        <div className="hero_wrapper">
          <div className="hero_text">
            <h1 className="hero_heading">
              Trello lets you work more collaboratively and get more done.
            </h1>
            <p className="hero_para">
              Trello’s boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
            </p>
          </div>

          <div className="hero_image">
            <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
