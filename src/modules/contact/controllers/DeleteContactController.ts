import * as Yup from 'yup';
import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../middlewares/AppError';
import { DeleteContactUseCase } from '../useCases/DeleteContact/DeleteContactUseCase';
import { getCurrentDate } from '../../../utils/getCurrentDate';

class DeleteContactController {
  private schema;

  private logsDir = path.resolve(__dirname, '..', '..', '..', 'assets', 'logs');

  constructor() {
    this.schema = Yup.object().shape({
      id: Yup.number().required(),
    });
  }

  generateLog(id: string) {
    const currentDate = getCurrentDate();

    fs.appendFileSync(
      path.resolve(this.logsDir, 'ContactDeleteLog.txt'),
      `[${currentDate}] - Contact with id ${id} was deleted\n`,
    );
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!(await this.schema.isValid({ id }))) throw new AppError('Validation fails', 400);

    const deleteContactUseCase = container.resolve(DeleteContactUseCase);

    const deleted = await deleteContactUseCase.execute({
      id: Number(id),
    });

    if (!deleted) throw new AppError('Contact not found', 404);

    this.generateLog(id);

    fs.appendFileSync('message.txt', 'data to append');

    return response.status(200).send();
  }
}

export default new DeleteContactController();
