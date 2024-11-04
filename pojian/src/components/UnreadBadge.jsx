import React from 'react';

export default function UnreadBadge() {
  return (
    <div className="absolute -top-1 -right-1">
      <span className="block w-2 h-2 bg-red-500 rounded-full" />
    </div>
  );
}