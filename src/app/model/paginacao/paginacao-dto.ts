export class PaginacaoDTO {
  pageSize!: number;
  pageNumber!: number;
  totalPages!: number;
  totalElements!: number;
  firstPage!: boolean;
  lastPage!: boolean
}
