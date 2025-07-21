import React from 'react';
import clsx from 'clsx';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    outline: 'border border-gray-300 text-gray-800',
    success: 'bg-green-100 text-green-800',
    destructive: 'bg-red-100 text-red-800',
    secondary: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}