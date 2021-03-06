import { Controller, Get, Request, Post, UseGuards, Render, Res, Next } from '@nestjs/common';
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
  async loginin(@Request() req,@Res() res){
    if (req.user && (req.user.role_id == 'trainee' || req.user.role_id == 'trainer')){
      await res.status(401).redirect('/homepage/index')
    }
    else if (req.user && (req.user.role_id == 'staff' || req.user.role_id == 'admin')) {
      await res.status(401).redirect('/staffs/index')
    }
    else {
      Next();
    }
  }

  @UseGuards(LoginGuard)
  @Post()
  async login(@Request() req,@Res() res, @Next() next) {
    if (req.user.role_id == 'trainee' || req.user.role_id == 'trainer'){
      res.redirect('/homepage/index')
    }
    else {
        res.redirect('/staffs/index')
    }
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
