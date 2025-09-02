import { Map, Search, ShieldAlert, MessageSquare, Navigation, Cross, Sparkles } from "lucide-react";

const features = [
  {
    title: "Live Heatmap Dashboard",
    desc: "Real-time crowd density monitoring with interactive heatmaps.",
    icon: <Map className="w-10 h-10 text-orange-600" />,
  },
  {
    title: "Lost & Found Service on Fingertips",
    desc: "Easily report or find lost belongings through the app.",
    icon: <Search className="w-10 h-10 text-purple-600" />,
  },
  {
    title: "On-the-Spot Medical SOS",
    desc: "Instant access to emergency medical services nearby.",
    icon: <Cross className="w-10 h-10 text-red-600" />,
  },
  {
    title: "Suspicious Activity Alerts in App",
    desc: "AI-powered detection for quick alerts of unusual behavior.",
    icon: <ShieldAlert className="w-10 h-10 text-yellow-600" />,
  },
  {
    title: "AR Navigation - See the Safest Path",
    desc: "Augmented reality navigation showing safest routes.",
    icon: <Navigation className="w-10 h-10 text-blue-600" />,
  },
  
  {
    title: "Multilingual Chat Bot",
    desc: "Talk to Trinetra in your preferred language instantly.",
    icon: <MessageSquare className="w-10 h-10 text-pink-600" />,
  },
];

export default function Feature() {
  return (
    <section className="py-16 bg-[#fae7e0]" id="features">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
