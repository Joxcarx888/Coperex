import ExcelJS from "exceljs";
import Enterprise from "../enterprises/enterprise.model.js";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export const generateEnterpriseReport = async (req, res) => {
  try {
    const enterprises = await Enterprise.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Empresas Registradas");

    worksheet.columns = [
      { header: "ID", key: "_id", width: 30 },
      { header: "Nombre", key: "nombre", width: 25 },
      { header: "Nivel de Impacto", key: "nivelImpacto", width: 20 },
      { header: "Años de Trayectoria", key: "aniosTrayectoria", width: 20 },
      { header: "Categoría Empresarial", key: "categoriaEmpresarial", width: 25 },
    ];

    enterprises.forEach((enterprise) => {
      worksheet.addRow(enterprise);
    });

    const filePath = path.join("reports", "empresas.xlsx");

    if (!fs.existsSync("reports")) {
      fs.mkdirSync("reports");
    }

    await workbook.xlsx.writeFile(filePath);


    exec(`start "" "${filePath}"`, (err) => {
      if (err) {
        console.error("Error al abrir el archivo:", err);
      }
    });

    res.download(filePath, "empresas.xlsx", (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
        res.status(500).json({
          success: false,
          message: "Error al descargar el archivo",
          error: err,
        });
      }
    });
  } catch (error) {
    console.error("Error generando el reporte:", error);
    res.status(500).json({
      success: false,
      message: "Error al generar el reporte",
      error,
    });
  }
};
