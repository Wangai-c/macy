import React from "react";
import ReactDOM from "react-dom/client";
import { PageSlider } from "./PageSlider";
import App from "./App";           // ← your existing page
import PageTwo from "./PageTwo";   // ← add as many as you need
import PageThree from "./PageThree";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*
      Wrap all your pages inside <PageSlider>.
      Each direct child becomes one full-screen slide.
      Order here = swipe order (left → right).
    */}
    <PageSlider showDots showArrows transitionMs={400}>
      <App />
      <PageTwo />
      <PageThree />
    </PageSlider>
  </React.StrictMode>
);
