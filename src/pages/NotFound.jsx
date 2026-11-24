import useSEO from '../hooks/useSEO'
import Button from '../components/Button'
import Img from '../components/Img'
import { img } from '../data/media'

export default function NotFound() {
  useSEO({ title: 'Page Not Found', description: 'The page you are looking for could not be found.', path: '/404' })
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-forest-950 px-5 text-center text-white">
      <Img id={img.keralaPaddy} alt="" eager className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 to-forest-950/40" />
      <div className="relative">
        <p className="font-display text-[8rem] font-extrabold leading-none text-gold-400 md:text-[12rem]">404</p>
        <h1 className="display-md mt-2">This field hasn&apos;t been ploughed yet.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to Home</Button>
          <Button to="/services" variant="outlineLight">
            View Services
          </Button>
        </div>
      </div>
    </section>
  )
}
