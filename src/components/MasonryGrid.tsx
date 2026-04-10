import React from 'react';

interface MasonryGridProps {
  children: React.ReactNode;
}

export default function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {React.Children.map(children, (child) => (
        <div className="break-inside-avoid">
          {child}
        </div>
      ))}
    </div>
  );
}
