import Image from "next/image";
import heroBg from "@/public/assets/Hero-bg.jpg"
import Logo4fg from "@/public/assets/Mystical Wardrobes Logo-04(foreground).svg"
import Icon6 from "@/public/assets/symbols/Mystical Wardrobes Icons-09-06.svg"

import premium from "@/public/assets/collections/Premium.png";
import sampleGown1 from "@/public/assets/sample_gown-1.jpg";
import Logo from "@/public/assets/Mystical Wardrobes Logo-02 (foreground).svg"

import FadeInOnScroll from "@/components/FadeInOnScroll";
import ExpandableText from "@/components/ExpandableText";


export default function Home() {
  return (
    <div className="m-0 flex flex-col items-center justify-start w-full h-screen overflow-x-hidden bg-background">
      <Hero/>
      <FadeInOnScroll delay={0.1} className="w-full h-fit bg-background">
        <Collections/>
      </FadeInOnScroll>
      <Featured/>
    </div>
  );
}


function Hero() {
  return (
    <div 
      className="w-full h-fit bg-cover bg-top pl-5 pr-28 py-16 space-y-3 md:pl-16 md:pr-20 md:py-36 flex flex-col items-start justify-center text-left text-background font-manrope" 
      style={{ backgroundImage: `linear-gradient(to right, #636653 15%, transparent), url(${heroBg.src})` }}>
      <Image src={Logo4fg} alt="Logo 4" className="w-20 md:w-36"/>
      <h1 className=" font-vegawanty text-4xl md:text-6xl text-background">Where Fairytales Come to Life</h1>
      <ExpandableText
        text="Discover a world of enchanting fashion, where every piece tells a story and every outfit is a journey into the mystical. Our collection is designed to inspire your imagination and elevate your wardrobe with unique, handcrafted garments that blend fantasy with elegance."
        color="text-background"
      />
    </div>
  )
}

function Collections() {
  return (
    <div className="w-full h-fit flex flex-col md:flex-row md:gap-10 md:px-16 md:py-12 items-center justify-start md:justify-evenly px-6 py-4 space-y-6 bg-background">
      <div className="flex flex-col items-center justify-center">
        <Image src={Icon6} alt="Icon 6" className="w-24 h-24 md:w-40 md:h-40 mb-[-10px]"/>
        <h2 className="font-vegawanty text-5xl md:text-7xl">Collections</h2>
        <p className="font-manrope text-md md:text-lg text-foreground text-center max-w-2xl mt-2">
          Explore our curated collections that blend fantasy and fashion, each piece crafted to inspire and enchant.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:columns-4 h-full md:h-72 lg:h-[500px] gap-4 w-full max-w-3xl">
        <a
          className="row-span-1 h-72 md:h-full md:row-span-2 col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${sampleGown1.src})` }}
          href="/collections/premium"
        >
          PREMIUM
        </a>
        <a
          className="row-span-1 h-72 md:h-full col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${premium.src})` }}
          href="/collections/signature"
        >
          SIGNATURE
        </a>
        <a
          className="row-span-1 h-72 md:h-full col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${premium.src})` }}
          href="/collections/limited-edition"
        >
          CLASSIC
        </a>
      </div>
    </div>
  )
}

function Featured() {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center py-12 px-6 bg-tertiary lg:flex-row-reverse lg:justify-between lg:gap-5 lg:px-16 lg:py-8 space-y-6">
      {/* featured gowns header */}
      <div className="w-full h-fit flex flex-col items-center justify-center mb-8 mx-0 lg:mr-5">
        {/* featured and logo container */}
        <div className="w-fit flex flex-col items-center justify-center lg:items-start">
          <div className="w-fit flex flex-row items-center justify-center">
            <h1 className="font-vegawanty text-6xl lg:text-7xl text-background mt-3">Featured</h1>
            {/* Adjust width/height to use valid Tailwind classes */}
            <Image src={Logo} alt="Mystical Wardrobes Logo" className="w-12 h-12 ml-2" />
          </div>
          <div className="w-full flex flex-row items-start justify-end mt-[-15px] lg:mr-32">
            <h1 className="font-vegawanty text-5xl sm:text-4xl md:text-6xl text-background">gowns</h1>
          </div>
        </div>

        
        <p className=" font-manrope text-md md:text-lg text-background text-center max-w-3xl hidden lg:block">
        Discover our latest gown arrivals! Be among the first to experience the magic of these brand-new designs and step into a world of enchantment...
      </p>

      </div>

      <p className="font-manrope text-md md:text-lg text-background text-center max-w-2xl lg:hidden">
        Discover our latest gown arrivals! Be among the first to experience the magic of these brand-new designs and step into a world of enchantment...
      </p>

      {/* Featured gowns card container */}
      <div className="w-full h-fit flex flex-col gap-6 mt-6 lg:flex-row lg:gap-4 lg:h-96 justify-center items-center">
        {sampleFeaturedGowns.map((gown, index) => (
            <FeaturedGownsCard
              key={index}
              gownImage={gown.gownImage}
              gownName={gown.gownName}
              gownDescription={gown.gownDescription}
              gownLink={gown.gownLink}
            />
          ))}
      </div>
      
    </div>
  )
}

const sampleFeaturedGowns: FeaturedGownsCardProps[] = [
  {
    gownImage: sampleGown1.src,
    gownName: "Mystical Elegance",
    gownDescription: "A stunning gown that captures the essence of fantasy with intricate details and flowing fabrics.",
    gownLink: "/gowns/mystical-elegance"
  },
  {    
    gownImage: premium.src,
    gownName: "Enchanted",
    gownDescription: "An ethereal gown that transports you to a world of dreams with its delicate lace and shimmering accents.",
    gownLink: "/gowns/enchanted-dream"
  },
  {   
    gownImage: premium.src,
    gownName: "Celestial Beauty",
    gownDescription: "A gown that embodies the stars, featuring celestial patterns and a radiant silhouette.",
    gownLink: "/gowns/celestial-beauty"
  },
]

interface FeaturedGownsCardProps {
  gownImage: string;
  gownName: string;
  gownDescription: string;
  gownLink: string;
}

function FeaturedGownsCard(props: FeaturedGownsCardProps) {
  const { gownImage, gownName, gownDescription, gownLink } = props;
  return (
    <FadeInOnScroll className="row-span-1 h-72 lg:h-full lg:w-60 col-span-1 flex items-center justify-center text-background font-vegawanty text-3xl bg-cover bg-top transition-transform duration-300 hover:scale-105 shadow-lg group" delay={0.1} style={{ backgroundImage: `linear-gradient(to top, #636653, transparent), url(${gownImage})` }}>
      <a className="h-full w-full flex flex-col items-center justify-end transition-transform duration-300 group-hover:scale-105"
        href={gownLink}
      >
        <div className="h-full py-5 flex flex-col items-center justify-end px-4">
          <h2 className="text-2xl md:text-3xl mb-2">{gownName}</h2>
          <p
            className="font-manrope text-sm lg:text-md text-background text-center max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100"
          >
            {gownDescription}
          </p>
        </div>
      </a>
    </FadeInOnScroll>
  );
  
}

