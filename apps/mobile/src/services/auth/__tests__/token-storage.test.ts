import {
  setInMemoryAccessToken,
  getInMemoryAccessToken,
  saveRefreshToken,
  getRefreshToken,
  clearTokens,
} from '../token-storage';
import * as Keychain from 'react-native-keychain';

describe('Gestión segura de tokens en móvil (EC-19)', () => {
  beforeEach(async () => {
    await clearTokens();
  });

  it('debe almacenar y recuperar el access token estrictamente en memoria RAM sin tocar el almacenamiento', () => {
    expect(getInMemoryAccessToken()).toBeNull();

    const tokenPrueba = 'jwt.access.token.prueba';
    setInMemoryAccessToken(tokenPrueba);

    expect(getInMemoryAccessToken()).toBe(tokenPrueba);
  });

  it('debe guardar el refresh token de forma segura utilizando react-native-keychain', async () => {
    const refreshTokenPrueba = 'jwt.refresh.token.prueba';
    const guardado = await saveRefreshToken(refreshTokenPrueba);

    expect(guardado).toBe(true);
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'refreshToken',
      refreshTokenPrueba,
      expect.objectContaining({
        service: 'com.encanto.auth.refreshtoken',
      })
    );
  });

  it('debe recuperar el refresh token guardado desde el Keychain', async () => {
    const refreshTokenPrueba = 'jwt.refresh.token.secreto';
    await saveRefreshToken(refreshTokenPrueba);

    const recuperado = await getRefreshToken();
    expect(recuperado).toBe(refreshTokenPrueba);
  });

  it('debe limpiar tanto el access token en memoria como el refresh token en Keychain al cerrar sesión', async () => {
    setInMemoryAccessToken('token.activo');
    await saveRefreshToken('refresh.activo');

    await clearTokens();

    expect(getInMemoryAccessToken()).toBeNull();
    const recuperado = await getRefreshToken();
    expect(recuperado).toBeNull();
    expect(Keychain.resetGenericPassword).toHaveBeenCalled();
  });
});
