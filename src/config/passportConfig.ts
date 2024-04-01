import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { Request } from 'express';
import path from 'path';
import { loadConfig } from './configLoader';
// Model

const configFilePath = path.join(__dirname, 'config', 'dev-config.yaml');
const config = loadConfig(configFilePath);
const JWT_SECRET = config.JWT_SECRET;