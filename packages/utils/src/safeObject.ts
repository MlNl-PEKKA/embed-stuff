export class SafeObject {
  static keys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  }
  static values<T extends object>(obj: T) {
    return Object.values(obj) as T[keyof T][];
  }
  static entries<T extends object>(obj: T) {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
  }
}
