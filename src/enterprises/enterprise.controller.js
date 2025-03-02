import Enterprise from "./enterprise.model.js";

export const createEnterprise = async (req, res) => {
  try {
    const { nombre, nivelImpacto, aniosTrayectoria, categoriaEmpresarial } = req.body;
    const existingEnterprise = await Enterprise.findOne({ nombre });

    if (existingEnterprise) {
      return res.status(400).json({
        success: false,
        message: "La empresa ya existe",
      });
    }

    const enterprise = new Enterprise({ nombre, nivelImpacto, aniosTrayectoria, categoriaEmpresarial });
    await enterprise.save();

    res.status(201).json({
      success: true,
      message: "Empresa registrada exitosamente",
      enterprise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al registrar la empresa",
      error,
    });
  }
};

export const updateEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEnterprise = await Enterprise.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEnterprise) {
      return res.status(404).json({
        success: false,
        message: "Empresa no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Empresa actualizada exitosamente",
      enterprise: updatedEnterprise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar la empresa",
      error,
    });
  }
};

export const listEnterprises = async (req, res) => {
  try {
    let { sortBy, order, categoria, aniosTrayectoria } = req.query;
    let filter = { estado: true };
    let sortOptions = {};

    if (categoria) {
      filter.categoriaEmpresarial = categoria;
    }

    if (aniosTrayectoria) {
      filter.aniosTrayectoria = aniosTrayectoria;
    }

    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    const enterprises = await Enterprise.find(filter).sort(sortOptions);

    res.json({
      success: true,
      enterprises,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las empresas",
      error,
    });
  }
};
