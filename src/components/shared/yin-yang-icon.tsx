import React from 'react';

export function YinYangIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.866 8.167 6.834 9.556A10 10 0 0 1 12 22a10 10 0 0 1 0-20z" fill="currentColor"/>
      <circle cx="12" cy="7" r="1.5" fill="black" />
      <circle cx="12" cy="17" r="1.5" fill="white" />
    </svg>
  );
}
