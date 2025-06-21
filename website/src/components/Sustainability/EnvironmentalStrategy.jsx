export const EnvironmentalStrategy = () => {
  return (
    <div className="bg-sustainability-light text-custom-accent flex justify-center py-16 gap-x-8 tracking-[-1.2px]">
      {/* Content Section */}
      <div className="w-5/12">
        <div className="text-8xl font-bold font-paytone text-custom-accent">
          06.
        </div>

        <div className="text-2xl font-semibold text-custom-accent">
          Unsere Umweltstrategie
        </div>

        <div className="text-custom-accent text-sm leading-relaxed">
          <div className="flex flex-col">
            <div>
              Als Plattform für refurbished Elektronik und Services ist unser
              Geschäftsmodell im Kern auf Nachhaltigkeit ausgerichtet. Doch
              unser Engagement hört hier nicht auf: 2023 haben wir unsere erste
              Umweltstrategie eingeführt – mit dem Ziel, unsere positiven
              Auswirkungen zu erhöhen und negative Einflüsse auf die Umwelt zu
              minimieren.
            </div>

            <div>
              Unsere Umweltstrategie basiert auf drei Grundprinzipien, die wir
              hier kurz zusammenfassen. Detaillierte Informationen findest du im
              [Nachhaltigkeitsbericht 2023] und im [Nachhaltigkeitsbericht
              2024].
            </div>

            <div className="font-semibold text-custom-accent">
              Säule 1: Unseren Umwelteinfluss messen
            </div>

            <div>
              Die Messung unseres Umwelteinflusses – insbesondere unseres
              Corporate Carbon Footprints entlang der gesamten
              Wertschöpfungskette – bildet das Fundament unserer
              Umweltstrategie. Obwohl wir als Marktplatz laut Greenhouse Gas
              Protocol nicht verpflichtet sind, die verkauften Produkte in
              unsere CO₂- Bilanz aufzunehmen, tun wir es dennoch – für ein
              ganzheitliches Verständnis unseres Einflusses. Gleichzeitig messen
              wir unseren positiven Impact: also welche Einsparungen durch den
              Verkauf von refurbished Produkten über unseren Marktplatz erzielt
              werden. Die Details dazu findest du in Kapitel 7 unseres
              Nachhaltigkeitsberichts (berechnet nach dem ISO
              14040/44-verifizierten Modell).
            </div>

            <div className="font-semibold text-custom-accent">
              Säule 2: Negative Umweltauswirkungen reduzieren
            </div>

            <div>
              Sobald wir unsere Emissionen erfasst und Rückmeldungen von unseren
              Händlern erhalten haben, steht die Reduktion im Mittelpunkt. Das
              erreichen wir durch:
            </div>

            <div className="flex flex-col">
              <div className="flex items-start">
                <div className="text-custom-accent">• </div>
                <div>
                  die Verringerung von Produkte-Emissionen in Zusammenarbeit mit
                  unseren Händlern
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-custom-accent">• </div>
                <div>
                  die Reduktion der betrieblichen Emissionen von refurbed (z.B.
                  durch Energieverbrauch, eingekaufte Dienstleistungen,
                  Geschäftsreisen etc.)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-4/12">
        <div className="bg-white rounded-lg overflow-hidden mb-4">
          <img
            src="/blob_images/nature-photo.jpg"
            alt="Person taking a photo of nature with smartphone in mountain landscape"
            className="w-auto h-full"
          />
        </div>

        <div className="text-center">
          <div className="font-semibold text-custom-accent text-lg">
            Säule 3: Umweltprojekte unterstützen
          </div>
          <div className="text-custom-accent text-sm">
            Neben der Messung und Reduktion unserer Umweltauswirkungen
            finanzieren wir gezielt Umwelt- und Klimaschutzprojekte. Welche
            Projekte das konkret sind, findest du in Kapitel 9 unseres
            Nachhaltigkeitsberichts.
          </div>
        </div>
      </div>
    </div>
  );
};
