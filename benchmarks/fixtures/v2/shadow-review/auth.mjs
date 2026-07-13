export function runProtected(session, handler) {
  if (!session) {
    throw new Error("Authentication required");
  }

  const result = handler();

  if (session.revoked) {
    throw new Error("Session revoked");
  }

  return result;
}
