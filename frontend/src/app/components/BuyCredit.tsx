"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import RiseLoader from "react-spinners/RiseLoader";

const stripePromise = loadStripe('pk_test_51QLy8NDiMJiLt3SALGtlYu5iR5OBku3P44vr6F0Edubpc78eVQHINWYeJkh1BOfryybwJEbTGaVSeM74WfEeVpAs00xj2ZkxRq');

const BuyCredit: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { data: loginSession, status } = useSession();

    const handleClick = async () => {
        setLoading(true);
        const stripe = await stripePromise;

        console.log(process.env.NEXT_PUBLIC_API_URL)
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Authorizaton': `Bearer ${loginSession?.id_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: 1,
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
        if (loading) {
            return (
                <RiseLoader color="#848484" size="5px" className="mt-4 mb-6" />
            );
        } else {
            return (
                <button
                    className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 w-full mb-4 text-center"
                    onClick={handleClick}
                    disabled={loading}
                >
                    Buy Credits
                </button>
            );
        }
    } else {
        return (
            <button
                className="block border border-gray-300 p-2 cursor-pointer hover:bg-gray-100 w-full mb-4 text-center"
                onClick={handleClick}
                disabled={true}
            >
                Login to buy credits
            </button>
        );
    }

   
};

export default BuyCredit;