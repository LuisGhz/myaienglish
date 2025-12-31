export interface JwtPayloadModel {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
