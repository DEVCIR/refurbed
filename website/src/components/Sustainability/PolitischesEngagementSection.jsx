export const PolitischesEngagementSection = () => (
  <div className="bg-sustainability-light flex flex-wrap gap-x-16 justify-center py-16">
    {/* Left side - Content */}
    <div className="w-5/12">
      <h2 className="text-7xl font-black text-custom-accent font-paytone mb-4">
        04.
      </h2>
      <h3 className="text-3xl font-bold text-custom-accent mb-8">
        Unser politisches Engagement
      </h3>
      <p className="text-custom-accent text-lg leading-relaxed mb-6">
        Unser politisches Engagement beruht auf drei Säulen:
      </p>
      <div className="space-y-6 text-custom-accent text-sm leading-relaxed">
        <p>
          Die erste Säule sind unsere Public-Affairs-Aktivitäten, mit denen wir
          uns auf österreichischer, deutscher und EU-Ebene aktiv für unsere
          Positionen zur Kreislaufwirtschaft und zu refurbished Produkten
          einsetzen. Das tun wir zum Beispiel durch Stellungnahmen in
          Gesetzgebungsverfahren, durch unsere Mitarbeit in Arbeitsgruppen wie
          der Circular Economy Task Force oder im persönlichen Austausch mit
          Entscheidungsträger*innen – etwa beim Besuch der ehemaligen
          österreichischen Umweltministerin Leonore Gewessler (2020–2025) in
          unserem Büro.
        </p>

        <p>
          Die zweite Säule ist die Zusammenarbeit mit Gleichgesinnten. Wir sind
          Mitglied in mehreren Verbänden in Österreich, Deutschland, Irland,
          Schweden und Belgien, die sich für die Interessen der
          Kreislaufwirtschaft einsetzen – zum Beispiel EUREFAS (European
          Refurbishment Association), die Right to Repair Campaign, das Circular
          Economy Forum Austria oder der Bundesverband Nachhaltige Wirtschaft in
          Deutschland. Dort bringen wir unser Know-how und unsere Standpunkte
          ein und profitieren gleichzeitig vom stärkeren politischen Gewicht der
          Verbände.
        </p>

        <p>
          Die dritte Säule richtet sich direkt an unsere Community:
          Nachhaltigkeit ist vielen unserer Kund*innen genauso wichtig wie uns.
          Deshalb diskutieren wir politische Themen auch über unsere
          Social-Media-Kanäle, unseren Blog und den Nachhaltigkeitsbericht.
          Gemeinsam können wir Veränderung bewirken – mach mit!
        </p>
      </div>
    </div>
    {/* Right side - Image */}
    <div className="w-3/12">
      <img
        src="/blob_images/three-people-walking.jpg"
        alt="Three people walking in modern office building"
        className="w-full h-auto rounded-lg"
      />
    </div>
  </div>
);
