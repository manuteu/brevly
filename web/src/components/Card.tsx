import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`md:p-8 p-6 bg-white rounded-lg ${className}`}>
      {children}
    </div>
  );
}
