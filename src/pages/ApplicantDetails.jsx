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

const ApplicantDetails = () => {
  const [guardianFlag, setGuardianFlag] = useState(false);
  const [otherAddressFlag, setOtherAddressFlag] = useState(false);
  const [previourSchengenStatus, setPreviousSchengenStatus] = useState(false);
  const [fingerPrintsCollect, setFingerPrintsCollect] = useState("59months");
  const [fingerPrintDate, setFingerPrintDate] = useState("");
  const [invitingSource, setInvitingSource] = useState("invitingOrganization");

  const handleRadioChange = (event) => {
    setFingerPrintsCollect(event.target.value);
  };

  const handleInputChange = (event) => {
    setFingerPrintDate(event.target.value);
  };

  return (
    <Box p={2} sx={{ width: "100%" }}>
      <form>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          Applicant Details
        </Typography>
        <Box mb={20}>
          {/*--- Starter Form------ */}
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
              label="Applicant Email"
              fullWidth
              //   onChange={handleInputChange}
              name="email"
              type="text"
              // placeholder="Mission"
            />
            <TextField
              label="Mobile Number"
              fullWidth
              //   onChange={handleInputChange}
              name="mobileNumber"
              onInput={(e) => {
                // Prevent non-numeric input
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              inputProps={{
                inputMode: "numeric", // Optimized for numeric input on mobile
                pattern: "[0-9]*", // Restricts input to numeric characters
              }}
              // placeholder="number"
            />
            <TextField
              label="Mission"
              fullWidth
              //   onChange={handleInputChange}
              name="mission"
              placeholder="Mission"
            />

            <TextField
              label="Location"
              fullWidth
              //   onChange={handleInputChange}
              name="mission"
              // placeholder="Mission"
            />
            <TextField
              label="Visa Type"
              fullWidth
              //   onChange={handleInputChange}
              name="visaType"
              // placeholder="Mission"
            />
          </Box>
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
                //   onChange={handleInputChange}
                name="firstname"
                type="text"
                // placeholder="Mission"
              />
              <TextField
                label="Surname (Family Name)"
                fullWidth
                //   onChange={handleInputChange}
                name="surnamefamily"
                type="text"
                // placeholder="Mission"
              />
              <TextField
                label="Surname (At Birth)"
                fullWidth
                //   onChange={handleInputChange}
                name="surnamebirth"
                type="text"
                // placeholder="Mission"
              />
              <TextField
                label="Last Name"
                fullWidth
                //   onChange={handleInputChange}
                name="lastname"
                type="text"
                // placeholder="Mission"
              />
              <TextField
                label="Date Of Birth"
                type="date"
                fullWidth
                name="dob"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Place Of Birth"
                fullWidth
                //   onChange={handleInputChange}
                name="birthplace"
                type="text"
                // placeholder="Mission"
              />
              <FormControl fullWidth>
                <InputLabel id="country-select-label">
                  Country Of Birth
                </InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="country"
                  label="Select Country of Birth"
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
                <InputLabel id="country-select-label">
                  Select Current Nationality
                </InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="nationality"
                  label="Current Nationality"
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
                <InputLabel id="country-select-label">
                  Nationality At Birth
                </InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="nationalitybirth"
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
                  label="Gender Select"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Prefere Not to Disclose</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  labelId="marital-status-select"
                  name="maritalstatus"
                  label="Marital Status"
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="other">Widow/Divorced</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={guardianFlag}
                  onChange={(e) => setGuardianFlag(e.target.checked)}
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
                  fullWidth
                  //   onChange={handleInputChange}
                  name="guardianfirstname"
                  type="text"
                  disabled={!guardianFlag ? true : false}
                  // placeholder="Mission"
                />
                <TextField
                  label="Surname (Family Name)"
                  fullWidth
                  //   onChange={handleInputChange}
                  disabled={!guardianFlag ? true : false}
                  name="guardiansurnamefamily"
                  type="text"
                  // placeholder="Mission"
                />

                <TextField
                  label="Last Name"
                  fullWidth
                  //   onChange={handleInputChange}
                  disabled={!guardianFlag ? true : false}
                  name="guardianlastname"
                  type="text"
                  // placeholder="Mission"
                />
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Nationality</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    name="guardiannationality"
                    label=" Nationality"
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
                  //   onChange={handleInputChange}
                  disabled={!guardianFlag ? true : false}
                  name="guardianaddress"
                  type="text"
                  // placeholder="Mission"
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
                //   onChange={handleInputChange}
                name="nic"
                onInput={(e) => {
                  // Prevent non-numeric input
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                inputProps={{
                  inputMode: "numeric", // Optimized for numeric input on mobile
                  pattern: "[0-9]*", // Restricts input to numeric characters
                }}
                // placeholder="Mission"
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
                //   onChange={handleInputChange}
                name="passportNumber"
                onInput={(e) => {
                  // Prevent non-numeric input
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                name="expiryDate"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Issue Place"
                fullWidth
                //   onChange={handleInputChange}
                name="issuePlace"
                type="text"
              />
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Issue Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="issueCountry"
                  label=" Issue Country"
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
                label="Travel Date"
                type="date"
                fullWidth
                name="travelDate"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
          {/* --------------------3 Address and COntact Details-------------------------- */}
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
                //   onChange={handleInputChange}
                name="homeAddress1"
                type="text"
              />
              <TextField
                label="Home Address line 2"
                fullWidth
                //   onChange={handleInputChange}
                name="homeAddress2"
                type="text"
              />
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Issue Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="issueCountry"
                  label=" Issue Country"
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
                label="City"
                fullWidth
                //   onChange={handleInputChange}
                name="city"
                type="text"
              />
              <TextField
                label="Postal Code"
                fullWidth
                //   onChange={handleInputChange}
                name="postCode"
                onInput={(e) => {
                  // Prevent non-numeric input
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                inputProps={{
                  inputMode: "numeric", // Optimized for numeric input on mobile
                  pattern: "[0-9]*", // Restricts input to numeric characters
                }}
              />
              <TextField
                label="Contact Number"
                fullWidth
                //   onChange={handleInputChange}
                name="contactNumber"
                onInput={(e) => {
                  // Prevent non-numeric input
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
                  onChange={(e) => setOtherAddressFlag(e.target.checked)}
                />
              }
              label="In the case of minors, details of parental authority / legal guardian"
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
                  //   onChange={handleInputChange}
                  name="permitNumber"
                  onInput={(e) => {
                    // Prevent non-numeric input
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  inputProps={{
                    inputMode: "numeric", // Optimized for numeric input on mobile
                    pattern: "[0-9]*", // Restricts input to numeric characters
                  }}
                  disabled={!otherAddressFlag ? true : false}
                />
                <TextField
                  label="Permit Valid Till"
                  type="date"
                  fullWidth
                  name="permitValid"
                  disabled={!otherAddressFlag ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            )}
          </Box>
          {/* -----------------Employer / Educational Details----------------------------- */}
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
                //   onChange={handleInputChange}
                name="employerName"
                type="text"
              />
              <TextField
                label="Number"
                fullWidth
                //   onChange={handleInputChange}
                name="employerNumber"
                type="text"
              />
              <TextField
                label="Address"
                fullWidth
                //   onChange={handleInputChange}
                name="employerAddress"
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
                  label="Occupation"
                >
                  {occupation.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          {/* ---------------Travel  Information-------------------------------------- */}
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
              <FormControl fullWidth>
                <InputLabel id="purpose-type-select-label">
                  Purpose of Journey
                </InputLabel>
                <Select
                  labelId="purpose-type-select-label"
                  id="purpose-type-select"
                  name="purposeType"
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
                  Member State Destinatiom
                </InputLabel>
                <Select
                  labelId="purpose-type-select-label"
                  id="purpose-type-select"
                  name="memberFirstState"
                  label="Member State Destination"
                >
                  {countries.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="purpose-type-select-label">
                  Member State Second Destinatiom
                </InputLabel>
                <Select
                  labelId="purpose-type-select-label"
                  id="purpose-type-select"
                  name="memberSecondState"
                  label="Member State Second  Destination"
                >
                  {countries.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
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
                  label="Member State First Entry"
                >
                  {countries.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
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
                  name="numberofEntries"
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
                //   onChange={handleInputChange}
                name="stayDuration"
                type="text"
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={previourSchengenStatus}
                  onChange={(e) => setPreviousSchengenStatus(e.target.checked)}
                />
              }
              label="Previous Schengen Visa Details"
            />
            {previourSchengenStatus && (
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
                  label="previous Visa Number"
                  fullWidth
                  //   onChange={handleInputChange}
                  name="previousVisaNumber"
                  disabled={!previourSchengenStatus ? true : false}
                  onInput={(e) => {
                    // Prevent non-numeric input
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  inputProps={{
                    inputMode: "numeric", // Optimized for numeric input on mobile
                    pattern: "[0-9]*", // Restricts input to numeric characters
                  }}
                />
                <TextField
                  label="Previous Visa Valid From"
                  type="date"
                  fullWidth
                  name="previousVisaValidFrom"
                  disabled={!previourSchengenStatus ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Previous Visa Valid To"
                  type="date"
                  fullWidth
                  name="previousVisaValidTo"
                  disabled={!previourSchengenStatus ? true : false}
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
                    name="purposeType"
                    label="Previous Visa Issue  Country"
                    disabled={!previourSchengenStatus ? true : false}
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
              Fingerprints collected previously for the purpose of applying for
              a schengen visa
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
                    value={fingerPrintsCollect}
                    onChange={handleRadioChange}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="59months"
                      control={<Radio />}
                      label="Fingerprints taken in last 59 months for Schengen visa applications"
                    />
                    <FormControlLabel
                      value="under12"
                      control={<Radio />}
                      label="For legal reasons(under 12 years old)"
                    />
                    <FormControlLabel
                      value="noReason"
                      control={<Radio />}
                      label="No reason for exemption"
                    />
                  </RadioGroup>
                </FormControl>
                {fingerPrintsCollect === "59months" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "13px", fontWeight: 600, py: 1 }}
                    >
                      Previous Fingerprint Date
                    </Typography>
                    <TextField
                      // label="Intended Stay Duration"
                      value={fingerPrintDate}
                      onChange={handleInputChange}
                      name="fingerPrintDate"
                      type="date"
                      sx={{ width: "100%" }}
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
              <FormControl fullWidth>
                <InputLabel id="country-select-label">
                  Final Destination Issued By Country
                </InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="finalDestinationIssueCountry"
                  label="FinalDestinationIssueByCountry"
                >
                  {countries.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Final Destination Issue Date"
                type="date"
                fullWidth
                name="finalDestinationIssueDate"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Final Destination Date Valid"
                type="date"
                fullWidth
                name="finalDestinationDateValid"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Intended Date Of Arrival"
                type="date"
                fullWidth
                name="intendDateArrival"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Intended Date Of Departure"
                type="date"
                fullWidth
                name="intendDateDeparture"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
          {/* ----------------- Details of the inviting person(s) in the member state(s)-------- */}
          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
              Details of the inviting person(s) in the member state(s). If not
              applicable, details of hotel(s) or temporary accommodation(s) in
              the member state(s)
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
                    // value={invitingSource}
                    defaultValue={invitingSource}
                    // onChange={handleRadioChange}
                    onChange={(e) => setInvitingSource(e.target.value)}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="invitingOrganization"
                      control={<Radio />}
                      label=" Inviting company/organization"
                    />
                    <FormControlLabel
                      value="temporaryAccomodation"
                      control={<Radio />}
                      label=" Hotel(s) or temporary accommodation(s) in the member state(s)"
                    />
                    <FormControlLabel
                      value="invitingPerson"
                      control={<Radio />}
                      label="Inviting person(s) in the member state(s)"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {/* *******INVITING COMPANY************ */}
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
                  <TextField
                    label="Name"
                    fullWidth
                    //   onChange={handleInputChange}
                    name="invitingOrgName"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                  />
                  <FormControl fullWidth>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                      labelId="country-select-label"
                      id="country-select"
                      name="invitingOrgCountry"
                      label="Country"
                      disabled={
                        !(
                          invitingSource === "invitingOrganization" ||
                          invitingSource === "temporaryAccomodation"
                        )
                      }
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
                    name="invitingOrgCity"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                  />
                  <TextField
                    label="Zip Code"
                    fullWidth
                    name="invitingOrgZipCode"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                  />
                  <TextField
                    label="Address"
                    fullWidth
                    name="invitingOrgAddress"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    name="invitingOrgEmail"
                    type="email"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                  />
                  <TextField
                    label="Contact"
                    fullWidth
                    name="invitingOrgnumber"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                  />
                  <TextField
                    label="Fax No Text"
                    fullWidth
                    name="invitingOrgFax"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "temporaryAccomodation"
                      )
                    }
                  />
                </Box>
              </Box>
              {/* *******INVITINNG PERSON*********** */}
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
                  <TextField
                    label="Name"
                    fullWidth
                    name="invitingContactPersonName"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                  />
                  <FormControl fullWidth>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                      labelId="country-select-label"
                      id="country-select"
                      name="invitingContactPersonCountry"
                      label="Country"
                      disabled={
                        !(
                          invitingSource === "invitingOrganization" ||
                          invitingSource === "invitingPerson"
                        )
                      }
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
                    name="invitingContactPersonCity"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                  />
                  <TextField
                    label="Zip Code"
                    fullWidth
                    name="invitingContactPersonZipCode"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                  />
                  <TextField
                    label="Address"
                    fullWidth
                    name="invitingContactPersonAddress"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    name="invitingContactPersonEmail"
                    type="email"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                  />
                  <TextField
                    label="Contact"
                    fullWidth
                    name="invitingContactPersonNumber"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    inputProps={{
                      inputMode: "numeric", // Optimized for numeric input on mobile
                      pattern: "[0-9]*", // Restricts input to numeric characters
                    }}
                  />
                  <TextField
                    label="Fax No Text"
                    fullWidth
                    name="invitingContactPersonFax"
                    type="text"
                    disabled={
                      !(
                        invitingSource === "invitingOrganization" ||
                        invitingSource === "invitingPerson"
                      )
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* ------------- Cost of travelling and living  ----------------------------------- */}
          <Box>
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              Cost of travelling and living during the applicant's stay is
              covered
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
                  id="country-select"
                  name="costCoverBy"
                  label="Cost Cover By"
                >
                  {costSponsorBy.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}

                  {/* Add more countries as needed */}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="mean-support-select-label">
                  Means Of Support
                </InputLabel>
                <Select
                  labelId="mean-support-select-label"
                  id="country-select"
                  name="meansSupport"
                  label="Means Of Support "
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
              Personal data of the family member who is an EU, EEA or CH citizen
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
                //   onChange={handleInputChange}
                name="overseasFamilySurname"
                type="text"
              />
              <TextField
                label="First Name (Given Name)"
                fullWidth
                //   onChange={handleInputChange}
                name="overseasFamilySurname"
                type="text"
              />
              <TextField
                label="Date Of Birth"
                type="date"
                fullWidth
                name="overseasFamilydob"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Nationality</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  name="overseasFamilyNationality"
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
                //   onChange={handleInputChange}
                name="overseasFamilyDocumentNumber"
                type="text"
              />
            </Box>
          </Box>
          {/* -----------. Family relationship with an EU, EEA or CH citizen------ */}
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
                <InputLabel id="mean-support-select-label">
                  Relationship
                </InputLabel>
                <Select
                  labelId="mean-support-select-label"
                  id="country-select"
                  name="overseasFamilyRelationship"
                  label="Relationship "
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
            <Button variant="contained" size="large">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ApplicantDetails;
