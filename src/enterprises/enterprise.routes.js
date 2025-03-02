import { Router } from "express";
import { check } from "express-validator";
import { createEnterprise, updateEnterprise, listEnterprises } from "./enterprise.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existenteEnterprise } from "../helpers/db-validator.js";

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nivelImpacto", "El nivel de impacto es obligatorio").not().isEmpty(),
    check("aniosTrayectoria", "Los años de trayectoria deben ser un número").isNumeric(),
    check("categoriaEmpresarial", "La categoría es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  createEnterprise
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existenteEnterprise),
    validarCampos,
  ],
  updateEnterprise
);

router.get(
    "/",
    validarJWT, 
    listEnterprises
);

export default router;
