import { verify } from "jsonwebtoken";

interface TokenPayload {
  company_id: string;
  iat: number;
  exp: number;
  user_id: string;
}

function verifyToken( authHeader: string, jwtSecret: string ): TokenPayload {
  const [, token] = authHeader.split(' ');
  const decoded = verify(token, jwtSecret);

  const payload  = decoded as TokenPayload;

  return payload;
}

export default verifyToken;
