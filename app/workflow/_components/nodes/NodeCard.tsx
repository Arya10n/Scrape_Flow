'use client';

import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';
import React from 'react';

function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  nodeId: string;
  isSelected: boolean;
  children: React.ReactNode;
}) {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 border-separate border-black dark:border-amber-50 w-[420px] text-xs gap-1 flex flex-col',
        isSelected && 'border-primary dark:border-primary'
      )}>
      {children}
    </div>
  );
}
export default NodeCard;
