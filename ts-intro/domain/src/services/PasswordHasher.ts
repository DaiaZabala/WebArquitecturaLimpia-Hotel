// domain/src/services/PasswordHasher.ts

export interface PasswordHasher {
  hash(password: string): Promise<string>;
}