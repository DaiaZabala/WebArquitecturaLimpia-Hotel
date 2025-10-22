// apps/backend/src/infrastructure/InMemoryUserRepository.ts

import { User, UserData } from '../../../../domain/src/entities/User';
import { UserRepository } from '../../../../domain/src/services/UserRepository';
import { v4 as uuid } from 'uuid'; 
// Simula la "Base de Datos" de usuarios
const usersDatabase: User[] = [];

export class InMemoryUserRepository implements UserRepository {
  
  async save(data: UserData): Promise<User> {
    const id = uuid();
    const newUser = new User(id, data.email, data.passwordHashed, data.role);
    usersDatabase.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = usersDatabase.find(u => u.email === email);
    return user || null;
  }
  
  async findById(id: string): Promise<User | null> {
      return usersDatabase.find(u => u.id === id) || null;
  }
}