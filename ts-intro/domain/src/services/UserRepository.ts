// domain/src/services/UserRepository.ts

import { User, UserData } from '../entities/User';

export interface UserRepository {
  save(user: UserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>; 
  findById(id: string): Promise<User | null>;
}