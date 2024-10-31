import React from "react";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/layout";
import Dashboard from "./pages/dashboard";
import AvailableAppointment from "./pages/available-appointment";
import BookAppointment from "./pages/book-appointment";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<AppLayout />}>
                    <Route path="/dashboard" index element={<Dashboard />} />
                    <Route path="/book" element={<BookAppointment />} />
                    <Route
                        path="/available"
                        element={<AvailableAppointment />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
