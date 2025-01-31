import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        disabled:pointer-events-none disabled:opacity-50
        ${variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
        ${className}`}
      {...props}
    />
  )
} 