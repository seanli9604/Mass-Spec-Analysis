"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';

const stripePromise = loadStripe('pk_test_51QLy8NDiMJiLt3SALGtlYu5iR5OBku3P44vr6F0Edubpc78eVQHINWYeJkh1BOfryybwJEbTGaVSeM74WfEeVpAs00xj2ZkxRq');

const BuyToken: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { data: loginsession, status } = useSession();

    console.log(loginsession);

    const handleClick = async () => {
        setLoading(true);
        const stripe = await stripePromise;

        console.log(process.env.NEXT_PUBLIC_API_URL)
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: 1,
                email_address: loginsession?.user?.email,
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


    if (status === 'authenticated') {
        return (
            <button
                className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 w-full mb-4 text-center"
                onClick={handleClick}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Buy Tokens'}
            </button>
        );
    } else {
        return (
            <button
                className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 w-full mb-4 text-center"
                onClick={handleClick}
                disabled={true}
            >
                Login to buy tokens
            </button>
        );
    }

   
};

export default BuyToken;