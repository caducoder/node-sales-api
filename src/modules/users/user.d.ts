type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
};

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}