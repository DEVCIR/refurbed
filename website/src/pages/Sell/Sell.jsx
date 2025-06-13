import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

import {
  Wallet,
  ShieldCheck,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  Percent,
} from "lucide-react";

// Utility function `cn` (from lib/utils.ts)
function cn_local(...inputs) {
  return twMerge(clsx(inputs));
}

// Button Component (from components/ui/button.jsx)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn_local(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Input Component (from components/ui/input.jsx)
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn_local(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Card Component (from components/ui/card.jsx)
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn_local(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn_local("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn_local(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn_local("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn_local("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn_local("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Hero Section Component
function HeroSection() {
  return (
    <section className="w-full h-auto bg-custom-pri  relative overflow-hidden">
      <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-2 md:px-6 lg:gap-10">
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
            src="../../../public/buyback_banner.webp"
            width={600}
            height={300}
            alt="Multiple smartphones"
            className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection() {
  return (
    <section className="w-full bg-customBg2 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto grid items-center justify-center gap-6 px-4 md:grid-cols-3 md:px-6 lg:gap-10">
        <div className="flex flex-col items-center text-center">
          <Wallet className="h-12 w-12 text-custom-pri mb-4" />
          <h3 className="text-lg font-semibold text-custom-dark-text">
            For free
          </h3>
          <p className="text-sm text-customGreyText">
            We cover the shipping costs
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="h-12 w-12 text-custom-pri mb-4" />
          <h3 className="text-lg font-semibold text-custom-dark-text">
            Secure shipping
          </h3>
          <p className="text-sm text-customGreyText">Including insurance</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Eye className="h-12 w-12 text-custom-pri mb-4" />
          <h3 className="text-lg font-semibold text-custom-dark-text">
            Transparent process
          </h3>
          <p className="text-sm text-customGreyText">
            Find out the value of your device
          </p>
        </div>
      </div>
    </section>
  );
}

// Brands Section Component
function BrandsSection() {
  const brands = [
    { name: "Apple", logo: "../../../public/logos_apple.webp" },
    { name: "Samsung", logo: "../../../public/logos_samsung.webp" },
    { name: "Sony", logo: "../../../public/logos_sony.webp" },
    { name: "Huawei", logo: "../../../public/logos_huawei.webp" },
    { name: "Xiaomi", logo: "../../../public/logos_xiaomi.webp" },
    { name: "Google", logo: "../../../public/logos_google.webp" },
    { name: "Oppo", logo: "../../../public/logos_oppo.webp" },
    { name: "OnePlus", logo: "../../../public/logos_oneplus.webp" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-customBg2">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-custom-dark-text sm:text-4xl md:text-5xl">
              What brand is your phone?
            </h2>
            <p className="max-w-[900px] text-customGreyText md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are currently buying the following mobile phones:
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-customBg1 p-6 shadow-sm transition-all hover:shadow-md"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
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
}

// How It Works Section Component
function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-custom-dark-text sm:text-4xl md:text-5xl">
              So funktioniert&apos;s
            </h2>
            <p className="max-w-[900px] text-customGreyText md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              In wenigen Minuten zum Angebot
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-3 lg:gap-12">
          <div className="grid gap-1 text-center">
            <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-customBg2">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-custom-pri">
                1
              </span>
              <img
                src="../../../public/step_1_desktop.webp"
                width={128}
                height={128}
                alt="Select model"
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-custom-dark-text">
              Modell auswählen
            </h3>
            <p className="text-sm text-customGreyText">
              Sag uns, welches Handy du verkaufen möchtest
            </p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-customBg2">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-custom-pri">
                2
              </span>
              <img
                src="../../../public/step_2_desktop.webp"
                alt="Provide condition"
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-custom-dark-text">
              Zustand angeben
            </h3>
            <p className="text-sm text-customGreyText">
              Basierend auf deinen Angaben zum Zustand machen wir dir ein
              Angebot
            </p>
          </div>
          <div className="grid gap-1 text-center">
            <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-customBg2">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-custom-pri">
                3
              </span>
              <img
                src="../../../public/step_3_desktop.webp"
                alt="Free shipping"
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-custom-dark-text">
              Gratis verschicken
            </h3>
            <p className="text-sm text-customGreyText">
              Sobald wir alle notwendigen Infos haben, bekommst du ein
              Versandetikett
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <Button className="inline-flex h-12 items-center justify-center rounded-md bg-custom-pri px-8 text-base font-medium text-custom-light-text shadow transition-colors hover:bg-custom-priLight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-custom-pri disabled:pointer-events-none disabled:opacity-50">
            Jetzt verkaufen
          </Button>
        </div>
      </div>
    </section>
  );
}

// FAQ Section Component
function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-customBg2">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-custom-dark-text sm:text-4xl md:text-5xl">
          Hast du noch Fragen?
        </h2>
        <p className="max-w-[900px] mx-auto mt-4 text-customGreyText md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Mehr Infos findest du in unseren FAQs
        </p>
        <div className="mt-8">
          <a href="#">
            <Button
              variant="outline"
              className="h-12 px-8 text-base border-custom-pri text-custom-pri hover:bg-custom-pri hover:text-custom-light-text"
            >
              Zu den FAQs
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// Reviews Section Component
function ReviewsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-custom-dark-text sm:text-4xl md:text-5xl">
              Bewertungen für refurbished in Deutschland
            </h2>
            <p className="max-w-[900px] text-customGreyText md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Klick dich durch unsere Produkte, um spezifische Bewertungen zu
              sehen
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <div className="flex items-center gap-2 text-customAccent">
            <Star className="h-6 w-6 fill-customAccent" />
            <Star className="h-6 w-6 fill-customAccent" />
            <Star className="h-6 w-6 fill-customAccent" />
            <Star className="h-6 w-6 fill-customAccent" />
            <Star className="h-6 w-6 fill-customAccent" />
            <span className="text-2xl font-bold text-customAccent">
              Exzellent
            </span>
          </div>
          <p className="text-sm text-customGreyText mt-2">
            Basierend auf 146845 Bewertungen
          </p>
        </div>
        <div className="relative mx-auto mt-12 flex max-w-6xl items-center justify-center gap-4">
          <button className="absolute left-0 z-10 rounded-full bg-customBg1 p-2 shadow-md hover:bg-gray-100">
            <ChevronLeft className="h-6 w-6 text-custom-pri" />
          </button>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="bg-customBg1 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <span className="text-sm text-customAccent font-semibold">
                    verifiziert
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-custom-dark-text mb-2">
                  Nachhaltigkeit perfekt
                </h4>
                <p className="text-sm text-customGreyText">
                  Ich mag den Grundgedanken gebrauchte Produkte neu
                  aufzubereiten. Das gelingt...
                </p>
                <p className="text-sm font-medium text-custom-dark-text mt-4">
                  Name Kerstin Müller
                </p>
              </CardContent>
            </Card>
            <Card className="bg-customBg1 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <span className="text-sm text-customAccent font-semibold">
                    verifiziert
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-custom-dark-text mb-2">
                  Prompte Lieferung
                </h4>
                <p className="text-sm text-customGreyText">
                  Prompte Lieferung, Gerät war in Ordnung ude Bezahlung war
                  problemlos und risikolos (Klarna)
                </p>
                <p className="text-sm font-medium text-custom-dark-text mt-4">
                  Name Martin Knab
                </p>
              </CardContent>
            </Card>
            <Card className="bg-customBg1 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <Star className="h-5 w-5 fill-customAccent text-customAccent" />
                  <span className="text-sm text-customAccent font-semibold">
                    verifiziert
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-custom-dark-text mb-2">
                  Das ist schon mein zweiter Kauf
                </h4>
                <p className="text-sm text-customGreyText">
                  Das ist schon mein zweiter Kauf , bin super zufrieden , bis
                  zum nächsten Kauf
                </p>
                <p className="text-sm font-medium text-custom-dark-text mt-4">
                  Name Ulrich Holz
                </p>
              </CardContent>
            </Card>
          </div>
          <button className="absolute right-0 z-10 rounded-full bg-customBg1 p-2 shadow-md hover:bg-gray-100">
            <ChevronRight className="h-6 w-6 text-custom-pri" />
          </button>
        </div>
        <p className="text-center text-sm text-customGreyText mt-8">
          Einige unserer 4- und 5-Sterne-Bewertungen
        </p>
        <div className="flex justify-center mt-4">
          {/* Placeholder for Trustpilot logo */}
          <span className="text-customAccent text-xl font-bold">
            Trustpilot
          </span>
        </div>
      </div>
    </section>
  );
}

// Newsletter Section Component
function NewsletterSection() {
  return (
    <section className="w-full bg-custom-pri py-12 md:py-16 lg:py-20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-4 text-custom-light-text text-center md:text-left">
          <Percent className="h-10 w-10" />
          <div>
            <h3 className="text-xl font-bold">
              Erstmals zum Newsletter anmelden, 15 € sparen!
            </h3>
            <p className="text-sm">Verpasse kein Angebot mehr.</p>
          </div>
        </div>
        <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="E-Mail-Adresse eingeben"
            className="flex-1 rounded-md border-none bg-custom-light-text px-4 py-2 text-custom-dark-text focus:ring-1 focus:ring-custom-priLight"
          />
          <Button className="rounded-md bg-custom-priLight px-6 py-2 text-custom-light-text hover:bg-custom-pri focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-custom-light-text">
            Gutschein anfordern
          </Button>
        </div>
      </div>
      <div className="container mx-auto mt-4 px-4 md:px-6 text-center md:text-right">
        <p className="text-xs text-custom-light-text/80">
          Informationen über die Verwendung personenbezogener Daten findest du
          in unserer{" "}
          <a href="#" className="underline hover:text-custom-light-text">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// App Download Section Component
function AppDownloadSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-customBg2">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:flex-row md:px-6">
        <h3 className="text-2xl font-bold text-custom-dark-text text-center md:text-left">
          Hol dir die refurbished-App
          <br />
          <span className="text-base font-normal text-customGreyText">
            Für iOS und Android
          </span>
        </h3>
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="/placeholder.svg?height=40&width=135"
              width={135}
              height={40}
              alt="Get it on Google Play"
              className="h-10 w-auto"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="/placeholder.svg?height=40&width=120"
              width={120}
              height={40}
              alt="Download on the App Store"
              className="h-10 w-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

// Main Landing Page Component
export default function Sell() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BrandsSection />
      <HowItWorksSection />
      <FaqSection />
      <ReviewsSection />
      <NewsletterSection />
      <AppDownloadSection />
    </>
  );
}
