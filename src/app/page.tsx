import { ScrollProgress } from "@/components/ScrollProgress";
import { ChapterRail } from "@/components/ChapterRail";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Products } from "@/components/Products";
import { Why } from "@/components/Why";
import { Marquee } from "@/components/Marquee";
import { Gallery } from "@/components/Gallery";
import { Conditions } from "@/components/Conditions";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <ChapterRail />
      <Nav />
      <Hero />
      <About />
      <Process />
      <Products />
      <Why />
      <Marquee />
      <Gallery />
      <Conditions />
      <Contact />
      <Footer />
    </>
  );
}
