import getRequest from "../dtos/get.request";
import idadeHelper from "./idade.helper";

export default class bemVindoHelper {
 static criarMensagem(input: getRequest): string {
  const nome = input.nome ?? "Visitante";
  const idadeMensagem = input.idade 
    ? idadeHelper.ehAdulto(parseInt(input.idade)) 
      ? " você é maior de idade" 
      : " você é menor de idade"
    : " não consegui identificar sua idade";

  return `Boas Vindas, ${nome}${idadeMensagem}`;
}
}
