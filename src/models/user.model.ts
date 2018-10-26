import { Contato } from './contato.model';
export class User {

    public $key: string;

    // constructor(
    public name: string;
    public username: string;
    public email: string;
    public photo: string;

    /*Historico Clinico*/
    public sexo: string;
    public peso: number;
    public altura: number;
    public idade: number;
    public sn_infartou: boolean = false;
    public sn_hipertensao: boolean = false;
    public sn_hipertensao_medicacao: boolean = false;
    public sn_diabetes: boolean = false;
    public sn_diabetes_medicacao: boolean = false;
    public sn_colesterol: boolean = false;
    public sn_colesterol_medicacao: boolean = false;
    public cintura: number;
    public quadril: number;
    public sn_tabagismo: boolean = false;
    public sn_atividade_fisica: boolean = false;
    public sn_frutas: boolean = false;
    public sn_alcool: boolean = false;
    public escoreHistoria: number;

    /*Sinais e sintomas*/
    public sn_dor_peito: boolean = false;
    public sn_queima: boolean = false;
    public sn_aperto: boolean = false;
    public sn_irradia: boolean = false;
    public sn_superiores: boolean = false;
    public sn_pescoco: boolean = false;
    public sn_tempo: boolean = false;
    public qtdTempo: string;
    public sn_sudorese: boolean = false;
    public sn_nausea: boolean = false;
    public sn_vomito: boolean = false;
    public sn_dispneia: boolean = false;
    public escoreSinais: number;
    // ) {}

    public contatos: Array<Contato> = [];

    /*{
        "rules": {
            ".read": "auth != null",
            ".write": "auth != null",
            "users": {
                ".read": true,
                ".write": true,
                ".indexOn": ["username", "name"]
            },
            "chats": {
                ".indexOn": "timestamp"
            },
            "messages": {
                "$messages_list_id": {
                    ".indexOn": "timestamp"
                }
            }
        }
    }*/

}