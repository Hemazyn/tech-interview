import Image from 'next/image';
import Link from 'next/link';
import { tip } from '@/assets';
import { ThemeSwitcher } from '@/components';

const Header = () => {
     return (
          <div className="absolute flex flex-row items-center justify-between w-full px-5 py-4">
               <Link href="/" className="flex items-center cursor-pointer">
                    <Image src={tip} alt="App Logo" width={50} height={50} className="rounded-full" />
               </Link>
               <ThemeSwitcher />
          </div>
     );
};

export default Header;