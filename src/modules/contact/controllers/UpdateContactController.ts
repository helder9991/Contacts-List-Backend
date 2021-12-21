import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../middlewares/AppError';
import { UpdateContactUseCase } from '../useCases/UpdateContact/UpdateContactUseCase';

class UpdateContactController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      yearsOld: Yup.number().positive().required(),
      phoneNumbers: Yup.array().of(Yup.object().shape({
        id: Yup.number().required(),
        number: Yup.string().matches(
          /\(\d{2}\)([0-9]{4}|[0-9]{5})-[0-9]{4}/,
          'Phone number is not in a correct format',
        ) // (00)1234-5678 || (00)12345-6789
          .min(13)
          .max(14)
          .required(),
      })).required(),
    });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      phoneNumbers,
      yearsOld,
    } = request.body;

    if (!(await this.schema.isValid({
      id, name, phoneNumbers, yearsOld,
    }))) throw new AppError('Validation fails', 400);

    const updateContactUseCase = container.resolve(UpdateContactUseCase);

    const contact = await updateContactUseCase.execute({
      id: Number(id), name, phoneNumbers, yearsOld,
    });

    return response.status(200).json(contact);
  }
}

export default new UpdateContactController();
