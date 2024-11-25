import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FireApi } from "../hooks/useRequest";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from "@mui/material";

import { toast } from "react-toastify";
import { InsertEmoticon } from "@mui/icons-material";
import axios from "axios";
import { baseURL } from "../utils/url";
import { ClockLoader } from "react-spinners";

const BookNewAppointment = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [appointmentFor, setAppointmentFor] = useState("individual"); // Track selected option
    const [members, setMembers] = useState(null);
    const [checkingAvailibility, setCheckingAvailibility] = useState(false);
    const [visaType, setVisaType] = useState(""); // Track selected Visa Type
    const [visaSubType, setVisaSubType] = useState(""); // Track selected Visa Sub Type

    const handleRadioChange = (event) => {
        setAppointmentFor(event.target.value); // Update appointment type on radio change
    };

    const handleMembersChange = (event) => {
        if (appointmentFor !== "family") {
            setMembers("null");
        } else {
            setMembers(event.target.value); // Update number of members on selection
        }
    };

    const eaeu = ["Family Of Ea / Eu Citizen"];
    const national = ["National Visa"];
    const schengen = [
        "Airport Visa",
        "Business Visa",
        "Conference Visa",
        "Lost or Stolen Visa",
        "Medical Visa",
        "Seamen Visa",
        "Studies Visa",
        "Tourist Visa",
    ];

    const handleVisaTypeChange = (event) => {
        setVisaType(event.target.value);

        if (event.target.value === "Schengen Visa") {
            setVisaSubType(schengen);
            return;
        }
        if (event.target.value === "National Visa") {
            setVisaSubType(national);
            return;
        }
        if (event.target.value === "eea/eu") {
            setVisaSubType(eaeu);
            return;
        }
        console.log(event.target.value, "FUCK OFF");

        setVisaSubType([]); // Reset the subtypes if no valid visa type
    };

    const availabilityChecking = async () => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get(
                    baseURL + "/check-availability-status"
                );
                console.log(response.data);

                if (response.data.appointment_availability) {
                    // Availability found, stop checking
                    clearInterval(intervalId); // Stop the interval
                    setTimeout(() => {
                        setCheckingAvailibility(false);
                        navigate("/appointment-details");
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }, 3000); // Run every 10 seconds
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        form.append("appointmentFor", appointmentFor);
        form.append("members", members);

        const formData = {
            category: form.get("category"),
            location: form.get("location"),
            visaType: form.get("visa-type"),
            visaSubType: form.get("visa-subtype"),
            appointmentFor: appointmentFor,
        };

        const emptyFields = Object.keys(formData).filter(
            (key) => formData[key] === "" || formData[key] === null
        );

        if (emptyFields.length > 0) {
            toast.error("Please fill all fields");
            console.log("Empty fields:", emptyFields);
            return;
        }
        localStorage.setItem("new-appointment", JSON.stringify(formData));

        try {
            const response = await axios.post(
                baseURL + "/check-availability",
                formData
            );

            if (response.data.status) {
                console.log(response);
                toast.success("Checking appointment Availability");
                setCheckingAvailibility(true);
                availabilityChecking(); // Start periodic checking
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                overflowY: "scroll",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className={`w-full h-full bg-black/80 absolute inset-0 z-50 justify-center items-center flex-col ${
                    checkingAvailibility ? "flex" : "hidden"
                }`}
            >
                <ClockLoader color="#ffff" size={300} />
                <p className="text-2xl text-white font-bold mt-3">
                    AVAILBILITY CHECKING
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
            >
                <div className="title text-center mb-6">
                    <span className="text-3xl font-semibold text-gray-700">
                        Book New Appointment
                    </span>
                </div>

                <div className="form-inputs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {/* ------------Category-------------------- */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="category-label">
                                Appointment Category
                            </InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category" // Use the same name attribute
                                label="Appointment Category"
                            >
                                <MenuItem value="Normal">Normal</MenuItem>
                                <MenuItem value="Premium">Premium</MenuItem>
                                <MenuItem value="Prime-time">
                                    Prime-time
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* ------------Location-------------------- */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="location-label">
                                Location
                            </InputLabel>
                            <Select
                                labelId="location-label"
                                id="location"
                                name="location" // Use the same name attribute
                                label="Location"
                            >
                                <MenuItem value="Islamabad">Islamabad</MenuItem>
                                <MenuItem value="Karachi">Karachi</MenuItem>
                                <MenuItem value="Lahore">Lahore</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* ------------Visa Type-------------------- */}

                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="visa-type-label">
                                Visa Type
                            </InputLabel>
                            <Select
                                labelId="visa-type-label"
                                id="visa-type"
                                name="visa-type" // Use the same name attribute
                                label="Visa Type"
                                value={visaType}
                                onChange={handleVisaTypeChange}
                            >
                                <MenuItem value="eea/eu">
                                    Family of EEA / EU Citizens
                                </MenuItem>
                                <MenuItem value="National Visa">
                                    National Visa
                                </MenuItem>
                                <MenuItem value="Schengen Visa">
                                    Schengen Visa
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* ------------Visa Sub Type------------------ */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="visa-subtype-label">
                                Visa Sub Type
                            </InputLabel>
                            <Select
                                labelId="visa-subtype-label"
                                id="visa-subtype"
                                name="visa-subtype" // Use the same name attribute
                                label="Visa Sub Type"
                            >
                                {visaSubType ? (
                                    visaSubType.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value={null}>
                                        Select Visa Sub Type
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <Box mt={2}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Appointment For *
                    </Typography>
                    <RadioGroup
                        aria-labelledby="appointment-for-group"
                        name="appointmentFor" // Name attribute to access in FormData
                        row
                        value={appointmentFor} // Bind the radio group value
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel
                            value="Individual"
                            control={<Radio />}
                            label="Individual"
                        />
                        <FormControlLabel
                            value="Family"
                            control={<Radio />}
                            label="Family"
                        />
                    </RadioGroup>
                </Box>

                {/* --------------MEMBERS------------------ */}
                {appointmentFor === "family" && (
                    <div className="form-input w-full sm:w-1/2 lg:w-1/3">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="members-label">
                                Number of Members
                            </InputLabel>
                            <Select
                                labelId="members-label"
                                id="members"
                                required={appointmentFor === "family"}
                                value={members || null}
                                label="Number of Members"
                                onChange={handleMembersChange}
                                disabled={
                                    appointmentFor !== "family" ? true : false
                                }
                            >
                                {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                ).map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num} Members
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}

                <div className="form-button mt-6 flex justify-center">
                    <Button
                        variant="contained"
                        type="submit"
                        disableRipple
                        disableTouchRipple
                        disableElevation
                        sx={{
                            width: "100%",
                            maxWidth: "250px",
                            height: 50,
                            fontSize: "16px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#4CAF50", // A green shade for hover effect
                            },
                        }}
                    >
                        Book Appointment
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default BookNewAppointment;
