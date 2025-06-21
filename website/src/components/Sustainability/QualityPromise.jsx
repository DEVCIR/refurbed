export const QualityPromise = () => {
  return (
    <div className="flex gap-x-16 justify-center py-16">
      {/* Image Section */}
      <div className="w-3/12">
        <div className="rounded-lg overflow-hidden">
          <img
            src="/blob_images/laptop-repair.jpg"
            alt="Laptop repair showing hands working on internal components"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-5/12">
        <div className="text-8xl font-bold font-paytone">05.</div>

        <div className="text-2xl font-semibold">Unser Qualitätsversprechen</div>

        <div className="text-sm leading-relaxed">
          <div className="flex flex-col">
            <div>
              Die Qualität unserer Produkte hat für uns oberste Priorität. Um
              das Risiko für unsere Kund*innen so gering wie möglich zu halten,
              bieten wir auf jedes Produkt eine kostenlose 30-tägige Testphase
              sowie 12 Monate Garantie.
            </div>

            <div>
              Unser Qualitätsmanagement basiert auf einem mehrstufigen Ansatz.
              Nur Händler mit nachweislich hoher Produktqualität dürfen auf
              unserer Plattform verkaufen. Alle refurbed Produkte müssen moderne
              Softwaretests durchlaufen, und ein Refurbishment-Report
              dokumentiert den gesamten Prozess sowie den exakten Zustand des
              Produkts.
            </div>

            <div>
              Zusätzlich sorgen stichprobenartige Qualitätsprüfungen, ein
              automatisiertes Alarmsystem sowie eine detaillierte Bewertung der
              Händlerleistung dafür, dass die Produktqualität den refurbed
              Standards entspricht. Mithilfe von Mystery Shopping entdecken wir
              potenzielle Schwachstellen und sichern die Einhaltung unserer
              Qualitätsansprüche.
            </div>

            <div>
              So stellen wir sicher: Nur die besten Händler können ihre Produkte
              bei refurbed anbieten.
            </div>

            <div>
              Gleichzeitig verpflichten wir uns dazu, nachhaltige und
              erschwingliche Produkte anzubieten – ohne Kompromisse bei
              ökologischen oder sozialen Standards. Unsere Partner müssen sich
              an klare Richtlinien halten, etwa zum Schutz der Umwelt, zur
              Vermeidung negativer Umweltauswirkungen sowie zu Arbeits- und
              Menschenrechten.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
