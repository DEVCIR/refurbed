import { PageContainer } from "../../components/Sustainability/Common";
import { Header } from "../../components/Sustainability/Header";
import { ContentSection } from "../../components/Sustainability/ContentSection";
import { StatisticsSection } from "../../components/Sustainability/StatisticsSection";
import { VisionMissionSection } from "../../components/Sustainability/VisionMissionSection";
import { DasWesentlicheSection } from "../../components/Sustainability/DasWesentlicheSection";
import { NumberedTopicsSection } from "../../components/Sustainability/NumberedTopicsSection";
import { UnserWarumSection } from "../../components/Sustainability/UnserWarumSection";
import { LinearZirkularSection } from "../../components/Sustainability/LinearZirkularSection";
import { RefurbishmentProzessSection } from "../../components/Sustainability/RefurbishmentProzessSection";
import { PolitischesEngagementSection } from "../../components/Sustainability/PolitischesEngagementSection";
import { QualityPromise } from "../../components/Sustainability/QualityPromise";
import { EnvironmentalStrategy } from "../../components/Sustainability/EnvironmentalStrategy";
import { ISOSection } from "../../components/Sustainability/ISOSection";
import { EnvironmentalImpact } from "../../components/Sustainability/EnvironmentalImpact";
import { Stats } from "../../components/Sustainability/Stats";
import { ElectronicWaste } from "../../components/Sustainability/ElectronicWaste";
import { Partners } from "../../components/Sustainability/Partners";

const SustainabilityPage = () => {
  return (
    <PageContainer>
      <Header />
      <ContentSection />
      <StatisticsSection />
      <VisionMissionSection />
      <DasWesentlicheSection />
      <NumberedTopicsSection />
      <UnserWarumSection />
      <LinearZirkularSection />
      <RefurbishmentProzessSection />
      <PolitischesEngagementSection />
      <QualityPromise />
      <EnvironmentalStrategy />
      <ISOSection />
      <EnvironmentalImpact />
      <Stats />
      <ElectronicWaste />
      <Partners />
    </PageContainer>
  );
};

export default SustainabilityPage;
