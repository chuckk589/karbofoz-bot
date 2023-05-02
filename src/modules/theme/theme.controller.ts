import { Controller, Get, Param, Query } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller({
  path: 'theme',
  version: '1',
})
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}
  @Get(':id')
  getTemplate(@Param('id') id: string, @Query('language') language: string) {
    return this.themeService.getTheme(+id, language);
  }
}
