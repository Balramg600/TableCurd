import Table from '../models/Table.js';
import Column from '../models/Column.js';


export const createTable = async (req, res) => {
  try {
    const { name, description, columns } = req.body;
    const table = await Table.create({ name, description });

    const columnData = columns.map(col => ({ ...col, tableId: table._id }));
    await Column.insertMany(columnData);

    res.status(201).json({ table });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTables = async (req, res) => {
  try {
    const tables = await Table.find({});
    const result = await Promise.all(
      tables.map(async (table) => {
        const columns = await Column.find({ tableId: table._id });
        return { ...table.toObject(), columns };
      })
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { name, description, columns } = req.body;

    await Table.findByIdAndUpdate(tableId, { name, description });

    await Column.deleteMany({ tableId });

    const columnData = columns.map(col => ({ ...col, tableId }));
    await Column.insertMany(columnData);

    res.json({ message: 'Table updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
