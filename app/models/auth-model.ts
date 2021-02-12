export type UserModel = {
  id: number;
  username: string;
  countryId: number;
  name: string;
  lastName: string;
  birthdate: any;
  email: string;
  phone: string;
  avatarId: number;
  welcomed: boolean;
  showAnnouncement: boolean;
  announcementVersion: string;
};

export type AuthResponseData = {
  user: UserModel;
  xAuthToken: string;
};

export type AuthResponseDataType = AuthResponseData | any;
