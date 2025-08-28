import './RotatingDiscs.css';

const RotatingDiscs = () => {
  return (
    <div className="icefoss-page">
      <header className="header-logos">
        <div className="logo-wrapper">
          <img src="/logos/FISATLOGO.png" alt="FISAT Logo" className="logo" />
        </div>
        <div className="logo-wrapper">
          <img src="/logos/icc white.png" alt="IIC Logo" className="logo" />
        </div>
        <div className="logo-wrapper">
          <img src="/logos/FFSC.png" alt="FFSC Logo" className="logo" />
        </div>
        <div className="logo-wrapper">
          <img src="/logos/ACM FISAT logo.png" alt="ACM Logo" className="logo" />
        </div>
      </header>

      <div className="disc-wrapper">
    
        
        <div className="center-logo">
          <img src="/ring.png" alt="Center Disc" className="center-disc" />
          <img src="/icefoss.png" alt="ICEFOSS Logo" className="icefoss-text" />
        </div>

       
      </div>
    </div>
  );
};

export default RotatingDiscs;
