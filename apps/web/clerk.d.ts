/**
 * Augment Clerk's session claims with our custom publicMetadata shape.
 * This gives middleware and server code full type safety when reading
 * sessionClaims.metadata without casting.
 */
declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      onboardingComplete?: boolean;
    };
  }
}

export {};
