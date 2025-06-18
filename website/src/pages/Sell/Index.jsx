import {
  Wallet,
  ShieldCheck,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsLetter from "@/components/NewsLetter/Index";
import { Card, CardContent } from "@/components/ui/card";

// Reusable Section Header Component
const SectionHeader = ({ title, description, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-center space-y-4 text-center ${className}`}
  >
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tighter text-custom-dark-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="max-w-[900px] text-custom-grey-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        {description}
      </p>
    </div>
  </div>
);

// Reusable Feature Item Component
const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <Icon className="h-12 w-12 text-custom-pri mb-4" />
    <h3 className="text-lg font-semibold text-custom-dark-text">{title}</h3>
    <p className="text-sm text-custom-grey-text">{description}</p>
  </div>
);

// Reusable Step Item Component
const StepItem = ({ imgSrc, altText, title, description }) => (
  <div className="grid gap-1 text-center">
    <div className="relative mx-auto mb-4 flex items-center justify-center rounded-full bg-custom-bg2">
      <img src={imgSrc} alt={altText} className="rounded-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-custom-dark-text">{title}</h3>
    <p className="text-sm text-custom-grey-text">{description}</p>
  </div>
);

// Reusable Review Card Component
const ReviewCard = ({ rating, verified, title, content, author }) => (
  <Card className="bg-customBg1 shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating
                ? "fill-custom-accent text-custom-accent"
                : "text-gray-300"
            }`}
          />
        ))}
        {verified && (
          <span className="text-sm text-custom-accent font-semibold">
            verified
          </span>
        )}
      </div>
      <h4 className="text-lg font-semibold text-custom-dark-text mb-2">
        {title}
      </h4>
      <p className="text-sm text-custom-grey-text">{content}</p>
      <p className="text-sm font-medium text-custom-dark-text mt-4">{author}</p>
    </CardContent>
  </Card>
);

// Constants for reusable data
const FEATURES = [
  {
    icon: Wallet,
    title: "For free",
    description: "We cover the shipping costs",
  },
  {
    icon: ShieldCheck,
    title: "Secure shipping",
    description: "Including insurance",
  },
  {
    icon: Eye,
    title: "Transparent process",
    description: "Find out the value of your device",
  },
];

const BRANDS = [
  { name: "Apple", logo: "/logos_apple.webp" },
  { name: "Samsung", logo: "/logos_samsung.webp" },
  { name: "Sony", logo: "/logos_sony.webp" },
  { name: "Huawei", logo: "/logos_huawei.webp" },
  { name: "Xiaomi", logo: "/logos_xiaomi.webp" },
  { name: "Google", logo: "/logos_google.webp" },
  { name: "Oppo", logo: "/logos_oppo.webp" },
  { name: "OnePlus", logo: "/logos_oneplus.webp" },
];

const STEPS = [
  {
    imgSrc: "/step_1_desktop.webp",
    altText: "Select model",
    title: "Select model",
    description: "Tell us which phone you want to sell",
  },
  {
    imgSrc: "/step_2_desktop.webp",
    altText: "Provide condition",
    title: "Specify condition",
    description: "Based on your condition details, we will make you an offer",
  },
  {
    imgSrc: "/step_3_desktop.webp",
    altText: "Free shipping",
    title: "Send free",
    description:
      "Once we have all the necessary information, you will receive a shipping label",
  },
];

const REVIEWS = [
  {
    rating: 5,
    verified: true,
    title: "Sustainability perfect",
    content: "I like the idea of refurbishing used products. It works...",
    author: "Name Kerstin Müller",
  },
  {
    rating: 5,
    verified: true,
    title: "Prompt delivery",
    content:
      "Prompt delivery, device was in order and payment was smooth and risk-free (Klarna)",
    author: "Name Martin Knab",
  },
  {
    rating: 5,
    verified: true,
    title: "This is already my second purchase",
    content:
      "This is already my second purchase, I am super satisfied, until the next purchase",
    author: "Name Ulrich Holz",
  },
];

// Hero Section Component
const HeroSection = () => (
  <section className="w-full h-auto bg-custom-pri relative overflow-hidden">
    <div className="container mx-auto grid items-center gap-6 px-4 py-12 md:grid-cols-2 md:px-6 lg:gap-10 md:py-24 lg:py-32">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tighter text-custom-light-text sm:text-5xl md:text-6xl lg:text-7xl/none">
          Sell your phone
        </h1>
        <p className="max-w-[600px] text-custom-light-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Up to 500 € for your used smartphone
        </p>
        <Button className="inline-flex h-10 items-center justify-center rounded-md bg-custom-light-text px-8 text-sm font-medium text-custom-pri shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-custom-light-text disabled:pointer-events-none disabled:opacity-50">
          Sell now
        </Button>
      </div>
      <div className="relative flex justify-center md:justify-end">
        <img
          src="/buyback_banner.webp"
          width={600}
          height={300}
          alt="Multiple smartphones"
          className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
        />
      </div>
    </div>
  </section>
);

// Features Section Component
const FeaturesSection = () => (
  <section className="w-full bg-customBg2 py-12 md:py-24 lg:py-32">
    <div className="container mx-auto grid items-center justify-center gap-6 px-4 md:grid-cols-3 md:px-6 lg:gap-10">
      {FEATURES.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </div>
  </section>
);

// Brands Section Component
const BrandsSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-customBg2">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeader
        title="What brand is your phone?"
        description="We are currently buying the following mobile phones:"
      />

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-customBg1 p-6 shadow-sm transition-all hover:shadow-md"
          >
            <img
              src={brand.logo}
              width={64}
              height={64}
              alt={`${brand.name} logo`}
              className="mb-4 h-16 w-16 object-contain"
            />
            <span className="text-lg font-semibold text-custom-dark-text">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// How It Works Section Component
const HowItWorksSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeader
        title="How it works"
        description="Get an offer in minutes"
      />

      <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-3 lg:gap-12">
        {STEPS.map((step, index) => (
          <StepItem key={index} {...step} />
        ))}
      </div>
      <div className="flex justify-center pt-8">
        <Button className="inline-flex h-12 items-center justify-center rounded-md bg-custom-pri px-8 text-base font-medium text-custom-light-text shadow transition-colors hover:bg-custom-priLight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-custom-pri disabled:pointer-events-none disabled:opacity-50">
          Sell now
        </Button>
      </div>
    </div>
  </section>
);

// FAQ Section Component
const FaqSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-customBg2">
    <div className="container mx-auto px-4 md:px-6 text-center">
      <h2 className="text-3xl font-bold tracking-tighter text-custom-dark-text sm:text-4xl md:text-5xl">
        Do you still have questions?
      </h2>
      <p className="max-w-[900px] mx-auto mt-4 text-customGreyText md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Find more information in our FAQs
      </p>
      <div className="mt-8">
        <a href="/faq">
          <Button
            variant="outline"
            className="h-12 px-8 text-base border-custom-pri text-custom-pri hover:bg-custom-pri hover:text-custom-light-text"
          >
            To the FAQs
          </Button>
        </a>
      </div>
    </div>
  </section>
);

// Reviews Section Component
const ReviewsSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeader
        title="Reviews for refurbished in Germany"
        description="Click through our products to see specific reviews"
      />

      <div className="mt-12 flex flex-col items-center">
        <div className="flex items-center gap-2 text-customAccent">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-customAccent" />
          ))}
          <span className="text-2xl font-bold text-customAccent">
            Excellent
          </span>
        </div>
        <p className="text-sm text-customGreyText mt-2">
          Based on 146845 reviews
        </p>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-6xl items-center justify-center gap-4">
        <button className="absolute left-0 z-10 rounded-full bg-customBg1 p-2 shadow-md hover:bg-gray-100">
          <ChevronLeft className="h-6 w-6 text-custom-pri" />
        </button>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
        <button className="absolute right-0 z-10 rounded-full bg-customBg1 p-2 shadow-md hover:bg-gray-100">
          <ChevronRight className="h-6 w-6 text-custom-pri" />
        </button>
      </div>
      <p className="text-center text-sm text-customGreyText mt-8">
        Some of our 4- and 5-star reviews
      </p>
      <div className="flex justify-center mt-4">
        <span className="text-customAccent text-xl font-bold">Trustpilot</span>
      </div>
    </div>
  </section>
);

// Main Landing Page Component
const Sell = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <BrandsSection />
    <HowItWorksSection />
    <FaqSection />
    <ReviewsSection />
    <NewsLetter />
  </>
);

export default Sell;
