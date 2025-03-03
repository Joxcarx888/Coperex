import ExcelJS from "exceljs";
import Enterprise from "../enterprises/enterprise.model.js";

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

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=empresas.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generando el reporte:", error);
    res.status(500).json({
      success: false,
      message: "Error al generar el reporte",
      error,
    });
  }
};
