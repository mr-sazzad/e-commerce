import HeroSection from "@/components/Hero";
import LatestReviews from "@/components/LatestReviews";
import Promotion from "@/components/Promotion";
import Recent from "@/components/Recent";
import Upcoming from "@/components/Upcoming";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <HeroSection />
      <Recent />
      <Promotion />
      <Upcoming />
      <LatestReviews />
    </div>
  );
}
