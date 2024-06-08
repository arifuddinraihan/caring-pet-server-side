/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IAuthUser } from "../../interface/common";
import prisma from "../../shared/prisma";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  // console.log(searchTerm);

  const andConditions: Prisma.UserWhereInput[] = [];

  //console.log(filterData);
  // if (params) {
  //   andConditions.push({
  //     OR: [{ role: UserRole.ADMIN }, { role: UserRole.USER }],
  //   });
  // }

  if (searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? { AND: andConditions }
      : { OR: [{ role: UserRole.ADMIN }, { role: UserRole.USER }] };

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePhoto: true,
      activeStatus: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
    },
  });

  const total = await prisma.user.count({
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

const getMyProfileFromDB = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      activeStatus: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePhoto: true,
      adoptionRequests: true,
      activeStatus: true,
    },
  });

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.USER) {
    profileInfo = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

const updateMyProfileIntoDB = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      activeStatus: UserStatus.ACTIVE,
    },
  });

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.USER) {
    profileInfo = await prisma.user.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

const changeProfileStatusIntoDB = async (id: string, status: UserRole) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profilePhoto: true,
      activeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updateUserStatus;
};

const changeProfileRoleToAdminIntoDB = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const adminData = await prisma.admin.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (!adminData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createNewAdmin = await prisma.admin.create({
      data: {
        name: userData.name,
        email: userData.email,
      },
    });

    const updateUserStatus = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePhoto: true,
        activeStatus: true,
        createdAt: true,
        updatedAt: true,
        admin: true,
      },
    });

    return updateUserStatus;
  }
  throw new AppError(httpStatus.BAD_REQUEST, "This user is already an Admin");
};

export const UserServices = {
  getAllFromDB,
  getMyProfileFromDB,
  updateMyProfileIntoDB,
  changeProfileStatusIntoDB,
  changeProfileRoleToAdminIntoDB,
};
