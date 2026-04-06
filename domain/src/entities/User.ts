// domain/src/entities/User.ts

export interface UserData {
  email: string;
  passwordHashed: string;
  role: 'client' | 'receptionist' | 'admin';
}

export class User {
  constructor(
    public id: string,
    public email: string,
    public passwordHashed: string,
    public role: 'client' | 'receptionist' | 'admin',
    public isActive: boolean = true
  ) {}
}