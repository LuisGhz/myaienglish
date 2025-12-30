export interface RegisterReqModel {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResModel {
  message: string;
}
