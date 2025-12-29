import { useState } from "react";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const handleOpenAddModal = () => {
    setFormData({ name: "" });
    setShowModal(true);
  };

  const handleSaveCompany = () => {
    if (!formData.name.trim()) return;

    setCompanies((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: formData.name.trim(),
      },
    ]);

    setShowModal(false);
    setFormData({ name: "" });
  };

  const handleDeleteCompany = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ FIXED HEADER */}

      {/* CONTENT */}
      <div className="p-6">
        {companies.length === 0 ? (
          /* ✅ PERFECT CENTER EMPTY STATE */
          <div className="flex items-center  justify-center h-[70vh] mt-36">
            <img
              src="/403.png"
              alt="No Companies"
              className="max-w-3xl w-full object-contain"
            />
          </div>
        ) : (
          /* ✅ COMPANY LIST */
          <div className="max-w-3xl mx-auto space-y-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <p className="text-sm text-gray-800">{company.name}</p>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ ADD MODAL */}
      {/* {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Add Company</h2>

            <input
              placeholder="Company Name"
              className="w-full border p-2 rounded mb-4"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCompany}
                className="flex-1 bg-red-800 text-white py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Companies;
