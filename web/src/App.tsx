import React from "react";
import "./App.css";
import Navigation from "~Navigation/Navigation";
import "destyle.css";
import LoadingSpinnerWrapper from "global/UI/LoadingSpinnerWrapper/LoadingSpinnerWrapper";
import PageHelmet from "global/UI/PageHelmet/PageHelmet";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <LoadingSpinnerWrapper>
          <PageHelmet/>
          <Navigation/>
        </LoadingSpinnerWrapper>
      </HelmetProvider>
    </div>
  );
}

export default App;
