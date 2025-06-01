import { IResort } from "@interfaces/IResort";

export const resortMapper = (item: any): IResort => {
  return {
    id: item?.ID_RESORT,
    name: item?.NOMBRE,
    type: item?.TIPO_RESORT,
    urlImage: item?.URL_IMAGE,
    description: item?.DESCRIPCION,
    mnemonico: item?.MNEMONICO,
    active: item?.ACTIVO_SN === 'S',
  };
}