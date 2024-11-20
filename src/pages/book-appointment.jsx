import React, { useState } from "react";
import axios from "axios";
import { cities, countries } from "../utils";
import { Eye, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (selectedCountry && selectedCenter) {
      setStep(2);
    } else {
      toast.error("Please select both country and center");
    }
  };

  const handleBack = () => {
    if (email || password || step === 2) {
      setStep(1);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.18.122:5000/api/start_bot",
        {
          email,
          password,
          country: selectedCountry,
          center: selectedCenter,
        }
      );
      if (response.status) {
        toast.success(response.data?.msg || "Appointment booked successfully");
        setEmail("");
        setPassword("");
        setSelectedCenter("");
        setSelectedCountry("");
        setStep(1);
      } else {
        toast.error(response.data?.msg || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg min-w-[420px] px-8 py-6 max-w-lg">
        <form
          onSubmit={step === 1 ? handleConfirm : submitHandler}
          className="w-full h-full flex flex-col gap-6 "
        >
          <h1 className="font-bold text-2xl text-gray-700 text-center">
            Book an Appointment
          </h1>
          <p className="text-center text-gray-500 text-sm">
            {step === 1
              ? "Step 1: Select your country and center"
              : "Step 2: Enter your login details"}
          </p>
          {step === 1 ? (
            <>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="country" className="text-gray-600">
                  Country
                </label>
                <select
                  required
                  className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  name="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map(({ name, value, disabled }) => (
                    <option key={value} value={value} disabled={disabled}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="city" className="text-gray-600">
                  Center
                </label>
                <select
                  required
                  className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  name="center"
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                >
                  <option value="" disabled>
                    Select center
                  </option>
                  {cities[selectedCountry]?.map(({ cityName }) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                disabled={isLoading}
                className={`w-full py-3 mt-4 rounded-lg text-sm font-medium text-white transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                }`}
              >
                Confirm Selection
              </button>
            </>
          ) : (
            <>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="email" className="text-gray-600">
                  Email
                </label>
                <input
                  required
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="password" className="text-gray-600">
                  Password
                </label>
                <input
                  required
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <button
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-sm font-medium text-white transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </>
          )}
        </form>
        {step === 2 && (
          <button
            onClick={handleBack}
            disabled={isLoading}
            className={`w-full py-3 mt-4 rounded-lg text-sm font-medium text-white transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
