import { Trancode } from "./trancode";

export class LoginRetornoDTO {
  token!: string;
  dsLogin!: string;
  dsNome!: string;
  trancodes!: Trancode[];
}
