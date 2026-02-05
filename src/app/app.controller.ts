import { Controller, Get, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('service-ping')
  servicePing(@Res() res) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    return res.send('Express status: Read');
  }
}
