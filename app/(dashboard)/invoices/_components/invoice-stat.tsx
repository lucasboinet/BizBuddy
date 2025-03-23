import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  value: React.ReactNode;
  subtitle: React.ReactNode;
}

export default function InvoiceStat({ icon, title, value, subtitle }: Props) {
  const Icon = icon;

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2 pt-6">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-2xl font-bold text-primary">{value}</h3>
        <div className="text-sm text-gray-600 flex items-end justify-between">
          <span>{subtitle}</span>
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}