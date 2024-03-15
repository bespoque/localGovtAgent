import { ProgressBar } from "../progress-bars";

const NoticeMsg = () => {
  const items = [
    {
      title: "TAX PAYMENT RECEIVED",
      // percent: 33,
      // color: 'bg-green-500'
    },
    {
      title: "SUBMITTED ANNUAL RETURNS",
      // percent: 50,
      // color: 'bg-yellow-500'
    },
    {
      title: "TAX PAYMENT RECEIVED",
      // percent: 66,
      // color: 'bg-emerald-500'
    },
    // {
    //   title: 'Database backup',
    //   // percent: 25,
    //   // color: 'bg-indigo-500'
    // },
    // {
    //   title: 'Release version 1.4',
    //   // percent: 80,
    //   // color: 'bg-teal-500'
    // }
  ];
  return (
    <>
      <div className="dropdown-title">Messages</div>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div className="flex flex-col p-2 dropdown-item" key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm">{item.title}</div>
              {/* <div className="text-xs whitespace-nowrap">{item.percent}%</div> */}
            </div>
            {/* <ProgressBar
              width={parseInt(item.percent, 10)}
              color={item.color}
            /> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default NoticeMsg;
