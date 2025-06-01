import { authRoutes, protectedRoutes } from "@router/routes"
import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routes } from "@router/routes"


export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)) {
    request.cookies.delete("currentUser");
    const loginUrl = new URL(routes.login.route, request.url);

    // Realizar la redirección sin utilizar la función redirect
    const response = new NextResponse("", { status: 302, headers: { Location: loginUrl.pathname } });
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    const dashboardUrl = new URL(routes.dashboard.route, request.url);

    // Realizar la redirección sin utilizar la función redirect
    const response = new NextResponse("", { status: 302, headers: { Location: dashboardUrl.pathname } });

    return response;
  }
}

export default createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "es",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
