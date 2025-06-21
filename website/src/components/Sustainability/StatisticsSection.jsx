import {
  SectionContainer,
  CenteredContent,
  Heading,
  BackgroundImage,
  StatisticCard,
  STATISTICS_DATA,
} from "./Common";

export const StatisticsSection = () => (
  <SectionContainer className="flex flex-col justify-center items-center pb-16">
    <CenteredContent width="w-12/12 md:w-11/12 lg:w-10/12">
      <div className="relative">
        <BackgroundImage
          src="https://d9hhrg4mnvzow.cloudfront.net/nachhaltigkeit.refurbed.de/a9b9347f-texture2_10000000t70bp00f00e000.jpg"
          alt="Texture background"
          className="z-1 rounded-xl"
        />

        <div className="absolute inset-0 bg-opacity-80 z-10" />

        <div className="relative z-20 pt-16 pb-8 px-32">
          <Heading level={2}>
            Seit unserer Gründung haben wir bereits so viel eingespart*:
          </Heading>
          <div className="max-w-6xl mx-auto mb-10">
            {/* First row - 3 statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
              {STATISTICS_DATA.slice(0, 3).map((stat, index) => (
                <StatisticCard key={index} {...stat} />
              ))}
            </div>

            {/* Second row - 2 statistics centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-2xl mx-auto">
              {STATISTICS_DATA.slice(3, 5).map((stat, index) => (
                <StatisticCard key={index + 3} {...stat} />
              ))}
            </div>
          </div>{" "}
          <p className="text-xs opacity-70 leading-relaxed max-w-4xl mx-auto px-5">
            *Einsparungen im Vgl. zu Neukauf basierend auf
            Umweltauswirkungsdaten durch eine nach ISO 14040/44 verifizierte
            Sachbilanz. Virtueller Wasserverbrauch ist eine Methode, die den
            gesamten Wasserverbrauch in der Lieferkette berücksichtigt. Die
            Einsparungen bei kritischen Rohstoffen und konfliktgenerierenden
            beziehen sich ausschließlich auf Smartphones (Stand Mai 2023).
          </p>
        </div>
      </div>
    </CenteredContent>
  </SectionContainer>
);
