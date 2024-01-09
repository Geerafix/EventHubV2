import axios from 'axios';
import Event from '../../models/Event';
import { Plan } from '../../models/Plan';
import { Participant } from '../../models/Participant';

const apiUrl = "http://localhost:4200";

const EventDataService = {
  getData: async () => {
    try {
      const res = await axios.get(`${apiUrl}/events`);
      const events = res.data;
      const json = events.map((event: any) => {
        return new Event(
          event.id,
          event.nazwa,
          event.rodzaj,
          event.organizator,
          event.miejsce,
          event.max_ilosc_osob,
          new Date(event.data_wydarzenia),
          event.cena_biletu,
          event.plan.map((plan: any) => {
            return new Plan(
              plan.nazwa,
              plan.godz_rozpoczecia,
              plan.godz_zakonczenia
            );
          }),
          event.uczestnicy.map((participant: any) => {
            return new Participant(
              participant.imie,
              participant.nazwisko,
              participant.wiek,
              participant.email,
              participant.nr_telefonu
            );
          })
        );
      });
      return { events: json };
    } catch (error) {
      throw error;
    }
  },

  getSingleData: async (id: number) => {
    try {
      const res = await axios.get(`${apiUrl}/events/${id}`);
      const event = res.data;
      const json = new Event(
        event.id,
        event.nazwa,
        event.rodzaj,
        event.organizator,
        event.miejsce,
        event.max_ilosc_osob,
        new Date(event.data_wydarzenia),
        event.cena_biletu,
        event.plan.map((plan: any) => {
          return new Plan(
            plan.nazwa,
            plan.godz_rozpoczecia,
            plan.godz_zakonczenia
          );
        }),
        event.uczestnicy.map((participant: any) => {
          return new Participant(
            participant.imie,
            participant.nazwisko,
            participant.wiek,
            participant.email,
            participant.nr_telefonu
          );
        })
      );
      return { event: json };
    } catch (error) {
      throw error;
    }
  },
};

export default EventDataService;
