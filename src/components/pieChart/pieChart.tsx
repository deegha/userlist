import React from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';

interface IPieChart {
  data: Array<{ value: number; label: string }>;
}

export const PieChart = ({ data }: IPieChart) => {
  const width = 200;
  const height = 200;
  const radius = Math.min(width, height) / 2;
  const donutThickness = radius / 2;

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.01}
        >
          {(pie) =>
            pie.arcs.map((arc, index) => {
              const [centroidX, centroidY] = pie.path.centroid(arc);
              return (
                <g key={`arc-${arc.data.label}`}>
                  <path
                    d={pie.path(arc)!}
                    fill={`hsl(${index * 36}, 70%, 60%)`}
                  />
                  <text
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fill="white"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {arc.data.label}
                  </text>
                </g>
              );
            })
          }
        </Pie>
      </Group>
    </svg>
  );
};
