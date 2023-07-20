import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
require('dotenv').config();

// http://localhpst:3001/api/v1/auth-service
// http://localhpst:3001/api/v1/restaurant-service
// http://localhpst:3001/api/v1/cart-service

export class ReverseProxyServiceMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: process.env.PROXY_SERVICE_URL,
    pathRewrite: {
      '/api/v1/service': '/',
    },
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      // console.log(proxyReq);
      // console.log(
      //   `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
      // );
    },
  });

  use(req: Request, res: Response, next: () => void) {
    //console.log(res);
    this.proxy(req, res, next);
  }
}
