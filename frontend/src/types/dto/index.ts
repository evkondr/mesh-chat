export type SignUpDto = {
  email: string
  name: string
  password: string
}
export type LoginDto = Omit<SignUpDto, 'fullName'>

export type SendMessageDto = {
  text: string
  image?: File
}