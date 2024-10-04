import postRequest from "../dtos/post.request";
import postResponse from "../dtos/post.response";
import dataHelper from "../helpers/data.helper";
import idadeHelper from "../helpers/idade.helper";

export default class postHandler {
  static buildResponse(input: postRequest): postResponse {
    const response: postResponse = {
      id: Math.random().toString(),
      nome: input.nome,
      email: input.email,
      ehAdulto: idadeHelper.ehAdulto(parseInt(input.idade)),
      dataCadastro: dataHelper.obterDataAgora(),
    };

    return response;
  }
}
