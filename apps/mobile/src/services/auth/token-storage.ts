import * as Keychain from 'react-native-keychain';

// identificador de servicio para separar nuestras credenciales en el Keystore de Android o Keychain de iOS
const KEYCHAIN_SERVICE = 'com.encanto.auth.refreshtoken';

// guardo el access token estrictamente en memoria RAM
// esta variable se destruye al cerrar la app, lo que reduce a cero el riesgo de extraccion
// del access token mediante volcados de almacenamiento o analisis forense del dispositivo
let inMemoryAccessToken: string | null = null;

// funcion para actualizar o limpiar el access token en memoria
export const setInMemoryAccessToken = (token: string | null): void => {
  inMemoryAccessToken = token;
};

// funcion para consultar el access token activo sin tocar el disco
export const getInMemoryAccessToken = (): string | null => {
  return inMemoryAccessToken;
};

// guardo el refresh token en el hardware seguro del celular usando react-native-keychain
// en Android esto usa el AndroidKeyStore con cifrado por hardware (o software seguro si no hay TEE)
export const saveRefreshToken = async (token: string): Promise<boolean> => {
  try {
    const options = {
      service: KEYCHAIN_SERVICE,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
    };

    // guardamos como 'refreshToken' el username y el token como password
    await Keychain.setGenericPassword('refreshToken', token, options);
    return true;
  } catch (error) {
    console.error('No se pudo guardar el refresh token en el Keychain seguro:', error);
    return false;
  }
};

// leo el refresh token almacenado de forma segura
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });

    if (credentials && credentials.password) {
      return credentials.password;
    }

    return null;
  } catch (error) {
    console.error('Error al recuperar el refresh token desde el Keychain:', error);
    return null;
  }
};

// borro las credenciales guardadas en el Keychain y el token en memoria
export const clearTokens = async (): Promise<void> => {
  try {
    inMemoryAccessToken = null;
    await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
  } catch (error) {
    console.error('Error al eliminar las credenciales del Keychain:', error);
  }
};
