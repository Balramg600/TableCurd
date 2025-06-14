import express from 'express';
import { createTable, getTables, updateTable } from '../Controllers/tableController.js'; // 👈 with .js
const router = express.Router();


router.post('/', createTable);
router.get('/', getTables);
router.put('/:tableId', updateTable);

export default router;
