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

type MemberBase = {
  fullName: string;
  semester: string;
  department: string;
  batch: string;
  contactNumber: string;
  foodPreference: "vegetarian" | "non-vegetarian" | "";
};
type Lead = MemberBase & {
  institution: string;
  email: string;
};

export default function CompetitionRegistrationPage() {
  const [currentStep, setCurrentStep] = useState<Step>("lead");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [formData, setFormData] = useState<{
    workshopName: string;
    lead: Lead;
    member2: MemberBase;
    member3: MemberBase;
    paymentScreenshot: File | null;
  }>({
    workshopName: competition.value,
    lead: {
      fullName: "",
      institution: "",
      semester: "",
      department: "",
      batch: "",
      email: "",
      contactNumber: "",
      foodPreference: "",
    },
    member2: {
      fullName: "",
      semester: "",
      department: "",
      batch: "",
      contactNumber: "",
      foodPreference: "",
    },
    member3: {
      fullName: "",
      semester: "",
      department: "",
      batch: "",
      contactNumber: "",
      foodPreference: "",
    },
    paymentScreenshot: null,
  });

  function updateLead<K extends keyof Lead>(key: K, value: Lead[K]) {
    setFormData((prev) => ({ ...prev, lead: { ...prev.lead, [key]: value } }));
  }
  function updateMember<
    N extends "member2" | "member3",
    K extends keyof MemberBase
  >(member: N, key: K, value: MemberBase[K]) {
    setFormData((prev) => ({
      ...prev,
      [member]: { ...prev[member], [key]: value },
    }));
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
    const leadReq: (keyof Lead)[] = [
      "fullName",
      "institution",
      "semester",
      "department",
      "batch",
      "email",
      "contactNumber",
      "foodPreference",
    ];
    for (const k of leadReq) {
      if (!formData.lead[k]) {
        alert(
          `Please complete Team Lead field: ${String(k).replace(
            /([A-Z])/g,
            " $1"
          )}`
        );
        return false;
      }
    }

    const memberReq: (keyof MemberBase)[] = [
      "fullName",
      "semester",
      "department",
      "batch",
      "contactNumber",
      "foodPreference",
    ];
    for (const k of memberReq) {
      if (!formData.member2[k]) {
        alert(
          `Please complete Member 2 field: ${String(k).replace(
            /([A-Z])/g,
            " $1"
          )}`
        );
        return false;
      }
      if (!formData.member3[k]) {
        alert(
          `Please complete Member 3 field: ${String(k).replace(
            /([A-Z])/g,
            " $1"
          )}`
        );
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

      // Base
      payload.append("workshopName", formData.workshopName);

      // Lead (both prefixed and backward-compatible field names)
      Object.entries(formData.lead).forEach(([k, v]) => {
        payload.append(`lead_${k}`, String(v));
      });
      payload.append("fullName", formData.lead.fullName);
      payload.append("institution", formData.lead.institution);
      payload.append("semester", formData.lead.semester);
      payload.append("department", formData.lead.department);
      payload.append("batch", formData.lead.batch);
      payload.append("email", formData.lead.email);
      payload.append("contactNumber", formData.lead.contactNumber);
      payload.append("foodPreference", formData.lead.foodPreference);

      // Member 2/3
      Object.entries(formData.member2).forEach(([k, v]) => {
        payload.append(`member2_${k}`, String(v));
      });
      Object.entries(formData.member3).forEach(([k, v]) => {
        payload.append(`member3_${k}`, String(v));
      });

      if (screenshotUrl) payload.append("screenshotUrl", screenshotUrl);
      if (publicId) payload.append("publicId", publicId);

      const response = await fetch(
        // "https://script.google.com/macros/s/AKfycbzbpQUJbt6KCkdnA1uJHYR0TEDnOh7sg4bZ51ZeshQXgWInIpgswS190HgPehJjN11Zig/exec",
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
                  type="text"
                  className="form-input w-full"
                  placeholder="Team lead full name"
                  value={formData.lead.fullName}
                  onChange={(e) => updateLead("fullName", e.target.value)}
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
                  type="text"
                  className="form-input w-full"
                  placeholder="Institution"
                  value={formData.lead.institution}
                  onChange={(e) => updateLead("institution", e.target.value)}
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
                  className="form-input w-full"
                  value={formData.lead.semester}
                  onChange={(e) => updateLead("semester", e.target.value)}
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
                  className="form-input w-full"
                  value={formData.lead.department}
                  onChange={(e) => updateLead("department", e.target.value)}
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
                  className="form-input w-full"
                  value={formData.lead.batch}
                  onChange={(e) => updateLead("batch", e.target.value)}
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
                  type="email"
                  className="form-input w-full"
                  placeholder="Team lead email"
                  value={formData.lead.email}
                  onChange={(e) => updateLead("email", e.target.value)}
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
                  type="tel"
                  maxLength={10}
                  className="form-input w-full"
                  placeholder="Team lead contact number"
                  value={formData.lead.contactNumber}
                  onChange={(e) => updateLead("contactNumber", e.target.value)}
                  required
                />
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-indigo-200/65">
                  Food Preference <span className="text-red-600">*</span>
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="lead_food"
                      value="vegetarian"
                      className="form-radio text-indigo-500"
                      checked={formData.lead.foodPreference === "vegetarian"}
                      onChange={() =>
                        updateLead("foodPreference", "vegetarian")
                      }
                      required
                    />
                    <span className="text-sm text-indigo-200/65">
                      Vegetarian
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="lead_food"
                      value="non-vegetarian"
                      className="form-radio text-indigo-500"
                      checked={
                        formData.lead.foodPreference === "non-vegetarian"
                      }
                      onChange={() =>
                        updateLead("foodPreference", "non-vegetarian")
                      }
                      required
                    />
                    <span className="text-sm text-indigo-200/65">
                      Non-Vegetarian
                    </span>
                  </label>
                </div>
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
                  type="text"
                  className="form-input w-full"
                  placeholder="Member 2 full name"
                  value={formData.member2.fullName}
                  onChange={(e) =>
                    updateMember("member2", "fullName", e.target.value)
                  }
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
                  className="form-input w-full"
                  value={formData.member2.semester}
                  onChange={(e) =>
                    updateMember("member2", "semester", e.target.value)
                  }
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
                  className="form-input w-full"
                  value={formData.member2.department}
                  onChange={(e) =>
                    updateMember("member2", "department", e.target.value)
                  }
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
                  className="form-input w-full"
                  value={formData.member2.batch}
                  onChange={(e) =>
                    updateMember("member2", "batch", e.target.value)
                  }
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
                  type="tel"
                  maxLength={10}
                  className="form-input w-full"
                  placeholder="Member 2 contact number"
                  value={formData.member2.contactNumber}
                  onChange={(e) =>
                    updateMember("member2", "contactNumber", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-indigo-200/65">
                  Food Preference <span className="text-red-600">*</span>
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m2_food"
                      value="vegetarian"
                      className="form-radio text-indigo-500"
                      checked={formData.member2.foodPreference === "vegetarian"}
                      onChange={() =>
                        updateMember("member2", "foodPreference", "vegetarian")
                      }
                      required
                    />
                    <span className="text-sm text-indigo-200/65">
                      Vegetarian
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m2_food"
                      value="non-vegetarian"
                      className="form-radio text-indigo-500"
                      checked={
                        formData.member2.foodPreference === "non-vegetarian"
                      }
                      onChange={() =>
                        updateMember(
                          "member2",
                          "foodPreference",
                          "non-vegetarian"
                        )
                      }
                      required
                    />
                    <span className="text-sm text-indigo-200/65">
                      Non-Vegetarian
                    </span>
                  </label>
                </div>
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
                  type="text"
                  className="form-input w-full"
                  placeholder="Member 3 full name"
                  value={formData.member3.fullName}
                  onChange={(e) =>
                    updateMember("member3", "fullName", e.target.value)
                  }
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
                  className="form-input w-full"
                  value={formData.member3.semester}
                  onChange={(e) =>
                    updateMember("member3", "semester", e.target.value)
                  }
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
                  className="form-input w-full"
                  value={formData.member3.department}
                  onChange={(e) =>
                    updateMember("member3", "department", e.target.value)
                  }
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
                  className="form-input w-full"
                  value={formData.member3.batch}
                  onChange={(e) =>
                    updateMember("member3", "batch", e.target.value)
                  }
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
                  type="tel"
                  maxLength={10}
                  className="form-input w-full"
                  placeholder="Member 3 contact number"
                  value={formData.member3.contactNumber}
                  onChange={(e) =>
                    updateMember("member3", "contactNumber", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-indigo-200/65">
                  Food Preference <span className="text-red-600">*</span>
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m3_food"
                      value="vegetarian"
                      className="form-radio text-indigo-500"
                      checked={formData.member3.foodPreference === "vegetarian"}
                      onChange={() =>
                        updateMember("member3", "foodPreference", "vegetarian")
                      }
                      required
                    />
                    <span className="text-sm text-indigo-200/65">
                      Vegetarian
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m3_food"
                      value="non-vegetarian"
                      className="form-radio text-indigo-500"
                      checked={
                        formData.member3.foodPreference === "non-vegetarian"
                      }
                      onChange={() =>
                        updateMember(
                          "member3",
                          "foodPreference",
                          "non-vegetarian"
                        )
                      }
                      required
                    />
                    <span className="text-sm text-indigo-200/65">
                      Non-Vegetarian
                    </span>
                  </label>
                </div>
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
