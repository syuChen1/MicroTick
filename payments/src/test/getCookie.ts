import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const getCookie = async (id?: string) => {
  //Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Built session Object. {  JWT: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string thats the cookies with the encoded data
  return [`express:sess=${base64}`];
};

export { getCookie };
