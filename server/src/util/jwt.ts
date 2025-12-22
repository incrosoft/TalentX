import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

type user = {
  id: number;
  role: string;
};

export class JWTService {
  //Generate Token for user
  static generateToken(userInformation: user) {
    return jwt.sign(userInformation, JWT_SECRET);
  }

  //Verify the Token for the user
  static decodeToken(Token: any) {
    return jwt.verify(Token, JWT_SECRET);
  }

  //Extract the cookie
  static extractToken(req: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      return token;
    }
    return null;
  }
}
