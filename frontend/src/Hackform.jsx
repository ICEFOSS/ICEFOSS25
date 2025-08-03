// --- HackathonTeamForm.js ---
import React from 'react';
import './Register.css';

const Hackform = ({ formData, handleInputChange, handleTeamMemberChange, addTeamMember, removeTeamMember, setCurrentStep }) => {
  return (
    <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6">Team Information (Hackathon)</h3>

      {/* Team Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Team Name *</label>
        <input
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 focus:outline-none transition-all duration-300"
          placeholder="Enter your team name"
        />
      </div>

      {/* Team Leader Info */}
      <h4 className="text-lg font-semibold text-white mb-4">Team Leader Details</h4>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input type="text" name="leaderName" value={formData.leaderName} onChange={handleInputChange} required placeholder="Full Name" className="input" />
        <input type="email" name="leaderEmail" value={formData.leaderEmail} onChange={handleInputChange} required placeholder="Email" className="input" />
        <input type="text" name="leaderInstitution" value={formData.leaderInstitution} onChange={handleInputChange} placeholder="Institution" className="input" />
        <input type="text" name="leaderYear" value={formData.leaderYear} onChange={handleInputChange} placeholder="Year of Study" className="input" />
        <input type="text" name="leaderField" value={formData.leaderField} onChange={handleInputChange} placeholder="Field of Study" className="input" />
        <select name="leaderFood" value={formData.leaderFood} onChange={handleInputChange} className="input">
          <option value="">Food Preference</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
        <div className="flex items-center text-white col-span-3">
          <input type="checkbox" name="leaderACM" checked={formData.leaderACM || false} onChange={(e) => handleInputChange({ target: { name: 'leaderACM', value: e.target.checked } })} className="mr-2" />
          <label>ACM Member</label>
        </div>
      </div>

      {/* Team Members Info */}
      <h4 className="text-lg font-semibold text-white mb-4">Team Members</h4>
      {formData.teamMembers.map((member, index) => (
        <div key={index} className="grid md:grid-cols-3 gap-4 mb-6 border-t pt-4 border-white/20 relative">
          <input type="text" value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} placeholder="Name" required className="input" />
          <input type="email" value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} placeholder="Email" required className="input" />
          <input type="text" value={member.institution || ''} onChange={(e) => handleTeamMemberChange(index, 'institution', e.target.value)} placeholder="Institution" className="input" />
          <input type="text" value={member.year || ''} onChange={(e) => handleTeamMemberChange(index, 'year', e.target.value)} placeholder="Year of Study" className="input" />
          <input type="text" value={member.field || ''} onChange={(e) => handleTeamMemberChange(index, 'field', e.target.value)} placeholder="Field of Study" className="input" />
          <select value={member.food || ''} onChange={(e) => handleTeamMemberChange(index, 'food', e.target.value)} className="input">
            <option value="">Food Preference</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
          <div className="flex items-center text-white col-span-3">
            <input type="checkbox" checked={member.acm || false} onChange={(e) => handleTeamMemberChange(index, 'acm', e.target.checked)} className="mr-2" />
            <label>ACM Member</label>
          </div>
          <button type="button" onClick={() => removeTeamMember(index)} className="absolute top-0 right-0 text-red-400 hover:text-red-600" title="Remove Member">🗑</button>
        </div>
      ))}

      {formData.teamMembers.length < 3 && (
        <button type="button" onClick={addTeamMember} className="mt-4 text-sm text-cyan-300 hover:text-white transition-all">
          + Add another member
        </button>
      )}
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

export default Hackform;
