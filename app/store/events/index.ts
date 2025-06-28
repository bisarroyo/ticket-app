import { create } from 'zustand'

interface States {
  events: SelectEvent[]
  loading: boolean
  error: string | null
}

interface Actions {
  fetchEvents: () => Promise<void>
  getEvents: () => SelectEvent[]
  fetchById: (id: string) => Promise<SelectEvent | null>
  getById: (id: string) => SelectEvent | undefined
}

export const useEventStore = create<States & Actions>((set, get) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/events')
      if (!res.ok) throw new Error('Failed to fetch events')
      const data = await res.json()
      set({ events: data, loading: false })
      console.log('Events loaded:', data)
    } catch (err) {
      console.error(err)
      set({ error: 'Error al cargar eventos', loading: false })
    }
  },

  getEvents: () => {
    console.log('Getting events from store:', get().events)
    return get().events
  },

  fetchById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`/api/events/${id}`)
      if (!res.ok) {
        set({ error: `Error al cargar el evento con id ${id}`, loading: false })
        return null
      }
      const data: SelectEvent = await res.json()
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
        set((state) => {
          const exists = state.events.some((e) => e.id === id)

          return {
            events: exists
              ? state.events.map((e) => (e.id === id ? rows : e))
              : [...state.events, rows],
            loading: false
          }
        })
      }
      return data
    } catch (err) {
      console.error(err)
      set({ error: `Error al cargar el evento con id ${id}`, loading: false })
      return null
    }
  },

  getById: (id: string) => {
    get().events.find((e: SelectEvent) => e.events.id.toString() === id)
  }
}))
