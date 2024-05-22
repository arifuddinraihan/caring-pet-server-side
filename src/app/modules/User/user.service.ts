/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IAuthUser } from "../../interface/common";
import prisma from "../../shared/prisma";

const getCurrentUserFromDB = async (user: IAuthUser) => {
  const currentUserData = await prisma.user.findUniqueOrThrow({
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

  return currentUserData;
};

const updateCurrentUserIntoDB = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const updatedUserData = await prisma.user.update({
    where: {
      email: userInfo.email,
    },
    data: req.body,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUserData;
};

export const UserServices = {
  getCurrentUserFromDB,
  updateCurrentUserIntoDB,
};
