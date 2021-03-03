import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as pump from 'pump'
import * as fs from 'fs'
import * as Busboy from 'busboy'
import * as path from 'path'
import * as os from 'os'
import { Req, Res} from '@nestjs/common';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        //throw new Error("Method not implemented.");
        console.log('request happening' + req.ip + req.url);
        next();
    }

}


