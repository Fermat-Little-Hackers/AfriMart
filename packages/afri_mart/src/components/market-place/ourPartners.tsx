import Image from 'next/image';
import React from 'react'
import logoAliExpress from '../../../public/image/partners/AliExpress-logo.png';
import logoAya from '../../../public/image/partners/Aya logo.png';
import logoStarknet from '../../../public/image/partners/Starknet Logo.webp';
import logoSpeedafExpress from '../../../public/image/partners/speedafExpress.png';
import starknetLogo from '../../../public/image/partners/starknet logo.png';
import logoWeb3Bridge from '../../../public/image/partners/web3bridge.webp'
import { Container } from '../Container';

const OurPartners = () => {
  return (
    <Container className="bg-art-bg w-full p-12">
      {/* <div className="max-w-2xl mx-auto"> */}
      <div className="">
        <p className=" text-center text-[var(--charcoal)] font-serif text-xl font-extrabold">
          Some of our partners
        </p>
        <ul className="mt-8 flex items-center justify-between space-x-8 sm:flex-col sm:space-x-0 sm:space-y-10 xl:flex-row xl:space-y-0 xl:space-x-12">
          <li>
            <ul className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
              <li className="flex">
                <Image
                  src={logoWeb3Bridge}
                  alt="Web 3 Bridge"
                  layout="fixed"
                  width={2500}
                  unoptimized
                />
              </li>
              <li className="flex">
                <Image src={logoAya} alt="Aya" layout="fixed" unoptimized width={2500} />
              </li>
              <li className="flex">
                <Image
                  src={logoAliExpress}
                  alt="Ali Express"
                  layout="fixed"
                  width={2500}
                  unoptimized
                />
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
              <li className="flex">
                <Image
                  src={logoStarknet}
                  alt="Starknet"
                  layout="fixed"
                  width={3000}
                  unoptimized
                />
              </li>
              <li className="flex">
                <Image
                  src={logoSpeedafExpress}
                  alt="Speed of Express"
                  layout="fixed"
                  width={2500}
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