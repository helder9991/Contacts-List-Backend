import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListContactsByNameUseCase } from '../useCases/ListContacts/ListContactsByNameUseCase';
import AppError from '../../../middlewares/AppError';

class ListContactsByNameController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
    });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    if (!(await this.schema.isValid({ name }))) throw new AppError('Validation fails', 400);

    const listContactsUseCase = container.resolve(ListContactsByNameUseCase);

    const contact = await listContactsUseCase.execute({
      name: String(name),
    });

    return response.status(200).json(contact);
  }
}

export default new ListContactsByNameController();
