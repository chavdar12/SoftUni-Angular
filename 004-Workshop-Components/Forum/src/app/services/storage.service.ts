import {PLATFORM_ID, Provider} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

interface iStorage {
  setItem<T>(key: string, item: T): T;

  getItem<T>(key: string): T;
}

export class StorageService implements iStorage {
  setItem<T>(key: string, item: T): T {
    return item
  }

  getItem<T>(key: string): any {
    return null;
  }
}


export function storageFactory(platformId: string): any {
  if (isPlatformBrowser(platformId)) {
    return new BrowserStorage();
  }

  if (isPlatformServer(platformId)) {
    return new ServerStorage();
  }

  throw new Error('No implementation for this platform: ' + platformId);
}

export const storageServiceProvider: Provider = {
  provide: StorageService,
  useFactory: storageFactory,
  deps: [PLATFORM_ID]
};

export class BrowserStorage {
  localStorage = localStorage;

  setItem<T>(key: string, item: T): T {
    const str = typeof item == 'string' ? item : JSON.stringify(item);
    this.localStorage.setItem(key, str);
    return item;
  }

  getItem<T>(key: string): any {
    let item;
    const tmp = this.localStorage.getItem(key);
    if (!tmp) {
      return null;
    }
    try {
      item = JSON.parse(tmp);
    } catch {
      item = tmp;
    }
    return item;
  }
}

export class ServerStorage {
  localStorage = {
    data: {},
    setItem<T>(key: string, item: T): void {
      // this.data[key]
      (this.data as any)[key] = item;
    },
    getItem<T>(key: string): T {
      return (this.data as any) || null;
    },
  };

  setItem<T>(key: string, item: T): T {
    const str = typeof item == 'string' ? item : JSON.stringify(item);
    this.localStorage.setItem(key, str);
    return item;
  }

  getItem<T>(key: string): any {
    let item;
    const tmp = this.localStorage.getItem(key) as any;
    if (!tmp) {
      return null;
    }

    try {
      item = JSON.parse(tmp);
    } catch {
      item = tmp;
    }
    return item;
  }
}
