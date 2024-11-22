import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/layout";
import Dashboard from "./pages/dashboard";
import AvailableAppointment from "./pages/available-appointment";
import BookAppointment from "./pages/book-appointment";
import BlsLogin from "./pages/BlsLogin";
import BookNewAppointment from "./pages/BookNewAppointment";
import AppointmentDetails from "./pages/AppointmentDetails";
import ApplicantDetails from "./pages/ApplicantDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path="/login" element={<BlsLogin />} />
          <Route path="/book" element={<BookNewAppointment />} />
          <Route path="/appointment-details" element={<AppointmentDetails />} />
          <Route path="/applicant-details" element={<ApplicantDetails />} />

          {/* <Route path="/book" element={<BookAppointment />} /> */}
          <Route path="/available" element={<AvailableAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
