import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Получает роль пользователя из различных источников
 * Сначала пытается получить из sessionClaims (для middleware),
 * затем из publicMetadata (для компонентов)
 */
export async function getUserRole(): Promise<string | undefined> {
  try {
    // Для middleware и server components
    const authObj = await auth();
    const { sessionClaims } = authObj || {};

    if (sessionClaims) {
      // Пытаемся получить из publicMetadata в sessionClaims
      const publicMetadata = sessionClaims?.publicMetadata as
        | { role?: string }
        | undefined;
      if (publicMetadata?.role) {
        return publicMetadata.role;
      }

      // Fallback на metadata (если настроен JWT template)
      const metadata = sessionClaims?.metadata as { role?: string } | undefined;
      if (metadata?.role) {
        return metadata.role;
      }
    }

    // Для компонентов, где доступен currentUser
    const user = await currentUser();
    if (user?.publicMetadata?.role) {
      return user.publicMetadata.role as string;
    }

    return undefined;
  } catch (error) {
    console.error("Error getting user role:", error);
    return undefined;
  }
}

/**
 * Получает роль из sessionClaims (для использования в middleware)
 */
export function getRoleFromSessionClaims(
  sessionClaims: any
): string | undefined {
  if (!sessionClaims) return undefined;

  // Пытаемся получить из publicMetadata
  const publicMetadata = sessionClaims?.publicMetadata as
    | { role?: string }
    | undefined;
  if (publicMetadata?.role) {
    return publicMetadata.role;
  }

  // Fallback на metadata
  const metadata = sessionClaims?.metadata as { role?: string } | undefined;
  if (metadata?.role) {
    return metadata.role;
  }

  return undefined;
}
