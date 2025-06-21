import {
  Lightbulb,
  Heart,
  Globe,
  Factory,
  Trash2,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  X,
  Check,
  Wrench,
  Settings,
  Star,
  Shield,
  Droplets,
  Package,
  Users,
  TreePine,
} from "lucide-react";

export const COLORS = {
  primary: "#2d8a7a",
  accent: "#7ed321",
  accentHover: "#6bc91a",
  highlight: "#e4edd7",
};

export const STATISTICS_DATA = [
  {
    icon: (
      <div className="w-6 h-6 border-2 border-sustainability-highlight rounded-full" />
    ),
    value: "350,000 t",
    label: "CO₂e",
  },
  {
    icon: <div className="w-2 h-4 bg-sustainability-highlight rounded-full" />,
    value: "116 Bn l",
    label: "Virtual water",
  },
  {
    icon: <div className="w-1 h-6 bg-sustainability-highlight" />,
    value: "1,136 t",
    label: "Electro-scrap",
  },
  {
    icon: (
      <div className="w-6 h-6 border-2 border-sustainability-highlight rounded" />
    ),
    value: "130",
    label: "tonnes",
  },
  {
    icon: <div className="w-4 h-4 border-2 border-sustainability-highlight" />,
    value: "4 t",
    label: "KONFLIKTMATERIALIEN",
  },
];

// Reusable Components
export const PageContainer = ({ children }) => (
  <div className="bg-sustainability-dark text-sustainability-highlight font-poppins min-h-screen z-0">
    {children}
  </div>
);

export const SectionContainer = ({ children, className = "" }) => (
  <div className={`px-4 md:px-10 ${className}`}>{children}</div>
);

export const CenteredContent = ({
  children,
  width = "w-11/12 md:w-10/12 lg:w-8/12",
  text = "text-center",
  className = "",
}) => <div className={`${width} mx-auto ${text} ${className}`}>{children}</div>;

export const Heading = ({ level, children, className = "" }) => {
  const baseClasses = "font-bold leading-tight";
  const levelClasses = {
    1: "text-5xl mb-8",
    2: "text-4xl mb-16",
    3: "text-lg mb-4",
  };

  const Tag = `h${level}`;

  return (
    <Tag className={`${baseClasses} ${levelClasses[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-sustainability-accent text-sustainability-primary border-none py-3 px-10 rounded-full text-base font-bold cursor-pointer transition-all duration-300 hover:bg-sustainability-accent-hover ${className}`}
  >
    {children}
  </button>
);

// DRY: Download Button
export const DownloadButton = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-sustainability-purple px-8 py-4 rounded-full text-lg font-medium hover:bg-sustainability-purple-hover transition-colors"
  >
    {children}
  </button>
);

// DRY: Read More Link
export const ReadMoreLink = ({ href = "#", children }) => (
  <a
    href={href}
    className="text-custom-accent font-medium hover:underline inline-flex items-center"
  >
    {children} <span className="ml-1">{">"}</span>
  </a>
);

export const StatisticCard = ({ icon, value, label }) => (
  <div className="text-center">
    <div className="w-12 h-12 mx-auto mb-4 border-2 border-sustainability-highlight border-opacity-30 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div className="text-7xl font-bold mb-2 font-paytone">{value}</div>
    <div className="text-sm opacity-90">{label}</div>
  </div>
);

export const BackgroundImage = ({ src, alt, className = "" }) => (
  <img
    src={src || "/placeholder.svg"}
    alt={alt}
    className={`absolute inset-0 w-full h-full object-cover ${className}`}
  />
);

// DRY: Numbered Topic Card
export const NumberedTopicCard = ({ number, title, link }) => (
  <div className="space-y-4">
    <h3 className="text-6xl font-black text-sustainability-purple">
      {number.toString().padStart(2, "0")}.
    </h3>
    <p className="text-sustainability-purple text-lg font-medium">{title}</p>
    <ReadMoreLink href={link}>Weiterlesen</ReadMoreLink>
  </div>
);

// DRY: Numbered Topics Data
export const NUMBERED_TOPICS = [
  { number: 1, title: "Unser Warum" },
  { number: 2, title: "Von linear zu zirkulär" },
  { number: 3, title: "Der Refurbishment Prozess" },
  { number: 4, title: "Unser politisches Engagement" },
  { number: 5, title: "Unser Qualitätsversprechen" },
  { number: 6, title: "Unsere Umweltstrategie" },
  { number: 7, title: "Unser nach ISO 14040/44 verifiziertes Rechenmodell" },
  { number: 8, title: "Unsere Einsparungen erklärt" },
  { number: 9, title: "Förderung von Umweltschutzprojekten" },
  { number: 10, title: "Unsere Partner & Zertifizierungen" },
];

// Export all icons for use in other components
export {
  Lightbulb,
  Heart,
  Globe,
  Factory,
  Trash2,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  X,
  Check,
  Wrench,
  Settings,
  Star,
  Shield,
  Droplets,
  Package,
  Users,
  TreePine,
};
