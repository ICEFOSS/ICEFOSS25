"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, IndianRupee } from "lucide-react"

const metadata = {
  title: "Workshop Registration - Open PRO",
  description: "Register for our workshop",
}

const workshopNames = [
  {
    value: "hugging-face",
    label: "Hugging Face",
    title: "Intro to Hugging Face: Train, Tune, Deploy",
    date: "September 11, 2025",
    price: 299,
  },
  {
    value: "generative-ai-rag",
    label: "Generative AI & RAG",
    title: "Mastering GenAI & Retrieval Augmented Generation (RAG)",
    date: "September 11–12, 2025 (Two days)",
    price: 449,
  },
  {
    value: "intro-data-science",
    label: "Data Science & Machine Learning",
    title: "Kickstart Your Journey in Data Science & ML",
    date: "September 12, 2025",
    price: 299,
  },
  {
    value: "fullstack-mern",
    label: "Full-Stack Web Development with MERN",
    title: "WebCraft MERN Stack",
    date: "September 12, 2025",
    price: 299,
  },
]

const departments = [
  { value: "CE", label: "Civil Engineering – CE" },
  { value: "CSE", label: "Computer Science and Engineering – CSE" },
  { value: "EEE", label: "Electrical and Electronics Engineering – EEE" },
  { value: "ECE", label: "Electronics and Communication Engineering – ECE" },
  { value: "EIE", label: "Electronics and Instrumentation Engineering – EIE" },
  { value: "ME", label: "Mechanical Engineering – ME" },
]

export default function WorkshopForm() {
  const [currentStep, setCurrentStep] = useState<"selection" | "registration" | "payment">("selection")
  const [selectedWorkshop, setSelectedWorkshop] = useState<(typeof workshopNames)[0] | null>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    semester: "",
    department: "",
    batch: "",
    email: "",
    contactNumber: "",
    workshopName: "",
    foodPreference: "",
    paymentScreenshot: null as File | null,
  })

  const [showPayment, setShowPayment] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)

  const handleWorkshopSelect = (workshop: (typeof workshopNames)[0]) => {
    setSelectedWorkshop(workshop)
    setFormData((prev) => ({
      ...prev,
      workshopName: workshop.value,
    }))
    setCurrentStep("registration")
  }

  const validateFormData = () => {
    const requiredFields = [
      "fullName",
      "institution",
      "semester",
      "department",
      "batch",
      "email",
      "contactNumber",
      "workshopName",
      "foodPreference",
    ]

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`)
        return false
      }
    }

    if (!formData.paymentScreenshot) {
      alert("Please upload payment confirmation screenshot.")
      return false
    }

    return true
  }

  // cloudinary function for uploading screenshots
  async function uploadToCloudinary(file: File) {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("upload_preset", "registration") // from Cloudinary
    fd.append("folder", "icefoss")

    const res = await fetch("https://api.cloudinary.com/v1_1/dmlzfwdk2/image/upload", {
      method: "POST",
      body: fd,
    })

    if (!res.ok) throw new Error("Upload failed")

    const data = await res.json()
    return { url: data.secure_url, publicId: data.public_id }
  }

  const sendPaymentData = async () => {
    const paymentData = new FormData()
    try {
      let screenshotUrl = ""
      let publicId = ""

      // Upload to Cloudinary
      if (formData.paymentScreenshot instanceof File) {
        const result = await uploadToCloudinary(formData.paymentScreenshot)
        screenshotUrl = result.url
        publicId = result.publicId
      }

      const paymentData = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "paymentScreenshot") {
          if (screenshotUrl) paymentData.append("screenshotUrl", screenshotUrl)
          if (publicId) paymentData.append("publicId", publicId)
        } else {
          paymentData.append(key, String(value))
        }
      })
      // Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzbpQUJbt6KCkdnA1uJHYR0TEDnOh7sg4bZ51ZeshQXgWInIpgswS190HgPehJjN11Zig/exec",
        {
          method: "POST",
          body: paymentData,
        },
      )

      if (response.ok) {
        console.log("Payment processed successfully:", await response.text())
        return true
      } else {
        console.error("Payment processing failed:", response.statusText)
        return false
      }
    } catch (error) {
      console.error("API request error:", error)
      setPaymentProcessing(false)

      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted with data:", formData)
    setCurrentStep("payment")
    setShowPayment(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: file,
      }))
      console.log("Payment screenshot uploaded:", file.name)
    }
  }

  const handleCompletePayment = async () => {
    setPaymentProcessing(true)
    if (!validateFormData()) {
      setPaymentProcessing(false)
      return
    }

    console.log("Sending payment data:", formData)
    const success = await sendPaymentData()
    setPaymentProcessing(false)
    if (success) {
      setPaymentCompleted(true)
      // alert("Payment completed successfully! Registration confirmed.");
    } else {
      alert("Payment processing failed. Please try again.")
    }
  }

  const handleBackToForm = () => {
    setShowPayment(false)
    setCurrentStep("registration")
    setFormData((prev) => ({
      ...prev,
      paymentScreenshot: null,
    }))
    setPaymentCompleted(false)
  }

  const handleBackToSelection = () => {
    setCurrentStep("selection")
    setSelectedWorkshop(null)
    setFormData((prev) => ({
      ...prev,
      workshopName: "",
    }))
  }

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
                    <h3 className="mb-3 text-lg font-semibold text-indigo-200">{workshop.title}</h3>
                    <div className="mb-4 space-y-2 text-sm text-indigo-200/65">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-semibold text-indigo-200">{workshop.price}</span>
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
                      <h3 className="font-semibold text-indigo-200">{selectedWorkshop.title}</h3>
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
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="fullName">
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
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="institution">
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
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="semester">
                    Semester <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    className="form-input w-full"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select semester</option>
                    <option value="S1">S1</option>
                    <option value="S3">S3</option>
                    <option value="S5">S5</option>
                    <option value="S7">S7</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="department">
                    Department <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="form-input w-full"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="batch">
                    Batch <span className="text-red-600">*</span>{"  "}<span className="text-indigo-200/40 italic">Select 'A' if no batch</span>
                  </label>
                  <select
                    id="batch"
                    name="batch"
                    className="form-input w-full"
                    value={formData.batch}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select batch</option>
                    {/* <option value="none">None</option> */}
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="email">
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
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="contactNumber">
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    
                    maxLength={10}
                    className="form-input w-full"
                    placeholder="Your contact number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
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
                      <span className="text-sm text-indigo-200/65">Vegetarian</span>
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
                      <span className="text-sm text-indigo-200/65">Non-Vegetarian</span>
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
                    
                    <img src={selectedWorkshop?.price === 449 ? "/payment_qr_2day.jpeg" :"/payment_qr_1day.jpeg"} alt="Payment QR Code" className="h-48 w-48" />
                      {/* <img src="/payment_qr.png" alt="Payment QR Code" className="h-48 w-48" /> */}
                    </div>
                    <p className="text-sm text-indigo-200/65">UPI ID: nikhilak2005@okicici</p>
                    <p className="text-sm text-indigo-200/65">Scan QR code to complete payment and upload the screenshot</p>
                  </div>

                  {/* Payment Details */}
                  <div className="rounded-lg border border-indigo-200/20 bg-white/5 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-indigo-200">Payment Details</h3>
                    <div className="space-y-2 text-sm text-indigo-200/65">
                      <div className="flex justify-between">
                        <span>Workshop:</span>
                        <span className="text-indigo-200">{selectedWorkshop?.title || "Selected Workshop"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration Fee:</span>
                        <span className="text-indigo-200">₹{selectedWorkshop?.price || 449}</span>
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
                    <h3 className="text-lg font-semibold text-indigo-200">Upload Payment Confirmation</h3>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-indigo-200/65">Payment Screenshot</label>
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
                      {paymentProcessing && (
                        <div className="inline-block h-4 w-4 ml-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Payment completion confirmation */
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                    <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold text-indigo-200">Payment Completed!</h2>
                  <p className="mb-6 text-indigo-200/65">
                    Your workshop registration has been confirmed.
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
  )
}
