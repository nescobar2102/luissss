
export type CreateAccountPropsType = {
  onSubmit: (formData: {lang:string, email: string; password: string; firstName: string; lastName: string; maternalSurname: string; name_company: string }) => void
  className?: string
  state: "loading" | "error" | "default"
}

export type FormPropsType<T> = {
  children: React.ReactNode
  formData: T
  onSubmit: (formData: T) => void
  state?: "default" | "loading" | "error"
  className?: string
  submitLabel: string
  canBeSubmitted?: boolean
}

export interface ErrorStateProps {
  error: Error
}

export interface IResult {
  error: boolean
  data?: any
  msg?: string
  count?: string
}

export interface ActivateAccountTemplateProps {
  userFirstname?: string
  Links?: string
}

export interface ActivateAccount2TemplateProps {
  userFirstname?: string
  lang?: string
}

export interface LoginAccountTemplateProps {
  userFirstname?: string
}

export interface ChangeAccountTemplateProps {
  userFirstname?: string
  verificationCode?: string
  lang?: string
  token?: string
}

export interface EmailData {
  userEmail: string
  type: string
  link?: string
  password?: string
  userFirstname?: string
  verificationCode?:string
  lang:string
  token?:string
}
export interface MainProps {
  onClick?: () => void
  saldo?: number
  socio?: string
}

export interface ProfileData {
  SALDO: number;
  RESERVAS_PENDIENTES: number;
  EMAIL_PERS: string;
  AP_PATERNO: string;
  AP_MATERNO: string;
  NOMBRE: string;
  TELEFONO: string;
  FECHA_NACIMIENTO: string;
  COMPANIA: string;
  FECHA_ALTA: string;
  SEXO: string;
  DIRECCION_1: string;
  DIRECCION_2: string | null;
  DIRECCION_3: string | null;
  CIUDAD: string;
  COD_POS: string | null;
  ID_PAIS: string;
  NOM_PAIS: string;
  ID_EDO: string | null;
  NOM_EDO: string | null;
}

export interface ProfileResponse {
  error: boolean;
  msg: string;
  data: [ProfileData, { idSocia: number }];
}