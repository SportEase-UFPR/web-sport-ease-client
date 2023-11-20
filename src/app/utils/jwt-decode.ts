import jwt_decode from 'jwt-decode';
import { Token } from '../shared/models/token/token.model';

export class JwtDecode {
  static decode(token: string): Token {
    const decodeToken: Token = jwt_decode(token);
    return decodeToken;
  }
}
