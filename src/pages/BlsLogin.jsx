import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../utils/url";

export const Form = styled("form")(({ theme }) => ({
    padding: "40px 20px",
    width: "35%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "Roboto, sans-serif",
    userSelect: "none",
    textAlign: "center",
    ".title": {
        fontSize: "28px",
        fontWeight: 700,
        color: "#2b3a56",
        marginBottom: "20px",
    },
    ".form-inputs": {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
        ".form-input": {
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#f9fafc",
            border: "1px solid #e0e7ef",
            borderRadius: "8px",
            padding: "10px 15px",
            "&:hover": {
                borderColor: "#5d87ff",
            },
            input: {
                border: "none",
                outline: "none",
                width: "100%",
                background: "transparent",
                fontSize: "14px",
            },
        },
    },
    ".form-button": {
        marginTop: 10,
        button: {
            width: "100%",
            height: 50,
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#5d87ff",
            color: "#ffffff",
            textTransform: "capitalize",
            borderRadius: "8px",
            "&:hover": {
                backgroundColor: "#4f79ea",
            },
        },
    },
    [theme.breakpoints.down("md")]: {
        width: "90%",
    },
}));

const BlsLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handeSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const formData = {
            email: form.get("email"),
            password: form.get("password"),
        };

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return; // Stop further execution if any field is empty
        }

        try {
            const response = await axios.post(baseURL + "/login", formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

        localStorage.setItem("bls-auth", JSON.stringify(formData.email));
        navigate("/book");
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f3f4f6",
            }}
        >
            <Form onSubmit={handeSubmit}>
                <div className="title">BLS Login</div>
                <div className="form-inputs">
                    <div className="form-input">
                        <EmailOutlinedIcon sx={{ color: "#5d87ff" }} />
                        <Input
                            name="email"
                            placeholder="Email"
                            disableUnderline
                            sx={{ fontSize: "14px", width: "100%" }}
                        />
                    </div>

                    <div className="form-input">
                        <PasswordOutlinedIcon sx={{ color: "#5d87ff" }} />
                        <Input
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            disableUnderline
                            sx={{ fontSize: "14px", width: "100%" }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ color: "#5d87ff", alignSelf: "" }}
                        >
                            {showPassword ? (
                                <VisibilityOffOutlinedIcon />
                            ) : (
                                <VisibilityOutlinedIcon />
                            )}
                        </IconButton>
                    </div>
                </div>
                <div className="form-button">
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </Box>
    );
};

export default BlsLogin;
