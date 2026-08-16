import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Gem,
  Gift,
  ShieldCheck,
  Sparkles,
  Award,
  Heart,
  Star,
  ThumbsUp,
  Shield,
  CheckCircle,
  Sparkle,
} from "lucide-react";
import { Suspense } from "react";
import { getWhyChooseUs } from "@/lib/get-why-choose-us";

const iconMap: Record<string, typeof Gem> = {
  Gem,
  Award,
  ShieldCheck,
  Sparkles,
  Heart,
  Star,
  ThumbsUp,
  Shield,
  CheckCircle,
  Gift,
  Sparkle,
};

type WhyChooseUsData = {
  _id: string;
  image: string;
  title: string;
  description: string;
};

const DEFAULT_FEATURES: WhyChooseUsData[] = [
  {
    _id: "hallmarked-purity",
    image: "ShieldCheck",
    title: "Hallmarked Purity",
    description:
      "Every piece is BIS-hallmarked 22K/18K gold with transparent purity certification you can verify.",
  },
  {
    _id: "master-karigar-craft",
    image: "Sparkles",
    title: "Master Karigar Craft",
    description:
      "Handcrafted in Jodhpur by master karigars, with techniques passed down through generations.",
  },
  {
    _id: "generational-trust",
    image: "Heart",
    title: "Generational Trust",
    description:
      "Families have trusted us for decades — your legacy deserves a jeweller you can count on.",
  },
  {
    _id: "honest-pricing",
    image: "CheckCircle",
    title: "Honest Pricing",
    description:
      "Live gold rates and fair make-charges, always. No hidden costs, ever.",
  },
];

const WhyChooseUsItem = ({
  item,
  index,
}: {
  item: WhyChooseUsData;
  index: number;
}) => {
  const IconComponent = iconMap[item.image] || Gem;
  const accent = (index % 4) + 1;

  return (
    <Card
      className={`card-hover group border bg-card-accent-${accent}`}
      style={{ borderColor: `var(--brand-card-${accent}-ring)` }}
    >
      <CardContent className="relative z-10 flex flex-col items-center p-6 text-center sm:p-8">
        <div className="relative mb-5 rounded-full bg-background/60 p-4 shadow-sm">
          <IconComponent
            size={32}
            className={`text-card-accent-${accent}`}
            strokeWidth={1.5}
          />
          {/* Sparkle accent on hover */}
          <span
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: `var(--brand-card-${accent}-icon)` }}
          />
        </div>
        <h3 className="fw-heading mb-2 text-base font-bold text-foreground md:text-lg">
          {item.title}
        </h3>
        <p className="fw-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
};

const WhyChooseUsContent = async () => {
  const data = await getWhyChooseUs();
  const features: WhyChooseUsData[] =
    data && data.length > 0 ? data : DEFAULT_FEATURES;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {features?.map((item, index) => (
        <WhyChooseUsItem key={item._id} item={item} index={index} />
      ))}
    </div>
  );
};

const SkeletonCard = ({ index }: { index: number }) => {
  const accent = (index % 4) + 1;
  return (
    <div
      className={`rounded-2xl border bg-card-accent-${accent} p-6 sm:p-8`}
      style={{ borderColor: `var(--brand-card-${accent}-ring)` }}
    >
      <div className="mb-5 flex justify-center">
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-36" />
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-section py-4"
      aria-labelledby="why-choose-us"
    >
      {/* Decorative glows */}
      <div
        className="absolute top-10 left-10 h-32 w-32 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "var(--brand-card-1-bg)" }}
      />
      <div
        className="absolute right-10 bottom-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: "var(--brand-card-2-bg)" }}
      />

      <div className="section-container relative z-10">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-background px-4 py-1.5 shadow-sm">
            <Gem size={14} className="text-brand-600" />
            <span className="fw-cta text-xs uppercase tracking-wider text-brand-700">
              Jodhpur's Trusted Jeweller
            </span>
          </div>

          <h2 id="why-choose-us" className="section-heading">
            Jewellery Walla's Promise
          </h2>

          {/* Traditional kundan-style motif divider */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <div
              className="h-0.5 w-16 bg-gradient-to-r from-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, transparent, var(--brand-primary))",
              }}
            />
            <div
              className="h-2 w-2 rotate-45"
              style={{ backgroundColor: "var(--brand-primary)" }}
            />
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: "var(--brand-primary)" }}
            />
            <div
              className="h-2 w-2 rotate-45"
              style={{ backgroundColor: "var(--brand-primary)" }}
            />
            <div
              className="h-0.5 w-16 bg-gradient-to-l from-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to left, transparent, var(--brand-primary))",
              }}
            />
          </div>

          <p className="section-subheading">
            Hallmarked purity, master karigar craftsmanship and honest pricing —
            a promise kept for generations, because your jewellery is your
            family's legacy.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          }
        >
          <WhyChooseUsContent />
        </Suspense>
      </div>
    </section>
  );
};

export default WhyChooseUs;
