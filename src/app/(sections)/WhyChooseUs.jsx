import { Skeleton } from "@/components/ui/skeleton";
import { Gem, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { cache, Suspense } from "react";

const getWhyChooseUs = cache(async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/website/whyChooseUs",
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const data = await response.json();
  if (response.ok) {
    return data._data;
  }
});
const iconMap = {
  Gem: Gem,
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  Gift: Gift,
  // Add more icons as needed
};

const WhyChooseUsItem = ({ item, index }) => {
  const IconComponent = iconMap[item.image] || Gem;
  const colorMap = [
    "from-amber-100 via-yellow-50 to-white",
    "from-emerald-100 via-green-50 to-white",
    "from-purple-100 via-violet-50 to-white",
    "from-pink-100 via-rose-50 to-white",
  ];

  return (
    <article
      className={`group relative flex flex-col items-center bg-gradient-to-br ${
        colorMap[index] || "from-slate-100/50 via-amber-200/50 to-white/50"
      } rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-500 border border-slate-200 hover:border-transparent cursor-pointer overflow-hidden hover:-translate-y-1`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/40 via-transparent to-transparent animate-pulse"></div>

      <div className="mb-3 text-slate-700 transition-all duration-500 group-hover:text-amber-500">
        <IconComponent
          size={32}
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1 text-center">
        {item.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
        {item.description}
      </p>

      <div className="mt-2 w-0 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full group-hover:w-10 transition-all duration-500"></div>
    </article>
  );
};

const WhyChooseUsContent = async () => {
  const data = await getWhyChooseUs();
  const features = data;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {features.map((item, index) => (
        <WhyChooseUsItem key={item._id} item={item} index={index} />
      ))}
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className={`w-full bg-gradient-to-br from-amber-50/30 via-amber-100/20 to-white/30 `} aria-labelledby="why-choose-us">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6"></div>

        <div className="text-center mb-8">
          <h2
            id="why-choose-us"
            className="text-2xl md:text-3xl font-serif text-slate-800 mb-2 tracking-wide"
          >
            Why Choose Us
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm md:text-base font-light max-w-md mx-auto">
            Experience excellence in every aspect of your jewellery shopping
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-3 p-4"
                >
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          }
        >
          <WhyChooseUsContent />
        </Suspense>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-8"></div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
