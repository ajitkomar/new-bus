import React from 'react';
import { Link } from 'react-router-dom';
export default class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <Link to="/landing">Bus Stop Operator</Link>
                    <Link to="/busOp">Bus Operator</Link>
                    
                </div>
            </nav>
        )
    }
}