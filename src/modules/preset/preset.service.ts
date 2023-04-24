import { RetrievePresetDto } from './dto/retrieve-preset.dto';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Preset } from '../mikroorm/entities/Preset';
import { CreatePresetDto } from './dto/create-preset.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class PresetService {
  constructor(private readonly em: EntityManager) {}

  async generatePreview(body?: CreatePresetDto) {
    const queryString = Object.keys(body)
      .map((key) => `${key}=${body[key]}`)
      .join('&');
    const browser = await puppeteer.launch({ args: ['--ignore-certificate-errors'], headless: false });
    const page = await browser.newPage();
    await page.goto(`https://localhost:${process.env.PORT}/template?${queryString}`, { waitUntil: 'networkidle2' });
    await page.setViewport({
      width: 2560,
      height: 1440,
      deviceScaleFactor: 1,
    });
    const img = await page.$('#area');
    const screen = await img.screenshot({ path: 'example.png', encoding: 'base64' });
    await browser.close();
    return { screen };
  }

  async createPreset(body: CreatePresetDto) {
    return body;
  }
  async getPresets(): Promise<RetrievePresetDto[]> {
    const presets = await this.em.find(Preset, {});
    return presets.map((preset) => new RetrievePresetDto(preset));
  }
}
