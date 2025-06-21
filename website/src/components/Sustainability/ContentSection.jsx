import { SectionContainer, Heading, Button } from "./Common";

export const ContentSection = () => (
  <SectionContainer className="flex justify-center items-start gap-16 mb-20 flex-wrap">
    <div className="flex-shrink-0">
      <img
        src="https://d9hhrg4mnvzow.cloudfront.net/nachhaltigkeit.refurbed.de/926aed70-eir25-teaser.gif"
        alt="Laptop showing Welcome screen on wooden desk with pink flowers"
        className="w-80 h-52 rounded-lg object-cover shadow-lg"
      />
    </div>

    <div className="flex-shrink-0 text-left">
      <Heading level={3}>Read now:</Heading>
      <p className="text-base leading-6 mb-6 max-w-xs">
        Our 2024 Sustainability Report with our Deep Dive Story on the topic of
        trade-in
      </p>
      <Button>Download</Button>
    </div>
  </SectionContainer>
);
