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

  return (
    <div className="bg-charcoal min-h-screen w-full">
    <Header />
    <div className="w-full h-full grid grid-cols-2 bg-charcoal text-white text-center pt-10">
      <div className="grid grid-cols-2 gap-x-4 w-full max-h-[100vh] hide-scrollbar overflow-y-auto timeline-pulse">
        <div className="bg-charcoal w-full h-full">
          {timelineItems.map(item => (
            item.key % 2 === 0 && (
              <div key={item.key} className="pt-32 w-full flex flex-col items-center justify-around pb-10">
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
              <div key={item.key} className="pt-32 w-full flex flex-col items-center pb-10">
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
      <div className="bg-navy w-full max-h-full pt-32 flex flex-col overflow-y-auto pb-10">
        <div className="justify-center flex"> 
          <div className="flex w-3/4 h-min items-center">
            <img src="./images/headshot.jpg" className="w-52 h-52 rounded-full border-8 border-white"></img>
            <div className="varela-round-regular text-6xl text-white text-center tracking-widest border-b-2 border-t-2 w-3/4 pt-4 pb-4 border-white">
              Lucas <br /> Schottler
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-3/4 items-center pt-10">
            <p className="text-center">
              I'm a recent graduate from the University of Minnesota - Twin Cities with a degree in Computer Science from the college of Science and Engineering.
              I have a passion for software development and am always looking for new ways to learn and grow as a developer, but I have a particular interest in web development. 
              I have experience with a variety of programming languages and frameworks, and am always looking to expand my skillset.
              I am currently seeking a full-time software development position where I can continue to grow and learn as a developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}