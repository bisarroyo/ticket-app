import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  location: string
  name: string
  url: string
  date: string
  time: string
  image: string
}

export default function CardEvent({
  location,
  name,
  url,
  date,
  time,
  image
}: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(url)
  }
  return (
    <div onClick={handleClick} className='w-full cursor-pointer'>
      <div className='bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-2'>
        <div className='aspect-16/7 rounded-2xl overflow-hidden'>
          <Image
            src={image}
            width={500}
            height={300}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <div className='pt-4 '>
          <div className='flex items-center gap-2 h-12'>
            <h3 className='text-md font-semibold'>{name}</h3>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin size={16} />
            <p className='text-md'>{location}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={16} />
            <p className='text-md'>{date}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Clock size={16} />
            <p className='text-md'>{time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
