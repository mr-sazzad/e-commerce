export interface IMeta {
  total: number;
  page: number;
  size: number;
}

export interface IResponse {
  data: any;
  meta?: IMeta;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
