// domain/src/services/BcryptPasswordHasher.ts

import * as bcrypt from 'bcrypt'; 
import { PasswordHasher } from '../../../../ts-intro/domain/src/services/PasswordHasher';

const SALT_ROUNDS = 10;
 

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        // La librería bcrypt es asíncrona, así que 'await' es correcto.
        return bcrypt.hash(password, SALT_ROUNDS);
    }
}