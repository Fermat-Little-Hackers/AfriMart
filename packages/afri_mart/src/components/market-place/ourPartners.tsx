import Image from 'next/image';
import React from 'react'
import logoLaravel from '../../../public/image/logos/laravel.svg';
import logoMirage from '../../../public/image/logos/mirage.svg';
import logoStatamic from '../../../public/image/logos/statamic.svg';
import logoStaticKit from '../../../public/image/logos/statickit.svg';
import logoTransistor from '../../../public/image/logos/transistor.svg';
import logoTuple from '../../../public/image/logos/tuple.svg'
import { Container } from '../Container';

const OurPartners = () => {
  return (
    <Container className="bg-art-bg w-full p-12">
      <div className="max-w-2xl mx-auto">
        <p className=" text-center text-[var(--charcoal)] font-serif text-xl font-extrabold">
          Some of our partners
        </p>
        <ul className="mt-8 flex items-center justify-center space-x-8 sm:flex-col sm:space-x-0 sm:space-y-10 xl:flex-row xl:space-y-0 xl:space-x-12">
          <li>
            <ul className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
              <li className="flex">
                <Image
                  src={logoTransistor}
                  alt="Transistor"
                  layout="fixed"
                  unoptimized
                />
              </li>
              <li className="flex">
                <Image src={logoTuple} alt="Tuple" layout="fixed" unoptimized />
              </li>
              <li className="flex">
                <Image
                  src={logoStaticKit}
                  alt="StaticKit"
                  layout="fixed"
                  unoptimized
                />
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
              <li className="flex">
                <Image
                  src={logoMirage}
                  alt="Mirage"
                  layout="fixed"
                  unoptimized
                />
              </li>
              <li className="flex">
                <Image
                  src={logoLaravel}
                  alt="Laravel"
                  layout="fixed"
                  unoptimized
                />
              </li>
              <li className="flex">
                <Image
                  src={logoStatamic}
                  alt="Statamic"
                  layout="fixed"
                  unoptimized
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default OurPartners