import { DTOPostRegister } from "@/domain/dtos/DTOPostRegister";
import { DTOPostRegisterResponse } from "@/domain/dtos/DTOPostRegisterResponse";
import { IRRegister } from "@/domain/interfaces/IRRegister";

export default class UCRegister {
  private readonly registerRepository: IRRegister;

  constructor({ registerRepository }: { registerRepository: IRRegister }) {
    this.registerRepository = registerRepository;
  }

  public async execute(
    payload: DTOPostRegister,
  ): Promise<DTOPostRegisterResponse> {
    const payloadCopy = { ...payload };
    const userTimezoneOffset =
      payloadCopy.birthDate!.getTimezoneOffset() * 60000;
    payloadCopy.birthDate = new Date(
      payloadCopy.birthDate!.getTime() - userTimezoneOffset,
    );
    // add +49 prefix to phone number and ensure its not added multiple times
    payloadCopy.phoneNumber = payloadCopy.phoneNumber.startsWith("+49")
      ? payloadCopy.phoneNumber
      : `+49${payloadCopy.phoneNumber}`;
    return this.registerRepository.register(payloadCopy);
  }
}
