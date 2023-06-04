import { User } from "@domains/entities/user";
import { createUserUseCase } from "./create-user-usecase";
// import UserRepository from "../gateway/user-repository";

describe("CreateUserUseCase", () => {
  // Testa se classe está definida
  it("should be defined", () => {
    expect(createUserUseCase).toBeDefined();
  });

  it("should create a user", async () => {
    const repository: any = {
      create: jest.fn(),
      list: () => ({} as any),
      delete: () => ({} as any),
    };
    const req = {
      name: "any_name",
      email: "any_email",
      password: "any_password",
    };
    await createUserUseCase(req, repository);

    expect(repository.create.mock.calls.length > 0).toBeTruthy();
    expect(repository.create).toBeCalledWith(
      expect.objectContaining({
        PK: "USER#any_email",
        email: "any_email",
        name: "any_name",
        password: "any_password",
      })
    );
  });

  it("should return a user", async () => {
    const repository: any = {
      create: jest.fn(),
      list: () => ({} as any),
      delete: () => ({} as any),
    };
    const req = {
      name: "any_name",
      email: "any_email",
      password: "any_password",
    };
    const user = await createUserUseCase(req, repository);

    expect(user).toMatchObject({
      PK: "USER#any_email",
      email: "any_email",
      name: "any_name",
      password: "any_password",
    });

    expect(user).toBeInstanceOf(User);
  });

  it("should throw an error when password is less than 6 characters", async () => {
    const repository: any = {
      create: jest.fn(),
      list: () => ({} as any),
      delete: () => ({} as any),
    };
    const req = {
      name: "any_name",
      email: "any_email",
      password: "12345",
    };
    await expect(createUserUseCase(req, repository)).rejects.toThrow(
      "Usuário inválido"
    );
  });
});
