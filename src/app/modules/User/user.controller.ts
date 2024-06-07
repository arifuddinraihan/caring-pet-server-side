import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { IAuthUser } from "../../interface/common";
import pick from "../../shared/pick";
import { userFilterableFields } from "./user.constant";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await UserServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserServices.getMyProfileFromDB(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateCurrentUserProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await UserServices.updateMyProfileIntoDB(
      user as IAuthUser,
      req
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully!",
      data: result,
    });
  }
);

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.changeProfileStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const changeProfileRoleToAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.changeProfileRoleToAdminIntoDB(
      id,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated to Admin role successfully!",
      data: result,
    });
  }
);

export const UserController = {
  getAllUsers,
  getMyProfile,
  updateCurrentUserProfile,
  changeProfileStatus,
  changeProfileRoleToAdmin,
};
