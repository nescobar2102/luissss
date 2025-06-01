class validations {
  validateNames(text: any): boolean {
    if (text === "" || text === null || text === undefined) {
      return false
    } else {
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+( [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(text.trim())) {
        return true
      }
    }
    return false
  }

  validateAlphanumeric(text: any): boolean {
    if (text === "" || text === null || text === undefined) {
      return false
    } else if (!/^[a-zA-Z0-9]+$/.test(text.trim())) {
      return true
    }
    return false
  }

  numeric(text: any): boolean {
    if (text === "" || text === null || text === undefined) {
      return false
    } else if (!/^-?\d+$/.test(text.trim())) {
      return true
    }
    return false
  }

  validateEmail(text: any): boolean {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text.trim())) {
      return true
    }
    return false
  }

  validateDates(text: any): boolean {
    if (text === "" || text === null || text === undefined) {
      return false
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(text.trim())) {
      return true
    }
    return false
  }

  validateNullOrEmpty(text: any): boolean {
    if (text === "" || text === null || text === undefined) {
      return true
    }
    return false
  }
}
export default validations
