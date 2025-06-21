import { Trash2, Droplets, Package, Users, TreePine } from "./Common";

export const Stats = () => {
  return (
    <section className="font-poppins bg-sustainability-highlight">
      <div className="w-8/12  py-16 mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-8xl font-bold mb-4 font-paytone text-center text-custom-accent">
            08.
          </h2>
          <h3 className="text-2xl font-semibold mb-8 text-center text-custom-accent">
            Unsere Einsparungen erklärt
          </h3>
          <div className="space-y-4 text-sm leading-relaxed max-w-4xl mx-auto text-custom-accent">
            <p>
              Seit unserer Gründung haben wir durch den Verkauf von refurbished
              Produkten einen großen Beitrag geleistet. Mithilfe unseres
              Berechnungsmodells können wir diesen Beitrag erstmals genau
              beziffern – und möchten dir zeigen, was das konkret bedeutet.
            </p>
            <p className="text-xs">
              Bitte beachte: Die Einsparungen beziehen sich auf den Vergleich
              mit einem Neukauf und basieren auf den Umweltkaten unseres nach
              ISO 14040/44 verifizierten Berechnungsmodells. Die Einsparungen
              bei kritischen und Konfliktmaterialien beziehen sich
              ausschließlich auf verkaufte generalüberholte Smartphones. Beim
              Wasserverbrauch handelt es sich um den virtuellen Wasserverbrauch
              – eine Methode, die den regionalen Wasserbedarf entlang der
              Lieferkette berücksichtigt.
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-12">
          {/* CO2 Savings */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center border-custom-accent">
                <span className="text-lg font-bold text-custom-accent">
                  CO₂
                </span>
              </div>
            </div>
            <div className="text-5xl font-paytone  font-bold mb-2 text-custom-accent">
              350,000 t
            </div>
            <div className="text-sm font-semibold mb-4 text-custom-accent">
              CO₂ eingespart
            </div>
            <p className="text-sm leading-relaxed text-custom-accent">
              Im Vergleich zu Neugeräten spart Refurbishment einen Großteil an
              CO2 Emissionen ein.
            </p>
          </div>

          {/* Electronic Waste */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Trash2 className="w-16 h-16 p-3 rounded-full border-2 text-custom-accent border-custom-accent" />
            </div>
            <div className="text-5xl font-bold mb-2 font-paytone text-custom-accent">
              1,136 t
            </div>
            <div className="text-sm font-semibold mb-4 text-custom-accent">
              ELEKTROSCHROTT eingespart
            </div>
            <p className="text-sm leading-relaxed text-custom-accent">
              Durch die Verlängerung des Lebenszyklus elektronischer Produkte
              vermeiden wir Elektroschrott.
            </p>
          </div>

          {/* Water Savings */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Droplets className="w-16 h-16 p-3 rounded-full border-2 text-custom-accent border-custom-accent" />
            </div>
            <div className="text-5xl font-bold  font-paytone mb-2 text-custom-accent">
              116 Bil l
            </div>
            <div className="text-sm font-semibold mb-4 text-custom-accent">
              WASSER eingespart
            </div>
            <p className="text-sm leading-relaxed text-custom-accent">
              Die Gewinnung und Verarbeitung von Bodenschätzen für die
              Produktion von Elektrogeräten benötigt und verschmutzt große
              Mengen an Wasser. Durch das Refurbishment wird der Wasserverbrauch
              drastisch reduziert.
            </p>
          </div>

          {/* Critical Materials */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Package className="w-16 h-16 p-3 rounded-full border-2 text-custom-accent border-custom-accent" />
            </div>
            <div className="text-5xl font-bold  font-paytone mb-2 text-custom-accent">
              130 t
            </div>
            <div className="text-sm font-semibold mb-4 text-custom-accent">
              KRITISCHE ROHSTOFFE
              <br />
              eingespart
            </div>
            <p className="text-sm leading-relaxed text-custom-accent">
              Ein Smartphone enthält bis zu 70 verschiedene Elemente – viele
              davon zählen zu den kritischen Rohstoffen. Für ein refurbished
              Gerät müssen deutlich weniger dieser kritischen Rohstoffe neu
              gewonnen werden als für ein Neugerät.
            </p>
          </div>

          {/* Conflict Materials */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Users className="w-16 h-16 p-3 rounded-full border-2 text-custom-accent border-custom-accent" />
            </div>
            <div className="text-5xl font-bold  font-paytone mb-2 text-custom-accent">
              4 t
            </div>
            <div className="text-sm font-semibold mb-4 text-custom-accent">
              KONFLIKTMATERIALIEN eingespart
            </div>
            <p className="text-sm leading-relaxed text-custom-accent">
              Die Herstellung von Smartphones ist auf Konfliktmaterialien
              angewiesen, die aus der Erde gewonnen werden müssen. Ein
              refurbished Smartphone benötigt im Vergleich zu einem Neugerät nur
              eine minimale Menge dieser Materialien.
            </p>
          </div>

          {/* Trees Planted */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <TreePine className="w-16 h-16 p-3 rounded-full border-2 text-custom-accent border-custom-accent" />
            </div>
            <div className="text-5xl font-bold mb-2  font-paytone text-custom-accent">
              {"> 6.6 Mil"}
            </div>
            <div className="text-sm font-semibold mb-4 text-custom-accent">
              BÄUME gepflanzt
            </div>
            <p className="text-sm leading-relaxed text-custom-accent">
              Zwischen 2018 und 2024 haben wir über 6,6 Mio. Bäume gepflanzt,
              worauf wir sehr stolz sind. Seit Feb 2024 fördern wir
              unterschiedliche hochwirksame Umweltschutzprojekte (siehe Kapitel
              9).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
