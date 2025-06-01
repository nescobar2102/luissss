const { format } = require("date-fns")

class Helpers {
  formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year : 'numeric'
    }
    const date = new Date(dateString)
    const formattedDate: string = date.toLocaleDateString("es-ES", options)
    return formattedDate
  }

  formatAmount = (amount: any): any => {
    // Verificar si el monto es un número válido
    if (isNaN(amount) || amount === null) {
      return ""
    }

    // Formatear el monto con separador de miles y dos decimales
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount)
  }

  validEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/    
    const numberRegex = /^\d{4,}$/

    if (emailRegex.test(value)) {
      return true
    } else if (numberRegex.test(value)) {
      return true
    } else {
      return false
    }
  }

  validateNumber = (password: string) => {
    const numberRegex = /[0-9]/
    return numberRegex.test(password)
  }
  validatePassword = (password: string) => {
    const lengthRegex = /^.{8,12}$/
    return lengthRegex.test(password)
  }
  transformarFecha(fecha: Date) { 
    if (fecha !== null) {
            
      const fechaObjeto = new Date(fecha)
      
      const year = fechaObjeto.getFullYear()
      
      const month = (fechaObjeto.getMonth()+1).toString().padStart(2, "0")
      
      const day = (fechaObjeto.getDate()).toString().padStart(2, "0")
      
      
      const fechaTransformada = `${year}-${month}-${day}`
      return fechaTransformada
    } else {
      return ""
    }
  }
  transformarFecha2(fecha: Date) {
    if (fecha !== null) {
      const fechaObjeto = new Date(fecha)
      const year = fechaObjeto.getFullYear()
      
      const month = (fechaObjeto.getMonth()+1).toString().padStart(2, "0")
      
      const day = (fechaObjeto.getDate()+1).toString().padStart(2, "0")
      
      
      const fechaTransformada = `${year}-${month}-${day}`
      return fechaTransformada
    } else {
      return ""
    }
  }
  enmascararEmail(email: string) {
    const [nombreUsuario, dominio] = email.split("@")
    const longitudNombreUsuario = nombreUsuario.length
    const caracteresEnmascarados = Math.floor(longitudNombreUsuario / 2)
    const emailEnmascarado = nombreUsuario.slice(0, caracteresEnmascarados) + "*".repeat(longitudNombreUsuario - caracteresEnmascarados) + "@" + dominio

    return emailEnmascarado
  }
}

const hp = new Helpers()
export default hp
