import { useState } from "react";

function CabinetUpdates() {
  const [updates] = useState([
    {
      id: 1,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      prevDate: "14-11-2025",
      prevEng: "Prudhvi",
      upDate: "15-11-2025",
      upEng: "Swasthik",
      isToday: true,
      isSelected: true,
    },
    {
      id: 2,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      prevDate: "14-11-205",
      prevEng: "Prudhvi",
      upDate: "15-11-205",
      upEng: "Swasthik",
      isToday: true,
    },
    {
      id: 3,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      prevDate: "14-11-205",
      prevEng: "Prudhvi",
      upDate: "15-11-205",
      upEng: "Swasthik",
      isToday: true,
    },
    {
      id: 4,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      prevDate: "14-11-205",
      prevEng: "Prudhvi",
      upDate: "15-11-205",
      upEng: "Swasthik",
      isToday: true,
    },
  ]);

  const renderCardGrid = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
      {items.map((card) => (
        <div
          key={card.id}
          className={`bg-white rounded-lg p-5 border-[1.5px] ${
            card.isSelected ? "border-[#3B82F6]" : "border-gray-100 shadow-sm"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-[#333]">{card.name}</h3>
            <span className="text-[10px] text-gray-400 font-medium">
              {card.time}
            </span>
          </div>

          <div className="space-y-4">
            {/* Previous Section */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-400">Previous:</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-200">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                </span>
              </div>
              <p className="text-[14px] font-bold text-[#222]">
                Date: {card.prevDate}
              </p>
              <p className="text-[14px] font-bold text-[#222]">
                Engineer Name: {card.prevEng}
              </p>
            </div>

            {/* Updated Section */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-400">Updated:</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-200">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </span>
              </div>
              <p className="text-[14px] font-bold text-[#222]">
                Date: {card.upDate}
              </p>
              <p className="text-[14px] font-bold text-[#222]">
                Engineer Name: {card.upEng}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8">
      {/* Top Header */}
      <div className="flex justify-between items-center px-8 mb-4">
        <h1 className="text-2xl font-semibold text-[#444]">Home</h1>
        <div className="flex gap-3"></div>
      </div>

      {/* Date Divider (Today) */}
      <div className="relative mb-8 mt-12">
        <div className="relative flex justify-end px-8">
          <span className="bg-[#F9FAFB] pl-4 text-sm  text-gray-500">
            Today (15-11-2024)
          </span>
        </div>
      </div>
      {renderCardGrid(updates.filter((u) => u.isToday))}

      {/* Date Divider (Yesterday) */}
      <div className="relative mb-8 mt-16">
        <div
          className="absolute inset-0 flex items-center px-8"
          aria-hidden="true"
        >
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
      <span className="bg-[#F9FAFB] pl-6 pt-3 text-sm  text-gray-400 block text-right">
        Yesterday (14-11-2024)
      </span>
      {renderCardGrid(updates.filter((u) => !u.isToday))}
    </div>
  );
}

export default CabinetUpdates;
