import Header from '../components/Header';

export default function About() {
  return (
    <div className="bg-charcoal min-h-screen w-full overflow-x-hidden">
      <div className="fixed bottom-0 bg-index-background bg-cover bg-center h-[50%] w-screen z-0"></div>
      <div className="fixed bottom-0 bg-white w-screen z-10 bg-center h-5"></div>
      <Header />
      <div className="w-full text-white text-center pt-10">
        Content
      </div>
    </div>
  );
}