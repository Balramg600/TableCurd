import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/tables";

export default function TableManager() {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([
    { name: "", dataType: "string", isNullable: false, defaultValue: "" },
  ]);

  const fetchTables = async () => {
    const res = await axios.get(API);
    setTables(res.data);
  };

  const addColumn = () => {
    setColumns([
      ...columns,
      { name: "", dataType: "string", isNullable: false, defaultValue: "" },
    ]);
  };

  const handleColumnChange = (i, field, value) => {
    const updated = [...columns];
    updated[i][field] = value;
    setColumns(updated);
  };

  const handleCreate = async () => {
    if (!name) return alert("Table name is required");
    await axios.post(API, { name, columns });
    setName("");
    setColumns([{ name: "", dataType: "string", isNullable: false, defaultValue: "" }]);
    fetchTables();
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">🧮 Table & Column Manager</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Create New Table</h2>

        <input
          placeholder="Table Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3 className="font-medium mb-2">Columns</h3>
        {columns.map((col, i) => (
          <div
            key={i}
            className="flex flex-wrap gap-3 items-center mb-3 p-2 border rounded bg-gray-50"
          >
            <input
              className="flex-1 p-2 border rounded"
              placeholder="Column Name"
              value={col.name}
              onChange={(e) => handleColumnChange(i, "name", e.target.value)}
            />
            <select
              className="p-2 border rounded"
              value={col.dataType}
              onChange={(e) => handleColumnChange(i, "dataType", e.target.value)}
            >
              <option value="string">String</option>
              <option value="integer">Integer</option>
              <option value="date">Date</option>
            </select>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={col.isNullable}
                onChange={(e) => handleColumnChange(i, "isNullable", e.target.checked)}
              />
              Nullable
            </label>
            <input
              className="p-2 border rounded"
              placeholder="Default Value"
              value={col.defaultValue}
              onChange={(e) => handleColumnChange(i, "defaultValue", e.target.value)}
            />
          </div>
        ))}

        <div className="mt-4 flex gap-4">
          <button
            onClick={addColumn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Column
          </button>
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            ✅ Create Table
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">📋 Existing Tables</h2>
        {tables.length === 0 ? (
          <p className="text-gray-500">No tables found.</p>
        ) : (
          tables.map((t) => (
            <div key={t._id} className="mb-4 border p-4 rounded shadow-sm bg-white">
              <h3 className="text-lg font-bold text-blue-700 mb-2">{t.name}</h3>
              <ul className="pl-4 list-disc text-gray-700">
                {t.columns.map((col) => (
                  <li key={col._id}>
                    <span className="font-medium">{col.name}</span> — {col.dataType} —{" "}
                    Nullable: {col.isNullable ? "Yes" : "No"}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
