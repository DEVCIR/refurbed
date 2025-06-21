import { SectionContainer, CenteredContent, Heading } from "./Common";

export const Header = () => (
  <SectionContainer>
    <CenteredContent>
      <div className="text-2xl font-bold">⟲refurbed</div>

      <Heading level={1}>Sustainability at refurbed</Heading>

      <p className="text-base leading-relaxed max-w-2xl mx-auto mb-16 opacity-90">
        Wir handeln mit der Absicht, einen positiven Beitrag zu leisten und
        Umweltauswirkungen von Konsum so weit wie möglich zu reduzieren. Gerne
        möchten wir euch auf dieser Seite mehr Einblicke geben – und auch die
        verschiedenen Säulen der Nachhaltigkeit, auf die wir bauen, vorstellen.
      </p>
    </CenteredContent>
  </SectionContainer>
);
