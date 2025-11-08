import { ImagesSlider } from "@/components/ui/images-slider";
import React, { cache, Suspense } from "react";
import { LoadingUi } from "./Cart";

const GetBanners = cache(async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/website/banner",
    {
      next: { revalidate: 3600 },
    }
  );
  const data = await response.json();
  return data._data;
});

async function BannerContent() {
  const banners = await GetBanners();
  const images = banners.map((item) => item.image);

  return <ImagesSlider className="" images={images} />;
}

// Main component wraps with Suspense
export default function Banner() {
  return (
    <div className="w-full h-[30vh] md:h-[50vh] lg:h-[70vh] overflow-hidden">
      <Suspense fallback={<LoadingUi type="banner" />}>
        <BannerContent />
      </Suspense>
    </div>
  );
}
