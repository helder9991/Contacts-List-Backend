import * as Yup from 'yup';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../middlewares/AppError';
import { DeleteContactUseCase } from '../useCases/DeleteContact/DeleteContactUseCase';

class DeleteContactController {
  private schema;

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.number().required(),
    });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!(await this.schema.isValid({ id }))) throw new AppError('Validation fails', 400);

    const deleteContactUseCase = container.resolve(DeleteContactUseCase);

    const deleted = await deleteContactUseCase.execute({
      id: Number(id),
    });

    if (!deleted) throw new AppError('Contact not found', 404);

    return response.status(200).send();
  }
}

export default new DeleteContactController();
