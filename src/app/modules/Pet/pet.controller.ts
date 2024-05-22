import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PetServices } from "./pet.service";
import pick from "../../shared/pick";
import { petFilterableFields } from "./pet.constant";

const createPetProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.createPetProfileIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

const getAllPets = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PetServices.getAllPetsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateSinglePet = catchAsync(async (req: Request, res: Response) => {
  const { petId } = req.params;

  const result = await PetServices.updateSinglePetIntoDB(petId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pet profile updated successfully",
    data: result,
  });
});

export const PetController = {
  createPetProfile,
  getAllPets,
  updateSinglePet,
};