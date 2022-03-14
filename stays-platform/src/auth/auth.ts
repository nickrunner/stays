import * as express from "express";

import { Error401 } from "../error";
import { Role, UserRecord } from "../models";
import { UsersService } from "../users/usersService";
import { AuthService } from "./authService";

export type AuthenticatedRequest = {
  email?: string;
  thisUser?: UserRecord;
} & express.Request;

async function firebaseAuthentication(request: express.Request): Promise<AuthenticatedRequest> {
  if (!request.headers.authorization) {
    console.log("Authentication error: Auth header not found");
    throw new Error401();
  }
  let token = "";
  try {
    token = request.headers.authorization as string;
    token = token.replace("Bearer ", "");
  } catch {
    console.log("Authentication error: token not valid");
    throw new Error401();
  }

  const authService: AuthService = new AuthService();
  const email: string = await authService.verifyToken(token);
  if (!email) {
    console.log("No email associated with this token... not authorized");
    throw new Error401();
  }

  const authenticatedRequest: AuthenticatedRequest = request;
  authenticatedRequest.email = email;
  console.log("Firebase authentication complete for user: " + authenticatedRequest.email);
  return authenticatedRequest;
}

async function staysAuthorization(
  authenticatedRequest: AuthenticatedRequest,
  scopes?: string[]
): Promise<AuthenticatedRequest> {
  let user: UserRecord;
  if (!authenticatedRequest.email) {
    throw new Error401();
  }
  const userService: UsersService = new UsersService();
  try {
    user = await userService.getUserByEmail(authenticatedRequest.email);
    user.lastActive = Date.now();
  } catch {
    console.log("Error: user was authenticated but not found in stays database.");
    if (scopes) {
      throw new Error401("User was authenticated but not found in Stays database");
    }
    return authenticatedRequest;
  }
  try {
    console.log("Updating last active");
    await userService.updateUser(user.id, { lastActive: Date.now() });
  } catch {
    console.log("Failed updating last active time for user");
  }

  authenticatedRequest.thisUser = user;
  authenticatedRequest.email = user.email;

  if (user.roles.includes(Role.Admin)) {
    console.log("Admin... allow");
    return authenticatedRequest;
  }

  if (!scopes) {
    console.log("No scopes required... allow");
    return authenticatedRequest;
  }
  if (scopes.length <= 0) {
    console.log("No scopes required... allow");
    return authenticatedRequest;
  }

  const roles = scopes as Role[];
  for (const role of roles) {
    if (!user.roles.includes(role)) {
      console.log("Authentication error. Action requires role: " + role);
      throw new Error401();
    }
    console.log("Role: " + role + " authenticated!");
  }
  console.log("Auth complete. Returning authenticated request!");
  return authenticatedRequest;
}

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<express.Request> {
  let authenticatedRequest: AuthenticatedRequest = request;

  if (securityName == "firebase") {
    try {
      authenticatedRequest = await firebaseAuthentication(request);
      return authenticatedRequest;
    } catch (e) {
      console.log("Authentication error: ", { e });
      throw new Error401();
    }
  } else if (securityName == "user") {
    try {
      console.log("Performing user authentication for scopes: ", { scopes });
      authenticatedRequest = await firebaseAuthentication(request);
      await staysAuthorization(authenticatedRequest, scopes);
      return authenticatedRequest;
    } catch (e) {
      console.log("Authentication error: ", { e });
      throw new Error401();
    }
  }
  return authenticatedRequest;
}
