import Image from "next/image";
import { useRouter } from "next/router";
import { FiHome } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbNotification } from "react-icons/tb";
import { HiOutlineWallet } from "react-icons/hi2";
import { PiListBulletsBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdHouseSiding } from "react-icons/md";
import { LiaCarSideSolid } from "react-icons/lia";

export const GettingStartedIcon = () => (
  <Image
    layout="fixed"
    src="/images/started-img.png"
    alt=""
    width={30}
    height={30}
  />
);

export const GetKgtinIcon = () => (
  <Image
    layout="fixed"
    src="/images/ID img.png"
    alt=""
    width={30}
    height={30}
  />
);

export const KgtinIcon = () => (
  <Image
    layout="fixed"
    src="/images/TIN.svg"
    alt="Tin Icon"
    width={30}
    height={30}
  />
);

export const ResidentialProperty = () => (
  <Image
    layout="fixed"
    src="/images/enumeration/res.svg"
    alt="Tin Icon"
    width={30}
    height={30}
  />
);

export const CommercialProperty = () => (
  <Image
    layout="fixed"
    src="/images/enumeration/comm.svg"
    alt="Tin Icon"
    width={30}
    height={30}
  />
);

export const KgPerson = () => (
  <Image
    layout="fixed"
    src="/images/user.svg"
    alt="user"
    width={27}
    height={27}
  />
);

export const KgDate = () => (
  <Image
    layout="fixed"
    src="/images/date.svg"
    alt="date"
    width={27}
    height={27}
  />
);
export const TaxpayerIcon = () => (
  <Image layout="fixed" src="/images/TP.png" alt="" width={30} height={30} />
);
export const TokenIcon = () => (
  <Image layout="fixed" src="/images/token.png" alt="" width={30} height={30} />
);

export const Password = () => (
  <Image
    layout="fixed"
    src="/images/password.svg"
    alt=""
    width={30}
    height={30}
  />
);

export const PasswordIcon = () => (
  <Image
    layout="fixed"
    src="/images/pw img.png"
    alt=""
    width={30}
    height={30}
  />
);
export const PasswordIcon2 = () => (
  <Image
    layout="fixed"
    src="/images/pw2 img.png"
    alt=""
    width={30}
    height={30}
  />
);
export const PasswordShowIcon = () => (
  <Image layout="fixed" src="/images/see.svg" alt="" width={20} height={20} />
);
export const PasswordHideIcon = () => (
  <Image layout="fixed" src="/images/nosee.svg" alt="" width={20} height={20} />
);

export const KgirsLogo = () => {
  return (
    <Image
      layout="fixed"
      src="/images/logo1.png"
      alt=""
      width={203.6}
      height={38.4}
    />
  );
};
export const ABirsLogo = () => {
  return (
    <Image
      layout="fixed"
      src="/images/logoabia.png"
      alt=""
      width={303.6}
      height={70.4}
    />
  );
};

export const HazardIcon = () => {
  return (
    <Image
      layout="fixed"
      src="/images/warning.png"
      alt=""
      width={35}
      height={25}
    />
  );
};

//table icons
export const SuccessIcon = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/succ.png"
      alt=""
      width={13}
      height={13}
    />
  );
};
export const PendingIcon = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/pend.png"
      alt=""
      width={13}
      height={13}
    />
  );
};
export const OpenMailIcon = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/mailopen.png"
      alt=""
      width={23}
      height={23}
    />
  );
};

//dashboard icons
export const TotalRemittance = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/total_rem.svg"
      alt=""
      width={30}
      height={30}
    />
  );
};

export const PendingRemittance = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/pending_rem.svg"
      alt=""
      width={30}
      height={30}
    />
  );
};

export const RevenueItems = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/rev_items_blu.svg"
      alt=""
      width={30}
      height={30}
    />
  );
};

export const DirectAssessment = () => {
  return (
    <div className="mx-6 flex items-center">
      <Image
        layout="fixed"
        src="/images/icons/Direct_assessment.png"
        alt=""
        width={18}
        height={18}
      />
    </div>
  );
};

export const PAYE = () => {
  return (
    <div className="mx-6 flex items-center">
      <Image
        layout="fixed"
        src="/images/icons/paye.png"
        alt=""
        width={18}
        height={18}
      />
    </div>
  );
};

export const TaxReceipt = () => {
  return (
    <Image
      layout="fixed"
      src="/images/icons/receipt.svg"
      alt=""
      width={30}
      height={30}
    />
  );
};

//navigation icons
export const Dashboard = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (pathname === "/dashboard") {
    return (
      <div className="mx-6 flex items-center text-white">
        <FiHome className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <FiHome className="w-6 h-6" />
    </div>
  );
};

export const Wallet = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (pathname === "/wallet") {
    return (
      <div className="mx-6 flex items-center text-white">
        <HiOutlineWallet className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <HiOutlineWallet className="w-6 h-6" />
    </div>
  );
};
export const Enumeration = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (pathname === "/enumeration") {
    return (
      <div className="mx-6 flex items-center text-white">
        <PiListBulletsBold className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <PiListBulletsBold className="w-6 h-6" />
    </div>
  );
};

export const Profile = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (pathname === "/user-profile") {
    return (
      <div className="mx-6 flex items-center text-white">
        <CgProfile className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <CgProfile className="w-6 h-6" />
    </div>
  );
};
export const MyVehicles = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (pathname === "/user-profile") {
    return (
      <div className="mx-6 flex items-center text-white">
        <LiaCarSideSolid className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <LiaCarSideSolid className="w-6 h-6" />
    </div>
  );
};
export const MyProperties = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (pathname === "/user-profile") {
    return (
      <div className="mx-6 flex items-center text-white">
        <MdHouseSiding className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <MdHouseSiding className="w-6 h-6" />
    </div>
  );
};

export const FileReturns = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (
    [
      "/uploads/annual",
      "/uploads/monthly",
      "/uploads/withholding",
      "/view/annual",
      "/view/monthly",
      "/view/withholding",
    ].includes(pathname)
  ) {
    return (
      <div className="mx-6 flex items-center">
        <Image
          layout="fixed"
          src="/images/icons/file_returns_blu.png"
          alt="login"
          width={18}
          height={18}
        />
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center">
      <Image
        layout="fixed"
        src="/images/icons/file_returns.png"
        alt="login"
        width={19}
        height={19}
      />
    </div>
  );
};

export const Invoice = () => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (
    [
      "/payment/new-payment",
      "/payment/payment-history",
      "/payment/pending-invoice",
    ].includes(pathname)
  ) {
    return (
      <div className="mx-6 flex items-center text-white">
        <BiMoneyWithdraw className="w-6 h-6"/>
      </div>
    );
  }
  return (
    <div className="mx-6 flex items-center text-gray-500">
      <BiMoneyWithdraw className="w-6 h-6"/>
    </div>
  );
};

export const UserGuide = () => {
  return (
    <div className="mr-6 ml-5 flex items-center text-gray-500">
      {/* <Image
        layout="fixed"
        src="/images/icons/guide.png"
        alt="login"
        width={19}
        height={19}
      /> */}
      <TbNotification className="w-7 h-7"/>
    </div>
  );
};
