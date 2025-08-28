import { MMKV } from 'react-native-mmkv';
import { ManagedCourse } from './static/implemented/ManagedCourse';

type Theme = 'dark' | 'light' | 'system';

type Settings = { theme: Theme, }

export class Client{
    private static _storage = new MMKV();

    private static _settings: Settings; // General app settings stored here
    private static _isInitialStartup: boolean;
    private static _customCourses: ManagedCourse[]; // User created courses stored here
    private static _chosenCourses: ManagedCourse[]; // User chosen courses stored here

    // Default values
    private static defaultSettings = { theme: 'system' as Theme }

    // Static initializer
    static {
        const settingsResult = Client._storage.getString('settings');
        const startupResult = Client._storage.getBoolean('isInitialStartup');
        const customCoursesResult = Client._storage.getString('customCourses');
        const chosenCoursesResult = Client._storage.getString('chosenCourses');

        this._settings = settingsResult != undefined ? JSON.parse(settingsResult) : this.defaultSettings;
        this._isInitialStartup = startupResult != undefined ? startupResult : true;
        // special handling for custom courses because we need to parse the json-array and map it to ManagedCourse[]
        this._customCourses = customCoursesResult != undefined ? JSON.parse(customCoursesResult).map((obj: any) => ManagedCourse.fromJSON(obj)) : [];
        // special handling for user chosen courses because we need to parse the json-array and map it to ManagedCourse[]
        this._chosenCourses = chosenCoursesResult != undefined ? JSON.parse(chosenCoursesResult).map((obj: any) => ManagedCourse.fromJSON(obj)) : [];
    }

    static settings = new Proxy<Settings>(this._settings, {
        get(target, prop, receiver){
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            // Update original target
            const result = Reflect.set(target, prop, value, receiver);

            // Store json
            Client._storage.set('settings', JSON.stringify(target));
            
            return result;
        }
    });

    static customCourses = new Proxy<ManagedCourse[]>(this._customCourses, {
        get(target, prop, receiver){
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            // Update original target
            const result = Reflect.set(target, prop, value, receiver);

            // Store json
            Client._storage.set('customCourses', JSON.stringify(target));

            return result;
        },
        // creation/updates used by push/unshift/splice/sort/reverse and length writes
        defineProperty(target, prop, desc) {
            // Update original target
            const result = Reflect.defineProperty(target, prop, desc);

            // Store json
            Client._storage.set('customCourses', JSON.stringify(target));

            return result;
        },
        // deletions used by pop/shift/splice
        deleteProperty(target, prop) {
            // Update original target
            const result = Reflect.deleteProperty(target, prop);

            // Store json
            Client._storage.set('customCourses', JSON.stringify(target));
            
            return result;
        },
    });

    static get isInitialStartup() : boolean {
        return true;//this._isInitialStartup;
    }
    static set isInitialStartup(value: boolean) {
        this._isInitialStartup = value;
        this._storage.set('isInitialStartup', value);
    }
}