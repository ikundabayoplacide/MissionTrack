import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secretkey } from "../utils/helper";

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  role: "admin" | "manager" | "employee" | "finance_manager" | string;
}

export const checkRoleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return ResponseService({
          status: 401,
          res,
          message: "Not Authorized",
          success: false,
          data: null,
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, secretkey) as UserPayload;

      // console.log("Token 😉 :", decoded);

      if (!allowedRoles.includes(decoded.role)) {
        return ResponseService({
          status: 403,
          res,
          data: null,
          message: "You do not have permission to perform this action",
          success: false,
        });
      }

      (req as any).user = decoded;

      next();
    } catch (error) {
      return ResponseService({
        res,
        data: null,
        message: "Invalid or expired token",
        status: 401,
        success: false,
      });
    }
  };
};
