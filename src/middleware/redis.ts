import { Request, Response, NextFunction } from "express";
import { RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';
import * as dotenv from "dotenv";
dotenv.config();


const redisURL : string | undefined = process.env.URL_REDIS;
const client = createClient<RedisModules, RedisFunctions, RedisScripts>();

/**
 * Connect Redis
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const connectRedis = async (req: Request, res: Response, next: NextFunction) =>{  
  client.on('error', error => console.log('Redis Client Error', error));
  try {
    await client.connect();    
  } catch (error) {
    res.status(403).send("connection failed!");
  }
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