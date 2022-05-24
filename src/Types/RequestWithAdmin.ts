import { Request } from 'express';
import Admin from './Admins';

interface RequestWithAdmin extends Request {
  user: Admin;
}

export default RequestWithAdmin;