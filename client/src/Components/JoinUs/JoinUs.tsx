import './JoinUs.css'
import { useNavigate } from 'react-router-dom';


export default function JoinUs(){

    const navigate = useNavigate();
    function handleClick(){
        navigate('/signup');
    }
    return(
        <div className="JoinUs">
            <div className="join_right">
                <img src="./Image.png"></img>
            </div>
            <div className="join_left">
                <h3>Your Journey in Solid-State Starts Here</h3>
                <p>Connect with like-minded engineers, access exclusive events, and grow your skills in the world of solid-state circuits.</p>
                <button className='black_btn' onClick={handleClick}>Join Us</button>
            </div>
        </div>
    )
}