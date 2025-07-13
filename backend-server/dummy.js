import bcrypt from 'bcrypt';

const password = 'demo123';
const hash = await bcrypt.hash(password, 10);
console.log(hash);
