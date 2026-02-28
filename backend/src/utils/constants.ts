export const serverResponse = <T>(message:string, data?:T) => ({
  message,
  payload: data
});