import { RetrievePresetDto } from './dto/retrieve-preset.dto';
import { EntityManager, wrap } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Preset } from '../mikroorm/entities/Preset';
import { CreatePresetDto } from './dto/create-preset.dto';
import puppeteer from 'puppeteer';
import puppeteerOptions from 'src/configs/puppeteer.config';
import { UpdatePresetsDto } from './dto/update-presets.dto';
import { Input } from '../mikroorm/entities/Input';
import { Theme } from '../mikroorm/entities/Theme';
import { InputPreset } from '../mikroorm/entities/InputPreset';
import { Currency } from '../mikroorm/entities/Currency';
import { Network } from '../mikroorm/entities/Network';
import { Language } from '../mikroorm/entities/Language';
import { BarInputPreset } from '../mikroorm/entities/BarInputPreset';
import { BarInput } from '../mikroorm/entities/BarInput';
import { DeviceBarInput } from '../mikroorm/entities/DeviceBarInput';
import { Device } from '../mikroorm/entities/Device';
import { PreviewQueryDto } from './dto/preview-query.dto';
import fs from 'fs';
import { Wallet } from '../mikroorm/entities/Wallet';
@Injectable()
export class PresetService {
  constructor(private readonly em: EntityManager) {}
  async remove(ids: number[]) {
    const presets = await this.em.find(Preset, { id: { $in: ids } }, { populate: ['inputPresets', 'barInputPresets'] });
    presets.map((preset) => this.em.remove(preset));
    await this.em.flush();
    return presets.map((preset) => preset.id);
  }
  async getPreviewImage(previewQuery: PreviewQueryDto) {
    const path = `./dist/public/${previewQuery.exchange}/templates/`;
    const chunks = [previewQuery.direction, ...(previewQuery.dependent ? previewQuery.dependent.split('.') : [])];
    const files = fs.readdirSync(path).sort((a, b) => a.length - b.length);
    for (const file of files) {
      const fileChunks = file.split('.');
      if (chunks.every((chunk) => fileChunks.includes(chunk))) {
        return `/${previewQuery.exchange}/templates/${file}`;
      }
    }
    return new HttpException('Preview not found', HttpStatus.NOT_FOUND);
  }
  async generatePreview(body: UpdatePresetsDto) {
    const {
      fields = undefined,
      statusbar = undefined,
      _show = undefined,
      ...bodyFlat
    } = {
      ...body,
      ...body.fields,
      ...(body.statusbar.show
        ? Object.keys(body.statusbar).reduce((acc: any, sum) => {
            acc[`_${sum}`] = typeof body.statusbar[sum] == 'boolean' ? +body.statusbar[sum] : body.statusbar[sum];
            return acc;
          }, {})
        : {}),
    };
    const queryString = new URLSearchParams(bodyFlat).toString();
    const browser = await puppeteer.launch(puppeteerOptions);
    try {
      const page = await browser.newPage();
      await page.goto(`${process.env.NODE_ENV === 'dev' ? 'https://192.168.1.14:3001' : 'http://localhost:443'}/template?${queryString}`, { waitUntil: 'networkidle2' });
      await page.setViewport({
        width: 2560,
        height: 1440,
        deviceScaleFactor: 1,
      });
      const img = await page.$(_show ? '#main' : '#wobar');
      const screen = await img.screenshot({ path: 'example.png', encoding: 'base64' });
      await browser.close();
      return { screen };
    } catch (error) {
      console.log(error);
      await browser.close();
      return new HttpException('Try again', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async managePreset(body: CreatePresetDto) {
    const inputs = (await this.em.findOne(Theme, { id: parseInt(body.theme) }, { populate: ['themeInputs'] })).themeInputs.getItems();
    const barinputs = body.statusbar.show ? (await this.em.find(DeviceBarInput, { device: { alias: body.statusbar.device } }, { populate: ['input'] })).map((deviceBarInput) => deviceBarInput.input) : [];
    delete body.statusbar.show;

    try {
      if (body.preset.current === '0') {
        const preset = this.em.create(Preset, {
          name: body.preset.name || `Preset ${new Date().toLocaleString()}`,
          comment: body.preset.comment,
          currency: await this.em.findOneOrFail(Currency, { alias: body.currency }),
          network: await this.em.findOneOrFail(Network, { alias: body.network }),
          language: await this.em.findOneOrFail(Language, { alias: body.language }),
          direction: body.direction,
          device: await this.em.findOne(Device, { alias: body.statusbar.device }),
          theme: this.em.getReference(Theme, parseInt(body.theme)),
          wallet: body.wallet ? this.em.getReference(Wallet, parseInt(body.wallet.id)) : undefined,
          inputPresets: Object.keys(body.fields).map((key) => {
            return this.em.create(InputPreset, {
              input: inputs.find((input) => input.alias == key),
              value: body.fields[key],
            });
          }),
          barInputPresets: Object.keys(body.statusbar)
            .filter((key) => key != 'device')
            .map((key) => {
              return this.em.create(BarInputPreset, {
                barInput: barinputs.find((barinput) => barinput.alias == key),
                value: body.statusbar[key],
              });
            }),
        });
        await this.em.persistAndFlush(preset);
        await this.em.populate(preset, ['wallet']);
        return new RetrievePresetDto(preset);
      } else {
        const preset = await this.em.findOneOrFail(
          Preset,
          { id: parseInt(body.preset.current) },
          { populate: ['currency', 'network', 'wallet', 'language', 'theme.exchange', 'inputPresets.input', 'barInputPresets.barInput', 'device'] },
        );
        preset.inputPresets.removeAll();
        preset.barInputPresets.removeAll();
        body.wallet ? (preset.wallet = this.em.getReference(Wallet, parseInt(body.wallet.id))) : undefined;
        Object.keys(body.fields).forEach((key) => {
          preset.inputPresets.add(
            this.em.create(InputPreset, {
              input: inputs.find((input) => input.alias == key),
              value: body.fields[key],
            }),
          );
        });
        Object.keys(body.statusbar)
          .filter((key) => key != 'device')
          .forEach((key) => {
            preset.barInputPresets.add(
              this.em.create(BarInputPreset, {
                barInput: barinputs.find((barinput) => barinput.alias == key),
                value: body.statusbar[key],
              }),
            );
          });
        await this.em.persistAndFlush(preset);
        return new RetrievePresetDto(preset);
      }
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') throw new HttpException('Имя пресета уже испоьзуется', HttpStatus.BAD_REQUEST);
    }
  }
  async getPresets() {
    const presets = await this.em.find(Preset, {}, { populate: ['currency', 'network', 'wallet', 'language', 'theme.exchange', 'inputPresets.input', 'barInputPresets.barInput', 'device'], orderBy: { name: 'ASC' } });
    return presets.map((preset) => new RetrievePresetDto(preset));
  }
}
