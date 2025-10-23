// domain/src/services/AuthService.ts

// Define el contrato para generar tokens y comparar hashes
export interface AuthService {
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(userId: string, userRole: string): string;
}