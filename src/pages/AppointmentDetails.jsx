import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Input,
    Button,
    styled,
} from "@mui/material";
import OtpModal from "../components/OtpModal";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const AppointmentDetails = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState({
        appointmentDate: "",
        timeSlot: "",
        location: "",
        category: "",
        visaType: "",
        visaSubType: "",
        countryCode: "",
        mobileNumber: "",
        email: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const [localStorageData, setLocalStorageData] = useState(null);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("new-appointment"));
        if (storedData) {
            setLocalStorageData(storedData);
            setAppointmentData(storedData);
        }
    }, []);

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file)); // Set the profile picture preview
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const appointmentDataToSave = {
            location: appointmentData.location,
            category: appointmentData.category,
            visaType: appointmentData.visaType,
            visaSubType: appointmentData.visaSubType,
            countryCode: formData.get("countryCode"),
            mobileNumber: formData.get("mobileNumber"),
            email: formData.get("email"),
        };

        console.log(appointmentDataToSave);
        handleOpen();
        // navigate("/applicant-details");
        localStorage.setItem(
            "appointment-details",
            JSON.stringify(appointmentDataToSave)
        );
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                border: "1px solid red",
                overflowY: "scroll",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: { xs: "500px", sm: "100px", md: "0px" },
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full p-6 bg-white shadow-lg rounded-lg"
            >
                <div className="title text-center mb-6">
                    <span className="text-lg lg:text-3xl font-semibold text-gray-700">
                        Appointment Details
                    </span>
                </div>

                {/* Profile Picture */}
                <div className="form-input mb-6 text-center">
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        Upload Profile Picture
                    </Typography>
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                    >
                        Upload Picture
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/**"
                            onChange={handleProfilePicChange}
                            multiple={false}
                        />
                    </Button>
                    {profilePic && (
                        <img
                            src={profilePic}
                            alt="Profile Preview"
                            style={{
                                marginTop: "10px",
                                maxWidth: "100px",
                                borderRadius: "50%",
                            }}
                        />
                    )}
                </div>

                <div className="form-inputs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ------------Select Your Center-------------------- */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                id="center"
                                name="center"
                                // label="Select Your Center"
                                value={appointmentData.location || ""} // Displays default location or an empty string
                                // onChange={handleInputChange}
                                placeholder="Enter or Select Your Center"
                                disabled
                            />
                        </FormControl>
                    </div>
                    {/* ------------Appointment Category-------------------- */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                id="category"
                                name="category"
                                // label="Appointment Category"
                                value={appointmentData.category || ""} // Controlled value for default display
                                // onChange={handleInputChange}
                                placeholder="Enter Appointment Category"
                                disabled
                            />
                        </FormControl>
                    </div>
                    {/* ------------Visa Type-------------------- */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                id="visa-type"
                                name="visaType"
                                // label="Visa Type"
                                value={appointmentData.visaType || ""} // Controlled value
                                // onChange={handleInputChange}
                                disabled
                                placeholder="Enter Visa Type"
                            />
                        </FormControl>
                    </div>
                    {/* ------------Visa Sub Type-------------------- */}
                    <div className="form-input">
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                id="visa-subtype"
                                name="visaSubType"
                                // label="Visa Sub Type"
                                value={appointmentData.visaSubType || ""} // Controlled value
                                // onChange={handleInputChange}
                                placeholder="Enter Visa Sub Type"
                                disabled
                            />
                        </FormControl>
                    </div>
                    {/* ------------Country Code-------------------- */}
                    <div className="form-input">
                        <TextField
                            //   label="Country Code"
                            fullWidth
                            value={appointmentData.countryCode}
                            //   onChange={handleInputChange}
                            name="countryCode"
                            placeholder="Enter Country Code"
                        />
                    </div>
                    {/* ------------Mobile Number-------------------- */}
                    <div className="form-input">
                        <TextField
                            //   label="Mobile Number"
                            fullWidth
                            value={appointmentData.mobileNumber}
                            //   onChange={handleInputChange}
                            name="mobileNumber"
                            placeholder="Enter Phone Number"
                        />
                    </div>
                    {/* ------------Applicant Email-------------------- */}
                    <div className="form-input">
                        <TextField
                            //   label="Applicant Email"
                            fullWidth
                            value={appointmentData.email}
                            //   onChange={handleInputChange}
                            name="email"
                            placeholder="Enter Email"
                        />
                    </div>
                </div>

                <div className="form-button mt-6 flex justify-center">
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: "100%",
                            maxWidth: "250px",
                            height: 50,
                            fontSize: "16px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#4CAF50",
                            },
                        }}
                    >
                        Save Appointment Details
                    </Button>
                </div>
            </form>
            <OtpModal
                onClose={handleClose}
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
            />
        </Box>
    );
};

export default AppointmentDetails;
