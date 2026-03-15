export type SignUpDto = {
  email: string
  fullName: string
  password: string
}
export type LoginDto = Omit<SignUpDto, 'fullName'>