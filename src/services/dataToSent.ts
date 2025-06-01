class dataToSend{
  //PARAMETROS PARA CONSULTAR SERVICIO DE VALIDACION
  getServicioValidacionReserva(request: any, nombre: Text, apellido: Text, email: Text) {
    const data = JSON.parse(request);
    const dataToSend = {
      resort: data.ID_RESORT,
      noReferencia: data.REFERENCIA_RESERVA === undefined ? "" : data.REFERENCIA_RESERVA,
      fechaLlegada: data.FECHA_LLEGADA === undefined ? "" : data.FECHA_LLEGADA,
      fechaSalida: data.FECHA_SALIDA === undefined ? "" : data.FECHA_SALIDA,
      nombreSocio: nombre,
      apellidoSocio: apellido,
      correoElectronicoSocio: email,
      autorizacionManual: ""
    }

    return dataToSend
  }

  //PARAMETROS PARA REGISTRAR INSCRIPCION RESERVA
  insdIscripcionReservaCode100Params(response: any, no_socia: Number, ref_reserva:Number, id_resort: any) { 
    const dataToSend = {
      NO_SOCIA: no_socia,
      REFERENCIA_RESERVA: ref_reserva,
      NOMBRE_HUESPED: response.Reserva[0]?.nombreHuesped?.length > 0 && response.Reserva[0]?.nombreHuesped[0] || '',
      FECHA_LLEGADA: response.Reserva[0]?.fechaLlegada?.length > 0 && response.Reserva[0]?.fechaLlegada[0] || '',
      FECHA_SALIDA:  response.Reserva[0]?.fechaSalida?.length > 0 && response.Reserva[0]?.fechaSalida[0] || '',
      ID_RESORT: response.Reserva[0]?.resort?.length > 0  && response.Reserva[0]?.resort[0] || id_resort,  
      NO_CONFIRMACION: response.Reserva[0]?.noConfirmacion != null ? response.Reserva[0].noConfirmacion[0] : '',

      FECHA_CREACION_RESERVA: response.Reserva[0]?.fechaCreacion != null ? response.Reserva[0].fechaCreacion[0] : '',  
      RATE_CODE:  response.Reserva[0]?.rateCode != null ? response.Reserva[0].rateCode[0] : '',  
      TARIFA:0.0,
      MONEDA:"MXN",
      COMENTARIOS: response.Status[0]?.mensaje[0] ?? '',
      ID_RAZON_RECH:  response.Reserva[0]?.razonDescalificacion != null ? response.Reserva[0].razonDescalificacion[0] : '',
      CODE_STATUS: response.Status[0]?.status[0] ?? ''
    }

    return dataToSend
  }

  //PARAMETROS PARA REGISTRAR INSCRIPCION RESERVA
  insdIscripcionReservaParams(response: any, no_socia: Number, ref_reserva: Number) {
    
    const dataToSend = {
      NO_SOCIA: no_socia,
      REFERENCIA_RESERVA: ref_reserva,
      NOMBRE_HUESPED: response.Reserva[0]?.nombreHuesped?.length > 0 && response.Reserva[0]?.nombreHuesped[0] || '',
      FECHA_LLEGADA: response.Reserva[0]?.fechaLlegada[0] || '',
      FECHA_SALIDA: response.Reserva[0]?.fechaSalida[0] || '',
      ID_RESORT: response.Reserva[0]?.resort[0] || '',
      NO_CONFIRMACION: response.Reserva[0]?.noConfirmacion[0] || '',
      FECHA_CREACION_RESERVA: response.Reserva[0]?.fechaCreacion[0] || '',
      RATE_CODE: response.Reserva[0]?.rateCode[0] || '',
      TARIFA:0.0,
      MONEDA:"MXN",
      COMENTARIOS: response.Status[0]?.mensaje[0] || '',
      ID_RAZON_RECH: response.Reserva[0]?.razonDescalificacion[0] || '',
      CODE_STATUS: response.Status[0]?.status[0] || ''
    }

    return dataToSend
  }

  //PARAMETROS PARA ACTUALIZAR INSCRIPCION RESERVA
  updIscripcionReservaParams(response: any, no_socia: Number, ref_reserva:Number) {
    const auxParams = response.Reserva[0];
    const dataToSend = {
      NO_SOCIA: no_socia,
      REFERENCIA_RESERVA: ref_reserva,
      NOMBRE_HUESPED: auxParams.nombreHuesped + '' + auxParams.apellidoHuesped[0],
      FECHA_LLEGADA: auxParams.fechaLlegada[0],
      FECHA_SALIDA: auxParams.fechaSalida[0],
      ID_RESORT: auxParams.resort[0],
      NO_CONFIRMACION: auxParams.noConfirmacion[0],
      FECHA_CREACION_RESERVA: auxParams.fechaCreacion[0],
      RATE_CODE: auxParams.rateCode[0],
      COMENTARIOS: response.Status[0].mensaje[0],
      ID_RAZON_RECH: auxParams.razonDescalificacion[0],
      CODE_STATUS: response.Status[0].status[0]
    }

    return dataToSend
  }

  //PARAMETROS PARA GUARDAR RESERVA EN TABLA RESERVA
  saveBooking(params: any, no_socia: Number) {
    const dataToSend = {
      ID_RESORT: params.Reserva[0].resort[0],
      NO_CONFIRMACION: params.Reserva[0].noConfirmacion[0],
      CRS_NUMBER: params.Reserva[0].crsNumber[0],
      RESV_NAME_ID: params.Reserva[0].resvNameId[0],
      ALLOTMENT_HEADER_ID: params.Reserva[0].allotmentHeaderId[0],
      NAME_ID: params.Reserva[0].nameId[0],
      COMPANY_ID: params.Reserva[0].companyId[0],
      NOMBRE_HUESPED: params.Reserva[0].apellidoHuesped[0] + ', ' +params.Reserva[0].nombreHuesped[0],
      FECHA_LLEGADA: params.Reserva[0].fechaLlegada[0],
      FECHA_SALIDA: params.Reserva[0].fechaSalida[0],
      FECHA_CREACION: params.Reserva[0].fechaCreacion[0],
      STATUS_RESERVA: params.Reserva[0].statusReserva[0],
      RATE_CODE: params.Reserva[0].rateCode[0],
      CUARTOS_NOCHE: params.Reserva[0].cuartos[0], 
      PERSONAS: params.Reserva[0].personas[0], 
      INGRESO_RENTA: params.Reserva[0].ingresoRenta[0],
      INGRESO_AYB: params.Reserva[0].ingresoAyB[0], 
      INGRESO_OTROS: params.Reserva[0].ingresoOtros[0], 
      INGRESO_TOTAL_RESERVA: params.Reserva[0].ingresoTotal[0], 
      INGRESO_BASE_PUNTOS: params.Reserva[0].ingresoBaseSaldo[0],
      PUNTOS_GENERADOS: params.Reserva[0].saldoGenerado[0], 
      HUESPED_VALIDO_SN: params.Reserva[0].huespedValido[0]?'S':'N', 
      NO_SOCIA: no_socia,
      CODE_STATUS: params.Status[0].status[0]
    }

    return dataToSend
  }

}

export default dataToSend