import './Footer.css'

export default function Footer(){
    return(
        <div className="footer">
            <div className="logos_container">
                <div className="right_logo">
                   <img src='./ieee-sscs-sm-ko-logo2x 1.png'></img>
                </div>
                <div className="left_logo">
                    <img src='./ieee-ko-logo2x 1.png' alt='IEEE logo' ></img>
                    <div className="social_icons">
                       <img src='./image 2.png' alt='instagram icon'></img>
                       <img src='./toppng.com-facebook-logo-white-free-download-501x425 1.png' alt='facebook icon'></img>
                       <img src='./image 1.png' alt='linkedin icon'></img>
                 </div>
                </div>
            </div>
            <div className="copyright">
                <hr></hr>
                <p>© Copyright 2025 IEEE – All rights reserved. A public charity, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.</p>
            </div>
        </div>
    )
}