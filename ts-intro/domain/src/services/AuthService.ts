// domain/src/services/AuthService.ts

// Define el contrato para generar tokens y comparar hashes
export interface AuthService {
  // 1. Para comparar la contraseña plana con el hash de la base de datos
  comparePassword(password: string, hash: string): Promise<boolean>;
  
  // 2. Para generar el token JWT después de un login exitoso
  generateToken(userId: string, userRole: string): string;
}