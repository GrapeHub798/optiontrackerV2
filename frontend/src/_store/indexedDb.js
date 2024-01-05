import {
  INDEXEDDB_NAME,
  INDEXEDDB_STORE_NAME,
} from "../shared/sharedConstants";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(INDEXEDDB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(INDEXEDDB_STORE_NAME)) {
        db.createObjectStore(INDEXEDDB_STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const writeArray = async (key, array) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(INDEXEDDB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(INDEXEDDB_STORE_NAME);
    const request = store.put({ id: key, data: array });
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
};

export const readArray = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(INDEXEDDB_STORE_NAME, "readonly");
    const store = transaction.objectStore(INDEXEDDB_STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? result.data : null);
    };
    request.onerror = () => reject(request.error);
  });
};

export const deleteArray = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(INDEXEDDB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(INDEXEDDB_STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
};
