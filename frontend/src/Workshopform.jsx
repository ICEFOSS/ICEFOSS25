import React from 'react';
import './Register.css';

const Workshopform = ({ formData, handleInputChange, setCurrentStep }) => {
  return (
    <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6">Workshop Registration</h3>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Your Full Name *</label>
        <input
          type="text"
          name="workshopParticipantName"
          value={formData.workshopParticipantName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
          placeholder="Your Full Name"
        />
      </div>

      {/* Institution */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
        <input
          type="text"
          name="workshopInstitution"
          value={formData.workshopInstitution}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
          placeholder="College/University Name"
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Year of Study *</label>
        <select
          name="workshopYear"
          value={formData.workshopYear}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
        >
          <option value="">Select</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
        </select>
      </div>

     

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Your Email *</label>
        <input
          type="email"
          name="workshopParticipantEmail"
          value={formData.workshopParticipantEmail}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
          placeholder="your@email.com"
        />
      </div>
      {/* Contact Number */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number *</label>
  <input
    type="tel"
    name="workshopParticipantContact"
    value={formData.workshopParticipantContact}
    onChange={handleInputChange}
    required
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
    placeholder="Enter your mobile number"
  />
</div>
 {/* ACM Member */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Are you an ACM Member?</label>
        <div className="flex space-x-4">
          <label className="text-white flex items-center space-x-2">
            <input
              type="radio"
              name="isAcmMember"
              value="yes"
              checked={formData.isAcmMember === 'yes'}
              onChange={handleInputChange}
            />
            <span>Yes</span>
          </label>
          <label className="text-white flex items-center space-x-2">
            <input
              type="radio"
              name="isAcmMember"
              value="no"
              checked={formData.isAcmMember === 'no'}
              onChange={handleInputChange}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Food Preference */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Food Preference</label>
        <select
          name="workshopParticipantFood"
          value={formData.workshopParticipantFood}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
        >
          <option value="">Select</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
      </div>
      <button
  type="button"
  onClick={() => setCurrentStep('payment')}
  className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
>
  Proceed to Payment
</button>

    </div>
  );
};

export default Workshopform;
