"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QLy8NDiMJiLt3SALGtlYu5iR5OBku3P44vr6F0Edubpc78eVQHINWYeJkh1BOfryybwJEbTGaVSeM74WfEeVpAs00xj2ZkxRq');

const BuyToken: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const stripe = await stripePromise;

        const response = await fetch('http://localhost:8000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: 1, // Set the desired quantity
            }),
        });

        const session = await response.json();

        console.log('Session:', session);
        
        if (session.error) {
            console.error(session.error);
            setLoading(false);
            return;
        }
    
        if (session.id) {
            const result = await stripe?.redirectToCheckout({
                sessionId: session.id,
            });
    
            if (result?.error) {
                console.error(result.error.message);
            }
        } else {
            console.error('Session ID not returned');
        }
    
        setLoading(false);
    };

    return (
        <button
            className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 mb-4 text-center"
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? 'Loading...' : 'Buy Tokens'}
        </button>
    );
};

export default BuyToken;