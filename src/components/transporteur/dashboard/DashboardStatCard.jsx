export default function DashboardStatCard({
  label,
  value,
  valueColor = "text-sky-950",
}) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <span className="text-sm font-medium leading-5 text-slate-500">
        {label}
      </span>

      <span className={`text-3xl font-bold leading-9 ${valueColor}`}>
        {value}
      </span>
    </div>
  );
}