export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
  accounts?: Account[];
}

export interface Account {
  id: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
}
