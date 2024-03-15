import React from 'react'
import {SignupNoID} from '../../components/Images/Images'; 
import { TokenModals, TokenModalsOverlay } from '../../components/modals/Modal';
import CreateNoIDAccount from '../../components/Form/CreateNoIDAccount';
const index = () => {
  return (
    <section className='w-full'>
    <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay>

      <div className="flex justify-center w-full">
        <div className="flex justify-between mx-auto  w-full lg:px-8 md:px-2">

          <div className="bg-white shadow-xl flex items-center justify-center md:w-full py-6 md:py-10 rounded-xl">
            <div className=" w-96">
              <CreateNoIDAccount />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default index;