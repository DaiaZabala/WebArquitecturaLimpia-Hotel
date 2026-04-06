// apps/backend/src/infrastructure/InMemoryUserRepository.ts

import { User, UserData } from '../../../../domain/src/entities/User';
import { UserRepository } from '../../../../domain/src/services/UserRepository';
import { v4 as uuid } from 'uuid'; 

// 💡 Hash simulado de la contraseña "testPassword123"
// En una DB real, estos hashes son generados por bcrypt.
const SIMULATED_HASH = '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 

// 💡 BASE DE DATOS INICIAL CON 10 USUARIOS (Precarga)
const usersDatabase: User[] = [
    new User(uuid(), 'admin@hotel.com', SIMULATED_HASH, 'admin'),
    new User(uuid(), 'recepcion@hotel.com', SIMULATED_HASH, 'receptionist'),
    new User(uuid(), 'juan.perez@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'maria.gomez@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'carlos.ruiz@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'laura.diaz@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'javier.soto@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'ana.lopez@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'elena.rojas@hotel.com', SIMULATED_HASH, 'client'),
    new User(uuid(), 'daniel.vega@hotel.com', SIMULATED_HASH, 'client'),
];


export class InMemoryUserRepository implements UserRepository {
  
  async save(data: UserData): Promise<User> {
    const id = uuid();
    const newUser = new User(id, data.email, data.passwordHashed, data.role);
    usersDatabase.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    // 💡 Asegura la búsqueda por el email
    const user = usersDatabase.find(u => u.email === email);
    return user || null;
  }
  
  async findById(id: string): Promise<User | null> {
      return usersDatabase.find(u => u.id === id) || null;
  }
}