const deepClone = (obj, visited = new WeakMap()) => {
    // Если obj - примитивный тип, возвращаем его
    if (Object(obj) !== obj || obj instanceof Function) {
        return obj;
    }

    // Если obj уже был скопирован ранее, возвращаем его копию
    if (visited.has(obj)) {
        return visited.get(obj);
    }

    let clone;

    // Создаем глубокую копию в зависимости от типа данных
    if (Array.isArray(obj)) {
        clone = [];
        visited.set(obj, clone);
        obj.forEach((item, index) => {
            clone[index] = deepClone(item, visited);
        });
    } else if (obj instanceof Date) {
        clone = new Date(obj.getTime());
    } else if (obj instanceof Set) {
        clone = new Set();
        visited.set(obj, clone);
        obj.forEach(item => {
            clone.add(deepClone(item, visited));
        });
    } else if (obj instanceof Map) {
        clone = new Map();
        visited.set(obj, clone);
        obj.forEach((value, key) => {
            clone.set(key, deepClone(value, visited));
        });
    } else {
        clone = Object.create(Object.getPrototypeOf(obj));
        visited.set(obj, clone);
        Object.getOwnPropertyNames(obj).forEach(prop => {
            let descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            if (descriptor.get) {
                Object.defineProperty(clone, prop, descriptor);
            } else {
                clone[prop] = deepClone(obj[prop], visited);
            }
        });
    }

    return clone;
}
