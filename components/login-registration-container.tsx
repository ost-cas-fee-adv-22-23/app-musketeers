import { FC, ReactNode } from 'react';
import Image from 'next/image';

interface LoginRegistrationContainerProps {
  children: ReactNode;
}

export const LoginRegistrationContainer: FC<LoginRegistrationContainerProps> = ({ children }) => {
  return (
    <>
      <main className={'flex'}>
        <div
          className={
            'flex flex-col items-center justify-center h-screen w-1/2 bg-gradient-to-br from-pink-500 to-violet-600 text-white hidden lg:flex'
          }
        >
          <div className={'max-w-md flex flex-col items-center'}>
            <Image className={'w-80 mb-m'} src={'/mumble-logo.svg'} width={340} height={170} alt={''} />
            <span className={'heading-2 text-pink-300 align-middle text-center'}>
              Find out whats new in <span className={'text-white'}>#fashion.</span>
            </span>
          </div>
        </div>
        <div className={'flex flex-col items-center column justify-center h-screen w-full lg:w-1/2'}>
          <div className={'max-w-sm w-full p-m'}>{children}</div>
        </div>
      </main>
    </>
  );
};
