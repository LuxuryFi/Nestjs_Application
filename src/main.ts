import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import flash = require('connect-flash');
import * as session from 'express-session';
import * as layouts from 'handlebars-layouts'
import * as hbs from 'hbs';
import * as passport from 'passport';
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/views'));
  app.setViewEngine('hbs');

  hbs.handlebars.registerPartial('layout', hbs.handlebars.compile(fs.readFileSync(join(__dirname, '..', 'views/layouts.hbs'), 'utf-8')));
  hbs.handlebars.registerHelper(layouts(hbs.handlebars));


  hbs.handlebars.registerHelper('if_eq', function (role) {
    if (role == 'admin') {
      return ''
    }
    else {
      return 'hidden'
    }

  });


  hbs.handlebars.registerHelper('selected', function (options, value) {
    if (options == value) {
      return ' selected';
    } else {
      return ''
    }
  })

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
