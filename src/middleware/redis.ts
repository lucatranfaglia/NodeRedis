import { Request, Response, NextFunction } from "express";
import { createClient } from 'redis';
require('dotenv').config();
const client = createClient();
client.on('error', error => console.log('Redis Client Error', error));

/**
 * Connect Redis
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const connectRedis = async (req: Request, res: Response, next: NextFunction) =>{  
  await client.connect();
  return next();
}

/**
 * Store and retrieve a simple string.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const getRedis = async (req: Request, res: Response, next: NextFunction) =>{  
  if(!req.params['username']){
    return res.sendStatus(403);
  }
  const username = req.params['username'];
  await client.set('username', username);
  const value = await client.get('key');
  if(!value){
    return res.sendStatus(403);
  }

  return next();
}

export default connectRedis;