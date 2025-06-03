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

  getEvents: () => get().events,

  fetchById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`/api/events/${id}`)
      if (!res.ok) {
        set({ error: `Error al cargar el evento con id ${id}`, loading: false })
        return null
      }
      const data: SelectEvent = await res.json()
      set((state) => {
        const exists = state.events.some((e) => e.id === id)
        return {
          events: exists
            ? state.events.map((e) => (e.id === id ? data : e))
            : [...state.events, data],
          loading: false
        }
      })
      // console.log('Events:', get().events)
      return data
    } catch (err) {
      console.error(err)
      set({ error: `Error al cargar el evento con id ${id}`, loading: false })
      return null
    }
  },

  getById: (id: string) => get().events.find((e) => e.id.toString() === id)
}))
