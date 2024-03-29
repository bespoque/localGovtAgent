import {
  FiToggleLeft,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiHelpCircle,
  FiShoppingCart,
  FiHome,
} from 'react-icons/fi';
import {
  Dashboard,
  DirectAssessment,
  FileReturns,
  Invoice,
  PAYE,
  UserGuide,
  Wallet,
} from '../../components/Icons/index';

const initialState = [
  {
    title: 'Applications',
    items: [
      {
        url: '/dashboard',
        icon: <Dashboard />,
        title: 'Dashboard',
        items: [],
      },
      {
        url: '/',
        icon: <Invoice />,
        title: 'PAYMENT',
        items: [
          {
            url: '/payment/new-payment',
            title: 'New Payment',
            items: [],
          },
          {
            url: '/payment/payment-history',
            title: 'Payment History',
            items: [],
          },
          {
            url: '/payment/pending-invoice',
            title: 'Due Payment',
            items: [],
          },
          {
            url: '/payment/demand-notices',
            title: 'Demand Notices',
            items: [],
          },
        ],
      },
      {
        url: '/wallet',
        icon: <Wallet />,
        title: 'Wallet',
        items: [],
      },
      {
        url: '/',
        icon: <FileReturns />,
        title: 'FILE RETURNS',
        items: [
          {
            title: 'PAYE Monthly',
            items: [
              // { title: 'PAYE annual', url: '/uploads/annual', items: [] },
              { title: 'Upload', url: '/uploads/monthly', items: [] },
              {
                title: 'View',
                url: '/view/monthly',
                items: [],
              },
            ],
          },
          {
            title: 'PAYE Annual',
            items: [
              { title: 'File Returns', url: '/file-annual-returns', items: [] },
              { title: 'List Returns', url: '/list-annual-returns', items: [] },
              // { title: 'Upload CSV', url: '/uploads/annual', items: [] },
              // {
              //   title: 'View',
              //   url: '/view/annual',
              //   items: [],
              // },
              // { title: 'Upload Document', url: '/uploads/annualdocs', items: [] },
              // { title: 'View document', url: '/view/viewdocuments', items: [] },

            ],
          },
          {
            title: 'Withholding',
            items: [
              // { title: 'PAYE annual', url: '/view/annual', items: [] },
              { title: 'Upload', url: '/uploads/withholding', items: [] },
              {
                title: 'View',
                url: '/view/withholding',
                items: [],
              },
            ],
          },
        ],
      },

      // {
      //   url: '/',
      //   icon: <Invoice />,
      //   title: 'TCC',
      //   items: [
      //     {
      //       url: '',
      //       title: 'Apply',
      //       items: [],
      //     },
      //     {
      //       url: '',
      //       title: 'View',
      //       items: [],
      //     },
      //     {
      //       url: '/payment/pending-invoice',
      //       title: 'Unpaid Assessment',
      //       items: [],
      //     },
      //   ],
      // },
      // {
      //   url: '/',
      //   icon: <DirectAssessment />,
      //   title: 'DEMAND NOTICES',
      //   items: [
      //     {
      //       title: 'MY NOTICES',
      //       items: [
      //         {
      //           title: 'View',
      //           url: '/view/assessments',
      //           items: []
      //         }
      //       ],
      //     },
      //     {
      //       title: 'MY RECEIPTS',
      //       items: [
      //         {
      //           title: 'View',
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
      //       title: 'TRANSPORT ENUMERATION',
      //       items: [
      //         {
      //           title: 'View',
      //           url: '/view/paye-tcc',
      //           items: []
      //         }
      //       ],
      //     },
      //     {
      //       title: 'MARKET ENUMERATION',
      //       items: [
      //         {
      //           title: 'View',
      //           url: '/view/paye-tcc',
      //           items: []
      //         }
      //       ],
      //     },
      //     {
      //       title: 'SIGNANGE ENUMNERATION',
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
        url: '#',
        icon: <UserGuide />,
        title: 'USER GUIDE',
        items: [],
      },

      // {
      //   url: "/",
      //   icon: <FiList size={20} />,
      //   title: "Menu levels",
      //   items: Array.from(Array(4).keys()).map((i) => {
      //     return {
      //       url: "/",
      //       title: `Level 1-${i + 1}`,
      //       items: Array.from(Array(4).keys()).map((j) => {
      //         return {
      //           url: "/",
      //           title: `Level 2-${j + 1}`,
      //           items: Array.from(Array(4).keys()).map((k) => {
      //             return {
      //               url: "/",
      //               title: `Level 3-${k + 1}`,
      //               items: Array.from(Array(4).keys()).map((l) => {
      //                 return {
      //                   url: "/",
      //                   title: `Level 4-${l + 1}`,
      //                   items: [],
      //                 };
      //               }),
      //             };
      //           }),
      //         };
      //       }),
      //     };
      //   }),
      // },
      // {
      //   url: '/',
      //   icon: <FiStar size={20} />,
      //   title: 'Demos',
      //   badge: {
      //     color: 'bg-indigo-500 text-white',
      //     text: 6,
      //   },
      //   items: [
      //     {
      //       url: '/demo-1',
      //       title: 'Light background',
      //       items: [],
      //     },
      //     {
      //       url: '/demo-2',
      //       title: 'Dark background',
      //       items: [],
      //     },
      //     {
      //       url: '/demo-4',
      //       title: 'Dark sidebar',
      //       items: [],
      //     },
      //     {
      //       url: '/demo-3',
      //       title: 'Small sidebar',
      //       items: [],
      //     },
      //     {
      //       url: '/demo-5',
      //       title: 'Dark small sidebar',
      //       items: [],
      //     },
      //     {
      //       url: '/demo-6',
      //       title: 'Dark navbar',
      //       items: [],
      //     },
      //   ],
      // },
      // {
      //   url: '/',
      //   icon: <FiShoppingCart size={20} />,
      //   title: 'E-commerce',
      //   items: [
      //     {
      //       url: '/e-commerce',
      //       title: 'Products',
      //       items: [],
      //     },
      //     {
      //       url: '/invoice',
      //       title: 'Invoice',
      //       items: [],
      //     },
      //     {
      //       url: '/pricing-tables',
      //       title: 'Pricing tables',
      //       items: [],
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   title: "Components",
  //   items: [
  //     {
  //       url: "/",
  //       icon: <FiDroplet size={20} />,
  //       title: "UI Elements",
  //       items: [
  //         {
  //           url: "/badges",
  //           title: "Badges",
  //           items: [],
  //         },
  //         {
  //           url: "/breadcrumbs",
  //           title: "Breadcrumbs",
  //           items: [],
  //         },
  //         {
  //           url: "/buttons",
  //           title: "Buttons",
  //           items: [],
  //         },
  //         {
  //           url: "/dropdowns",
  //           title: "Dropdowns",
  //           items: [],
  //         },
  //         {
  //           url: "/images",
  //           title: "Images",
  //           items: [],
  //         },
  //         {
  //           url: "/lists",
  //           title: "Lists",
  //           items: [],
  //         },
  //         {
  //           url: "/progress-bars",
  //           title: "Progress bars",
  //           items: [],
  //         },
  //         {
  //           url: "/pagination",
  //           title: "Pagination",
  //           items: [],
  //         },
  //         {
  //           url: "/tabs",
  //           title: "Tabs",
  //           items: [],
  //         },
  //         {
  //           url: "/typography",
  //           title: "Typography",
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       url: "/",
  //       icon: <FiCalendar size={20} />,
  //       title: "Forms",
  //       badge: {
  //         color: "bg-indigo-500 text-white",
  //         text: 6,
  //       },
  //       items: [
  //         {
  //           url: "/default-forms",
  //           title: "Default forms",
  //           items: [],
  //         },
  //         {
  //           url: "/sample-forms",
  //           title: "Sample forms",
  //           items: [],
  //         },
  //         {
  //           url: "/sliders",
  //           title: "Sliders",
  //           items: [],
  //         },
  //         {
  //           url: "/datepicker",
  //           title: "Date picker",
  //           items: [],
  //         },
  //         {
  //           url: "/switches",
  //           title: "Switches",
  //           items: [],
  //         },
  //         {
  //           url: "/steps",
  //           title: "Form steps",
  //           items: [],
  //         },
  //         {
  //           url: "/validation",
  //           title: "Form validation",
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       url: "/",
  //       icon: <FiGrid size={20} />,
  //       title: "Tables",
  //       items: [
  //         {
  //           url: "/default-tables",
  //           title: "Default tables",
  //           items: [],
  //         },
  //         {
  //           url: "/datatables",
  //           title: "Datatables",
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       url: "/",
  //       icon: <FiClock size={20} />,
  //       title: "Notifications",
  //       badge: {
  //         color: "bg-indigo-500 text-white",
  //         text: 2,
  //       },
  //       items: [
  //         {
  //           url: "/alerts",
  //           title: "Alerts",
  //           items: [],
  //         },
  //         {
  //           url: "/notifications",
  //           title: "Notifications",
  //           items: [],
  //         },
  //         {
  //           url: "/modals",
  //           title: "Modals",
  //           items: [],
  //         },
  //         {
  //           url: "/popovers",
  //           title: "Popovers",
  //           items: [],
  //         },
  //         {
  //           url: "/tooltips",
  //           title: "Tooltips",
  //           items: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Pages",
  //   items: [
  //     {
  //       url: "/",
  //       icon: <FiCopy size={20} />,
  //       title: "Authentication",
  //       badge: {
  //         color: "bg-indigo-500 text-white",
  //         text: 7,
  //       },
  //       items: [
  //         {
  //           url: "/contact-us-1",
  //           title: "Contact us",
  //           items: [],
  //         },
  //         {
  //           url: "/login-1",
  //           title: "Login 1",
  //           items: [],
  //         },
  //         {
  //           url: "/login-2",
  //           title: "Login 2",
  //           items: [],
  //         },
  //         {
  //           url: "/login-3",
  //           title: "Login 3",
  //           items: [],
  //         },
  //         {
  //           url: "/create-account",
  //           title: "Create account",
  //           items: [],
  //         },
  //         {
  //           url: "/email-confirmation",
  //           title: "Email confirmation",
  //           items: [],
  //         },
  //         {
  //           url: "/logout",
  //           title: "Logout",
  //           items: [],
  //         },
  //         {
  //           url: "/reset-password",
  //           title: "Reset password",
  //           items: [],
  //         },
  //         {
  //           url: "/forgot-password",
  //           title: "Forgot password",
  //           items: [],
  //         },
  //         {
  //           url: "/lock-screen",
  //           title: "Lock screen",
  //           items: [],
  //         },
  //         {
  //           url: "/subscribe",
  //           title: "Subscribe",
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       url: "/",
  //       icon: <FiUser size={20} />,
  //       title: "User",
  //       items: [
  //         {
  //           url: "/user-profile",
  //           title: "User profile",
  //           items: [],
  //         },
  //         {
  //           url: "/social-feed",
  //           title: "Social feed",
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       url: "/",
  //       icon: <FiClock size={20} />,
  //       title: "Pages",
  //       items: [
  //         {
  //           url: "/support-1",
  //           title: "Support",
  //           items: [],
  //         },
  //         {
  //           url: "/empty-page",
  //           title: "Empty page",
  //           items: [],
  //         },
  //         {
  //           url: "/terms-of-service",
  //           title: "Terms of service",
  //           items: [],
  //         },
  //         {
  //           url: "/privacy-policy",
  //           title: "Privacy policy",
  //           items: [],
  //         },
  //         {
  //           url: "/error-page",
  //           title: "Error page",
  //           items: [],
  //         },
  //         {
  //           url: "/coming-soon",
  //           title: "Coming soon",
  //           items: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Other",
  //   items: [
  //     {
  //       url: "/",
  //       icon: <FiPieChart size={20} />,
  //       title: "Charts",
  //       badge: {
  //         color: "bg-indigo-500 text-white",
  //         text: 4,
  //       },
  //       items: [
  //         {
  //           url: "/bar-charts",
  //           title: "Bar charts",
  //           items: [],
  //         },
  //         {
  //           url: "/line-charts",
  //           title: "Line and area charts",
  //           items: [],
  //         },
  //         {
  //           url: "/pie-charts",
  //           title: "Pie and doughnut charts",
  //           items: [],
  //         },
  //         {
  //           url: "/other-charts",
  //           title: "Other charts",
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       url: "/",
  //       icon: <FiToggleLeft size={20} />,
  //       title: "Icons",
  //       items: [
  //         {
  //           url: "/react-icons",
  //           title: "React icons",
  //           items: [],
  //         },
  //         {
  //           url: "/country-flags",
  //           title: "Country flags",
  //           items: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Docs",
  //   items: [
  //     {
  //       url: "/documentation",
  //       icon: <FiHelpCircle size={20} />,
  //       title: "Documentation",
  //       items: [],
  //     },
  //   ],
  // },
  // {
  //   title: "Intro",
  //   items: [
  //     {
  //       url: "/landing",
  //       icon: <FiHome size={20} />,
  //       title: "Home page",
  //       items: [],
  //     },
  //   ],
  // },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
