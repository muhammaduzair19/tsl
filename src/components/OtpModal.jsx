import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/url";
import { toast } from "react-toastify";
import axios from "axios";
import { ClockLoader } from "react-spinners";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 280, sm: 320, md: 400 },
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
};

export default function OtpModal({ onClose, open }) {
    const navigate = useNavigate();
    const [checkingScrapper, setCheckingScrapper] = React.useState(false);

    const scrapperChecking = async () => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get(
                    baseURL + "/check-scrapper-status"
                );
                console.log(response.data);

                if (response.data.scrapper_status) {
                    // Availability found, stop checking
                    clearInterval(intervalId); // Stop the interval
                    setTimeout(() => {
                        setCheckingScrapper(false);
                        toast.success("Appointment has been booked");
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }, 3000); // Run every 10 seconds
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = e.target[0].value;
        try {
            // Make Axios POST request
            const response = await axios.post(
                baseURL + "/send-otp",
                JSON.stringify({ otp }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle the response
            console.log(response.data);
            if (response.data.status) {
                e.target[0].value = "";
                toast.success("OTP Checking");
                setCheckingScrapper(true);
                onClose();
                scrapperChecking();
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error submitting OTP: " + error.message);
        }
    };

    return (
        <div>
            <div
                className={`w-full h-full bg-black/80 absolute inset-0 z-50 justify-center items-center flex-col ${
                    checkingScrapper ? "flex" : "hidden"
                }`}
            >
                <ClockLoader color="#ffff" size={300} />
                <p className="text-2xl text-white font-bold mt-3">
                    Submitting form
                </p>
            </div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                id="modal-modal-title"
                                variant="body1"
                                component="h2"
                            >
                                Verify OTP
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                                Check your email to verify OTP
                            </Typography>
                            <Box my={2}>
                                <TextField
                                    type="number"
                                    name="otp"
                                    required
                                    sx={{
                                        width: "100%",
                                        "& .MuiInputBase-input": {
                                            padding: "8px",
                                        },
                                        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                                            {
                                                WebkitAppearance: "none",
                                                margin: 0,
                                            },
                                    }}
                                />
                            </Box>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
