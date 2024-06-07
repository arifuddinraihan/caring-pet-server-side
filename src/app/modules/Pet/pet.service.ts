/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../shared/prisma";
import { Pet, Prisma } from "@prisma/client";
import { petSearchableFields } from "./pet.constant";
import { paginationHelper } from "../../helper/paginationHelper";

const createPetProfileIntoDB = async (req: Pet): Promise<Pet> => {
  //   console.log(req);
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdPetData = await transactionClient.pet.create({
      data: req,
    });
    return createdPetData;
  });
  return result;
};

const createManyPetProfilesIntoDB = async (req: Pet): Promise<Pet[]> => {
  //   console.log(req);
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdMultiplePetData = await transactionClient.pet.createManyAndReturn({
      data: req,
      skipDuplicates: true,
    });
    return createdMultiplePetData;
  });
  return result;
};

const getDemoPetsFromDB = async () => {
  const result = await prisma.pet.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getAllPetsFromDB = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, age, ...filterData } = params;

  const andConditions: Prisma.PetWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: petSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (age) {
    const convertedAge = Number(age);
    andConditions.push({
      AND: {
        age: convertedAge,
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // console.dir(andConditions, { depth: "infinity" });

  const whereConditions: Prisma.PetWhereInput = { AND: andConditions };

  const result = await prisma.pet.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSinglePetIntoDB = async (id: string, data: Partial<Pet>) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.pet.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const updatedPetData = await transactionClient.pet.update({
      where: {
        id,
      },
      data,
    });

    return updatedPetData;
  });

  return result;
};

const deleteSinglePetFromDB = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.pet.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const removedPetData = await transactionClient.pet.delete({
      where: {
        id,
      },
    });

    return removedPetData;
  });

  return result;
};

export const PetServices = {
  createPetProfileIntoDB,
  createManyPetProfilesIntoDB,
  getDemoPetsFromDB,
  getAllPetsFromDB,
  updateSinglePetIntoDB,
  deleteSinglePetFromDB,
};
