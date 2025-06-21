export const EnvironmentalImpact = () => {
  return (
    <section className="py-8 px-6" style={{ backgroundColor: "#036659" }}>
      <div className="w-8/12 mx-auto">
        <div className="flex items-start gap-8">
          {/* Data Table */}
          <div className="flex-1">
            <table
              className="w-full border-collapse"
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <thead>
                <tr>
                  <th
                    className="p-3 text-left text-sm font-medium text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    Umweltauswirkungen
                  </th>
                  <th
                    className="p-3 text-center text-sm font-medium text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Refurbished
                    <br />
                    Smartphones
                  </th>
                  <th
                    className="p-3 text-center text-sm font-medium text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Refurbished Tablets
                  </th>
                  <th
                    className="p-3 text-center text-sm font-medium text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Refurbished Laptops
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="p-3 text-sm font-medium text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    ⌀ CO₂ Emissionen in kg
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 13.0</div>
                    <div className="font-bold">Eingespart vs neu: 83%</div>
                    <div className="text-xs">(=64.0)</div>
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 19.6</div>
                    <div className="font-bold">Eingespart vs neu: 83%</div>
                    <div className="text-xs">(=94.0)</div>
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 61.1</div>
                    <div className="font-bold">Eingespart vs neu: 83%</div>
                    <div className="text-xs">(=337.2)</div>
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 text-sm font-medium text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    ⌀ Virtueller
                    <br />
                    Wasserverbrauch in l
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 3,619</div>
                    <div className="font-bold">Eingespart vs neu: 87%</div>
                    <div className="text-xs">(=23,873)</div>
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 3,807</div>
                    <div className="font-bold">Eingespart vs neu: 92%</div>
                    <div className="text-xs">(=40,405)</div>
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 13,806</div>
                    <div className="font-bold">Eingespart vs neu: 85%</div>
                    <div className="text-xs">(=85,766)</div>
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 text-sm font-medium text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    ⌀ Elektroschrott in g
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 46</div>
                    <div className="font-bold">Eingespart vs neu: 76%</div>
                    <div className="text-xs">(=150.0)</div>
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 21.2</div>
                    <div className="font-bold">Eingespart vs neu: 96%</div>
                    <div className="text-xs">(=493.1 g)</div>
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 189.2</div>
                    <div className="font-bold">Eingespart vs neu: 89%</div>
                    <div className="text-xs">(=1,595.1 g)</div>
                  </td>
                </tr>
                <tr>
                  <td
                    className="p-3 text-sm font-medium text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    ⌀ Rohstoffe in g Sb-Eq
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 0.2</div>
                    <div>Eingespart vs neu:</div>
                    <div className="font-bold">86% (=1.3)</div>
                  </td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  ></td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  ></td>
                </tr>
                <tr>
                  <td
                    className="p-3 text-sm font-medium text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    ⌀ Kritische Rohstoffe in g
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 17.5</div>
                    <div>Eingespart vs neu:</div>
                    <div className="font-bold">69% (=39.8)</div>
                  </td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  ></td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  ></td>
                </tr>
                <tr>
                  <td
                    className="p-3 text-sm font-medium text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    ⌀ Konfliktmaterialien in g
                  </td>
                  <td
                    className="p-3 text-center text-sm text-white"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    <div>Verursacht: 0.042</div>
                    <div className="font-bold">Eingespart vs neu: 97%</div>
                    <div className="text-xs">(=1.228)</div>
                  </td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  ></td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Phone Image */}
          <div className="flex-shrink-0">
            <img
              src="/blob_images/samsung-phone.png"
              alt="Samsung Galaxy smartphone"
              width={280}
              height={560}
              className="w-auto h-auto"
            />
          </div>
        </div>

        {/* Footnotes */}
        <div className="mt-8 space-y-2 text-xs leading-tight text-white">
          <p>
            [1] Der virtuelle Wasserverbrauch ist eine Berechnungsmethode, die
            den Wasserverbrauch entlang der Lieferkette berücksichtigt und
            diesen nach regionaler Verfügbarkeit gewichtet. Es handelt sich um
            einen virtuellen Wert, der die lokalen Bedingungen am Ort des
            Wasserverbrauchs einbezieht.
          </p>
          <p>
            [2] Der Vergleich mit dem jeweiligen Neugerät basiert – sofern
            verfügbar – auf den Herstellerangaben. Falls keine Vergleichsdaten
            verfügbar waren, erfolgte die Berechnung auf Basis eines
            Referenzprodukts.
          </p>
          <p>
            [3] Materialressourcen sind eine vordefinierte Kategorie in der
            Lebenszyklusanalyse von Produkten und umfassen verschiedene
            Materialien wie Metalle und Mineralien, fossile Brennstoffe und
            biologische Rohstoffe. Kritische Rohstoffe beziehen sich auf eine
            Liste von aktuell 34 Rohstoffen, die sowohl von großer
            wirtschaftlicher Bedeutung als auch von Versorgungsrisiken betroffen
            sind. Konfliktmaterialien sind vier Mineralien – Zinn, Tantal,
            Wolfram und Gold (3TG) – die traditionell in der
            Smartphone-Herstellung verwendet werden und/oder Finanzierung
            bewaffneter Konflikte beitragen und unter Zwangsarbeit abgebaut
            werden können.
          </p>
          <p>
            [4] Das Berechnungsmodell wird jährlich leicht angepasst – etwa
            durch Veränderungen im Produktsortiment (z. B. neu angebotene
            Produkte) oder aktualisierte Emissionsfaktoren. Dadurch können sich
            die Umweltkaten und die Abdeckung der Produkte von Jahr zu Jahr
            geringfügig ändern.
          </p>
        </div>
      </div>
    </section>
  );
};
