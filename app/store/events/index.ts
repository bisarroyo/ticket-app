import { create } from 'zustand'

const API_URL = 'http://localhost:3002/api/v1'

interface States {
    events: SelectEvent[]
    selectedEvent: SelectEvent | null
    loading: boolean
    error: string | null
}

interface Actions {
    fetchEvents: () => Promise<void>
    fetchById: (id: string) => Promise<SelectEvent | null>
    clearSelectedEvent: () => void
    getById: (id: string) => SelectEvent | undefined
    setSelectedEvent: (event: SelectEvent) => void
}

export const useEventStore = create<States & Actions>((set, get) => ({
    events: [],
    selectedEvent: null,
    loading: false,
    error: null,

    fetchEvents: async () => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${API_URL}/events`)

            if (!res.ok) {
                set({
                    error: 'Error al cargar los eventos'
                })
            }
            const newEvents = await res.json()
            console.log('Fetch response:', newEvents)
            const currentEvents = get().events
            const data = newEvents.map((event: SelectEvent) => {
                const existingEvent = currentEvents.find(
                    (e) => e.events.id === event.events.id
                )
                if (existingEvent) {
                    return existingEvent
                }
                return {
                    events: event.events,
                    venues: event.venues,
                    sections: event.sections || []
                }
            })
            set({ events: data, loading: false })
        } catch (err) {
            console.error(err)
            set({ error: 'Error al cargar eventos', loading: false })
        }
    },

    fetchById: async (id: string) => {
        set({ loading: true, error: null })
        // const currentEvents = get().events;
        // const existingEvent = currentEvents.find(
        //   (e) => e.events.id.toString() === id
        // );
        // if (existingEvent) {
        //   console.log("Event already exists in store");
        //   set({ selectedEvent: existingEvent, loading: false });
        //   return;
        // }
        try {
            const res = await fetch(`${API_URL}/events/${id}`)
            if (!res.ok) {
                set({
                    error: `Error al cargar el evento con id ${id}`,
                    loading: false
                })
                return null
            }
            const data: SelectEvent = await res.json()
            console.log(data)
            if (data.length > 1) {
                const rows: EventWithVenueAndSections = {
                    events: data[0].events,
                    venues: data[0].venues,
                    sections: []
                }
                data.forEach((el: SelectSection) => {
                    const section = el.sections
                    if (section) {
                        rows.sections.push(section)
                    }
                })
                set({ selectedEvent: rows, loading: false })
                set((state) => {
                    const exists = state.events.some(
                        (e) => e.events.id.toString() === id
                    )

                    return {
                        events: exists
                            ? state.events.map((e) =>
                                  e.events.id.toString() === id ? rows : e
                              )
                            : [...state.events, rows],
                        loading: false
                    }
                })
            } else {
                set({ selectedEvent: data, loading: false })
            }
            return data
        } catch (err) {
            console.error(err)
            set({
                error: `Error al cargar el evento con id ${id}`,
                loading: false
            })
            return null
        }
    },
    getById: (id: string) => {
        return get().events.find((e) => e.events.id.toString() === id)
    },
    clearSelectedEvent: () =>
        set({ selectedEvent: null, error: null, loading: false }),
    setSelectedEvent: (event: SelectEvent) =>
        set((state) => ({
            selectedEvent: event,
            events: state.events.some((e) => e.events.id === event.events.id)
                ? state.events.map((e) =>
                      e.events.id === event.events.id ? event : e
                  )
                : [...state.events, event],
            loading: false,
            error: null
        }))
}))
