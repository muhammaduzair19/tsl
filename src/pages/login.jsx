import React, { useState } from "react";
import axios from "axios";
import { cities, countries } from "../utils";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCenter, setSelectedCenter] = useState("");
    const [isLoading, setIsLoading] = useState();

    const submitHandler = async (e) => {
        setIsLoading(true);
        e.preventDefault();
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
                console.log(response);
                setIsLoading(false);
                toast.success(response.data?.msg || "Done");
                setEmail('')
                setPassword('')
                setSelectedCenter('')
                setSelectedCountry('')
            } else {
                setIsLoading(false);
                console.log("Not dont");
                toast.error(response.data?.msg || "Done");
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);

            console.log(error);
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-tr from-zinc-950 via-zinc-900 px-5 to-zinc-800 flex justify-center items-center">
            <div className=" rounded-md shadow-sm max-w-[420px] shadow-yellow-100 py-6 bg-gray-300	">
                <form
                    onSubmit={submitHandler}
                    className="w-full h-full flex flex-col px-4 gap-4 "
                >
                    <h1 className="font-bold text-3xl gradient-title  text-center">
                        Login
                    </h1>
                    <div className="w-full flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-medium font-medium"
                        >
                            Email
                        </label>
                        <input
                            required
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="px-2 py-2 rounded-md border border-gray-400 focus:outline-yellow-600"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-medium font-medium"
                        >
                            Password
                        </label>
                        <input
                            required
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-2 py-2 rounded-md border border-gray-400 focus:outline-yellow-600"
                        />
                    </div>
                    <div className="w-full flex  gap-1">
                        <span className="w-1/2 flex flex-col gap-1">
                            <label
                                htmlFor="country"
                                className="text-medium font-medium"
                            >
                                Country
                            </label>
                            <select
                                required
                                className="px-2 py-2 rounded-md border border-gray-400 focus:outline-yellow-600 w-full"
                                name="country"
                                value={selectedCountry}
                                onChange={(e) =>
                                    setSelectedCountry(e.target.value)
                                }
                            >
                                {countries.map(({ name, value, disabled }) => (
                                    <option
                                        key={value}
                                        value={value}
                                        disabled={disabled}
                                    >
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <span className="w-1/2 flex flex-col gap-1">
                            <label
                                htmlFor="city"
                                className="text-medium font-medium"
                            >
                                Center
                            </label>
                            <select
                                required
                                className="px-2 py-2 rounded-md border border-gray-400 focus:outline-yellow-600 w-full"
                                name="center"
                                value={selectedCenter}
                                onChange={(e) =>
                                    setSelectedCenter(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select center
                                </option>
                                {cities[selectedCountry]?.map(
                                    ({ cityName }) => (
                                        <option key={cityName} value={cityName}>
                                            {cityName}
                                        </option>
                                    )
                                )}
                            </select>
                        </span>
                    </div>
                    <button
                        disabled={isLoading}
                        className={`${
                            isLoading
                                ? "bg-white text-black"
                                : " bg-black text-white"
                        } w-full py-2 rounded-md duration-500 transition-all font-medium hover:bg-white hover:text-black`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center px-4 gap-3">
                                <MoonLoader size={22} />
                                <p>Kindly wait for some time.</p>
                            </span>
                        ) : (
                            "Book"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
