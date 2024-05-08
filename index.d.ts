import { ClientOptions } from 'minio';
export * from './dist/index';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    minIO?: ClientOptions;
  }
}
