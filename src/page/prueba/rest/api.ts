import Resolve from "@/model/class/resolve.model.class";
import RestError from "@/model/class/resterror.model.class";
import useApi from "@/model/network/index.network";
import { respuesta } from "@/model/types/respuesta";

const api = useApi();

export async function getMorti<Danza>(): Promise<respuesta<Danza> | RestError>
{
   return await Resolve.create<Danza>(api.get({url:"Danza/listarParticipantes",autorizacion:false}))  
}