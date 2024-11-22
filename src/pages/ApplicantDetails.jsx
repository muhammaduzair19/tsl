import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
    costSponsorBy,
    countries,
    meansSupport,
    memberEntries,
    occupation,
    overseasRelationship,
    passportTypes,
    purposeJourney,
} from "../utils/countryArr";
import { baseURL } from "../utils/url";
import axios from "axios";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import OtpModal from "../components/OtpModal";

const ApplicantDetails = () => {
    const [guardianFlag, setGuardianFlag] = useState(false);
    const [otherAddressFlag, setOtherAddressFlag] = useState(false);
    const [previousSchengenStatus, setPreviousSchengenStatus] = useState(false);
    const [invitingSource, setInvitingSource] = useState("invitingPerson");
    const [showOtp, setShowOtp] = useState(false);
    const [checkingOtp, setCheckingOtp] = useState(false);
    const [appointmentData, setAppointmentData] = useState(() => {
        const data = localStorage.getItem("appointment-details");
        return data ? JSON.parse(data) : {};
    });
    const [formValues, setFormValues] = useState({});
    const otpChecking = async () => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get(baseURL + "/check-otp-status");
                console.log(response.data);

                if (response.data.otp_status) {
                    // Availability found, stop checking
                    clearInterval(intervalId); // Stop the interval
                    setTimeout(() => {
                        setCheckingOtp(false);
                        setShowOtp(true);
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }, 3000); // Run every 10 seconds
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleFingerPrintChange = (value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            fingerPrintsCollect: value,
            fingerPrintDate:
                value === "taken" ? prevValues.fingerPrintDate : "", // Clear date unless "taken"
        }));
    };

    const formatLabel = (field) =>
        field
            .replace(/([A-Z])/g, " $1")
            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            .replace("inviting", "")
            .trim();

    const getFieldType = (field) =>
        field.toLowerCase().includes("email")
            ? "email"
            : field.toLowerCase().includes("number")
            ? "tel"
            : "text";

    const clearInvitingFields = () => {
        setFormValues((prevValues) => {
            const clearedFields = {
                invitingOrgName: "",
                invitingOrgCountry: "",
                invitingOrgCity: "",
                invitingOrgZipCode: "",
                invitingOrgAddress: "",
                invitingOrgEmail: "",
                invitingOrgnumber: "",
                invitingOrgFax: "",
                invitingContactPersonName: "",
                invitingContactPersonCountry: "",
                invitingContactPersonCity: "",
                invitingContactPersonZipCode: "",
                invitingContactPersonAddress: "",
                invitingContactPersonEmail: "",
                invitingContactPersonNumber: "",
                invitingContactPersonFax: "",
            };
            return { ...prevValues, ...clearedFields };
        });
    };
    const handleOpen = () => setShowOtp(true);
    const handleClose = () => setShowOtp(false);

    const guardianHandle = (e) => {
        setGuardianFlag(e.target.checked);
        if (!e.target.checked) {
            delete formValues.guardianFirstname;
            delete formValues.guardianSurnameFamily;
            delete formValues.guardianLastname;
            delete formValues.guardianNationality;
            delete formValues.guardianAddress;
        }
    };
    const handleOtherAddressFlag = (e) => {
        setOtherAddressFlag(e.target.checked);
        if (!e.target.checked) {
            delete formValues.permitNumber;
            delete formValues.permitValid;
        }
    };
    const handlePreviousSchengen = (e) => {
        setPreviousSchengenStatus(e.target.checked);
        if (!e.target.checked) {
            delete formValues.previousVisaNumber;
            delete formValues.previousVisaValidFrom;
            delete formValues.previousVisaValidTo;
            delete formValues.previousVisaIssueCountry;
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.table(formValues);

        const data = {
            ...formValues,
            guardiaun: guardianFlag ? true : false,
            otherAddress: otherAddressFlag ? true : false,
            previousSchengen: previousSchengenStatus ? true : false,
            invitingSource,
            image_path: appointmentData.profile,
        };

        try {
            // Make Axios POST request
            const response = await axios.post(
                baseURL + "/start-booking",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle the response
            console.log(response.data);
            if (response.data.status) {
                setFormValues({});
                toast.success("Form submit wait for OTP");
                setCheckingOtp(true);
                otpChecking();
            }
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form: " + error.message);
        }
    };

    return (
        <Box p={2} sx={{ width: "100%" }}>
            <div
                className={`w-full h-full bg-black/80 absolute inset-0 z-50 justify-center items-center flex-col ${
                    checkingOtp ? "flex" : "hidden"
                }`}
            >
                <ClockLoader color="#ffff" size={300} />
                <p className="text-2xl text-white font-bold mt-3">
                    OTP GETTING
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                {/*----------------------1 Personal Details------------------------------ */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Personal Details
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <TextField
                            label="First Name"
                            fullWidth
                            name="firstname"
                            type="text"
                            required
                            value={formValues.firstname}
                            onChange={handleChange}
                            // placeholder="Mission"
                        />
                        <TextField
                            label="Surname (Family Name)"
                            fullWidth
                            value={formValues?.surnameFamily}
                            name="surnameFamily"
                            required
                            type="text"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Surname (At Birth)"
                            fullWidth
                            name="surnameBirth"
                            required
                            value={formValues?.surnameBirth}
                            type="text"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            fullWidth
                            name="lastname"
                            value={formValues?.lastname}
                            type="text"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Date Of Birth"
                            type="date"
                            fullWidth
                            required
                            name="dob"
                            value={formValues?.dob}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Place Of Birth"
                            fullWidth
                            name="birthplace"
                            required
                            type="text"
                            value={formValues.birthplace}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                                Country Of Birth
                            </InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                required
                                name="country"
                                value={formValues?.country}
                                onChange={handleChange}
                                label="Select Country of Birth"
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                                Select Current Nationality
                            </InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                onChange={handleChange}
                                name="nationality"
                                required
                                value={formValues?.nationality}
                                label="Current Nationality"
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                                Nationality At Birth
                            </InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                onChange={handleChange}
                                name="birthNationality"
                                value={formValues?.birthNationality}
                                label="Nationality At Birth"
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}

                                {/* Add more countries as needed */}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Gender Select</InputLabel>
                            <Select
                                labelId="gender-select"
                                name="gender"
                                value={formValues?.gender}
                                required
                                onChange={handleChange}
                                label="Gender Select"
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">
                                    Prefere Not to Disclose
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Marital Status</InputLabel>
                            <Select
                                labelId="marital-status-select"
                                name="maritalStatus"
                                required
                                label="Marital Status"
                                value={formValues?.maritalStatus}
                                onChange={handleChange}
                            >
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Other">
                                    Widow/Divorced
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={guardianFlag}
                                onChange={guardianHandle}
                            />
                        }
                        label="In the case of minors, details of parental authority / legal guardian"
                    />
                    {guardianFlag && (
                        <Box
                            sx={{
                                my: 2,
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: 2,
                                "@media (min-width: 640px)": {
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                },
                                "@media (min-width: 1024px)": {
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                },
                            }}
                        >
                            <TextField
                                label="First Name"
                                required
                                fullWidth
                                value={formValues?.guardianFirstname}
                                onChange={handleChange}
                                name="guardianFirstname"
                                type="text"
                                disabled={!guardianFlag ? true : false}
                            />
                            <TextField
                                label="Surname (Family Name)"
                                fullWidth
                                required
                                onChange={handleChange}
                                disabled={!guardianFlag ? true : false}
                                name="guardianSurnameFamily"
                                value={formValues?.guardianSurnameFamily}
                                type="text"
                            />

                            <TextField
                                label="Last Name"
                                fullWidth
                                required
                                onChange={handleChange}
                                disabled={!guardianFlag ? true : false}
                                name="guardianLastname"
                                value={formValues?.guardianLastname}
                                type="text"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="country-select-label">
                                    Nationality
                                </InputLabel>
                                <Select
                                    labelId="country-select-label"
                                    id="country-select"
                                    name="guardianNationality"
                                    required
                                    value={formValues?.guardianNationality}
                                    label=" Nationality"
                                    onChange={handleChange}
                                    disabled={!guardianFlag}
                                >
                                    {countries.map((item, index) => (
                                        <MenuItem key={index} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}

                                    {/* Add more countries as needed */}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Address"
                                fullWidth
                                required
                                onChange={handleChange}
                                disabled={!guardianFlag ? true : false}
                                name="guardianAddress"
                                value={formValues?.guardianAddress}
                                type="text"
                            />
                        </Box>
                    )}
                </Box>
                {/* ---------------------2 Passport Details-------------------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Passport Details
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <TextField
                            label="National Identity Number"
                            fullWidth
                            name="nic"
                            value={formValues.nic}
                            onChange={handleChange}
                            onInput={(e) => {
                                // Prevent non-numeric input
                                e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                            }}
                            inputProps={{
                                inputMode: "numeric", // Optimized for numeric input on mobile
                                pattern: "[0-9]*", // Restricts input to numeric characters
                            }}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="passport-type-select-label">
                                Passport Type
                            </InputLabel>
                            <Select
                                labelId="passport-type-select-label"
                                id="passport-type-select"
                                name="passportType"
                                label="Passport Type"
                                value={formValues.passportType}
                                required
                                onChange={handleChange}
                            >
                                {passportTypes.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Passport Number"
                            fullWidth
                            name="passportNumber"
                            value={formValues.passportNumber}
                            required
                            onChange={handleChange}
                            onInput={(e) => {
                                // Prevent non-numeric input
                                e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                            }}
                            inputProps={{
                                inputMode: "numeric", // Optimized for numeric input on mobile
                                pattern: "[0-9]*", // Restricts input to numeric characters
                            }}
                        />

                        <TextField
                            label="Issue Date"
                            type="date"
                            fullWidth
                            name="issueDate"
                            required
                            value={formValues.issueDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="Expiry Date"
                            type="date"
                            fullWidth
                            name="expiryDate"
                            required
                            value={formValues.expiryDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="Issue Place"
                            fullWidth
                            required
                            name="issuePlace"
                            value={formValues.issuePlace}
                            onChange={handleChange}
                            type="text"
                        />

                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                                Issue Country
                            </InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                name="issueCountry"
                                label="Issue Country"
                                required
                                value={formValues.issueCountry}
                                onChange={handleChange}
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Travel Date"
                            type="date"
                            fullWidth
                            name="travelDate"
                            required
                            value={formValues.travelDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </Box>

                {/* -------------------- Address and Contact Details -------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Address & Contact Details
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <TextField
                            label="Home Address line 1"
                            fullWidth
                            name="homeAddress1"
                            value={formValues.homeAddress1}
                            onChange={handleChange}
                            required
                            type="text"
                        />
                        <TextField
                            label="Home Address line 2"
                            fullWidth
                            name="homeAddress2"
                            value={formValues.homeAddress2}
                            onChange={handleChange}
                            type="text"
                        />

                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                                Country
                            </InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="country-select"
                                name="addressCountry"
                                value={formValues.addressCountry}
                                onChange={handleChange}
                                required
                                label="Country"
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="City"
                            fullWidth
                            name="city"
                            required
                            value={formValues.city}
                            onChange={handleChange}
                            type="text"
                        />

                        <TextField
                            label="Postal Code"
                            fullWidth
                            name="postalCode"
                            required
                            value={formValues.postalCode}
                            onChange={handleChange}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                            }}
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                        />

                        <TextField
                            label="Contact Number"
                            fullWidth
                            name="contactNumber"
                            required
                            value={formValues.contactNumber}
                            onChange={handleChange}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                            }}
                            inputProps={{
                                inputMode: "numeric", // Optimized for numeric input on mobile
                                pattern: "[0-9]*", // Restricts input to numeric characters
                            }}
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={otherAddressFlag}
                                onChange={handleOtherAddressFlag}
                            />
                        }
                        label="Residence in a country other than the country of current nationality"
                    />

                    {otherAddressFlag && (
                        <Box
                            sx={{
                                my: 2,
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: 2,
                                "@media (min-width: 640px)": {
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                },
                                "@media (min-width: 1024px)": {
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                },
                            }}
                        >
                            <TextField
                                label="Permit Number"
                                fullWidth
                                name="permitNumber"
                                required
                                value={formValues.permitNumber}
                                onChange={handleChange}
                                onInput={(e) => {
                                    // Prevent non-numeric input
                                    e.target.value = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                }}
                                inputProps={{
                                    inputMode: "numeric", // Optimized for numeric input on mobile
                                    pattern: "[0-9]*", // Restricts input to numeric characters
                                }}
                                disabled={!otherAddressFlag}
                            />

                            <TextField
                                label="Permit Valid Till"
                                type="date"
                                fullWidth
                                required
                                name="permitValid"
                                value={formValues.permitValid}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled={!otherAddressFlag}
                            />
                        </Box>
                    )}
                </Box>
                {/* ----------------- Employer / Educational Details ----------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Employer Details. For Students, details of educational
                        establishment
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <TextField
                            label="Name"
                            fullWidth
                            name="employerName"
                            required
                            value={formValues.employerName}
                            onChange={handleChange}
                            type="text"
                        />
                        <TextField
                            label="Number"
                            fullWidth
                            required
                            name="employerNumber"
                            value={formValues.employerNumber}
                            onChange={handleChange}
                            onInput={(e) => {
                                // Prevent non-numeric input
                                e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );
                            }}
                            inputProps={{
                                inputMode: "numeric", // Optimized for numeric input on mobile
                                pattern: "[0-9]*", // Restricts input to numeric characters
                            }}
                            type="text"
                        />
                        <TextField
                            label="Address"
                            fullWidth
                            required
                            name="employerAddress"
                            value={formValues.employerAddress}
                            onChange={handleChange}
                            type="text"
                        />
                        <FormControl fullWidth>
                            <InputLabel id="occupation-type-select-label">
                                Occupation
                            </InputLabel>
                            <Select
                                labelId="occupation-type-select-label"
                                id="occupation-type-select"
                                name="occupationType"
                                value={formValues.occupationType}
                                required
                                onChange={handleChange}
                                label="Occupation"
                            >
                                {occupation?.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* --------------- Travel Information ------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Travel Information
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="purpose-type-select-label">
                                Purpose of Journey
                            </InputLabel>
                            <Select
                                labelId="purpose-type-select-label"
                                id="purpose-type-select"
                                name="purposeType"
                                required
                                value={formValues.purposeType}
                                onChange={handleChange}
                                label="Purpose of Journey"
                            >
                                {purposeJourney.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="purpose-type-select-label">
                                Member State Destination
                            </InputLabel>
                            <Select
                                labelId="purpose-type-select-label"
                                id="purpose-type-select"
                                required
                                name="memberFirstState"
                                value={formValues.memberFirstState}
                                onChange={handleChange}
                                label="Member State Destination"
                            >
                                {countries?.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="purpose-type-select-label">
                                Member State Second Destination
                            </InputLabel>
                            <Select
                                labelId="purpose-type-select-label"
                                id="purpose-type-select"
                                name="memberSecondState"
                                required
                                value={formValues.memberSecondState}
                                onChange={handleChange}
                                label="Member State Second Destination"
                            >
                                {countries?.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="purpose-type-select-label">
                                Member State First Entry
                            </InputLabel>
                            <Select
                                labelId="purpose-type-select-label"
                                id="purpose-type-select"
                                name="memberStateFirstEntry"
                                required
                                value={formValues.memberStateFirstEntry}
                                onChange={handleChange}
                                label="Member State First Entry"
                            >
                                {countries?.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="purpose-type-select-label">
                                Number of Entries Requested
                            </InputLabel>
                            <Select
                                labelId="purpose-type-select-label"
                                id="purpose-type-select"
                                name="numberOfEntries"
                                value={formValues.numberOfEntries}
                                required
                                onChange={handleChange}
                                label="Number of Entries Requested"
                            >
                                {memberEntries.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Intended Stay Duration"
                            fullWidth
                            name="stayDuration"
                            value={formValues.stayDuration}
                            required
                            onChange={handleChange}
                            type="number"
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={previousSchengenStatus}
                                onChange={handlePreviousSchengen}
                            />
                        }
                        label="Previous Schengen Visa Details"
                    />

                    {previousSchengenStatus && (
                        <Box
                            sx={{
                                my: 2,
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: 2,
                                "@media (min-width: 640px)": {
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                },
                                "@media (min-width: 1024px)": {
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                },
                            }}
                        >
                            <TextField
                                label="Previous Visa Number"
                                fullWidth
                                required
                                name="previousVisaNumber"
                                value={formValues.previousVisaNumber}
                                onChange={handleChange}
                                disabled={!previousSchengenStatus}
                                onInput={(e) => {
                                    // Prevent non-numeric input
                                    e.target.value = e.target.value.replace(
                                        /[^0-9]/g,
                                        ""
                                    );
                                }}
                                inputProps={{
                                    inputMode: "numeric", // Optimized for numeric input on mobile
                                    pattern: "[0-9]*", // Restricts input to numeric characters
                                }}
                            />
                            <TextField
                                label="Previous Visa Valid From"
                                type="date"
                                required
                                fullWidth
                                name="previousVisaValidFrom"
                                value={formValues.previousVisaValidFrom}
                                onChange={handleChange}
                                disabled={!previousSchengenStatus}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Previous Visa Valid To"
                                type="date"
                                required
                                fullWidth
                                name="previousVisaValidTo"
                                value={formValues.previousVisaValidTo}
                                onChange={handleChange}
                                disabled={!previousSchengenStatus}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="purpose-type-select-label">
                                    Previous Visa Issue Country
                                </InputLabel>
                                <Select
                                    labelId="purpose-type-select-label"
                                    id="purpose-type-select"
                                    name="previousVisaIssueCountry"
                                    value={formValues.previousVisaIssueCountry}
                                    onChange={handleChange}
                                    required
                                    disabled={!previousSchengenStatus}
                                    label="Previous Visa Issue Country"
                                >
                                    {countries.map((item, index) => (
                                        <MenuItem key={index} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </Box>

                {/* ---------------Fingerprints SchengenVisa--------------------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Fingerprints collected previously for the purpose of
                        applying for a Schengen visa
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {/* Radio Group for Fingerprint Collection */}
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="fingerprint-collection-radio-label"
                                    value={formValues.fingerPrintsCollect}
                                    onChange={(e) =>
                                        handleFingerPrintChange(e.target.value)
                                    }
                                    name="fingerPrintsCollect"
                                >
                                    <FormControlLabel
                                        value="taken"
                                        control={<Radio />}
                                        label="Fingerprints taken in last 59 months for Schengen visa applications"
                                    />
                                    <FormControlLabel
                                        value="legal"
                                        control={<Radio />}
                                        label="For legal reasons (under 12 years old)"
                                    />
                                    <FormControlLabel
                                        value="noReason"
                                        control={<Radio />}
                                        label="No reason for exemption"
                                    />
                                </RadioGroup>
                            </FormControl>

                            {/* Conditional Rendering for Fingerprint Date */}
                            {formValues.fingerPrintsCollect === "taken" && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: { xs: "100%", md: "50%" },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            py: 1,
                                        }}
                                    >
                                        Previous Fingerprint Date
                                    </Typography>
                                    <TextField
                                        value={formValues.fingerPrintDate}
                                        onChange={handleChange}
                                        required
                                        disabled={
                                            formValues.fingerPrintsCollect !==
                                            "taken"
                                        }
                                        name="fingerPrintDate"
                                        type="date"
                                        sx={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* ----------------Final Country Destination------------------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Entry Permit for the final country of destination, where
                        applicable
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        {/* Final Destination Issued By Country */}
                        <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                                Final Destination Issued By Country
                            </InputLabel>
                            <Select
                                labelId="country-select-label"
                                id="final-destination-country"
                                name="finalDestinationIssueCountry"
                                value={formValues.finalDestinationIssueCountry}
                                onChange={handleChange}
                                label="Final Destination Issue By Country"
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Final Destination Issue Date */}
                        <TextField
                            label="Final Destination Issue Date"
                            type="date"
                            fullWidth
                            name="finalDestinationValidFromDate"
                            value={formValues.finalDestinationValidFromDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {/* Final Destination Date Valid */}
                        <TextField
                            label="Final Destination Valid to Date"
                            type="date"
                            fullWidth
                            name="finalDestinationValidToDate"
                            value={formValues.finalDestinationValidToDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {/* Intended Date Of Arrival */}
                        <TextField
                            label="Intended Date Of Arrival"
                            type="date"
                            fullWidth
                            required
                            name="intendDateArrival"
                            value={formValues.intendDateArrival}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {/* Intended Date Of Departure */}
                        <TextField
                            label="Intended Date Of Departure"
                            type="date"
                            fullWidth
                            required
                            name="intendDateDeparture"
                            value={formValues.intendDateDeparture}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </Box>

                {/* ----------------- Details of the inviting person(s) in the member state(s)-------- */}
                <Box>
                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                        Details of the inviting person(s) in the member
                        state(s). If not applicable, details of hotel(s) or
                        temporary accommodation(s) in the member state(s)
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={invitingSource}
                                    onChange={(e) => {
                                        setInvitingSource(e.target.value);
                                        clearInvitingFields();
                                    }}
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="invitingOrganization"
                                        control={<Radio />}
                                        label="Inviting company/organization"
                                    />
                                    <FormControlLabel
                                        value="temporaryAccomodation"
                                        control={<Radio />}
                                        label="Hotel(s) or temporary accommodation(s) in the member state(s)"
                                    />
                                    <FormControlLabel
                                        value="invitingPerson"
                                        control={<Radio />}
                                        label="Inviting person(s) in the member state(s)"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        {/* ******* INVITING COMPANY/ORGANIZATION/HOTEL DETAILS ************ */}
                        <Box
                            sx={{
                                display:
                                    invitingSource === "invitingOrganization" ||
                                    invitingSource === "temporaryAccomodation"
                                        ? "block"
                                        : "none",
                                mt: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                Inviting Company/Organization/Hotel Details
                            </Typography>
                            <Box
                                sx={{
                                    my: 2,
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    gap: 2,
                                    "@media (min-width: 640px)": {
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                    },
                                    "@media (min-width: 1024px)": {
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                    },
                                }}
                            >
                                {[
                                    "invitingOrgName",
                                    "invitingOrgCountry",
                                    "invitingOrgCity",
                                    "invitingOrgZipCode",
                                    "invitingOrgAddress",
                                    "invitingOrgEmail",
                                    "invitingOrgNumber",
                                    "invitingOrgFax",
                                ].map((field, index) => (
                                    <TextField
                                        key={index}
                                        label={formatLabel(field)}
                                        fullWidth
                                        required={field !== "invitingOrgFax"}
                                        name={field}
                                        value={formValues[field] || ""}
                                        onChange={handleChange}
                                        type={getFieldType(field)}
                                        disabled={
                                            !(
                                                invitingSource ===
                                                    "invitingOrganization" ||
                                                invitingSource ===
                                                    "temporaryAccomodation"
                                            )
                                        }
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* ******* INVITING PERSON DETAILS *********** */}
                        <Box
                            sx={{
                                display:
                                    invitingSource === "invitingOrganization" ||
                                    invitingSource === "invitingPerson"
                                        ? "block"
                                        : "none",
                                mt: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                Contact person
                            </Typography>
                            <Box
                                sx={{
                                    my: 2,
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    gap: 2,
                                    "@media (min-width: 640px)": {
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                    },
                                    "@media (min-width: 1024px)": {
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                    },
                                }}
                            >
                                {[
                                    "invitingContactPersonName",
                                    "invitingContactPersonSurname",
                                    "invitingContactPersonCountry",
                                    "invitingContactPersonCity",
                                    "invitingContactPersonZipCode",
                                    "invitingContactPersonAddress",
                                    "invitingContactPersonEmail",
                                    "invitingContactPersonNumber",
                                    "invitingContactPersonFax",
                                ].map((field, index) => (
                                    <TextField
                                        key={index}
                                        label={formatLabel(field)}
                                        fullWidth
                                        required={
                                            field !== "invitingContactPersonFax"
                                        }
                                        name={field}
                                        value={formValues[field] || ""}
                                        onChange={handleChange}
                                        type={getFieldType(field)}
                                        disabled={
                                            !(
                                                invitingSource ===
                                                    "invitingOrganization" ||
                                                invitingSource ===
                                                    "invitingPerson"
                                            )
                                        }
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* ------------- Cost of Travelling and Living  ----------------------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Cost of travelling and living during the applicant's
                        stay is covered
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="cost-cover-select-label">
                                Cost Covered By
                            </InputLabel>
                            <Select
                                labelId="cost-cover-select-label"
                                id="cost-cover-select"
                                name="costCoverBy"
                                required
                                value={formValues.costCoverBy}
                                onChange={handleChange}
                                label="Cost Covered By"
                            >
                                {costSponsorBy.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="means-support-select-label">
                                Means Of Support
                            </InputLabel>
                            <Select
                                labelId="means-support-select-label"
                                id="means-support-select"
                                name="meansSupport"
                                value={formValues.meansSupport}
                                onChange={handleChange}
                                required
                                label="Means Of Support"
                            >
                                {meansSupport.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* -------------Overseas Family Data----------------------------------------------- */}
                <Box>
                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                        Personal data of the family member who is an EU, EEA or
                        CH citizen
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <TextField
                            label="Surname (Family Name)"
                            fullWidth
                            name="overseasFamilySurname"
                            value={formValues.overseasFamilySurname}
                            onChange={handleChange}
                            type="text"
                        />
                        <TextField
                            label="First Name (Given Name)"
                            fullWidth
                            name="overseasFirstname"
                            value={formValues.overseasFirstname}
                            onChange={handleChange}
                            type="text"
                        />
                        <TextField
                            label="Date Of Birth"
                            type="date"
                            fullWidth
                            name="overseasFamilyDob"
                            value={formValues.overseasFamilyDob}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="overseas-family-nationality-label">
                                Nationality
                            </InputLabel>
                            <Select
                                labelId="overseas-family-nationality-label"
                                id="overseas-family-nationality-select"
                                name="overseasFamilyNationality"
                                value={formValues.overseasFamilyNationality}
                                onChange={handleChange}
                                label="Nationality"
                            >
                                {countries.map((item, index) => (
                                    <MenuItem key={index} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Document Number"
                            fullWidth
                            name="overseasFamilyDocumentNumber"
                            value={formValues.overseasFamilyDocumentNumber}
                            onChange={handleChange}
                            type="text"
                        />
                    </Box>
                </Box>

                {/* -----------Family relationship with an EU, EEA or CH citizen------ */}
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Family relationship with an EU, EEA or CH citizen
                    </Typography>
                    <Box
                        sx={{
                            my: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 2,
                            "@media (min-width: 640px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (min-width: 1024px)": {
                                gridTemplateColumns: "repeat(3, 1fr)",
                            },
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="overseas-family-relationship-label">
                                Relationship
                            </InputLabel>
                            <Select
                                labelId="overseas-family-relationship-label"
                                id="overseas-family-relationship-select"
                                name="overseasFamilyRelationship"
                                value={formValues.overseasFamilyRelationship}
                                onChange={handleChange}
                                label="Relationship"
                            >
                                {overseasRelationship.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                    }}
                >
                    <Button type="submit" variant="contained" size="large">
                        Submit
                    </Button>
                </Box>
            </form>
            <OtpModal
                onClose={handleClose}
                open={showOtp}
                setOpen={setShowOtp}
                handleOpen={handleOpen}
            />
        </Box>
    );
};

export default ApplicantDetails;
