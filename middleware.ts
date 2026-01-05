export { default } from "next-auth/middleware";

export const config = {
  // This protects "/" and any other page you want
  matcher: ["/"],
};
