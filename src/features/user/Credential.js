import { useState, useRef, useEffect } from "react";
import {
  Database,
  Plus,
  Trash2,
  Download,
  Upload,
  Search,
  Copy,
  Clipboard,
  Save,
} from "lucide-react";

function Companies() {
  const [data, setData] = useState([
    {
      id: 1,
      poe: "DC-RACK-001",
      status: "Active",
      ibx: "NY1",
      uniqueSpaceId: "USP-001",
      systemName: "Production Server",
      cabinetUniqueSpaceId: "CAB-USP-001",
      cabinetNum: "A-101",
      accountNum: "ACC-12345",
      customerName: "Acme Corporation",
    },
    {
      id: 2,
      poe: "DC-RACK-002",
      status: "Inactive",
      ibx: "LA1",
      uniqueSpaceId: "USP-002",
      systemName: "Backup Server",
      cabinetUniqueSpaceId: "CAB-USP-002",
      cabinetNum: "B-205",
      accountNum: "ACC-67890",
      customerName: "Global Tech Solutions",
    },
    {
      id: 3,
      poe: "DC-RACK-003",
      status: "Active",
      ibx: "NY1",
      uniqueSpaceId: "USP-003",
      systemName: "Database Cluster",
      cabinetUniqueSpaceId: "CAB-USP-003",
      cabinetNum: "A-102",
      accountNum: "ACC-11223",
      customerName: "Innovate Labs",
    },
  ]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [copiedCell, setCopiedCell] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRefs = useRef({});

  const columns = [
    { key: "poe", label: "Product Element (POE)" },
    { key: "status", label: "Status" },
    { key: "ibx", label: "IBX" },
    { key: "uniqueSpaceId", label: "Unique Space ID" },
    { key: "systemName", label: "System Name" },
    { key: "cabinetUniqueSpaceId", label: "Cabinet Unique Space Id" },
    { key: "cabinetNum", label: "Cabinet #" },
    { key: "accountNum", label: "Account #" },
    { key: "customerName", label: "Customer Name" },
  ];

  const handleCellChange = (id, field, value) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      poe: "",
      status: "",
      ibx: "",
      uniqueSpaceId: "",
      systemName: "",
      cabinetUniqueSpaceId: "",
      cabinetNum: "",
      accountNum: "",
      customerName: "",
    };
    setData((prev) => [...prev, newRow]);
    setTimeout(() => {
      setSelectedCell({ id: newRow.id, field: "poe" });
      setEditingCell({ id: newRow.id, field: "poe" });
    }, 0);
  };

  const handleDeleteRow = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    if (selectedCell?.id === id) setSelectedCell(null);
    if (editingCell?.id === id) setEditingCell(null);
  };

  const handleCellClick = (id, field) => {
    setSelectedCell({ id, field });
  };

  const handleCellDoubleClick = (id, field) => {
    setEditingCell({ id, field });
    setTimeout(() => {
      const input = inputRefs.current[`${id}-${field}`];
      if (input) input.focus();
    }, 0);
  };

  const handleKeyDown = (e, id, field) => {
    const rowIndex = data.findIndex((item) => item.id === id);
    const colIndex = columns.findIndex((col) => col.key === field);

    // Enter: Stop editing or move down
    if (e.key === "Enter") {
      e.preventDefault();
      if (editingCell) {
        setEditingCell(null);
        if (rowIndex < data.length - 1) {
          const nextRow = data[rowIndex + 1];
          setSelectedCell({ id: nextRow.id, field });
        }
      } else {
        setEditingCell({ id, field });
      }
    }
    // Tab: Move right
    else if (e.key === "Tab") {
      e.preventDefault();
      setEditingCell(null);
      if (colIndex < columns.length - 1) {
        const nextField = columns[colIndex + 1].key;
        setSelectedCell({ id, field: nextField });
      } else if (rowIndex < data.length - 1) {
        const nextRow = data[rowIndex + 1];
        setSelectedCell({ id: nextRow.id, field: columns[0].key });
      }
    }
    // Arrow keys
    else if (e.key === "ArrowUp" && !editingCell) {
      e.preventDefault();
      if (rowIndex > 0) {
        const prevRow = data[rowIndex - 1];
        setSelectedCell({ id: prevRow.id, field });
      }
    } else if (e.key === "ArrowDown" && !editingCell) {
      e.preventDefault();
      if (rowIndex < data.length - 1) {
        const nextRow = data[rowIndex + 1];
        setSelectedCell({ id: nextRow.id, field });
      }
    } else if (e.key === "ArrowLeft" && !editingCell) {
      e.preventDefault();
      if (colIndex > 0) {
        const prevField = columns[colIndex - 1].key;
        setSelectedCell({ id, field: prevField });
      }
    } else if (e.key === "ArrowRight" && !editingCell) {
      e.preventDefault();
      if (colIndex < columns.length - 1) {
        const nextField = columns[colIndex + 1].key;
        setSelectedCell({ id, field: nextField });
      }
    }
    // Escape: Cancel editing
    else if (e.key === "Escape") {
      setEditingCell(null);
    }
    // Delete: Clear cell
    else if (e.key === "Delete" && !editingCell) {
      handleCellChange(id, field, "");
    }
    // Ctrl+C: Copy
    else if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      const item = data.find((d) => d.id === id);
      setCopiedCell({ value: item[field], field });
    }
    // Ctrl+V: Paste
    else if ((e.ctrlKey || e.metaKey) && e.key === "v" && copiedCell) {
      handleCellChange(id, field, copiedCell.value);
    }
    // F2: Edit cell
    else if (e.key === "F2") {
      e.preventDefault();
      setEditingCell({ id, field });
    }
    // Any other key: Start editing
    else if (!editingCell && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setEditingCell({ id, field });
      handleCellChange(id, field, e.key);
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle clicks outside to deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("table")) {
        setSelectedCell(null);
        setEditingCell(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 p-2 md:p-3 rounded-lg shadow-lg">
              <Database className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Data Center Inventory
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Excel-like spreadsheet
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddRow}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded border border-gray-300 font-medium flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded border border-gray-300 font-medium flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded border border-gray-300 font-medium flex items-center gap-2 text-sm">
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{filteredData.length}</span> rows
            </div>
          </div>
        </div>

        {/* Excel-like Grid */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{ minWidth: "1400px" }}
            >
              {/* Column Headers */}
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="w-12 px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300 bg-gray-200">
                    #
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-2 text-left text-xs font-bold text-gray-700 border-r border-gray-300 whitespace-nowrap bg-gray-100"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="w-16 px-2 py-2 text-center text-xs font-bold text-gray-700 bg-gray-100"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-blue-50"
                  >
                    {/* Row Number */}
                    <td className="px-2 py-0 text-center text-xs text-gray-600 border-r border-gray-300 bg-gray-50 font-semibold">
                      {index + 1}
                    </td>

                    {/* Editable Cells */}
                    {columns.map((col) => {
                      const isSelected =
                        selectedCell?.id === item.id &&
                        selectedCell?.field === col.key;
                      const isEditing =
                        editingCell?.id === item.id &&
                        editingCell?.field === col.key;

                      return (
                        <td
                          key={col.key}
                          className={`px-0 py-0 border-r border-gray-200 ${
                            isSelected
                              ? "ring-2 ring-blue-500 ring-inset bg-white"
                              : ""
                          }`}
                          onClick={() => handleCellClick(item.id, col.key)}
                          onDoubleClick={() =>
                            handleCellDoubleClick(item.id, col.key)
                          }
                        >
                          {isEditing ? (
                            <input
                              ref={(el) =>
                                (inputRefs.current[`${item.id}-${col.key}`] =
                                  el)
                              }
                              type="text"
                              value={item[col.key]}
                              onChange={(e) =>
                                handleCellChange(
                                  item.id,
                                  col.key,
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, item.id, col.key)
                              }
                              onBlur={() => setEditingCell(null)}
                              className="w-full px-2 py-2 text-sm text-gray-800 focus:outline-none"
                            />
                          ) : (
                            <div
                              className="px-2 py-2 text-sm text-gray-800 min-h-[36px] flex items-center cursor-cell"
                              onKeyDown={(e) =>
                                handleKeyDown(e, item.id, col.key)
                              }
                              tabIndex={0}
                            >
                              {col.key === "status" && item[col.key] ? (
                                <span
                                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                                    item[col.key]
                                  )}`}
                                >
                                  {item[col.key]}
                                </span>
                              ) : (
                                item[col.key] || ""
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}

                    {/* Delete Button */}
                    <td className="px-2 py-0 text-center border-l border-gray-300">
                      <button
                        onClick={() => handleDeleteRow(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all"
                        title="Delete row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="py-16 text-center border-t border-gray-200">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {searchTerm ? "No results found" : "No entries yet"}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Click 'Add Row' to create your first entry"}
              </p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            ⌨️ Keyboard Shortcuts:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-800">
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Enter
              </kbd>{" "}
              Edit/Move Down
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Tab
              </kbd>{" "}
              Move Right
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Arrow Keys
              </kbd>{" "}
              Navigate
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                F2
              </kbd>{" "}
              Edit Cell
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Delete
              </kbd>{" "}
              Clear Cell
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Ctrl+C
              </kbd>{" "}
              Copy
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Ctrl+V
              </kbd>{" "}
              Paste
            </div>
            <div>
              <kbd className="px-2 py-1 bg-white rounded border border-blue-300">
                Esc
              </kbd>{" "}
              Cancel Edit
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-600">Total Entries</div>
            <div className="text-xl font-bold text-gray-800">{data.length}</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-600">Active</div>
            <div className="text-xl font-bold text-green-600">
              {
                data.filter((item) => item.status.toLowerCase() === "active")
                  .length
              }
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-600">Inactive</div>
            <div className="text-xl font-bold text-red-600">
              {
                data.filter((item) => item.status.toLowerCase() === "inactive")
                  .length
              }
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <div className="text-xs text-gray-600">Selected</div>
            <div className="text-xl font-bold text-blue-600">
              {selectedCell ? "1 cell" : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
