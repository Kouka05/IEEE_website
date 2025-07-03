import './Footer.css'

export default function Footer(){
    return(
        <div className="footer">
            <div className="logos_container">
                <div className="right_logo">
                   <img src='./ieee-sscs-sm-ko-logo2x 1.png' alt="IEEE SSCS logo"></img>
                </div>
                <div className="left_logo">
                    <img src='./ieee-ko-logo2x 1.png' alt='IEEE logo' ></img>
                    <div className="social_icons">
                       {/* Instagram */}
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="2"/>
                         <path d="M17.5 7.5V7.501" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                       </svg>
                       
                       {/* Facebook */}
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                         <path d="M18 2H15C12.7909 2 11 3.79086 11 6V8H8V12H11V22H15V12H18L19 8H15V6C15 5.44772 15.4477 5 16 5H19V2Z"/>
                       </svg>
                       
                       {/* LinkedIn */}
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                         <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.182 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.225C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.225 0Z"/>
                       </svg>
                 </div>
                </div>
            </div>
            <div className="copyright">
                <hr></hr>
                <p>© Copyright 2025 IEEE – All rights reserved. A public charity, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.</p>
            </div>
        </div>)}
