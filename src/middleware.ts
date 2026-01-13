import {
  auth,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

// console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) auth().protect()

  try {
    const authObj = await auth();
    const { sessionClaims } = authObj || {};

    // Если нет сессии, пропускаем проверку ролей (для публичных страниц)
    if (!sessionClaims) {
      return;
    }

    const role = (sessionClaims?.metadata as { role?: string })?.role;

    for (const { matcher, allowedRoles } of matchers) {
      if (matcher(req) && role && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      }
    }
  } catch (error) {
    // Игнорируем ошибки JWT (например, token-not-active-yet)
    // Это позволяет приложению продолжать работу, пока токен не станет активным
    console.error("Middleware auth error:", error);
    return;
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
