"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Coin from '../components/Coin';
import { addMail } from '../DataBasing';

export default function Contact() {
    const [status, setStatus] = useState('');

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
            // Wait 2 seconds, then add background (no transition)
            await new Promise(resolve => setTimeout(resolve, 2000));
            cursor?.classList.add('invisible');
            element?.classList.add('lightLine');
            
            // Wait briefly, then add transition classes and remove background
            await new Promise(resolve => setTimeout(resolve, 800));
            element?.classList.remove('lightLine');
            cursor?.classList.remove('invisible');
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
            <div className="flex flex-col w-full mt-48 mb-[8vh]">
                <div className="flex flex-col items-center *:justify-around *:select-none w-2/3 mx-auto *:text-white">
                    <div className="mx-auto flex items-center justify-center varela-round-regular text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-center w-fit">
                        <p id="displayText">{displayText}
                            <span id="cursor" className="inline-block text-aqua1">
                                |
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col items-center *:justify-center *:space-x-24 *:select-none w-full *:bubble">
                        <nav className="flex items-center h-full *:hover:cursor-pointer w-full mt-16">
                            <Coin 
                                front="GitHub" 
                                back="schottler3" 
                                link="https://github.com/schottler3"
                            />
                            <div className="ml-16 mr-16 mb-16 -mt-8">
                                <Coin 
                                    front="LinkedIn" 
                                    back="Lucas Schottler" 
                                    link="https://www.linkedin.com/in/lucasschottler/" 
                                />
                            </div>
                            <div className="-mb-8">
                                <Coin 
                                    front="Handshake" 
                                    back="Lucas Schottler" 
                                    link="https://app.joinhandshake.com/profiles/73wng5" 
                                />
                            </div>
                        </nav>

                        <nav className="flex items-center h-full *:hover:cursor-pointer w-2/3">
                            <div className="-mt-64">
                                <Coin 
                                    front="Phone" 
                                    back="763-229-5934" 
                                    link="tel:1-763-229-5934" 
                                />
                            </div>
                            <div className="-ml-64">
                                <Coin 
                                    front="Email" 
                                    back="Lucas@LucasSchottler.dev" 
                                    link="mailto:Lucas@lucasschottler.dev" 
                                />
                            </div>
                        </nav>
                    </div>
                </div>
                <div 
    style={{ backgroundImage: 'url(/images/Cloud.svg)' }} 
    className="mt-[16vh] w-3/4 flex flex-col text-charcoal text-2xl 
              items-center space-y-2 text-center mx-auto 
              bg-no-repeat bg-center p-64 bg-contain"
>           
                    <p className="text-white text-center text-6xl font-bold pb-16">Contact Me Via Email</p>
                    <p id="status" className={`text-blue1 ${status ? 'flex' : 'hidden'}`}>{status}</p>
                    <div className="flex flex-row w-1/2 justify-center">
                        <input className="w-1/2 p-2 mr-1 " type="text" id="name" placeholder="Name" />
                        <input className="w-1/2 p-2 ml-1" type="text" id="email" placeholder="Email" />
                    </div>
                    <textarea className="w-1/2 p-2" id="message" placeholder="Message"></textarea>
                    <div className="w-full h-full flex items-center justify-center pt-16">
                        <button 
                            className="text-white justify-center bg-blue1 w-1/4 h-8 items-center rounded-full flex hover:bg-slate-700" 
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

