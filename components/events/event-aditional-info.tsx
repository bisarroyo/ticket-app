type Props = {
  details: string[] | undefined
}

export default function EventAditionalInfo({ details }: Props) {
  if (details?.length === 0) {
    return <></>
  }
  return (
    <div className=''>
      <h3 className='text-2xl font-semibold'>Información adicional</h3>
      <ul>
        {details?.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  )
}
