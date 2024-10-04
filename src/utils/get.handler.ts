import getRequest from "../dtos/get.request";
import getResponse from "../dtos/get.response";
import bemVindoHelper from "../helpers/bemvindo.helper";

export default class getHandler {
  static buildResponse(input: getRequest): getResponse{
    const response:getResponse = {
      mensagem: bemVindoHelper.criarMensagem(input)
    }
    return response
  }
}