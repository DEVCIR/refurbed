import React from "react";
import { PenTool, Database, Maximize2, Smartphone, CreditCard, BatteryMedium } from "lucide-react";

function FeatureItem({ icon, title, value }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="bg-[#f3ffef] rounded-full p-4 flex items-center justify-center mb-3">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-black">{title}</h4>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function ProductFeatures() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <FeatureItem 
          icon={<PenTool color="#573ac8" size={62} />}
          title="Colour"
          value="black"
        />
        
        <FeatureItem 
          icon={<Database color="#573ac8" size={62} />}
          title="Storage"
          value="128 GB"
        />
        
        <FeatureItem 
          icon={<Maximize2 color="#573ac8" size={62} />}
          title="Screen Size"
          value={<>6.1 "<br />2532 x 1170</>}
        />
        
        <FeatureItem 
          icon={<Smartphone color="#573ac8" size={62} />}
          title="Camera"
          value={<>12.0 MP<br />12.0 MP</>}
        />
        
        <FeatureItem 
          icon={<CreditCard color="#573ac8" size={62} />}
          title="SIM"
          value={<>Dual-SIM (eSIM,<br />Nano-SIM)</>}
        />
        
        <FeatureItem 
          icon={<BatteryMedium color="#573ac8" size={62} />}
          title="Battery"
          value="3227 mAh"
        />
      </div>
    </div>
  );
}

