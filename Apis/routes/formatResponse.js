const successFormat = (status, message, data, error,code) => {
    return {
      status,
      message,
      data,
      error,
      code
    }
  }
  
  const errorFormat = (status, message, data, error, code = 400) => {
    return {
      status,
      message,
      data,
      error,
      code
    }
  }
  const newerror = (status, message, data, error,code) => {
    return {
      status,
      message,
      data,
      error,
      code
    }
  }
  module.exports={successFormat,errorFormat,newerror}