import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnumUtilityService {
  constructor() {}

  getEnumValues(enumType: any): { name: string; value: number }[] {
    return Object.entries(enumType)
      .filter(([key, value]) => !isNaN(Number(value)))
      .map(([key, value]) => ({ name: key, value: Number(value) }));
  }
}