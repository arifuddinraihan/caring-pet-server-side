import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdoptionServices } from "./adoption.service";
import { IAuthUser } from "../../interface/common";

const createAdoptionRequest = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await AdoptionServices.AddAdoptionRequestIntoDB(
      req.user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

const getAllAdoptions = catchAsync(async (req: Request, res: Response) => {
  const result = await AdoptionServices.getAllAdoptionsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const updateAdoptionRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    const result = await AdoptionServices.updateAdoptionRequestStatusIntoDB(
      requestId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Adoption request updated successfully",
      data: result,
    });
  }
);

export const AdoptionController = {
  createAdoptionRequest,
  getAllAdoptions,
  updateAdoptionRequestStatus,
};
