import { PuppeteerLaunchOptions } from 'puppeteer';

const puppeteerOptions: PuppeteerLaunchOptions = {
  args: ['--disable-web-security', '--enable-features=NetworkService', '--ignore-certificate-errors', '--no-sandbox'],
  headless: !(process.env.NODE_ENV === 'dev'),
  ...(process.env.NODE_ENV === 'dev' ? {} : { executablePath: '/usr/bin/google-chrome' }),
};
export default puppeteerOptions;
