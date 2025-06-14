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
    setColumns([...columns, { name: "", dataType: "string", isNullable: false, defaultValue: "" }]);
  };

  const handleColumnChange = (i, field, value) => {
    const updated = [...columns];
    updated[i][field] = value;
    setColumns(updated);
  };

  const handleCreate = async () => {
    await axios.post(API, { name, columns });
    setName("");
    setColumns([{ name: "", dataType: "string", isNullable: false, defaultValue: "" }]);
    fetchTables();
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Table Manager</h1>
      <div className="mb-4">
        <input placeholder="Table Name" value={name} onChange={(e) => setName(e.target.value)} />
        <h3 className="font-semibold mt-2">Columns</h3>
        {columns.map((col, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input
              placeholder="Name"
              value={col.name}
              onChange={(e) => handleColumnChange(i, "name", e.target.value)}
            />
            <select
              value={col.dataType}
              onChange={(e) => handleColumnChange(i, "dataType", e.target.value)}
            >
              <option value="string">String</option>
              <option value="integer">Integer</option>
              <option value="date">Date</option>
            </select>
            <input
              type="checkbox"
              checked={col.isNullable}
              onChange={(e) => handleColumnChange(i, "isNullable", e.target.checked)}
            />
            <input
              placeholder="Default"
              value={col.defaultValue}
              onChange={(e) => handleColumnChange(i, "defaultValue", e.target.value)}
            />
          </div>
        ))}
        <button onClick={addColumn}>+ Add Column</button>
        <button className="ml-4" onClick={handleCreate}>Create Table</button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">All Tables</h2>
        {tables.map((t) => (
          <div key={t._id} className="border p-2 mb-2">
            <h3 className="font-bold">{t.name}</h3>
            <ul>
              {t.columns.map((col) => (
                <li key={col._id}>
                  {col.name} - {col.dataType} - Nullable: {col.isNullable ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
