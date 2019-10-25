export const omit = (obj: any, path: string | string[]) => {
  if (!obj) {
    return;
  }

  const keys: string[] = Array.isArray(path) ? path : [path];
  const entity = { ...obj };
  for (const key of keys) {
    key in entity && delete entity[key];
  }

  return entity;
};

export const roundNumber = (num: number) => Math.round(num * 1e2) / 1e2;
