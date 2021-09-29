import React from "react";
import "./App.css";
import Navigation from "~Navigation/Navigation";
import "destyle.css";
import LoadingSpinnerWrapper from "global/UI/LoadingSpinnerWrapper/LoadingSpinnerWrapper";
import PageHelmet from "global/UI/PageHelmet/PageHelmet";

function App() {
  return (
    <div className="App">
      <LoadingSpinnerWrapper>
        <PageHelmet/>
        <Navigation/>
      </LoadingSpinnerWrapper>
    </div>
  );
}

export default App;
