import createHttpError from "http-errors";
import customersRepository from "../repositories/customersRepository.js";

async function CreateCustomerService(data: ICreateCustomerRequest) {
  const emailExists = await customersRepository.findByEmail(
    data.email.toLowerCase()
  );

  if (emailExists) {
    throw createHttpError(404, "Email already used.");
  }

  const customer = await customersRepository.create({
    ...data,
  });

  return customer;
}

async function ListCustomerService() {
  const customersList = await customersRepository.findAll();

  return customersList;
}

async function RemoveCustomerService(id: number) {
  await customersRepository.remove(id);
}

export default {
  CreateCustomerService,
  ListCustomerService,
  RemoveCustomerService,
};
