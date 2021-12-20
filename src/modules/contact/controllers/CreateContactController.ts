import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateContactUseCase } from '../useCases/CreateContact/CreateContactUseCase';
import AppError from '../../../middlewares/AppError';

class CreateContactController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      yearsOld: Yup.number().positive().required(),
      phoneNumbers: Yup.array().of(Yup.string().matches(
        /\(\d{2}\)([0-9]{4}|[0-9]{5})-[0-9]{4}/,
        'Phone number is not in a correct format',
      ) // (00)1234-5678 || (00)12345-6789
        .min(13)
        .max(14)).required(),
    });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, yearsOld, phoneNumbers } = request.body;

    if (!(await this.schema.isValid({ name, yearsOld, phoneNumbers }))) throw new AppError('Validation fails', 400);

    const createContactUseCase = container.resolve(CreateContactUseCase);

    const contact = await createContactUseCase.execute({
      name,
      yearsOld,
      phoneNumbers,
    });

    return response.status(201).json(contact);
  }
}

export default new CreateContactController();
