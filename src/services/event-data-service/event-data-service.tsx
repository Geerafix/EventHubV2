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
      let getEvents = events.map((event: any) => {
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
              participant.data_urodzenia,
              participant.email,
              participant.nr_telefonu
            );
          })
        );
      });

      getEvents = getEvents.filter((event: any) => { return new Date(event.data_wydarzenia) >= new Date(); });
      getEvents.sort((a: any, b: any) => a._data_wydarzenia.getTime() - b._data_wydarzenia.getTime());

      return { events: getEvents };
    } catch (error) {
      throw error;
    }
  },

  getSingleData: async (id: number) => {
    try {
      const res = await axios.get(`${apiUrl}/events/${id}`);
      const event = res.data;
      const getEvent = new Event(
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
            participant.data_urodzenia,
            participant.email,
            participant.nr_telefonu
          );
        })
      );
      return { event: getEvent };
    } catch (error) {
      throw error;
    }
  },

  postData: async (newEvent: any) => {
    try {
      const res = await axios.post(`${apiUrl}/events`, newEvent);
      return { event: res.data };
    } catch (error) {
      throw error;
    }
  },

  putData: async (editedEvent: any) => {
    try {
      const res = await axios.put(`${apiUrl}/events/${editedEvent.id}`, editedEvent);
      return { event: res.data };
    } catch (error) {
      throw error;
    }
  },

  deleteData: async (eventId: number) => {
    try {
      const res = await axios.delete(`${apiUrl}/events/${eventId}`);
      return { event: res.data };
    } catch (error) {
      throw error;
    }
  },
};

export default EventDataService;
