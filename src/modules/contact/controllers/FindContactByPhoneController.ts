import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindContactByPhoneUseCase } from '../useCases/FindContact/FindContactByPhoneUseCase';
import AppError from '../../../middlewares/AppError';

class FindContactByPhoneController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      phoneNumber: Yup.string().matches(
        /\(\d{2}\)([0-9]{4}|[0-9]{5})-[0-9]{4}/,
        'Phone number is not in a correct format',
      ) // (00)1234-5678 || (00)12345-6789
        .min(13)
        .max(14)
        .required(),
    });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { phoneNumber = '' } = request.query;
    if (!(await this.schema.isValid({ phoneNumber }))) throw new AppError('Validation fails', 400);

    const findContactUseCase = container.resolve(FindContactByPhoneUseCase);

    const contact = await findContactUseCase.execute({
      phoneNumber: String(phoneNumber),
    });

    if (!contact) return response.status(404).send();

    return response.status(200).json(contact);
  }
}

export default new FindContactByPhoneController();
