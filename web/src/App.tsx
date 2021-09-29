import React from "react";
import "./App.css";
import Navigation from "~Navigation/Navigation";
import "destyle.css";
import LoadingSpinnerWrapper from "global/UI/LoadingSpinnerWrapper/LoadingSpinnerWrapper";

function App() {
  return (
    <div className="App">
      <LoadingSpinnerWrapper>
        <Navigation/>
      </LoadingSpinnerWrapper>
    </div>
  );
}

export default App;
