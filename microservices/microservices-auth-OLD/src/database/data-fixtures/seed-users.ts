import { DataSource } from 'typeorm';
import {User} from "../../users/entities/user.entity";

export async function seedUsers(dataSource: DataSource) {
    const usersRepository = dataSource.getRepository(User);

    const users = [
        usersRepository.save({
            id: 1,
            email: 'admin@mail.fr',
            password: '$2b$10$tc5l0kN3mhDCO6GvPhlvpeT4mt/prAsTz7Uo9LCRj6n.GmlRIAjba', // admin-password
            role: { id: 1 }, // admin
        }),
        usersRepository.save({
            id: 2,
            email: 'user@mail.fr',
            password: '$2b$10$ll5ojSRsBT4t5OUgLD5youjno.q2uN9i8JYAKyRpO8IrygkoZknDi', // user-password
            role: { id: 2 }, // user
        }),
    ];

    await Promise.all(users);
}
