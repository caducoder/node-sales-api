type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
