import { TUser } from '@/types/user';

export function formatDataToChart(data: Array<TUser>) {
  const output: Record<string, number> = {};

  data.forEach((item) => {
    const key = `${item.name}-${item.age}-${item.city}`;

    output[key] = (output[key] || 0) + 1;
  });

  return Object.entries(output)
    .map(([label, value]) => ({ label, value }))
    .slice(0, 14);
}
