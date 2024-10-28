import * as SecureStore from 'expo-secure-store';

export async function getToken(): Promise<string|null> {
    return SecureStore.getItemAsync('token');
}

export async function setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync('token', token);
}

export async function deleteToken(): Promise<void> {
    await SecureStore.deleteItemAsync('token');
}