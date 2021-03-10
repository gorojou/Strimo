import React, { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import { getToken, onMessageListener } from "./utils/firebase";
import Index from "./content/router";
function App() {
  getToken();

  return (
    <>
      <Index />
    </>
  );
}

export default App;
