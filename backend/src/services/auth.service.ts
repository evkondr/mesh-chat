import { SignupDto } from "@/types/dto";

export class AuthService {
  async signup(dto:SignupDto) {
    // logic
    console.log(dto);
  }
}