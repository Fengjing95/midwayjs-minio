/*
 * @Date: 2024-05-10 12:13:58
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2024-05-10 22:58:05
 */
import {
  Config,
  Init,
  Inject,
  Logger,
  MidwayCommonError,
  Provide,
  Scope,
  ScopeEnum,
  ServiceFactory,
  delegateTargetPrototypeMethod,
} from '@midwayjs/core';
import { Client, ClientOptions } from 'minio';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MinIOServiceFactory extends ServiceFactory<Client> {
  @Config('minIO')
  minIOConfig: ClientOptions;

  @Logger('coreLogger')
  logger;

  @Init()
  async init() {
    await this.initClients(this.minIOConfig);
  }

  async createClient(config: ClientOptions): Promise<Client> {
    this.logger.info(
      '[midway:minIO] connecting with accessKey: %s',
      config.accessKey
    );
    return new Client(config);
  }

  getName(): string {
    return 'minIO';
  }
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class MinIOService implements Client {
  @Inject()
  private serviceFactory: MinIOServiceFactory;

  private instance: Client;

  @Init()
  async init() {
    this.instance = this.serviceFactory.get(
      this.serviceFactory.getDefaultClientName?.() || 'default'
    );
    if (!this.instance) {
      throw new MidwayCommonError('minIO default instance not found.');
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MinIOService extends Client {
  // empty
}

delegateTargetPrototypeMethod(MinIOService, [Client]);
