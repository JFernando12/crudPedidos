import { Router } from "express";
import { showClients, addClient, deleteClient, selectClient, updateClient } from "../controllers/clients";

const router = Router();

router.get("/", showClients);

router.get("/:client_id", selectClient);

router.post("/", addClient);

router.delete("/:client_id", deleteClient);

router.put("/:client_id", updateClient);

export default router;
