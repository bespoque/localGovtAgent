import {
  Dashboard,
  Profile,
  Invoice,
  PAYE,
  UserGuide,
  Wallet,
  Enumeration,
  MyVehicles,
  MyProperties,
} from "../../components/Icons/index";

const initialState = [
  {
    title: "Applications",
    items: [
      {
        url: "/dashboard",
        icon: <Dashboard />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/",
        icon: <Invoice />,
        title: "Payment",
        items: [
          {
            url: "/payment/new-payment",
            title: "New Payment",
            items: [],
          },
          {
            url: "/payment/payment-history",
            title: "Payment History",
            items: [],
          },
          {
            url: "/payment/pending-invoice",
            title: "Due Payment",
            items: [],
          },
          {
            url: "/payment/demand-notices",
            title: "Demand Notices",
            items: [],
          },
        ],
      },
      {
        url: "/wallet",
        icon: <Wallet />,
        title: "Wallet",
        items: [],
      },
      {
        url: "/",
        icon: <Enumeration />,
        title: "Enumeration",
        items: [
          {
            url: "/enumeration/transport",
            title: "Vehicle",
            items: [],
          },
          {
            url: "/enumeration/property",
            title: "Property",
            items: [],
          },
        ],
      },
      {
        url: "/my-vehicles",
        icon: <MyVehicles />,
        title: "My Vehicles",
        items: [],
      },
      {
        url: "/my-properties",
        icon: <MyProperties />,
        title: "My Properties",
        items: [],
      },
      {
        url: "/user-profile",
        icon: <Profile />,
        title: "Profile",
        items: [],
      },
      // {
      //   url: '/',
      //   icon: <DirectAssessment />,
      //   title: 'DEMAND NOTICES',
      //   items: [
      //     {
      //       title: 'My Notices',
      //       items: [
      //         {
      //           title: 'View Demand',
      //           url: '/view/assessments',
      //           items: []
      //         }
      //       ],
      //     },
      //     {
      //       title: 'My Receipts',
      //       items: [
      //         {
      //           title: 'View Payment Receipt',
      //           url: '/view/tcc',
      //           items: []
      //         }
      //       ],
      //     }
      //   ],
      // },
      // {
      //   url: '/',
      //   icon: <PAYE />,
      //   title: 'ENUMERATION',
      //   items: [
      //     {
      //       title: 'Transport Business',
      //       items: [
      //         {
      //           title: 'View',
      //           url: '/view/paye-tcc',
      //           items: []
      //         }
      //       ],
      //     },
      //     {
      //       title: 'Market Enumeration',
      //       items: [
      //         {
      //           title: 'View',
      //           url: '/view/paye-tcc',
      //           items: []
      //         }
      //       ],
      //     },
      //     {
      //       title: 'Signange Enumeration',
      //       items: [
      //         {
      //           title: 'View',
      //           url: '/view/paye-tcc',
      //           items: []
      //         }
      //       ],
      //     },
      //   ],
      // },

      {
        url: "#",
        icon: <UserGuide />,
        title: "User Guide",
        items: [],
      },
    ],
  },
];

export default function individualNavigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
