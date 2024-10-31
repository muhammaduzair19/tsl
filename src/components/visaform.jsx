import React from "react";

const VisaForm = () => {
    const visaFormSubmit = (e) => {
        e.preventDefault();

        const location = e.target.location.value;
        const visaType = e.target.visaType.value;
        const visaSubType = e.target.visaSubType.value;
        const appointmentFor = e.target.appointmentFor.value;
        const appointmentCategory = e.target.appointmentCategory.value;

        console.log(location);
        console.log(visaType);
        console.log(visaSubType);
        console.log(appointmentFor);
        console.log(appointmentCategory);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-800 text-white">
            <div className="bg-zinc-900 p-6 rounded-lg w-96 shadow-lg">
                <form id="visaForm" onSubmit={visaFormSubmit}>
                    <label htmlFor="location" className="block text-sm mb-2">
                        Location
                    </label>
                    <select
                        id="location"
                        name="location"
                        required
                        className="w-full p-2 mb-4 bg-zinc-700 text-white rounded border border-gray-600"
                    >
                        <option value="">--Select--</option>
                        <option value="islamabad">Islamabad</option>
                        <option value="karachi">Karachi</option>
                        <option value="lahore">Lahore</option>
                    </select>

                    <label htmlFor="visaType" className="block text-sm mb-2">
                        Visa Type
                    </label>
                    <select
                        id="visaType"
                        name="visaType"
                        required
                        className="w-full p-2 mb-4 bg-zinc-700 text-white rounded border border-gray-600"
                    >
                        <option value="">--Select--</option>
                        <option value="tourist">Tourist</option>
                        <option value="business">Business</option>
                        <option value="student">Student</option>
                    </select>

                    <label htmlFor="visaSubType" className="block text-sm mb-2">
                        Visa Sub Type
                    </label>
                    <select
                        id="visaSubType"
                        name="visaSubType"
                        required
                        className="w-full p-2 mb-4 bg-zinc-700 text-white rounded border border-gray-600"
                    >
                        <option value="">--Select--</option>
                        <option value="single-entry">Single Entry</option>
                        <option value="multiple-entry">Multiple Entry</option>
                    </select>

                    <label className="block text-sm mb-2">
                        Appointment For
                    </label>
                    <div className="flex justify-between mb-4">
                        <label className="flex items-center space-x-2">
                            <input
                                className="text-yellow-500"
                                type="radio"
                                name="appointmentFor"
                                value="individual"
                                required
                            />
                            <span>Individual</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                className="text-yellow-500"
                                type="radio"
                                name="appointmentFor"
                                value="family"
                            />
                            <span>Family</span>
                        </label>
                    </div>

                    <label
                        htmlFor="appointmentCategory"
                        className="block text-sm mb-2"
                    >
                        Appointment Category *
                    </label>
                    <select
                        id="appointmentCategory"
                        name="appointmentCategory"
                        required
                        className="w-full p-2 mb-4 bg-zinc-700 text-white rounded border border-gray-600"
                    >
                        <option value="">--Select--</option>
                        <option value="normal">Normal</option>
                        <option value="urgent">Premium</option>
                        <option value="prime">Prime Time</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VisaForm;
