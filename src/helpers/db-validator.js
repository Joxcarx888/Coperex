import User from '../users/user.model.js';
import Enterprise from '../enterprises/enterprise.model.js';


export const existenteEmail = async (email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existenteUsername = async (username = '') => {
    const existeUsername = await User.findOne({ username });

    if (existeUsername) {
        throw new Error(`El username ${username} ya existe en la base de datos`);
    }
};


export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existenteEnterprise = async (nombre = '') => {
    const existeEnterprise = await Enterprise.findOne({ nombre });

    if (existeEnterprise) {
        throw new Error(`La empresa con nombre ${nombre} ya existe en la base de datos`);
    }
};

export const existeEnterpriseById = async (id = '') => {
    const existeEnterprise = await Enterprise.findById(id);

    if (!existeEnterprise) {
        throw new Error(`El ID ${id} no existe en la base de datos`);
    }
};