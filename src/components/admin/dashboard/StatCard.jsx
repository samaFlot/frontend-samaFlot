
export default function StatCard({ label, value, valueColor, iconBg, icon: Icon, iconColor, footerText, footerIcon: FooterIcon, footerColor }) {
  return (
    <div className="flex flex-1 flex-col rounded-[20px] bg-white p-8 shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
      <div className="flex items-center justify-between pb-4">
        <span className="text-base font-medium tracking-tight text-gray-500">
          {label}
        </span>
        <span className={`flex size-10 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </span>
      </div>
      <span className={`text-4xl font-bold leading-10 ${valueColor}`}>
        {value}
      </span>
      <div className="flex items-center gap-2 pt-4">
        <FooterIcon className={`h-3 w-3 shrink-0 ${footerColor}`} />
        <span className={`text-xs font-medium ${footerColor}`}>
          {footerText}
        </span>
      </div>
    </div>
  );
}