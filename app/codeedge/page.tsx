"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, IndianRupee, MessageCircle } from "lucide-react";

type Step = "lead" | "member2" | "member3" | "payment";

const competition = {
  value: "code-edge",
  label: "Code Edge",
  title: "Code Edge",
  date: "September 12, 2025",
  price: 400,
  whatsapp: "https://chat.whatsapp.com/CaduBbV0egtH06nJGhaWfV?mode=ems_copy_t",
};

const departments = [
  { value: "CE", label: "Civil Engineering – CE" },
  { value: "CSE", label: "Computer Science and Engineering – CSE" },
  { value: "EEE", label: "Electrical and Electronics Engineering – EEE" },
  { value: "ECE", label: "Electronics and Communication Engineering – ECE" },
  { value: "EIE", label: "Electronics and Instrumentation Engineering – EIE" },
  { value: "ME", label: "Mechanical Engineering – ME" },
];

export default function CompetitionRegistrationPage() {
  const [currentStep, setCurrentStep] = useState<Step>("lead");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [formData, setFormData] = useState({
    workshopName: competition.value,
    leadFullName: "",
    leadInstitution: "",
    leadSemester: "",
    leadDepartment: "",
    leadBatch: "",
    leadEmail: "",
    leadContactNumber: "",
    member2FullName: "",
    member2Semester: "",
    member2Department: "",
    member2Batch: "",
    member2ContactNumber: "",
    member3FullName: "",
    member3Semester: "",
    member3Department: "",
    member3Batch: "",
    member3ContactNumber: "",
    paymentScreenshot: null as File | null,
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function headerTitle() {
    switch (currentStep) {
      case "lead":
        return "Team Lead Details";
      case "member2":
        return "Member 2 Details";
      case "member3":
        return "Member 3 Details";
      case "payment":
        return "Complete Payment";
    }
  }

  function validateAll(): boolean {
    const required: string[] = [
      // lead
      "leadFullName",
      "leadInstitution",
      "leadSemester",
      "leadDepartment",
      "leadBatch",
      "leadEmail",
      "leadContactNumber",
      // member 2
      "member2FullName",
      "member2Semester",
      "member2Department",
      "member2Batch",
      "member2ContactNumber",
      // member 3
      "member3FullName",
      "member3Semester",
      "member3Department",
      "member3Batch",
      "member3ContactNumber",
    ];

    for (const key of required) {
      if (!formData[key as keyof typeof formData]) {
        alert(`Please complete field: ${key.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }

    if (!formData.paymentScreenshot) {
      alert("Please upload payment confirmation screenshot.");
      return false;
    }
    return true;
  }

  async function uploadToCloudinary(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "registration"); // unsigned preset
    fd.append("folder", "icefoss");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmlzfwdk2/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return { url: data.secure_url, publicId: data.public_id };
  }

  async function sendPaymentData() {
    try {
      let screenshotUrl = "";
      let publicId = "";

      if (formData.paymentScreenshot instanceof File) {
        const result = await uploadToCloudinary(formData.paymentScreenshot);
        screenshotUrl = result.url;
        publicId = result.publicId;
      }

      const payload = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "paymentScreenshot") {
          if (screenshotUrl) payload.append("screenshotUrl", screenshotUrl);
          if (publicId) payload.append("publicId", publicId);
        } else {
          payload.append(key, String(value));
        }
      });

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzbpQUJbt6KCkdnA1uJHYR0TEDnOh7sg4bZ51ZeshQXgWInIpgswS190HgPehJjN11Zig/exec",
        { method: "POST", body: payload }
      );

      if (!response.ok) {
        console.error("Payment processing failed:", response.statusText);
        return false;
      }
      console.log("Payment processed successfully:", await response.text());
      return true;
    } catch (err) {
      console.error("API request error:", err);
      return false;
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, paymentScreenshot: file }));
    }
  }

  async function handleCompletePayment() {
    setPaymentProcessing(true);
    if (!validateAll()) {
      setPaymentProcessing(false);
      return;
    }
    const ok = await sendPaymentData();
    setPaymentProcessing(false);
    if (ok) setPaymentCompleted(true);
    else alert("Payment processing failed. Please try again.");
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              {headerTitle()}
            </h1>
          </div>

          {/* Competition summary */}
          {currentStep != "payment" && (
            <div className="mx-auto mb-8 max-w-[500px] rounded-lg border border-indigo-200/20 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-indigo-200">
                    {competition.title}
                  </h3>
                  <p className="text-sm text-indigo-200/65 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{competition.date}</span>
                  </p>
                  <p className="text-sm text-indigo-200/65 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    <span className="font-semibold text-indigo-200">
                      ₹{competition.price}
                    </span>
                  </p>
                </div>
                <div className="text-xs text-indigo-200/60">3-member team</div>
              </div>
            </div>
          )}

          {/* Lead step */}
          {currentStep === "lead" && (
            <form
              className="mx-auto max-w-[500px] space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep("member2");
              }}
            >
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_fullName"
                >
                  Team Lead Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="lead_fullName"
                  name="leadFullName"
                  type="text"
                  className="form-input w-full"
                  placeholder="Team lead full name"
                  value={formData.leadFullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_institution"
                >
                  Institution <span className="text-red-600">*</span>
                </label>
                <input
                  id="lead_institution"
                  name="leadInstitution"
                  type="text"
                  className="form-input w-full"
                  placeholder="Institution"
                  value={formData.leadInstitution}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_semester"
                >
                  Semester <span className="text-red-600">*</span>
                </label>
                <select
                  id="lead_semester"
                  name="leadSemester"
                  className="form-input w-full"
                  value={formData.leadSemester}
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
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_department"
                >
                  Department <span className="text-red-600">*</span>
                </label>
                <select
                  id="lead_department"
                  name="leadDepartment"
                  className="form-input w-full"
                  value={formData.leadDepartment}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_batch"
                >
                  Batch <span className="text-red-600">*</span>{" "}
                  <span className="text-indigo-200/40 italic">
                    Select 'A' if no batch
                  </span>
                </label>
                <select
                  id="lead_batch"
                  name="leadBatch"
                  className="form-input w-full"
                  value={formData.leadBatch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select batch</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_email"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="lead_email"
                  name="leadEmail"
                  type="email"
                  className="form-input w-full"
                  placeholder="Team lead email"
                  value={formData.leadEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="lead_contact"
                >
                  Contact Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="lead_contact"
                  name="leadContactNumber"
                  type="tel"
                  maxLength={10}
                  className="form-input w-full"
                  placeholder="Team lead contact number"
                  value={formData.leadContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-4">
                <button
                  type="submit"
                  className="btn bg-linear-to-t from-indigo-600 to-indigo-500 text-white bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%]"
                >
                  Next: Member 2
                </button>
              </div>
            </form>
          )}

          {/* Member 2 step */}
          {currentStep === "member2" && (
            <form
              className="mx-auto max-w-[500px] space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep("member3");
              }}
            >
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m2_fullName"
                >
                  Member 2 Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="m2_fullName"
                  name="member2FullName"
                  type="text"
                  className="form-input w-full"
                  placeholder="Member 2 full name"
                  value={formData.member2FullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m2_semester"
                >
                  Semester <span className="text-red-600">*</span>
                </label>
                <select
                  id="m2_semester"
                  name="member2Semester"
                  className="form-input w-full"
                  value={formData.member2Semester}
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
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m2_department"
                >
                  Department <span className="text-red-600">*</span>
                </label>
                <select
                  id="m2_department"
                  name="member2Department"
                  className="form-input w-full"
                  value={formData.member2Department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m2_batch"
                >
                  Batch <span className="text-red-600">*</span>{" "}
                  <span className="text-indigo-200/40 italic">
                    Select 'A' if no batch
                  </span>
                </label>
                <select
                  id="m2_batch"
                  name="member2Batch"
                  className="form-input w-full"
                  value={formData.member2Batch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select batch</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m2_contact"
                >
                  Contact Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="m2_contact"
                  name="member2ContactNumber"
                  type="tel"
                  maxLength={10}
                  className="form-input w-full"
                  placeholder="Member 2 contact number"
                  value={formData.member2ContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("lead")}
                  className="btn border border-indigo-200/20 bg-transparent text-indigo-200 hover:bg-indigo-200/10"
                >
                  Back: Lead
                </button>
                <button
                  type="submit"
                  className="btn bg-linear-to-t from-indigo-600 to-indigo-500 text-white bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%]"
                >
                  Next: Member 3
                </button>
              </div>
            </form>
          )}

          {/* Member 3 step */}
          {currentStep === "member3" && (
            <form
              className="mx-auto max-w-[500px] space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep("payment");
              }}
            >
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m3_fullName"
                >
                  Member 3 Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="m3_fullName"
                  name="member3FullName"
                  type="text"
                  className="form-input w-full"
                  placeholder="Member 3 full name"
                  value={formData.member3FullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m3_semester"
                >
                  Semester <span className="text-red-600">*</span>
                </label>
                <select
                  id="m3_semester"
                  name="member3Semester"
                  className="form-input w-full"
                  value={formData.member3Semester}
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
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m3_department"
                >
                  Department <span className="text-red-600">*</span>
                </label>
                <select
                  id="m3_department"
                  name="member3Department"
                  className="form-input w-full"
                  value={formData.member3Department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m3_batch"
                >
                  Batch <span className="text-red-600">*</span>{" "}
                  <span className="text-indigo-200/40 italic">
                    Select 'A' if no batch
                  </span>
                </label>
                <select
                  id="m3_batch"
                  name="member3Batch"
                  className="form-input w-full"
                  value={formData.member3Batch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select batch</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="m3_contact"
                >
                  Contact Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="m3_contact"
                  name="member3ContactNumber"
                  type="tel"
                  maxLength={10}
                  className="form-input w-full"
                  placeholder="Member 3 contact number"
                  value={formData.member3ContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("member2")}
                  className="btn border border-indigo-200/20 bg-transparent text-indigo-200 hover:bg-indigo-200/10"
                >
                  Back: Member 2
                </button>
                <button
                  type="submit"
                  className="btn bg-linear-to-t from-indigo-600 to-indigo-500 text-white bg-[length:100%_100%] bg-[bottom] hover:bg-[length:100%_150%]"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {/* Payment */}
          {currentStep === "payment" && (
            <div className="mx-auto max-w-[500px]">
              {!paymentCompleted ? (
                <div className="space-y-8">
                  {/* QR Code */}
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-64 w-64 items-center justify-center rounded-lg border-2 border-indigo-200/20 bg-white/5">
                      <img
                        src={"/payment_qr_codeedge.jpg"}
                        alt="Payment QR Code"
                        className="h-48 w-48"
                      />
                    </div>
                    <p className="text-sm text-indigo-200/65">
                      UPI ID: nikhilak2005@okicici
                    </p>
                    <p className="text-sm text-indigo-200/65">
                      Scan the QR to pay and upload the screenshot
                    </p>
                  </div>

                  {/* Payment Details */}
                  <div className="rounded-lg border border-indigo-200/20 bg-white/5 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-indigo-200">
                      Payment Details
                    </h3>
                    <div className="space-y-2 text-sm text-indigo-200/65">
                      <div className="flex justify-between">
                        <span>Competition:</span>
                        <span className="text-indigo-200">
                          {competition.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration Fee:</span>
                        <span className="text-indigo-200">
                          ₹{competition.price}
                        </span>
                      </div>
                      <hr className="border-indigo-200/20" />
                      <div className="flex justify-between font-semibold text-indigo-200">
                        <span>Total Amount:</span>
                        <span>₹{competition.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Upload */}
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

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep("member3")}
                      className="btn flex-1 border border-indigo-200/20 bg-transparent text-indigo-200 hover:bg-indigo-200/10"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCompletePayment}
                      className="btn flex-1 bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                    >
                      Complete Payment
                      {paymentProcessing && (
                        <div className="inline-block h-4 w-4 ml-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
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
                    Your team registration has been confirmed.
                  </p>
                  <button className="btn bg-linear-to-t from-green-600 to-green-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">
                    <a
                      href={competition.whatsapp}
                      className="flex items-center justify-center"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join WhatsApp Group
                    </a>
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
