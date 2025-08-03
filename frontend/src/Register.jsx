import React, { useState } from 'react';
import { ArrowLeft, Code, Wrench, Users, Brain, Zap, Database, Star, Award, Target } from 'lucide-react';
import './Register.css';
import Hackform from  './Hackform';
import Workshopform from './Workshopform';
import Payment from './Payment';


function Register() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

 const [formData, setFormData] = useState({
  // Hackathon
  teamName: '',
  leaderName: '',
  leaderEmail: '',
  leaderInstitution: '',
  leaderYear: '',
  leaderField: '',
  leaderFood: '',
  leaderACM: false,
  teamMembers: [],

  // Workshop
  workshopParticipantName: '',
  workshopParticipantEmail: '',
  workshopParticipantFood: '',
  workshopInstitution: '',
  workshopYear: '',
  isAcmMember: '',
  workshopParticipantContact: '',

  selectedWorkshops: [],
});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'selectedWorkshops') {
      setFormData((prevData) => {
        const selected = prevData.selectedWorkshops || [];
        return {
          ...prevData,
          selectedWorkshops: checked
            ? [...selected, value]
            : selected.filter((w) => w !== value),
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][field] = value;
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 3) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, { name: '', email: '', food: '' }],
      });
    }
  };

  const removeTeamMember = (index) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers.splice(index, 1);
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const workshops = [
    {
      id: 'web-dev',
      title: 'Full Stack Web Development',
      description: 'Master modern web development with React, Node.js, and cloud deployment',
      icon: Code,
      color: 'from-blue-400 to-purple-500',
      duration: '3 Days',
      level: 'Intermediate'
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Dive into artificial intelligence and build intelligent applications',
      icon: Brain,
      color: 'from-green-400 to-blue-500',
      duration: '4 Days',
      level: 'Advanced'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Development',
      description: 'Learn decentralized applications and smart contract development',
      icon: Database,
      color: 'from-yellow-400 to-orange-500',
      duration: '3 Days',
      level: 'Intermediate'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Essentials',
      description: 'Understand security principles and ethical hacking techniques',
      icon: Zap,
      color: 'from-red-400 to-pink-500',
      duration: '2 Days',
      level: 'Beginner'
    }
  ];

  const renderLandingPage = () => (
    <div className="min-h-screen bg-[#0a191e] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-[#ffe000] rounded-full animate-pulse opacity-20"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 3}s` }}>
          </div>
        ))}
      </div>
      <div className="max-w-6xl w-full animate-fade-in">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#ffe000] via-[#01f791] to-[#ffe000] bg-clip-text text-transparent mb-6 animate-pulse">ICEFOSS</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">International Conference on Emerging Trends in FOSS</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Choose your path to innovation and join the future of open source technology</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div onClick={() => setCurrentStep('hackathon')} className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-[#ffe000]/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-[#ffe000]/25">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ffe000]/20 to-[#01f791]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#ffe000] to-[#01f791] flex items-center justify-center shadow-lg shadow-[#ffe000]/25">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Hackathon</h3>
              <p className="text-gray-300 text-center mb-6">Build innovative solutions in 48 hours with your team</p>
              <div className="flex justify-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-400"><Award className="w-4 h-4 mr-1" /><span>₹50K Prize</span></div>
                <div className="flex items-center text-sm text-gray-400"><Users className="w-4 h-4 mr-1" /><span>Team Event</span></div>
              </div>
              <div className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#ffe000] to-[#01f791] text-black font-semibold text-center group-hover:shadow-lg group-hover:shadow-[#ffe000]/25 transition-all duration-300">Register Now</div>
            </div>
          </div>
          <div onClick={() => setCurrentStep('workshops')} className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-[#01f791]/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-[#01f791]/25">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#01f791]/20 to-[#ffe000]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#01f791] to-[#ffe000] flex items-center justify-center shadow-lg shadow-[#01f791]/25">
                <Wrench className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Workshops</h3>
              <p className="text-gray-300 text-center mb-6">Master cutting-edge technologies with hands-on learning</p>
              <div className="flex justify-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-400"><Target className="w-4 h-4 mr-1" /><span>4 Tracks</span></div>
                <div className="flex items-center text-sm text-gray-400"><Star className="w-4 h-4 mr-1" /><span>Expert Led</span></div>
              </div>
              <div className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#01f791] to-[#ffe000] text-black font-semibold text-center group-hover:shadow-lg group-hover:shadow-[#01f791]/25 transition-all duration-300">View Workshops</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

 const renderWorkshopSelection = () => (
    <div className="min-h-screen bg-[#0a191e] p-8 text-white relative">
      <button onClick={() => setCurrentStep('landing')} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ffe000] to-[#01f791] bg-clip-text text-transparent mb-8">Choose Your Workshop</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {workshops.map((workshop, index) => {
          const IconComponent = workshop.icon;
          return (
            <div key={workshop.id} onClick={() => { setSelectedWorkshop(workshop.id); setCurrentStep('workshop-form'); }}
              className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-[#01f791]/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-[#01f791]/25">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${workshop.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 p-3 rounded-xl bg-gradient-to-br ${workshop.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">{workshop.duration}</div>
                    <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${workshop.color} text-white font-medium`}>
                      {workshop.level}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{workshop.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{workshop.description}</p>
                <div className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${workshop.color} text-white font-medium text-center text-sm group-hover:shadow-lg transition-all duration-300`}>
                  Register for this Workshop
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

 const renderWorkshopForm = () => {
  const selectedWorkshopDetails = workshops.find(w => w.id === selectedWorkshop);

  return (
    <div className="min-h-screen bg-[#0a191e] p-8 text-white relative">
      <button onClick={() => setCurrentStep('workshops')} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {selectedWorkshopDetails ? (
        <>
          <h2 className="text-3xl font-bold mb-6">
            Registering for: <span className="text-cyan-400">{selectedWorkshopDetails.title}</span>
          </h2>
          <Workshopform
            formData={formData}
            handleInputChange={handleInputChange}
              setCurrentStep={setCurrentStep} 
          />
        </>
      ) : (
        <p className="text-red-400">Workshop not found. Please go back and select again.</p>
      )}
    </div>
  );
};

  const renderHackathonForm = () => (
    <div className="min-h-screen bg-[#0a191e] p-8 text-white relative">
      <button onClick={() => setCurrentStep('landing')} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <Hackform
        formData={formData}
        handleInputChange={handleInputChange}
        handleTeamMemberChange={handleTeamMemberChange}
        addTeamMember={addTeamMember}
        removeTeamMember={removeTeamMember}
        setCurrentStep={setCurrentStep} 
      />
    </div>
    
  );
  const renderPaymentPage = () => (
  <Payment setCurrentStep={setCurrentStep} />
);
if (currentStep === 'payment') return renderPaymentPage(); 


  // Routing
  if (currentStep === 'landing') return renderLandingPage();
  if (currentStep === 'hackathon') return renderHackathonForm();
 if (currentStep === 'workshops') return renderWorkshopSelection();
if (currentStep === 'workshop-form') return renderWorkshopForm();
if (currentStep === 'payment') return renderPaymentPage(); 


  return null;
}

export default Register;
