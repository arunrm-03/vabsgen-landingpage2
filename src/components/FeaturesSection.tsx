import { Brain, Briefcase, User, Building2 } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="min-h-screen bg-black text-white py-24 px-8 md:px-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">

        {/* 4-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10 gap-y-0">
          {[
            {
              icon: Brain,
              title: "AI-Powered",
              desc: "Personalized learning and intelligent guidance"
            },
            {
              icon: Briefcase,
              title: "Placement Focused",
              desc: "Develop skills that help students prepare for careers"
            },
            {
              icon: User,
              title: "Student-Centric",
              desc: "Learning experiences designed around individual progress"
            },
            {
              icon: Building2,
              title: "Built for Colleges",
              desc: "Centralized learning and student development management"
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            
            // On md (2 cols): items 0 and 2 have right borders.
            // On lg (4 cols): items 0, 1, and 2 have right borders.
            let borderClasses = '';
            if (i === 0 || i === 2) borderClasses = 'md:border-r border-white/10';
            if (i === 1) borderClasses = 'lg:border-r border-white/10';
            
            return (
              <div key={i} className={`py-16 px-6 flex flex-col items-center text-center ${borderClasses}`}>
                <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10 hover:scale-110 cursor-pointer group">
                  <Icon className="text-gray-300 group-hover:text-orange-500 w-7 h-7 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">{feature.desc}</p>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
