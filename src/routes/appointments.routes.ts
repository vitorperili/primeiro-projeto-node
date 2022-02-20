import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Rota: Receber a requisição, chamar outro arquivo, devolver uma reposta
// DTO - Data Transfer Object
// SoC: Separation of Concerns ( Separação de preocupações)

appointmentsRouter.get('/', (request, response) => {
  const appoitments = appointmentsRepository.all();

  return response.json(appoitments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json((err as Error).message
    );
  }
});

export default appointmentsRouter;
