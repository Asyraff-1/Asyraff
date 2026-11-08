import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        {
          'bg-slate-800 text-slate-100': variant === 'default',
          'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20': variant === 'success',
          'bg-amber-500/10 text-amber-500 border border-amber-500/20': variant === 'warning',
          'bg-red-500/10 text-red-500 border border-red-500/20': variant === 'destructive',
          'border border-slate-700 text-slate-300': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
