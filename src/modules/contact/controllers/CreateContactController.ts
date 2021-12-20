import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateContactUseCase } from '../useCases/CreateContact/CreateContactUseCase';
import AppError from '../../../middlewares/AppError';

class CreateContactController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      nome: Yup.string().required(),
      idade: Yup.number().positive().required(),
      telefones: Yup.array().of(Yup.string().matches(
        /\(\d{2}\)([0-9]{4}|[0-9]{5})-[0-9]{4}/,
        'Phone number is not in a correct format',
      ) // (00)1234-5678 || (00)12345-6789
        .min(13)
        .max(14)).required(),
    });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, idade, telefones } = request.body;

    if (!(await this.schema.isValid({ nome, idade, telefones }))) throw new AppError('Validation fails', 400);

    const createContactUseCase = container.resolve(CreateContactUseCase);

    const contact = await createContactUseCase.execute({
      nome,
      idade,
      telefones,
    });

    return response.status(201).json(contact);
  }
}

export default new CreateContactController();
