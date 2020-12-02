import { Injectable } from '@angular/core';
import { Env, AppConfig, AppCfg } from './AppConfig';

@Injectable()
export class AppInitializer {
    private appConfig: AppCfg = null;
    private env: Env = null;

    constructor(private readonly config: AppConfig) {

    }
    public getConfig(key: string) {
        return this.appConfig[key];
    }

    public get apiUrl(): boolean {
        return this.getConfig('apiurl');
    }

    public init() {
        return new Promise((resolve, reject) => {
            this.config.loadEnv().subscribe(data => {
                this.env = data;
                this.config.loadConfig(this.env).subscribe(config => {
                    this.appConfig = config;
                    resolve(true);
                }, error => {
                    resolve(false);
                });
            });
        });
    }
}
