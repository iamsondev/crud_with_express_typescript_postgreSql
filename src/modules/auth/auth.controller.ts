import { Request, Response } from "express";
import { authAServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authAServices.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "logged in successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  loginUser,
};
