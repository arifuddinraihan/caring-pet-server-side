/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthUser } from "../../interface/common";
import prisma from "../../shared/prisma";
import { AdoptionRequest } from "@prisma/client";

type TAdoptionRequestDataBody = {
  petId: string;
  petOwnershipExperience: string;
};

const AddAdoptionRequestIntoDB = async (
  user: IAuthUser,
  req: TAdoptionRequestDataBody
): Promise<AdoptionRequest> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const currentUserData = await transactionClient.user.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const adoptionRequestData = {
      petId: req.petId,
      userId: currentUserData.id,
      petOwnershipExperience: req.petOwnershipExperience,
    };

    const addedAdoptionRequestData =
      await transactionClient.adoptionRequest.create({
        data: adoptionRequestData,
      });

    return addedAdoptionRequestData;
  });

  return result;
};

const getAllAdoptionsFromDB = async () => {
  const quiredAdoptionRequestsData = await prisma.adoptionRequest.findMany({
    where: {},
  });

  return quiredAdoptionRequestsData;
};

const getUserAdoptionsFromDB = async (id: string) => {
  const userAdoptionRequestsData = await prisma.adoptionRequest.findMany({
    where: {
      userId: id,
    },
    select: {
      userId: true,
      petId: true,
      pet: true,
      status: true,
      createdAt: true,
      petOwnershipExperience: true,
    },
  });

  return userAdoptionRequestsData;
};

const updateAdoptionRequestStatusIntoDB = async (
  id: string,
  data: Partial<AdoptionRequest>
) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.adoptionRequest.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const updatedAdoptionRequestData =
      await transactionClient.adoptionRequest.update({
        where: {
          id,
        },
        data,
      });

    return updatedAdoptionRequestData;
  });

  return result;
};

export const AdoptionServices = {
  AddAdoptionRequestIntoDB,
  getAllAdoptionsFromDB,
  getUserAdoptionsFromDB,
  updateAdoptionRequestStatusIntoDB,
};
