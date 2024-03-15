import { IbejuLekkiLogo } from "../Images/Images";
import Link from "next/link";
export const Header = () => {
  return (
    // <div className="w-full font-serif mt-20 md:mt-32">
    <div className="w-full mt-10 md:mt-20">
      <div className="flex justify-center items-center">
        <div className="">
          <Link href="/" className="border-white border-3 ">
            <div className="flex space-x-3 items-center">
              <IbejuLekkiLogo />
              <div className="text-justify leading-2">
                <p className="uppercase text-emerald-600 text-xl font-bold">
                  Ibeju Lekki
                </p>
                <p className="uppercase text-emerald-600 text-sm font-bold -my-1 ">
                  Local Government
                </p>
                <p className="uppercase text-xs text-yellow-400 ">
                  igando-oloja
                </p>
              </div>
            </div>
            {/* <IbejuLekkiLogo /> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
