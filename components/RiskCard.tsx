import { AlertTriangle, Info } from "lucide-react";

interface RiskProps {
  level: "high" | "medium" | "low";
  title: string;
  description: string;
}

export default function RiskCard({ level, title, description }: RiskProps) {
  const colors = {
    high: "border-red-200 bg-red-50 text-red-800",
    medium: "border-orange-200 bg-orange-50 text-orange-800",
    low: "border-green-200 bg-green-50 text-green-800",
  };

  return (
    <div className={`p-4 border-l-4 rounded-r-xl mb-4 shadow-sm transition-all hover:scale-[1.01] ${colors[level]}`}>
      <div className="flex items-center mb-2 font-bold uppercase text-xs tracking-wider">
        {level === "high" ? <AlertTriangle className="mr-2" size={16} /> : <Info className="mr-2" size={16} />}
        {title}
      </div>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}