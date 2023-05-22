import { ProductRepository } from "../repositories";

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

/* Criar Produto
Pre-condicao: nao ha;
Pos-condicao: novo produto;
Descricao: recebe os argumentos (name, description, price):ProductRequest, cria
um novo produto e o retorne.
*/
export class CreateProductsService {
  async execute({ name, description, price }: ProductRequest) {
    const product = ProductRepository().create({
      name,
      description,
      price,
    });

    await ProductRepository().save(product);

    return product;
  }
}
