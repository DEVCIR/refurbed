import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, Shield } from "lucide-react";

export default function SustainabilityPage() {
  const processSteps = [
    "Sammlung",
    "Prüfung",
    "Aufbereitung",
    "Qualitätskontrolle",
    "Zertifizierung",
    "Verkauf",
    "Lieferung",
    "Support",
    "Recycling",
    "Nachhaltigkeit",
  ];

  const partners = [
    { name: "B Corp", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Climate Neutral", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Trusted Shops", logo: "/placeholder.svg?height=60&width=120" },
    { name: "ISO 14001", logo: "/placeholder.svg?height=60&width=120" },
    { name: "WEEE", logo: "/placeholder.svg?height=60&width=120" },
    { name: "FSC", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Carbon Trust", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Green Business", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Eco Cert", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Sustainability", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Climate Action", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Green Tech", logo: "/placeholder.svg?height=60&width=120" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Nachhaltigkeit bei
                <br />
                refurbed
              </h1>
              <p className="text-xl mb-8 text-teal-100">
                Wir machen Technologie nachhaltiger und zugänglicher für alle
              </p>
              <Button className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold">
                Mehr erfahren
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Sustainable technology"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 text-center">
            <p className="text-teal-100 mb-8 text-lg">
              Seit unserer Gründung haben wir bereits erreicht:
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold mb-2">350,000+</div>
                <div className="text-teal-100">Geräte aufbereitet</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1.15t</div>
                <div className="text-teal-100">CO₂ eingespart</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">115 Bill</div>
                <div className="text-teal-100">Liter Wasser gespart</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-teal-600">
                Unsere Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Wir glauben, dass Technologie nicht nur funktional, sondern auch
                nachhaltig sein sollte. Durch die Aufbereitung gebrauchter
                Geräte reduzieren wir Elektroschrott und schaffen gleichzeitig
                Zugang zu hochwertiger Technologie für alle.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-teal-600">
                Unsere Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Eine Welt, in der jeder Zugang zu nachhaltiger Technologie hat
                und gleichzeitig unseren Planeten schützt. Wir arbeiten daran,
                die Kreislaufwirtschaft im Technologiebereich zu
                revolutionieren.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Das Wesentliche auf einen Blick
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Unser 10-Schritte-Prozess für nachhaltige Technologie
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-medium text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process Sections */}
      {/* Section 01 */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl font-bold text-teal-300 mb-4">01.</div>
              <h3 className="text-3xl font-bold mb-6">
                Sammlung und Beschaffung
              </h3>
              <p className="text-teal-100 mb-6 leading-relaxed">
                Wir sammeln gebrauchte Geräte von Unternehmen, Privatpersonen
                und Partnern. Dabei achten wir darauf, dass die Geräte noch
                funktionsfähig sind und sich für eine Aufbereitung eignen.
              </p>
              <ul className="space-y-2 text-teal-100">
                <li>• Professionelle Abholung</li>
                <li>• Sichere Datenvernichtung</li>
                <li>• Qualitätsprüfung vor Ort</li>
              </ul>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Collection process"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Testing process"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="text-6xl font-bold text-teal-600 mb-4">02.</div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Umfassende Prüfung
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Jedes Gerät durchläuft eine gründliche technische Prüfung. Wir
                testen alle Funktionen, überprüfen die Hardware und
                dokumentieren den Zustand detailliert.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span>Hardware-Test</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span>Software-Prüfung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span>Funktionstest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span>Zustandsbewertung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl font-bold text-teal-300 mb-4">03.</div>
              <h3 className="text-3xl font-bold mb-6">
                Professionelle Aufbereitung
              </h3>
              <p className="text-teal-100 mb-6 leading-relaxed">
                Unsere Experten bereiten jedes Gerät sorgfältig auf. Defekte
                Komponenten werden ersetzt, die Software wird neu installiert
                und das Gerät wird gründlich gereinigt.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-teal-300 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Komponenten-Austausch
                    </h4>
                    <p className="text-teal-200 text-sm">
                      Defekte Teile werden durch Originalkomponenten ersetzt
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Recycle className="w-6 h-6 text-teal-300 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Software-Neuinstallation
                    </h4>
                    <p className="text-teal-200 text-sm">
                      Frische Installation des Betriebssystems
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Refurbishment process"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Continue with more sections... */}
      {/* Section 04 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Quality control"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="text-6xl font-bold text-teal-600 mb-4">04.</div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Qualitätskontrolle
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bevor ein Gerät unsere Werkstatt verlässt, durchläuft es eine
                finale Qualitätskontrolle. Nur Geräte, die unsere hohen
                Standards erfüllen, werden zum Verkauf freigegeben.
              </p>
              <Button className="bg-teal-600 text-white hover:bg-teal-700">
                Qualitätsstandards ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Unser Umwelt-Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">350,000+</div>
              <div className="text-teal-100 text-sm">Geräte aufbereitet</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1.15t</div>
              <div className="text-teal-100 text-sm">CO₂ eingespart</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">115 Bill</div>
              <div className="text-teal-100 text-sm">Liter Wasser gespart</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">130€</div>
              <div className="text-teal-100 text-sm">Durchschn. Ersparnis</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.1</div>
              <div className="text-teal-100 text-sm">Kundenbewertung</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2"> {">"}6.6 Mil</div>
              <div className="text-teal-100 text-sm">Zufriedene Kunden</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl font-bold text-teal-600 mb-4">09.</div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Nachhaltiger Kreislauf
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Am Ende der Lebensdauer nehmen wir Geräte zurück und führen sie
                dem Recycling zu. So schließt sich der nachhaltige Kreislauf und
                wir minimieren Elektroschrott.
              </p>
              <Button className="bg-teal-600 text-white hover:bg-teal-700">
                Mehr über Recycling
              </Button>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Recycling process"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unsere Partner & Zertifizierungen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-teal-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Bereit für nachhaltige Technologie?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Entdecken Sie unsere aufbereiteten Geräte und leisten Sie einen
            Beitrag zum Umweltschutz
          </p>
          <Button className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold">
            Jetzt entdecken
          </Button>
        </div>
      </section>
    </div>
  );
}
