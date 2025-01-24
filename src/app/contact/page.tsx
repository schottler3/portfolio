"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { addMail } from '../DataBasing';

export default function Contact() {
    const [status, setStatus] = useState('Required Fields: Name, Email, Message');

    const [displayText, setDisplayText] = useState('');

    //Credit for effect: https://www.w3schools.com/howto/howto_js_typewriter.asp
    useEffect(() => {
        const speed = 100;
        
        const typeWriter = (txt: string): Promise<void> => {
            let i = 0;
            return new Promise((resolve) => {
                setDisplayText('');
                const type = () => {
                    if (i < txt.length) {
                        setDisplayText(txt.substring(0, i + 1));
                        i++;
                        setTimeout(type, speed);
                    } else {

                        resolve();
                    }
                };
                type();
            });
        };
        
        const runAnimation = async () => {
            // First typewriter animation
            await typeWriter("Trying to contact me?");
            let element = document.getElementById('displayText');
            let cursor = document.getElementById('cursor');

            cursor?.classList.add('cursorBlink');
            // Wait 3 seconds, then add background (no transition)
            await new Promise(resolve => setTimeout(resolve, 2000));
            element?.classList.add('lightLine');
            
            // Wait briefly, then add transition classes and remove background
            await new Promise(resolve => setTimeout(resolve, 800));
            element?.classList.remove('lightLine');
            element?.classList.add('opacity-0');
            cursor?.classList.remove('cursorBlink');
            
            // Clean up transition classes after animation
            await new Promise(resolve => setTimeout(resolve, 300));
            element?.classList.remove('opacity-0');
            cursor?.classList.remove('cursorBlink');
            
            // Start second typewriter
            await typeWriter("Here's some information");
            cursor?.classList.add('cursorBlink');

            await new Promise(resolve => setTimeout(resolve, 4000));
            cursor?.classList.add('hideCursor');
        };
        
        runAnimation();
    }, []);

    const handleSubmit = async () => {
        let inputName = (document.getElementById('name') as HTMLInputElement)?.value;
        let inputEmail = (document.getElementById('email') as HTMLInputElement)?.value;
        let inputMessage = (document.getElementById('message') as HTMLTextAreaElement)?.value;

        let status = document.getElementById('status') as HTMLParagraphElement;

        if(!inputName || !inputEmail || !inputMessage) {
            setStatus('Please fill out all fields');
            status.style.color = 'red';
            return;
        }
        if(!inputEmail.includes('@') || !inputEmail.includes('.')) {
            setStatus('Please enter a valid email address');
            status.style.color = 'red';
            return;
        }
        if(inputMessage.length < 16) {
            setStatus('Please enter a message longer than 16 characters');
            status.style.color = 'red';
            return;
        }
        if(inputName.length < 2) {
            setStatus('Please enter a name longer than 2 characters');
            status.style.color = 'red';
            return;
        }
        if(inputName.length > 36) {
            setStatus('Please enter a name shorter than 36 characters');
            status.style.color = 'red';
            return;
        }
        if(inputEmail.length > 36) {
            setStatus('Please enter an email shorter than 36 characters');
            status.style.color = 'red';
            return;
        }
        if(inputMessage.length > 512) {
            setStatus('Please enter a message shorter than 512 characters');
            status.style.color = 'red';
            return;
        }
        
        try {
            const result = await addMail(inputName, inputEmail, inputMessage);
            if(result) {
                setStatus('Email sent successfully');
                const nameInput = document.getElementById('name') as HTMLInputElement;
                if (nameInput) nameInput.value = '';
                const emailInput = document.getElementById('email') as HTMLInputElement;
                if (emailInput) emailInput.value = '';
                const messageInput = document.getElementById('message') as HTMLTextAreaElement;
                if (messageInput) messageInput.value = '';
            } else {
                setStatus('Email failed to send');
            }

        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="bg-charcoal min-h-screen overflow-y-auto max-h-[100vh]">
            <Header />
            <div className="h-full p-4 pt-20 text-white w-1/2 items-center justify-center flex flex-col mx-auto">

                <div className="pt-48 varela-round-regular text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-center">
                    <p id="displayText">{displayText}
                        <span id="cursor" className="inline-block text-aqua1">
                            |
                        </span>
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center mt-20 *:justify-around *:select-none w-full">
                    <nav className="flex items-center h-full *:hover:cursor-pointer w-full mt-20">
                        <div
                            onClick={(event) => (event.currentTarget as HTMLDivElement).classList.toggle('flipped')}
                            className="hover:bg-slate-700 hover:border-aqua1 hover:border-4 bg-navy w-[8vw] h-[8vw] rounded-full items-center justify-center flex font-bold text-3xl"
                        >
                            GitHub
                        </div>
                        <div
                            className="hover:bg-slate-700 hover:border-aqua1 hover:border-4 bg-navy w-[8vw] h-[8vw] rounded-full items-center justify-center flex font-bold text-3xl"
                        >
                            LinkedIn
                        </div>
                        <div
                            className="hover:bg-slate-700 hover:border-aqua1 hover:border-4 bg-navy w-[8vw] h-[8vw] rounded-full items-center justify-center flex font-bold text-3xl"
                        >
                            Handshake
                        </div>
                    </nav>

                    <nav className="flex items-center h-full *:hover:cursor-pointer w-2/3 mt-20">
                        <div
                            className="hover:bg-slate-700 hover:border-aqua1 hover:border-4 bg-navy w-[8vw] h-[8vw] rounded-full items-center justify-center flex font-bold text-3xl"
                        >
                            Phone
                        </div>
                        <div
                            className="hover:bg-slate-700 hover:border-aqua1 hover:border-4 bg-navy w-[8vw] h-[8vw] rounded-full items-center justify-center flex font-bold text-3xl"
                        >
                            Email
                        </div>
                    </nav>
                </div>

                <div className="text-charcoal text-2xl flex flex-col space-y-4 *:rounded-md items-center justify-center mt-96 pb-48">
                    <p className="text-white text-5xl font-bold pb-6">Contact Me Via Email</p>
                    <p id="status" className="text-blue1 hidden">{status}</p>
                    <input className="w-3/4 p-2" type="text" id="name" placeholder="Name" />
                    <input className="w-3/4 p-2" type="text" id="email" placeholder="Email" />
                    <textarea className="w-3/4 p-2" id="message" placeholder="Message" />
                    <button 
                        className="text-white bg-blue1 w-1/2 h-8 rounded-full flex items-center justify-center hover:bg-slate-700" 
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

