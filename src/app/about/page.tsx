"use client"
import { useState } from 'react';
import Header from '../components/Header';
import TimelineItem from '../components/TimelineItem';
import timelineData from './timeline.json';

interface TimelineItemType {
  key: number;
  date: string;
  title: string;
  location: string;
  description: string;
}

export default function About() {

  const timelineItems: TimelineItemType[] = timelineData;
  const [personal, setPersonal] = useState(false);
  const [page, setPage] = useState('timeline');

  return (
    <div className="bg-charcoal min-h-screen w-full max-h-screen overflow-y-auto">
    <Header />
    <div className="flex flex-col md:grid md:grid-cols-2 bg-charcoal text-white text-center pt-10 overflow-y-auto">
      <div className="bg-navy h-1/2-screen md:h-[95vh] flex flex-col items-center justify-center pt-16 pb-16">
        <div className="justify-center flex"> 
          <div className="flex w-full items-center flex-col xl:flex-row xl:justify-start xl:gap-8">
            <img 
              src={personal ? "./images/personal.jpg" : "./images/headshot.jpg"}
              className={`w-52 h-52 rounded-full border-8 object-cover ${
                personal ? "border-aqua1" : "border-white"
              }`}
            />
            <div className="varela-round-regular text-6xl text-white text-center tracking-widest border-b-2 border-t-2 xl:w-auto pt-4 pb-4 border-white mt-8 xl:mt-0">
              Lucas <br /> Schottler
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-3/4 pt-10 tracking-widest">
            {personal ? (
              <>
                <article className="w-full space-y-6">
                  <p className="text-left text-xl">
                    In my free time, I enjoy playing video games, watching anime, and spending time with my friends and family. 
                    My current gaming rotation includes Phasmophobia, Terraria, Minecraft, Rocket League, and occasionally Fortnite 
                    with my significant other and friends.
                  </p>

                  <p className="text-left text-xl">
                    While I used to play soccer, I now stay active through hiking, pickleball, and biking. I also enjoy board games 
                    and card games with family and friends. Some of our favorites include Catan, Dutch Blitz, Hearts, 500, and Liars' Dice.
                  </p>

                  <p className="text-left text-xl">
                    Music is a big part of my life. My taste spans across alternative, indie, and pop genres. When coding, I prefer 
                    familiar songs to maintain focus. During other activities like chores or commuting, I love discovering new music and artists.
                  </p>
                </article>
              </>
            ) : (
              <p className="text-xl text-left w-full">
                I'm a recent graduate from the University of Minnesota - Twin Cities with a degree in Computer Science from the college of Science and Engineering.
                I have a passion for software development and am always looking for new ways to learn and grow as a developer, but I have a particular interest in web development. 
                I have experience with a variety of programming languages and frameworks, and am always looking to expand my skillset.
                I am currently seeking a full-time software development position where I can continue to grow and learn as a developer.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="
          absolute left-3 top-0 md:top-16 *:pb-1 w-shrink *:pl-1 *:pr-1 h-6 gap-4
          origin-left *:rounded-b md:*:rounded-b-none md:*:rounded-t hover:cursor-pointer md:rotate-90 z-10 flex
          tracking-widest text-center *:bg-navy text-aqua1 *:border-b-2 md:*:border-b-0 md:*:border-t-2 *:border-r-2 *:border-l-2 *:border-white"
        > 
        {
        personal ? 
          <p onClick={() => setPersonal(!personal)} className="hover:bg-blue1  hover:text-white hover:border-aqua1">Professional</p> 
          : <p onClick={() => setPersonal(!personal)} className="hover:bg-blue1  hover:text-white hover:border-aqua1">Personal</p>
        }
          <p onClick={() => setPage('resume')} className="hover:bg-blue1 hover:text-white hover:border-aqua1">Resume</p>
          <p onClick={() => setPage('cv')} className="hover:bg-blue1 hover:text-white hover:border-aqua1">CV</p>
          <p onClick={() => setPage('timeline')} className="hover:bg-blue1 hover:text-white hover:border-aqua1">Timeline</p>
        </div>
        {(() => {
          switch(page) {
            case 'timeline':
              return (
                <div className="grid grid-cols-2 gap-x-4 w-full max-h-[50vh] md:max-h-[95vh] hide-scrollbar overflow-y-scroll timeline-pulse" >
                  <div className="bg-charcoal w-full h-full">
                    {timelineItems.map(item => (
                      item.key % 2 === 0 && (
                        <div key={item.key} className="pt-16 md:pt-32 w-full flex flex-col items-center justify-around pb-10 last:pb-32">
                          <TimelineItem
                            index={item.key}
                            date={item.date}
                            title={item.title}
                            location={item.location}
                            description={item.description}
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="bg-charcoal w-full h-full pt-32">
                    {timelineItems.map(item => (
                      item.key % 2 === 1 && (
                        <div key={item.key} className="pt-16 md:pt-32 w-full flex flex-col items-center pb-10 last:pb-32">
                          <TimelineItem
                            index={item.key}
                            date={item.date}
                            title={item.title}
                            location={item.location}
                            description={item.description}
                          />
                        </div>
                      )
                    ))}
                  </div>
                </div>
              );
              case 'resume':
                return (
                  <div className="w-full h-[50vh] md:h-[95vh] overflow-hidden relative">
                    <iframe
                      src="/documents/LucasSchottler.pdf"
                      className="w-full h-full"
                      title="Lucas Schottler Resume"
                    />
                    <a 
                      href="/documents/LucasSchottler.pdf" 
                      className="absolute top-8 right-2 bg-navy text-aqua1 hover:text-white hover:bg-blue1 px-4 py-2 rounded-md"
                      download
                    >
                      Download PDF
                    </a>
                  </div>
                );
              case 'cv':
                return (
                  <div className="w-full h-[50vh] md:h-[95vh] overflow-hidden relative">
                    <iframe
                      src="/documents/CV.pdf"
                      className="w-full h-full"
                      title="Lucas Schottler CV"
                    />
                    <a 
                      href="/documents/CV.pdf" 
                      className="absolute top-8 right-2 bg-navy text-aqua1 hover:text-white hover:bg-blue1 px-4 py-2 rounded-md"
                      download
                    >
                      Download PDF
                    </a>
                  </div>
                );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  </div>
  );
}