export interface IUser {
    id: string;
    firebaseUid: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    picture: string;
    provider: string;
    isVerified: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUserResponse {
    success: boolean;
    message: string;
    data?: IUser;
  }