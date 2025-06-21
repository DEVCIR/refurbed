import { Smartphone, X, Check, Wrench, Settings, Star, Shield } from "./Common";

export const RefurbishmentProzessSection = () => (
  <div className="bg-custom-accent py-20 px-8">
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-6xl font-black font-paytone  mb-4">03.</h2>
        <h3 className="text-3xl font-bold  mb-8">Der Refurbishment Prozess</h3>

        <p className=" text-lg leading-relaxed max-w-5xl mb-16">
          Bevor ein Gerät auf dem refurbed-Marktplatz verkauft wird, durchläuft
          es einen umfassenden Refurbishment-Prozess. Dieser wird von erfahrenen
          Refurbishern durchgeführt und kontinuierlich von unseren Teams für
          Händler-Performance und Produktqualität überwacht.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="space-y-16">
          {/* Step 1 - Datenlöschung */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border-2 border-sustainability-highlight rounded-lg flex items-center justify-center">
                <div className="relative">
                  <Smartphone className="w-8 h-8 " strokeWidth={1.5} />
                  <X
                    className="w-4 h-4  absolute -top-1 -right-1"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="w-0.5 h-16 bg-sustainability-highlight bg-opacity-30 mx-auto mt-4 border-dashed border-l-2 border-sustainability-highlight"></div>
            </div>
            <div>
              <h4 className="text-xl font-bold  mb-3">Datenlöschung</h4>
              <p className=" text-base leading-relaxed">
                Alte Daten werden gelöscht, der Speicherplatz wird überschrieben
                und das Gerät auf die Werkseinstellungen zurückgesetzt.
              </p>
            </div>
          </div>

          {/* Step 2 - Gerätetest */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border-2 border-sustainability-highlight rounded-lg flex items-center justify-center">
                <div className="relative">
                  <Smartphone className="w-8 h-8 " strokeWidth={1.5} />
                  <Check
                    className="w-4 h-4  absolute -top-1 -right-1"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="w-0.5 h-16 bg-sustainability-highlight bg-opacity-30 mx-auto mt-4 border-dashed border-l-2 border-sustainability-highlight"></div>
            </div>
            <div>
              <h4 className="text-xl font-bold  mb-3">Gerätetest</h4>
              <p className=" text-base leading-relaxed">
                Technische Expert:innen testen das Gerät über eine zugelassene
                und zertifizierte Testsoftware, um 100%ige Funktionalität zu
                gewährleisten.
              </p>
            </div>
          </div>

          {/* Step 3 - Austausch von Komponenten */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border-2 border-sustainability-highlight rounded-lg flex items-center justify-center">
                <div className="relative">
                  <Smartphone className="w-8 h-8 " strokeWidth={1.5} />
                  <Wrench
                    className="w-4 h-4  absolute -top-1 -right-1"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold  mb-3">
                Austausch von Komponenten
              </h4>
              <p className=" text-base leading-relaxed">
                Komponenten werden bei Bedarf ausgetauscht. Reparaturen werden
                von Expert:innen durchgeführt; einzelne Teile werden gegen
                gleichwertige ausgetauscht.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-16">
          {/* Step 4 - Nötige Überarbeitung */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border-2 border-sustainability-highlight rounded-lg flex items-center justify-center">
                <div className="relative">
                  <Smartphone className="w-8 h-8 " strokeWidth={1.5} />
                  <Settings
                    className="w-4 h-4  absolute -top-1 -right-1"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="w-0.5 h-16 bg-sustainability-highlight bg-opacity-30 mx-auto mt-4 border-dashed border-l-2 border-sustainability-highlight"></div>
            </div>
            <div>
              <h4 className="text-xl font-bold  mb-3">Nötige Überarbeitung</h4>
              <p className=" text-base leading-relaxed">
                Äußere Gebrauchsspuren (je nach optischem Zustand) werden durch
                polieren und reinigen entfernt. Falls erforderlich, werden
                Upgrades des Betriebssystems durchgeführt.
              </p>
            </div>
          </div>

          {/* Step 5 - Grading der Geräte */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border-2 border-sustainability-highlight rounded-lg flex items-center justify-center">
                <div className="relative">
                  <Smartphone className="w-8 h-8 " strokeWidth={1.5} />
                  <Star
                    className="w-4 h-4  absolute -top-1 -right-1"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="w-0.5 h-16 bg-sustainability-highlight bg-opacity-30 mx-auto mt-4 border-dashed border-l-2 border-sustainability-highlight"></div>
            </div>
            <div>
              <h4 className="text-xl font-bold  mb-3">Grading der Geräte</h4>
              <p className=" text-base leading-relaxed">
                Technische Expert:innen oder Laser-Maschinen gleichen das
                Geräteäußere mit unseren Richtlinien und Standards hinsichtlich
                optischer Zustände ("exzellent", "sehr gut", "gut") ab.
              </p>
            </div>
          </div>

          {/* Step 6 - Final Step */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border-2 border-sustainability-highlight rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 " strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold  mb-3">
                Zuletzt wird das Gerät über unseren Marktplatz verkauft und mit
                einer 30-tage Testphase sowie einer Mindestgarantie von 12 Mo.
                geliefert.
              </h4>
              <p className=" text-sm leading-relaxed opacity-80">
                Alle Geräte, die über refurbed verkauft werden, durchlaufen
                einen 40-stufigen Refurbishmentprozess.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
