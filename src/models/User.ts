import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import validator from 'validator';

// 데이터베이스 설정
const db = new JsonDB(new Config("myDatabase", true, false, '/'));
const dir: string = '/users';

// 사용자 모델 정의
interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

// 사용자 생성 함수
async function createUser(user: User): Promise<User> {
    if (getUserByEmail(user.email)) throw new Error('Email already exists.');
    if (!validator.isEmail(user.email)) throw new Error('Inbalid email format.');
    
    const users = db.getData(dir) as unknown as User[];
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    user.id = lastId + 1;
    users.push(user);

    await db.push(dir, users);
    await db.save();

    return user;
}

async function updateUser(user: User): Promise<User> {
    let getUser = await getUserByEmail(user.email);

    if (getUser == null) throw new Error('Email is not exists.');

    user.id = getUser.id;
    user.email = getUser.email;

    
    await db.save();

    return getUser;
}

async function getUserByEmail(email: string): Promise<User | null> {
    const users = await db.getData(dir) as unknown as User[];

    return users.find(user => user.email === email) || null;
}