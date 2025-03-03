import { Router } from "express";
import { generateEnterpriseReport } from "./generate.report.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/",
    [
        validarJWT,
    ],
    generateEnterpriseReport
);

export default router;
