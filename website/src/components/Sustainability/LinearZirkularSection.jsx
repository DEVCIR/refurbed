import {
  Globe,
  Factory,
  Trash2,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
} from "./Common";

export const LinearZirkularSection = () => (
  <div className="bg-sustainability-light py-20 px-8">
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-6xl font-black font-paytone text-custom-accent mb-4">
          02.
        </h2>
        <h3 className="text-3xl font-bold text-custom-accent mb-8">
          Von linear zu zirkulär
        </h3>

        <div className="space-y-6 text-custom-accent text-lg leading-relaxed max-w-5xl">
          <p>
            In der traditionellen, linearen Wirtschaft gilt das Prinzip "Take –
            Make – Dispose": Ressourcen werden entnommen, Produkte hergestellt
            und nach kurzer Nutzung weggeworfen. Das führt zu enormer
            Verschwendung wertvoller Rohstoffe und belastet unsere Umwelt stark.
          </p>

          <p>
            Die Kreislaufwirtschaft ist der Gegenentwurf: Weniger Ressourcen
            werden entnommen, Produkte bleiben länger im Einsatz, und
            Materialien fließen zurück in den Kreislauf – zum Beispiel durch
            Wiederaufbereitung, Wiederverwendung oder Recycling.
          </p>

          <p>
            refurbed bietet dir eine Plattform für die Kreislaufwirtschaft: Hier
            kannst du alte Geräte zurückgeben und generalüberholte Produkte
            kaufen – nachhaltig, smart und ressourcenschonend.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16">
        {/* Linear Economy */}
        <div>
          <h4 className="text-2xl font-bold text-custom-accent mb-8 text-center">
            Linear economy
          </h4>
          <div className="flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-custom-accent font-medium mb-2">
                NEHMEN
              </span>
              <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <Globe
                className="w-16 h-16 text-custom-accent mb-2"
                strokeWidth={1.5}
              />
              <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-custom-accent font-medium mb-2">
                PRODUZIEREN
              </span>
              <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <Factory
                className="w-16 h-16 text-custom-accent mb-2"
                strokeWidth={1.5}
              />
              <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-custom-accent font-medium mb-2">
                ENTSORGEN
              </span>
              <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
            </div>

            <div className="flex flex-col items-center">
              <Trash2
                className="w-16 h-16 text-custom-accent mb-2"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Circular Economy */}
        <div>
          <h4 className="text-2xl font-bold text-custom-accent mb-8 text-center">
            Circular economy
          </h4>
          <div className="relative">
            {/* Top row */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex flex-col items-center">
                <span className="text-custom-accent font-medium mb-2">
                  NEHMEN
                </span>
                <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
              </div>

              <div className="flex flex-col items-center">
                <Globe
                  className="w-16 h-16 text-custom-accent mb-2"
                  strokeWidth={1.5}
                />
                <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-custom-accent font-medium mb-2">
                  PRODUZIEREN
                </span>
                <ArrowRight className="w-6 h-6 text-custom-accent mb-4" />
              </div>

              <div className="flex flex-col items-center">
                <Factory
                  className="w-16 h-16 text-custom-accent mb-2"
                  strokeWidth={1.5}
                />
                <ArrowDown className="w-6 h-6 text-custom-accent mb-4" />
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end space-y-8">
              <div className="flex flex-col items-center">
                <span className="text-custom-accent font-medium mb-2">
                  REFURBISHEN
                </span>
                <Smartphone
                  className="w-16 h-16 text-custom-accent mb-2"
                  strokeWidth={1.5}
                />
                <ArrowLeft className="w-6 h-6 text-custom-accent" />
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-custom-accent font-medium mb-2">
                  WIEDERVERWENDUNG
                </span>
                <ArrowUp className="w-6 h-6 text-custom-accent mb-4" />
              </div>

              <div className="flex flex-col items-center">
                <CheckCircle
                  className="w-16 h-16 text-custom-accent mb-2"
                  strokeWidth={1.5}
                />
                <ArrowLeft className="w-6 h-6 text-custom-accent mb-4" />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-custom-accent font-medium mb-2">
                  RECYCELN
                </span>
                <ArrowLeft className="w-6 h-6 text-custom-accent mb-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
