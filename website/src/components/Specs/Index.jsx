import React from "react";

export default function Specs() {
  const specsList = [
    { name: "Battery", value: "3227 mAh" },
    { name: "Brand", value: "Apple" },
    { name: "Camera", value: "12.0 MP" },
    { name: "Colour", value: "black" },
    { name: "Connectivity", value: "WiFi 802.11a/b/g/n/ac/ax, Bluetooth 5.0, NFC, UWB, 5G" },
    { name: "Connectors", value: "Lightning" },
    { name: "Dimensions", value: "71.5 x 146.7 x 7.7 mm" },
    { name: "Display", value: "OLED, HDR10" },
    { name: "Front Camera", value: "12.0 MP" },
    { name: "Graphics Card", value: "Apple A15 Bionic" },
    { name: "Miscellaneous", value: "Second camera 12.0 MP Ultra wide angle" },
    { name: "Model (Version)", value: "iPhone Standard" },
    { name: "Note", value: "Through the process of refurbishing the IPxx certification can no longer be guaranteed and, for example, water damage is therefore excluded from the warranty conditions." },
    { name: "Operating System", value: "iOS" },
    { name: "Processor", value: "Apple A15 Bionic" },
    { name: "RAM Size", value: "4.0 GB" },
    { name: "Resolution", value: "2532 x 1170" },
    { name: "SIM", value: "Dual-SIM (eSIM, Nano-SIM)" },
    { name: "Screen Size", value: "6.1 "},
    { name: "Select battery", value: "Optimal"},
    { name: "Storage", value: "128 GB"},
    { name: "Screen Size", value: "6.1 "},
  ];

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <tbody>
          {specsList.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border border-gray-200 font-medium text-gray-900 w-1/3">{spec.name}</td>
              <td className="py-2 px-4 border border-gray-200 text-gray-800 w-2/3">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}