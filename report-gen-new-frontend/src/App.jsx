// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPatientForm from "./components/AddPatientForm"; // Adjust the path as needed


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links (you can style these as needed) */}

        {/* Define Routes */}
        <Routes>


          {/* Add Patient Route */}
          <Route path="/" element={<AddPatientForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
