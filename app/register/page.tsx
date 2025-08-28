"use client";

import type React from "react";
import { useState } from "react";
import { Calendar, DollarSign, IndianRupee } from "lucide-react";

const metadata = {
  title: "Workshop Registration - Open PRO",
  description: "Register for our workshop",
};

const workshopNames = [
  {
    value: "intro-data-science",
    label: "Intro to Data Science & Machine Learning",
    title: "Intro to Data Science & Machine Learning",
    date: "September 11, 2025",
    price: 250,
  },
  {
    value: "generative-ai-rag",
    label: "Generative AI & RAG in Action",
    title: "Generative AI & RAG in Action",
    date: "September 11–12, 2025 (Two days)",
    price: 500,
  },
  {
    value: "nlp-hugging-face",
    label: "NLP with Hugging Face",
    title: "NLP with Hugging Face",
    date: "September 11, 2025",
    price: 250,
  },
  {
    value: "fullstack-mern",
    label: "Full-Stack Web Development with MERN",
    title: "Full-Stack Web Development with MERN",
    date: "September 12, 2025",
    price: 250,
  },
];

export default function WorkshopForm() {
  const [currentStep, setCurrentStep] = useState<
    "selection" | "registration" | "payment"
  >("selection");
  const [selectedWorkshop, setSelectedWorkshop] = useState<
    (typeof workshopNames)[0] | null
  >(null);

  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    yearOfStudy: "",
    email: "",
    contactNumber: "",
    workshopName: "",
    isAcmMember: false,
    foodPreference: "",
    paymentScreenshot: null as File | null,
  });

  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleWorkshopSelect = (workshop: (typeof workshopNames)[0]) => {
    setSelectedWorkshop(workshop);
    setFormData((prev) => ({
      ...prev,
      workshopName: workshop.value,
    }));
    setCurrentStep("registration");
  };

  const validateFormData = () => {
    const requiredFields = [
      "fullName",
      "institution",
      "yearOfStudy",
      "email",
      "contactNumber",
      "workshopName",
      "foodPreference",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(
          `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return false;
      }
    }

    if (!formData.paymentScreenshot) {
      alert("Please upload payment confirmation screenshot.");
      return false;
    }

    return true;
  };

  const sendPaymentData = async () => {
    const paymentData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "paymentScreenshot" && value instanceof File) {
        paymentData.append("paymentScreenshot", value);
      } else if (key !== "paymentScreenshot") {
        paymentData.append(key, String(value));
      }
    });

    try {
      const response = await fetch("http://localhost:4000/", {
        //dummy api
        method: "POST",
        body: paymentData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Payment processed successfully:", result);
        return true;
      } else {
        console.error("Payment processing failed:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("API request error:", error);
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setCurrentStep("payment");
    setShowPayment(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: file,
      }));
      console.log("Payment screenshot uploaded:", file.name);
    }
  };

  const handleCompletePayment = async () => {
    if (!validateFormData()) {
      return;
    }

    console.log("Sending payment data:", formData);
    const success = await sendPaymentData();

    if (success) {
      setPaymentCompleted(true);
      alert("Payment completed successfully! Registration confirmed.");
    } else {
      alert("Payment processing failed. Please try again.");
    }
  };

  const handleBackToForm = () => {
    setShowPayment(false);
    setCurrentStep("registration");
    setFormData((prev) => ({
      ...prev,
      paymentScreenshot: null,
    }));
    setPaymentCompleted(false);
  };

  const handleBackToSelection = () => {
    setCurrentStep("selection");
    setSelectedWorkshop(null);
    setFormData((prev) => ({
      ...prev,
      workshopName: "",
    }));
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              {currentStep === "selection"
                ? "Select Workshop"
                : currentStep === "payment"
                ? "Complete Payment"
                : "Workshop Registration"}
            </h1>
          </div>

          {currentStep === "selection" && (
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-2">
                {workshopNames.map((workshop) => (
                  <div
                    key={workshop.value}
                    className="cursor-pointer rounded-lg border border-indigo-200/20 bg-white/5 p-6 transition-all hover:border-indigo-200/40 hover:bg-white/10"
                    onClick={() => handleWorkshopSelect(workshop)}
                  >
                    <h3 className="mb-3 text-lg font-semibold text-indigo-200">
                      {workshop.title}
                    </h3>
                    <div className="mb-4 space-y-2 text-sm text-indigo-200/65">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-semibold text-indigo-200">
                          {workshop.price}
                        </span>
                      </div>
                    </div>
                    <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                      Select Workshop
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "registration" && !showPayment && (
            /* Contact form */
            <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
              {selectedWorkshop && (
                <div className="mb-6 rounded-lg border border-indigo-200/20 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-indigo-200">
                        {selectedWorkshop.title}
                      </h3>
                      <p className="text-sm text-indigo-200/65">
                        {selectedWorkshop.date} • ₹{selectedWorkshop.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleBackToSelection}
                      className="text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="fullName"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="institution"
                  >
                    Institution <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="yearOfStudy"
                  >
                    Year of Study <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    className="form-input w-full"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select year of study</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                  </select>
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input w-full"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="contactNumber"
                  >
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    className="form-input w-full"
                    placeholder="Your contact number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isAcmMember"
                      className="form-checkbox text-indigo-500"
                      checked={formData.isAcmMember}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm font-medium text-indigo-200/65">
                      Are you an ACM member?
                    </span>
                  </label>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65">
                    Food Preference <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="foodPreference"
                        value="vegetarian"
                        className="form-radio text-indigo-500"
                        checked={formData.foodPreference === "vegetarian"}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="text-sm text-indigo-200/65">
                        Vegetarian
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="foodPreference"
                        value="non-vegetarian"
                        className="form-radio text-indigo-500"
                        checked={formData.foodPreference === "non-vegetarian"}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="text-sm text-indigo-200/65">
                        Non-Vegetarian
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn w-full  bg-linear-to-t from-indigo-600 to-indigo-500  text-white bg-[length:100%_100%] bg-[bottom]  shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] cursor-pointer"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {currentStep === "payment" && showPayment && (
            /* Payment section with QR code and file upload */
            <div className="mx-auto max-w-[500px]">
              {!paymentCompleted ? (
                <div className="space-y-8">
                  {/* QR Code Section */}
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-64 w-64 items-center justify-center rounded-lg border-2 border-indigo-200/20 bg-white/5">
                      <img
                        src="/payment_qr.png"
                        alt="Payment QR Code"
                        className="h-48 w-48"
                      />
                    </div>
                    <p className="text-sm text-indigo-200/65">abcd@upi</p>
                    <p className="text-sm text-indigo-200/65">+91 8989898989</p>
                  </div>

                  {/* Payment Details */}
                  <div className="rounded-lg border border-indigo-200/20 bg-white/5 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-indigo-200">
                      Payment Details
                    </h3>
                    <div className="space-y-2 text-sm text-indigo-200/65">
                      <div className="flex justify-between">
                        <span>Workshop:</span>
                        <span className="text-indigo-200">
                          {selectedWorkshop?.title || "Selected Workshop"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration Fee:</span>
                        <span className="text-indigo-200">
                          ₹{selectedWorkshop?.price || 500}
                        </span>
                      </div>
                      <hr className="border-indigo-200/20" />
                      <div className="flex justify-between font-semibold text-indigo-200">
                        <span>Total Amount:</span>
                        <span>₹{selectedWorkshop?.price || 500}</span>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-indigo-200">
                      Upload Payment Confirmation
                    </h3>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-indigo-200/65">
                        Payment Screenshot
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="form-input w-full file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700"
                      />
                      {formData.paymentScreenshot && (
                        <p className="mt-2 text-sm text-green-400">
                          ✓ File uploaded: {formData.paymentScreenshot.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleBackToForm}
                      className="btn flex-1 border border-indigo-200/20 bg-transparent text-indigo-200 hover:bg-indigo-200/10"
                    >
                      Back to Form
                    </button>
                    <button
                      onClick={handleCompletePayment}
                      className="btn flex-1 bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                    >
                      Complete Payment
                    </button>
                  </div>
                </div>
              ) : (
                /* Payment completion confirmation */
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                    <svg
                      className="h-10 w-10 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold text-indigo-200">
                    Payment Completed!
                  </h2>
                  <p className="mb-6 text-indigo-200/65">
                    Your workshop registration has been confirmed. You will
                    receive a confirmation email shortly.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Return to Home
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
