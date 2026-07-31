export type RangoBombero = 'SUBTENIENTE' | 'BOMBERO_1RO' | 'BOMBERO_2DO' | 'BOMBERO_LINEA';
export type FuncionOperativa = 'CHOFER_PIPA' | 'MAQUINISTA' | 'BOMBERO_LINEA' | 'PARAMEDICO';
export type EstatusLaboral = 'ACTIVO' | 'VACACIONES' | 'INCAPACIDAD' | 'BAJA';

export interface IBombero {
    id: string;
    numeroPlaca: string;
    nombre: string;
    apellidos: string;
    rango: RangoBombero;
    funcionPrincipal: FuncionOperativa;
    tipoLicencia: string;
    estatus: EstatusLaboral;
    fechaUltimoOperativo: Date;
    horasAcumuladasMes: number;


}