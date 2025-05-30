import { create } from 'zustand'

// State types
interface States {
  events: SelectEvent[] // Assuming SelectEvent is defined globally
  loading: boolean
  error: string | null
}

// Action types
interface Actions {
  loadEvents: () => void
  getEvents: () => SelectEvent[]
  getById: (id: string) => SelectEvent | undefined
}

// useEventStore
export const useEventStore = create<States & Actions>((set, get) => ({
  events: [],
  loading: false,
  error: null,

  loadEvents: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()
      set({ events: data, loading: false })
      console.log('Events loaded successfully:', data)
    } catch (error) {
      set({ error: 'Error al cargar eventos', loading: false })
      console.error('Error loading events:', error)
    }
  },
  getEvents: () => {
    const { events } = get()
    if (events.length === 0) {
      console.warn('No events loaded yet, fetching...')
      get().loadEvents() // Load events if not already loaded
      return []
    }
    if (events.length === 0) {
      console.warn('No events available')
      return []
    }
    return events
  },
  getById: (id: string): SelectEvent[] | undefined => {
    const { events } = get() // Obtener el estado actual del store
    return events.find((event) => event.id === id)
  }
}))
