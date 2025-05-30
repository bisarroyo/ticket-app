import { SignIn } from '@clerk/nextjs'
export default function Page() {
  return (
    <section className='container'>
      <div className='flex flex-col items-center justify-center min-h-fit py-5 w-full'>
        <SignIn />
      </div>
    </section>
  )
}
