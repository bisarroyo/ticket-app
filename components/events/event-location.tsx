// type Props = {
//   location: string
// }

export default function EventLocation() {
  const position = { lat: 53.54992, lng: 10.00678 }
  return (
    <div className='w-full h-auto rounded-b-xl overflow-hidden'>
      <h3 className='text-2xl font-semibold'>Ubicación</h3>
      <p>{position.lat}</p>
      <p>{position.lng}</p>
    </div>
  )
}
