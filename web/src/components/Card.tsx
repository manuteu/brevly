import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`p-8 bg-white rounded-lg ${className}`}>
      {children}
    </div>
  );
}
