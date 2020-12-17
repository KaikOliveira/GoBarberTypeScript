import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

// Toda fnc ASYNC/AWAIT return Promise<>
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // Tratativa de erro/excessões
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('O Appointment nao esta disponivel.');
    }

    // New Appointment INSTANCIA
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Save Appointment
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
