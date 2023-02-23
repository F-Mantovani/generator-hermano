export default function throwError(credential, errorMessage, errorPlace, errorStatus){

  if (credential) {
    const error = new Error()
    error.message = errorMessage
    error.place = errorPlace
    error.status = errorStatus
    throw error
  }
  
}