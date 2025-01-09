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
    <div className="fixed bottom-0 bg-white w-screen z-10 bg-center h-5"></div>
    <Header />
    <div className="w-full min-h-[98vh] grid grid-cols-2 bg-charcoal text-white text-center pt-10 pb-10">
      <div className="grid grid-cols-2 gap-x-4 w-full h-full bg-white">
        <div className="bg-charcoal w-full h-full overflow-hidden">
          {timelineItems.map(item => (
            item.key % 2 === 0 && (
              <div key={item.key} className="pt-32 w-full flex flex-col items-center justify-around">
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
        <div className="bg-charcoal w-full h-full pt-32 overflow-hidden">
          {timelineItems.map(item => (
            item.key % 2 === 1 && (
              <div key={item.key} className="pt-32 w-full flex flex-col items-center">
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
      <div className="bg-navy w-full h-full">
        c
      </div>
    </div>
  </div>
  );
}