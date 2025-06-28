function InputTicket({
  handleClickRemoveTicket,
  handleClickAddTicket,
  value
}: {
  handleClickRemoveTicket: () => void
  handleClickAddTicket: () => void
  value: number
}) {
  return (
    <div className='flex flex-row items-center justify-between mx-4 gap-2 min-w-24 bg-amber-600 rounded-md px-2 py-1'>
      <div
        className='cursor-pointer bg-amber-300 w-6 text-center rounded-full'
        onClick={handleClickRemoveTicket}>
        -
      </div>
      <div>{value}</div>
      <div
        className='cursor-pointer bg-amber-300 w-6 text-center rounded-full'
        onClick={handleClickAddTicket}>
        +
      </div>
    </div>
  )
}

export default InputTicket
