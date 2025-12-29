import { useState } from "react";

function Dashboard() {
  // Sample visitor approval data
  const [visitorCards] = useState([
    {
      id: 1,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Accepted",
    },
    {
      id: 2,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Accepted",
    },
    {
      id: 3,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Accepted",
    },
    {
      id: 5,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Accepted",
    },
    {
      id: 6,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Accepted",
    },
    {
      id: 7,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Rejected",
    },
    {
      id: 8,
      name: "Prudhvi raj",
      time: "12:23:11 PM",
      previousDate: "14-11-2025",
      previousEngineer: "Prudhvi",
      updatedDate: "15-11-2025",
      updatedEngineer: "Swasthik",
      status: "Accepted",
    },
  ]);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-600 ">Home</h1>
      </div>

      {/* Cards Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visitorCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900">{card.name}</h3>
                <span className="text-xs text-gray-500">{card.time}</span>
              </div>

              {/* Previous Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Previous:</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <p className="text-sm text-black font-bold">
                  Date: {card.previousDate}
                </p>
                <p className="text-sm text-black font-bold">
                  Engineer Name: {card.previousEngineer}
                </p>
              </div>

              {/* Updated Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Updated:</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-sm text-black font-bold">
                  Date: {card.updatedDate}
                </p>
                <p className="text-sm text-black font-bold">
                  Engineer Name: {card.updatedEngineer}
                </p>
              </div>

              {/* Status Button */}
              <div className="flex items-center gap-2">
                {card.status === "Accepted" ? (
                  <button className="px-4 py-1.5 bg-green-50 text-green-600 text-sm rounded border border-green-200">
                    Status: Accepted
                  </button>
                ) : (
                  <>
                    <button className="px-4 py-1.5 bg-red-50 text-red-600 text-sm rounded border border-red-200">
                      Status: Rejected
                    </button>
                    <button className="text-sm text-red-600 hover:underline">
                      Reason for Rejection?
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
