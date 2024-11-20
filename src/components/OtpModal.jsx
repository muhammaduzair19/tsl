import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = {
      otp: data.get("otp"),
    };
    console.log(formData);

    onClose();
    navigate("/applicant-details");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography id="modal-modal-title" variant="body1" component="h2">
                Verify OTP
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Check your email to verify OTP
              </Typography>
              <Box my={2}>
                <TextField
                  type="number"
                  name="otp"
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
