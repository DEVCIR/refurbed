import { CenteredContent } from "./Common";

export const ISOSection = () => {
  return (
    <section className="py-16">
      <div className="flex gap-x-16 items-center justify-center">
        {/* Image Section */}
        <div className="w-3/12">
          <img
            src="/blob_images/laptop-typing.jpg"
            alt="Person working on laptop"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Content Section */}
        <div className="w-5/12">
          <div className="text-7xl font-bold font-paytone mb-2">07.</div>
          <h2 className="text-2xl font-bold leading-tight mb-4">
            Unser nach ISO 14040/44 verifiziertes Rechenmodell
          </h2>
          <div className="font-poppins tracking-[-0.75px]  space-y-4">
            <p>
              In unserem Streben nach Innovation arbeiten wir seit mehreren
              Jahren mit Fraunhofer Austria zusammen, um etwas Revolutionäres zu
              schaffen. Unser Ziel: ein verifiziertes Rechenmodell zu
              entwickeln, mit dem wir die Umweltwirkung von tausenden
              Smartphones, Tablets und Laptops messen können.
            </p>
            <p>
              Und so funktioniert es: Wir füttern das Modell mit technischen
              Daten – zum Beispiel denen eines iPhone 12: Informationen zu
              Speicherplatz, Batteriekapazität, Produktionsjahr, Bildschirmgröße
              usw. Die Berechnungsgrundlage bildet eine partielle
              Lebenszyklusanalyse von fünf unserer Bestseller, erweitert durch
              umfassendes Wissen und zahlreiche Datensätze. Unser Modell deckt
              über 12.000 Produkte auf unserem Marktplatz ab und wurde von der
              unabhängigen Prüfstelle GutCert gemäß ISO 14040/44 verifiziert.
              Das Ergebnis:
            </p>

            <div className="space-y-4 ml-4">
              <div>
                Einsparungen an CO<sub>2</sub>, Elektroschrott und virtuellem
                Wasserverbrauch[1] eines refurbed Produkts im Vergleich zu einem
                Neugerät[2]
              </div>

              <div>
                Einsparungen an Materialressourcen, kritischen Rohstoffen und
                Konfliktmaterialien[3] bei einem refurbished Smartphone im
                Vergleich zu einem Neugerät[2]
              </div>

              <div>
                CO<sub>2</sub>-Emissionen, Elektroschrott und virtueller
                Wasserverbrauch[1], die im Zuge des zweiten Lebenszyklus eines
                Produkts entstehen[2]
              </div>

              <div>
                Eine detaillierte Aufschlüsselung der CO<sub>2</sub>
                -Emissionen entlang des zweiten Lebenszyklus – von Transport
                beim Ankauf über Refurbishment, Marktplatz, Distribution durch
                refurbed bis hin zur Nutzungsphase[2]
              </div>
            </div>

            <p>
              Neugierig, welches Einsparungspotenzial in deinem Gerät steckt?
              Lade dir unsere Excel-Tabelle herunter und entdecke den
              Produkt-Fußabdruck deines Smartphones, Tablets oder Laptops.
              Zusätzlich bestätigt unser GutCert-Zertifikat die Richtigkeit
              unseres Rechenmodells und seine Übereinstimmung mit ISO 14040/44.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-sustainability-green hover:bg-sustainability-green-hover text-black font-semibold px-8 py-3 rounded-full transition-all">
              Fußabdrücke entdecken
            </button>

            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold px-8 py-3 rounded-full bg-transparent transition-colors">
              Verifizierung GutCert
            </button>
          </div>
        </div>
      </div>
      {/* Additional Information Section */}
      <CenteredContent text="text-start" className="py-16">
        <div className="text-xs lg:text-sm leading-relaxed space-y-4 opacity-90">
          <p>
            Eine Zusammenfassung zur Entwicklung unseres Rechenmodells findest
            du in unserem Nachhaltigkeitsbericht 2023 und 2024. Wenn du tiefer
            in die technischen Details der Lebenszyklusanalyse und des Modells
            eintauchen möchtest, kannst du zwei gemeinsam mit Fraunhofer Austria
            veröffentlichte Berichte herunterladen:
          </p>

          <div className="ml-4 space-y-1">
            <p>
              • Entwicklung der Methodik für ökologische Kennzahlen von
              refurbished Geräten
            </p>
            <p>• Ökobilanz von refurbished Geräten nach ISO 14040/44</p>
          </div>

          <p>
            Unter findest du die durchschnittlichen Einsparungen für
            Smartphones, Tablets und Laptops (die ohne neuen Akku), gewichtet
            nach den über unsere Plattform im Jahr 2024 verkauften Stückzahlen
            [4].
          </p>
        </div>
      </CenteredContent>
    </section>
  );
};
