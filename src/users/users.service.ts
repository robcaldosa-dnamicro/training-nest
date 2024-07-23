import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juandelacruz@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'mariasantos@yahoo.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Pedro Garcia',
      email: 'pedrogarcia@hotmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Ana Reyes',
      email: 'anareyes@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Josefina Abad',
      email: 'jabad@yahoo.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDTO,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDTO: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDTO };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
