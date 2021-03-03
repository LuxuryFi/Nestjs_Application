import { Controller, Get, Request, Post, UseGuards, Render, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LoginGuard } from './guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Render('login/login.hbs')
  @Get()
  loginin(){
    
  }

  @UseGuards(LoginGuard)
  @Post()
  async login(@Request() req,@Res() res) {
    res.redirect('/staffs/index')
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test')
  test(@Request() request){
    return request.user
  }

  @Get('logout')
  logout(@Request() request, @Res() res){
    request.logout()
    res.redirect('/');
  }
}
