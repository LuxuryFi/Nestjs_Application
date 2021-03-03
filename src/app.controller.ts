import { Controller, Get, Request, Post, UseGuards, Render, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LoginGuard } from './guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Render('login/login.hbs')
  @Get('auth/login')
  loginin(){
    
  }

  @UseGuards(LoginGuard)
  @Post('auth/login')
  async login(@Request() req,@Res() res) {
    res.redirect('/staffs/index')
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test')
  test(@Request() request){
    return request.user
  }

  @Get('logout')
  logout(@Request() request){
    return request.logout()
  }
}
