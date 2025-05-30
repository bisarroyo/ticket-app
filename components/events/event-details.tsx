import { format } from '@formkit/tempo'

import Badge from '@/components/ui/badge'
import { Calendar, MapPin } from 'lucide-react'

type Props = {
  date: string
  location: string
  isAvailable: boolean
}

export default function EventDetails({ date, location }: Props) {
  return (
    <div className='grid gap-4 mb-8'>
      <Badge
        title={format(date, 'dddd, D MMMM', 'es')}
        content={`${format(date, 'HH:mm', 'es')} - ${format(
          date,
          'HH:mm',
          'es'
        )}`}
        icon={<Calendar size={40} />}
      />
      <Badge
        title={location}
        content='San José, CR'
        icon={<MapPin size={40} />}
      />
    </div>
  )
}
