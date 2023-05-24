import { IResponseAPI } from "./interfaces/util.interface";

export class UtilService {
  // crea un estándard con ResponseAPI para que todos los métodos de la API respondan de la misma forma
  createApiResponse(
    method: string,
    status: 0 | 1 | -1,
    message: string,
    data?: any | null,
    error?: string | null
  ): IResponseAPI {
    const response: IResponseAPI = {
      status: status,
      message: message,
      data: data ? data : null,
      error: error ? error : null,
    };
    if (error) console.log(method, response);
    return response;
  }
}
