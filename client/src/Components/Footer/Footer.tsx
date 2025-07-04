import './Footer.css'

export default function Footer(){
    return(
        <div className="footer">
            <div className="logos_container">
                <div className="right_logo">
                   <img src='./ieee-sscs-sm-ko-logo2x 1.png' alt="IEEE SSCS logo"></img>
                </div>
                <div className="left_logo">
                    <a href='https://www.ieee.org/'><img src='./IEEE-logo.png' alt='IEEE logo' ></img></a>
                    <div className="social_icons">
                       {/* Instagram */}
                       <a href="https://www.instagram.com/sscsalex?igsh=MXdrcW9yaGR6dWoyOA==" target="_blank" rel="noopener noreferrer">
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                         <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
                         <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                       </svg>
                        </a>
                    
                       {/* Facebook */}
                       <a href="https://www.facebook.com/share/1AdCPiKn5X/" target="_blank" rel="noopener noreferrer">
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="3" y="3" width="18" height="18" rx="4" fill="white"/>
                         <path d="M15.5 7.5H13.5C12.9477 7.5 12.5 7.94772 12.5 8.5V10.5H15.5V13.5H12.5V19.5H9.5V13.5H7.5V10.5H9.5V8.5C9.5 6.84315 10.8431 5.5 12.5 5.5H15.5V7.5Z" fill="#434343"/>
                       </svg>
                       </a>
                       {/* LinkedIn */}
                       <a href="https://www.linkedin.com/company/sscsalex/" target="_blank" rel="noopener noreferrer">
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="3" y="3" width="18" height="18" rx="4" fill="white"/>
                         <path d="M8.5 17H6V9.5H8.5V17ZM7.25 8.5C6.55964 8.5 6 7.94036 6 7.25C6 6.55964 6.55964 6 7.25 6C7.94036 6 8.5 6.55964 8.5 7.25C8.5 7.94036 7.94036 8.5 7.25 8.5ZM18 17H15.5V13C15.5 12.5 15.5 11.5 14.5 11.5C13.5 11.5 13.5 12.5 13.5 13V17H11V9.5H13.5V10.5C13.5 10.5 14.5 9.5 16 9.5C17.5 9.5 18 10.5 18 12V17Z" fill="#434343"/>
                       </svg>
                       </a>
                 </div>
                </div>
            </div>
            <div className="copyright">
                <hr></hr>
                <p>© Copyright 2025 IEEE – All rights reserved. A public charity, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.</p>
            </div>
        </div>)}
