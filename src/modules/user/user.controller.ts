import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      success: false,
      message: "Data inserted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "users not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userService.updateUser(
      name,
      email,
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(500).json({
        success: true,
        message: "update users data successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id!);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "users not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
