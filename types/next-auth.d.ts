declare module "next-auth" {
  interface Client {
    name: string;
    email: string;
    id: string;
  }
}

export {};
