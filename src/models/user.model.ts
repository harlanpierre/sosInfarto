export class User {

    public $key: string;

    // constructor(
    public name: string;
    public username: string;
    public email: string;
    public photo: string;

    /*Historico Clinico*/
    public sexo: string;
    public peso: string;
    public altura: string;
    public idade: string;
    public sn_fuma: boolean = false;
    public sn_bebi: boolean = false;
    public sn_infartou: boolean = false;
    public sn_avc: boolean = false;
    public sn_pressao_alta: boolean = false;
    public sn_diabetes: boolean = false;
    public sn_sedentario: boolean = false;
    public sn_cardiaco: boolean = false;
    public sn_cirurgia_cardiaca: boolean = false;
    public sn_familia_infartou: boolean = false;
    public sn_familia_avc: boolean = false;
    public sn_familia_pressao_alta: boolean = false;
    public sn_familia_diabetes: boolean = false;
    public sn_familia_cardiaco: boolean = false;
    // ) {}

}