type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

interface Role {
  id: string;
  name: string;
}

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
  moduleId?: number;
}

interface IUpdateUserRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
