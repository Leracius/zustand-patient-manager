type PatientDetailItemProps = {
  label: string;
  data: string;
};

export default function PatientDetailtItem({
  label,
  data,
}: PatientDetailItemProps) {
  return (
    <p className="font-bold text-slate-500 p-1 uppercase">
      {label}:{" "}
      <span className="font-normal normal-case text-white">{data}</span>
    </p>
  );
}
