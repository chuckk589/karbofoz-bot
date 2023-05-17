import { RetriveThemeQueryDto } from './dto/retrive-theme-query.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller({
  path: 'theme',
  version: '1',
})
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}
  @Get(':id')
  getTemplate(@Param('id') id: string, @Query() query: RetriveThemeQueryDto) {
    return this.themeService.getTheme(+id, query);
  }
}
