import './header.css';
import './ResponsiveHeader.css';

import { useState } from 'react';
import { useNavigate } from 'react-router';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const Header = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function openModal() {
        setIsOpen(true);
    }

    function login() {
        navigate('/pages/login', { replace: true });
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <header className="heading">
            <div className="wraper">
                <div className="logo">
                    <h1>ITOS</h1>
                </div>
                <nav>
                    <ul className="navbar">
                        <li>
                            <button type="text" onClick={login}>
                                LOGIN
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
