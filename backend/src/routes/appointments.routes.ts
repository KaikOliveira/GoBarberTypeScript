import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// Rota listar todos Appointments
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// Rota create Appointment
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    // Verificação date disponivel
    const parsedDate = parseISO(date);

    // new Appointment
    const creteAppointment = new CreateAppointmentService();

    const appointment = await creteAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
