import { IProfileDTO } from "@interfaces/IProfileDTO";

export const profileResponseMap = (value: any): IProfileDTO => ({
  idSocia: value?.idSocia || null,
  name: value?.NOMBRE || null,
  appPat: value?.AP_PATERNO || null,
  appMat: value?.AP_MATERNO || null,
  city: value?.CIUDAD || null,
  cp: value?.COD_POS || null,
  company: value?.COMPANIA || null,
  addres: [value?.DIRECCION_1 || null, value?.DIRECCION_2 || null,value?.DIRECCION_3 || null,],
  email: value?.EMAIL_PERS || null,
  createAt: value?.FECHA_ALTA || null,
  date: value?.FECHA_NACIMIENTO || null,
  idEdo: value?.ID_EDO || null,
  estado: value?.NOM_EDO || null,
  pais: value?.ID_PAIS || null,
  nomPais: value?.NOM_PAIS || null,
  bookingPend: value?.RESERVAS_PENDIENTES || null,
  saldo: value?.SALDO || null,
  sexo: value?.SEXO || null,
  phone: value?.TELEFONO || null,
})

