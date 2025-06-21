import { DownloadButton } from "./Common";

export const DasWesentlicheSection = () => (
  <div className="bg-sustainability-light py-20 px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-black text-sustainability-purple mb-8 leading-tight">
        Das Wesentliche
        <br />
        auf einen Blick
      </h2>

      <p className="text-sustainability-purple text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
        Klick dich durch ausgewählte Kapitel unseres Nachhaltigkeitsseite und
        erfahre, wie wir unsere Mission verwirklichen wollen. Noch mehr Infos
        findest du im Nachhaltigkeitsbericht 2024 und in unseren früheren
        Reports.
        <br />
        <br />
        Entdecke außerdem die Produktfußabdrücke (CO2-Emissionen,
        Elektroschrott, virtueller Wasserverbrauch) von tausenden Produkten in
        unserem Excel Sheet.
      </p>

      <div className="flex flex-col items-center gap-6">
        {/* Top button */}
        <DownloadButton>Download: Nachhaltigkeitsbericht 2024</DownloadButton>

        {/* Bottom buttons */}
        <div className="flex gap-6">
          <DownloadButton>Download: Nachhaltigkeitsbericht 2023</DownloadButton>
          <DownloadButton>Produktfußabdrücke entdecken</DownloadButton>
        </div>
      </div>
    </div>
  </div>
);
