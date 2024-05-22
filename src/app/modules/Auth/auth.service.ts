import * as bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import AppError from "../../errors/AppError";
import { jwtHelpers } from "../../helper/jwtHelper";
import config from "../../config";
import { User } from "@prisma/client";

type TUserRegister = {
  name: string;
  email: string;
  password: string;
};

const createUserIntoDB = async (req: TUserRegister): Promise<Partial<User>> => {
  // console.log("from auth service => ", req);
  const hashedPassword: string = await bcrypt.hash(req.password, 12);

  const result = await prisma.user.create({
    data: {
      name: req.name,
      email: req.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      adoptionRequests: false,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
  refreshToken,
};
