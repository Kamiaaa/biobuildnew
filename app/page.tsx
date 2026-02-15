import Slider from "./components/Carousel";
import ClientLogoSlider from "./components/ClientLogoSlider";
import FlipSlider from "./components/FlipSlider";
import NewsAndEventsPage from "./components/NewsEvents";
import PrimeLocationsPage from "./components/PrimeLocations";
import ViewProjectsPage from "./components/ProjectGallery";
import PromotionalBanner from "./components/PromotionalBanner";
import ViewBlogs from "./components/ViewBlogs";

export default function Home() {
  return (
    <>
    <Slider/>
    <ViewProjectsPage/>
    <PromotionalBanner/>
    <ViewBlogs/>
    <NewsAndEventsPage/>
    <PrimeLocationsPage/>
    <FlipSlider/>
    <ClientLogoSlider/>
    </>
  );
}
