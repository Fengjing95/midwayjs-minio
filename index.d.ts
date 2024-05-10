/*
 * @Date: 2024-05-10 12:13:58
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2024-05-11 00:40:59
 */
import { ClientOptions } from 'minio';
export * from './dist/index';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    minIO?: ServiceFactoryConfigOption<ClientOptions>;
  }
}
