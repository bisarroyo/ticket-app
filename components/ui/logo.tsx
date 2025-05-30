type Props = {
  width?: string
  height?: string
}

export default function Logo({ width = '50', height = '50' }: Props) {
  return (
    <svg
      version='1.1'
      viewBox='0 0 1146 1146'
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        transform='translate(67,213)'
        d='m0 0h20l13 3 14 7 11 9 297 297 7 10 6 13 3 13v18l-4 16-8 15-12 13-292 292-13 9-12 5-9 2h-21l-15-4-12-6-10-8-9-10-6-10-5-16-1-8v-598l3-16 4-10 9-13 8-8 12-8 13-5z'
        className='fill-primary'
      />
      <path
        transform='translate(1065,208)'
        d='m0 0h11l16 3 11 5 11 7 7 6 9 12 5 11 3 11 1 8-1 132-4 446-1 26-4 15-7 13-11 12-8 6-14 7-11 3-16 1-14-2-15-6-11-8-302-302-8-14-4-12-1-6v-19l3-13 8-16 11-12 300-300 13-8 15-5z'
        className='fill-primary'
      />
      <path
        transform='translate(565,710)'
        d='m0 0h12l12 2 13 5 10 6 12 11 293 293 7 10 6 13 3 17-1 16-3 12-7 14-9 11-11 9-12 6-10 3-7 1h-604l-16-4-12-6-10-8-9-10-8-16-3-10-1-7v-14l3-14 5-12 9-12 301-301 11-7 11-5z'
        className='fill-primary'
      />
      <path
        transform='translate(271,9)'
        d='m0 0h607l16 4 13 7 12 11 8 11 5 11 3 11 1 7v12l-3 15-8 16-8 10-297 297-14 9-13 5-11 2h-14l-14-3-12-5-11-8-24-24-8-7-250-250-8-7-9-9-9-12-6-12-3-11v-24l4-14 6-12 8-10 9-8 12-7 12-4z'
        className='fill-primary'
      />
    </svg>
  )
}
