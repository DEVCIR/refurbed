export const ElectronicWaste = () => {
  return (
    <div className="bg-sustainability-beige py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-black font-paytone text-custom-accent mb-4">
            09.
          </h2>
          <h3 className="text-3xl font-bold text-custom-accent mb-8">
            Förderung von Umweltschutzprojekten
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <p className="text-custom-accent text-lg leading-relaxed">
              Seit Februar 2024 fördern wir gezielt Umweltschutzprojekte, die
              einen messbaren positiven Einfluss auf die Umwelt haben. Wir
              arbeiten mit renommierten Partnern zusammen, die nachweislich
              wirkungsvolle Projekte umsetzen.
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-custom-accent">
                Unsere aktuellen Projekte:
              </h4>

              <div className="space-y-6">
                {/* Project 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h5 className="font-bold text-custom-accent mb-2">
                    Waldschutz in Brasilien
                  </h5>
                  <p className="text-sm text-custom-accent leading-relaxed">
                    Zusammen mit unserem Partner unterstützen wir ein Projekt,
                    das den Amazonas-Regenwald schützt und gleichzeitig die
                    lokale Bevölkerung stärkt. Das Projekt verhindert Entwaldung
                    und fördert nachhaltige Landwirtschaft.
                  </p>
                </div>

                {/* Project 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h5 className="font-bold text-custom-accent mb-2">
                    Erneuerbare Energien in Indien
                  </h5>
                  <p className="text-sm text-custom-accent leading-relaxed">
                    Wir fördern den Ausbau erneuerbarer Energien in ländlichen
                    Gebieten Indiens. Das Projekt bringt saubere Energie zu
                    Gemeinden, die bisher auf fossile Brennstoffe angewiesen
                    waren.
                  </p>
                </div>

                {/* Project 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h5 className="font-bold text-custom-accent mb-2">
                    Meeresschutz in Indonesien
                  </h5>
                  <p className="text-sm text-custom-accent leading-relaxed">
                    Unser Partner arbeitet mit lokalen Fischern zusammen, um
                    nachhaltige Fischereimethoden zu entwickeln und die
                    Meeresökosysteme zu schützen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-custom-accent mb-4">
                Warum diese Projekte?
              </h4>
              <div className="space-y-4 text-sm text-custom-accent leading-relaxed">
                <p>
                  Wir haben uns bewusst für Projekte entschieden, die nicht nur
                  CO₂ kompensieren, sondern auch positive soziale und
                  ökologische Nebeneffekte haben. Unsere Partner sind
                  zertifiziert und werden regelmäßig überprüft.
                </p>
                <p>
                  Die Projekte sind so ausgewählt, dass sie einen direkten Bezug
                  zu den Umweltauswirkungen haben, die wir durch unser
                  Geschäftsmodell reduzieren.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-custom-accent mb-4">
                Transparenz
              </h4>
              <p className="text-sm text-custom-accent leading-relaxed">
                Wir legen großen Wert auf Transparenz. Deshalb findest du in
                unserem Nachhaltigkeitsbericht detaillierte Informationen zu
                allen geförderten Projekten, einschließlich der verwendeten
                Methoden und der erzielten Ergebnisse.
              </p>
            </div>

            <div className="text-center">
              <button className="bg-custom-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-sustainability-dark transition-colors">
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
