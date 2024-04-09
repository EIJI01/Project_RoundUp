import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: any;
}

export interface UserResponse {
  faculty:string;
  firstName:string;
  lastName:string;
  // password:string;
  phoneNumber:string;
  studentId: string;
  email:string
}
