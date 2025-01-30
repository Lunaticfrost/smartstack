import * as React from "react"

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

export function toast({ title, description }: ToastProps) {
  alert(`${title}\n${description}`);
}

export function Toast({ title, description }: ToastProps) {
  return (
    <div className={`rounded-md p-4 bg-gray-50 text-gray-900`}>
      <h3 className="font-medium">{title}</h3>
      {description && <p className="mt-1 text-sm">{description}</p>}
    </div>
  );
} 