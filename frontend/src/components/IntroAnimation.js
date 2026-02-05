import React, { useState, useEffect } from 'react';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
    const [text, setText] = useState('');
    const [showBrand, setShowBrand] = useState(false);
    const [fadeClass, setFadeClass] = useState('fade-enter');
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const sequence = [
            { text: 'Limited.', delay: 500 },
            { text: 'Loud.', delay: 1500 },
            { text: 'Yours.', delay: 2500 },
        ];

        let timeouts = [];

        // Play the text sequence
        sequence.forEach((item, index) => {
            timeouts.push(setTimeout(() => {
                setFadeClass('fade-exit-active'); // Fade out previous
                setTimeout(() => {
                    setText(item.text);
                    setFadeClass('fade-enter-active'); // Fade in new
                }, 400); // Wait for fade out
            }, item.delay));
        });

        // Show Brand Name
        timeouts.push(setTimeout(() => {
            setFadeClass('fade-exit-active');
            setTimeout(() => {
                setText('');
                setShowBrand(true);
            }, 500);
        }, 3800));

        // Start Exit (Fade out container)
        timeouts.push(setTimeout(() => {
            setExiting(true);
        }, 5500));

        // Complete (Unmount)
        timeouts.push(setTimeout(() => {
            onComplete();
        }, 6500));

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className={`intro-container ${exiting ? 'exiting' : ''}`}>
            {!showBrand ? (
                <div className={`intro-text-sequence ${fadeClass}`}>
                    {text}
                </div>
            ) : (
                <div className="brand-reveal">
                    WISH MADE
                </div>
            )}
        </div>
    );
};

export default IntroAnimation;
