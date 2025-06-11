import { MMKV } from 'react-native-mmkv';

type Theme = 'dark' | 'light' | 'system';

type Settings = { theme: Theme, }

export class Client{
    private static _storage = new MMKV();
    private static _settings: Settings;
    private static _isInitialStartup: boolean;

    // Default values
    private static defaultSettings = { theme: 'system' as Theme }

    // Static initializer
    static {
        const settingsResult = Client._storage.getString('settings');
        const startupResult = Client._storage.getBoolean('isInitialStartup');

        this._settings = settingsResult != undefined ? JSON.parse(settingsResult) : this.defaultSettings;
        this._isInitialStartup = true;//startupResult != undefined ? startupResult : true;
    }

    static settings = new Proxy<Settings>(this._settings, {
        get(target, prop, receiver){
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            // Manual Update to store json
            const json = {...target};
            const key = prop as keyof typeof target;
            
            json[key] = value; 

            // Store json
            Client._storage.set('settings', JSON.stringify(json));
            // Update original target
            return Reflect.set(target, prop, value, receiver);
        }
    });

    
    static get isInitialStartup() : boolean {
        return this._isInitialStartup;
    }
    
    static set isInitialStartup(value: boolean) {
        this._isInitialStartup = value;
        this._storage.set('isInitialStartup', value);
    }
}