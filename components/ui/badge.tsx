import { cn } from '@/lib/utils'

type Props = {
  title: string
  content?: string
  icon: React.ReactNode
}

export default function Badge({ title, content, icon }: Props) {
  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_3fr] items-center gap-4 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg w-80'
      )}>
      <div className='flex justify-end items-center'>{icon}</div>
      <div className='flex flex-col items-start text-md text-slate-800'>
        <p className='capitalize'>{title}</p>
        <p>{content}</p>
      </div>
    </div>
  )
}
