import { CenteredContent } from "./Common";

export const UnserWarumSection = () => (
  <div className="bg-custom-accent py-20 px-8">
    <CenteredContent width="" text="text-start">
      <div className="w-full flex flex-col">
        <div className="flex justify-center gap-x-20 items-start">
          {/* Left side - Image */}
          <section className="w-3/12 h-full">
            <img
              src="/blob_images/woman-with-phone.jpg"
              alt="Woman using smartphone outdoors on grass"
              className="w-full h-auto rounded-lg"
            />
          </section>

          {/* Right side - Content */}
          <section className="w-5/12 ">
            <h2 className="text-7xl font-black font-paytone">01.</h2>
            <h3 className="text-2xl font-bold mb-4">Unser Warum</h3>

            <div className="space-y-6 text-sm leading-relaxed tracking-normal [word-spacing:-1px]">
              <p>
                Unsere Reise begann 2017 mit unserer Vision, Konsum nachhaltig
                zu gestalten. Indem wir die Lebensdauer von Laptops,
                Smartphones, Tablets und weiteren Produkten verlängern,
                vermeiden wir die unnötige Nachfrage nach neuen Produkten, die
                der Umwelt schaden. Mit unserer Plattform für nachhaltigere
                Alternativen schaffen wir eine Lösung für eine funktionierende
                Kreislaufwirtschaft – und reduzieren so den negativen Einfluss,
                den wir als Gesellschaft auf unseren Planeten haben.
              </p>
              <p>
                Für uns ist es wichtig, unseren ökologischen Fußabdruck messbar
                und transparent zu machen. Deshalb haben wir unsere Auswirkungen
                analysiert – und können mit Stolz sagen: Refurbished Produkte
                haben ein enormes Einsparpotenzial im Vergleich zu neuen
                Geräten. Im Schnitt vermeiden refurbed Smartphones, Tablets und
                Laptops{" "}
                <strong>
                  89% CO₂, 87-92% Wasserverbrauch und 78-96% Elektroschrott
                </strong>
                . (Detaillierte Infos zu unserem nach ISO 14040/44 geprüften
                Berechnungsmodell findest du in Kapitel 7.)
              </p>
              <p>
                Doch unser Engagement endet nicht bei unserem Kerngeschäft: Die
                Messung ist nur der erste Schritt – echte Veränderung zählt.
                Deshalb reduzieren wir unseren eigenen Fußabdruck, unterstützen
                wirkungsvolle Umweltprojekte und setzen uns politisch für
                nachhaltigere Rahmenbedingungen ein.
              </p>
              <p>
                Wir glauben an eine Bewegung, die wirklich etwas verändert – und
                die ohne dich nicht möglich wäre. Danke an unsere Kund:innen,
                Partner:innen, Refurbisher, Freund:innen und unsere Community.
              </p>
            </div>
          </section>
        </div>
      </div>
    </CenteredContent>
  </div>
);
