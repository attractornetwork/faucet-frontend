import React from 'react';
import './SuccessMessage.css';

interface SuccessMessageProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({title, onClose, children}) => {
    return (
        <div className="success-message">
            <div className="success-checkmark-icon"></div>
            <div className="success-main">
                <h4 className="success-title">{title}</h4>
                <p className="success-description">
                    {children}
                </p>
            </div>
            <button className="success-close-btn" onClick={onClose}>
                ✕
            </button>
        </div>
    );
};

export default SuccessMessage;
