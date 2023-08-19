import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stoksecurity.app',
  appName: 'StokSecurity',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
