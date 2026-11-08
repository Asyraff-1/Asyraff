import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  delta?: number;
}

export function StatCard({ title, value, icon: Icon, description, delta }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || delta !== undefined) && (
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            {delta !== undefined && (
              <span className={cn(
                "inline-flex items-center",
                delta > 0 ? "text-emerald-500" : delta < 0 ? "text-red-500" : "text-slate-400"
              )}>
                {delta > 0 ? '+' : ''}{delta}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
