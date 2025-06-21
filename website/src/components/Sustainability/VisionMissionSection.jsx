import { Lightbulb, Heart } from "./Common";

export const VisionMissionSection = () => (
  <div className="bg-sustainability-light">
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex gap-8 max-w-6xl w-full">
        {/* Vision Card */}
        <div className="flex-1 bg-sustainability-light border-4 border-custom-accent rounded-3xl p-8">
          <div className="mb-6">
            <Lightbulb
              className="w-12 h-12 text-sustainability-purple mb-4"
              strokeWidth={2}
            />
            <h2 className="text-5xl font-black text-sustainability-purple mb-4 leading-tight">
              Unsere
              <br />
              Vision
            </h2>
            <p className="text-sustainability-purple font-medium text-lg mb-6">
              {"(= warum es uns gibt): wir wollen Konsum nachhaltig machen."}
            </p>
          </div>
          <p className="text-sustainability-purple text-lg leading-relaxed">
            Unsere Welt braucht mehr Kreislauf statt Konsum. Deshalb arbeiten
            wir an einer Zukunft, in der erneuerte Produkte überall erhältlich,
            fair bepreist und ganz normal sind.
          </p>
        </div>

        {/* Mission Card */}
        <div className="flex-1 bg-sustainability-light border-4 border-custom-accent rounded-3xl p-8">
          <div className="mb-6">
            <Heart
              className="w-12 h-12 text-sustainability-purple mb-4"
              strokeWidth={2}
            />
            <h2 className="text-5xl font-black text-sustainability-purple mb-4 leading-tight">
              Unsere
              <br />
              Mission
            </h2>
            <p className="text-sustainability-purple font-medium text-lg mb-6">
              {
                "(= wie wir unsere Vision erreichen): Die führende Plattform für nachhaltige Produkte und Dienstleistungen bauen."
              }
            </p>
          </div>
          <p className="text-sustainability-purple text-lg leading-relaxed">
            Wir arbeiten jeden Tag daran, refurbed zum zentralen Marktplatz für
            nachhaltige Produkte und Services zu machen – mit Angeboten, die zu
            deinen Bedürfnissen passen. So wird nachhaltiges Einkaufen einfach
            und sorgenfrei.
          </p>
        </div>
      </div>
    </div>
  </div>
);
