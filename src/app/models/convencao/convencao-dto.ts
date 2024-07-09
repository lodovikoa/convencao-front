import { EstadoDTO } from '../estado/estado-dto';
export class ConvencaoDTO {

  sqConvencao!: number;
  dsReduzido!: string;
  dsConvencao!: string;
  imLogo!: string;
  dsEndereco!: string;
  dsBairro!: string;
  dsCidade!: string;
  dsPais!: string;
  dsCep!: string;
  estado: EstadoDTO = new EstadoDTO();
  dsCnpj!: string;
  dsEmail!: string;
  dsTelefones!: string;
  dsWatsapp!: string;
}
