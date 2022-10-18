interface DuoInfoProps {
  label: string;
  value: string;
  colorValue?: string;
}

export function DuoInfo({ label, value, colorValue }: DuoInfoProps) {
  return (
    <div className="w-full flex flex-col">
      <span className="text-gray-300 text-sm">{label}</span>
      <span className={`text-sm text-white font-bold ${colorValue}`}>
        {value}
      </span>
    </div>
  );
}
