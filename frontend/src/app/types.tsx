export type ProfileDetail = {
  firstName: string;
  lastName: string;
  adress: string;
  image: string;
  phone: number;
};

export type UserContextProps = {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  setUserId: (id: number | null) => void;
};

export type User = {
  id: number;
  username: string;
  email: string;
  profile?: ProfileDetail;
};
