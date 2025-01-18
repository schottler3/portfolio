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
    <div className="bg-charcoal min-h-screen w-full max-h-screen overflow-y-auto">
    <Header />
    <div className="flex flex-col md:grid md:grid-cols-2 bg-charcoal text-white text-center pt-10">
      <div className="bg-navy max-h-full flex flex-col overflow-y-auto items-center justify-center">
        <div className="justify-center flex"> 
          <div className="flex w-full items-center flex-col xl:flex-row xl:justify-start xl:gap-8">
            <img 
              src="./images/headshot.jpg" 
              className="w-52 h-52 rounded-full border-8 border-white shrink-0"
            />
            <div className="varela-round-regular text-6xl text-white text-center tracking-widest border-b-2 border-t-2 xl:w-auto pt-4 pb-4 border-white mt-8 xl:mt-0">
              Lucas <br /> Schottler
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-3/4 items-center pt-10">
            <p className="text-center text-xl">
              I'm a recent graduate from the University of Minnesota - Twin Cities with a degree in Computer Science from the college of Science and Engineering.
              I have a passion for software development and am always looking for new ways to learn and grow as a developer, but I have a particular interest in web development. 
              I have experience with a variety of programming languages and frameworks, and am always looking to expand my skillset.
              I am currently seeking a full-time software development position where I can continue to grow and learn as a developer.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 w-full max-h-[50vh] md:max-h-[100vh] hide-scrollbar overflow-y-auto timeline-pulse">
        <div className="bg-charcoal w-full h-full">
          {timelineItems.map(item => (
            item.key % 2 === 0 && (
              <div key={item.key} className="pt-16 md:pt-32 w-full flex flex-col items-center justify-around pb-10">
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
              <div key={item.key} className="pt-16 md:pt-32 w-full flex flex-col items-center pb-10">
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
    </div>
  </div>
  );
}