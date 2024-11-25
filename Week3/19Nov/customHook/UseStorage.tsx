// import { useCallback } from 'react';

//const useStorage = () => {
//     const getItem = useCallback((key: string): any | null => {
//         try {
//             const value = localStorage.getItem(key);
//             return value ? JSON.parse(value) : null;
//         } catch (error) {
//             console.error(`Error getting value for key ${key}:`, error);
//             return null;
//         }
//     }, []);

//     const setItem = useCallback((key: string, value: any): void => {
//         try {
//             localStorage.setItem(key, JSON.stringify(value));
//         } catch (error) {
//             console.error(`Error setting value for key ${key}:`, error);
//         }
//     }, []);

//     const removeItem = useCallback((key: string): void => {
//         try {
//             localStorage.removeItem(key);
//         } catch (error) {
//             console.error(`Error removing item for key ${key}:`, error);
//         }
//     }, []);

//     return { getItem, setItem, removeItem };
// }

// export default useStorage;


const useStorage = () => {

    const getItem = (key: string): any | null => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Error getting value for key ${key}:`, error);
            return null;
        }
    };

    const setItem = (key: string, value: any): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting value for key ${key}:`, error);
        }
    };

    const removeItem = (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item for key ${key}:`, error);
        }
    };

    return { getItem, setItem, removeItem };
}

export default useStorage;
