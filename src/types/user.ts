export type TUser = {
  id: string;
  createdAt: string;
  name: string;
  age: string;
  city: string;
  occupation: string;
};

export type TUserCreate = {
  name: string;
  age: string;
  city: string;
  occupation: string;
};
