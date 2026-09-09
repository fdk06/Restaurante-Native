import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { Moon, Sun, Globe, MapPin, Info } from 'lucide-react-native';

// pantalla de ajustes donde el usuario puede alternar tema claro/oscuro e idioma
export const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme, colors, typography, spacing, radii } =
    useTheme();

  return (
    <ScrollView
      style={[styles.contenedor, { backgroundColor: colors.superficie.fondo }]}
      contentContainerStyle={[
        styles.scrollContent,
        { padding: spacing.margenLateral },
      ]}
    >
      <View style={styles.header}>
        <Text style={[typography.display, { color: colors.texto.primario }]}>
          {t('settings.title')}
        </Text>
      </View>

      {/* seccion de apariencia */}
      <View
        style={[
          styles.seccion,
          {
            backgroundColor: colors.superficie.elevada,
            borderColor: colors.superficie.borde,
            borderRadius: radii.l,
            padding: spacing.l,
            marginTop: spacing.l,
          },
        ]}
      >
        <Text
          style={[
            typography.etiqueta,
            {
              color: colors.texto.secundario,
              textTransform: 'uppercase',
              marginBottom: spacing.m,
            },
          ]}
        >
          {t('settings.appearance')}
        </Text>

        <View style={styles.filaOpcion}>
          <View style={styles.filaIzquierda}>
            {isDark ? (
              <Moon size={22} color={colors.marca.primario} />
            ) : (
              <Sun size={22} color={colors.marca.primario} />
            )}
            <Text
              style={[
                typography.cuerpoL,
                { color: colors.texto.primario, marginLeft: spacing.m },
              ]}
            >
              {isDark ? t('settings.themeDark') : t('settings.themeLight')}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: colors.superficie.borde,
              true: colors.marca.primario,
            }}
            thumbColor={colors.texto.inverso}
          />
        </View>
      </View>

      {/* seccion de idioma */}
      <View
        style={[
          styles.seccion,
          {
            backgroundColor: colors.superficie.elevada,
            borderColor: colors.superficie.borde,
            borderRadius: radii.l,
            padding: spacing.l,
            marginTop: spacing.l,
          },
        ]}
      >
        <Text
          style={[
            typography.etiqueta,
            {
              color: colors.texto.secundario,
              textTransform: 'uppercase',
              marginBottom: spacing.m,
            },
          ]}
        >
          {t('settings.language')}
        </Text>

        <View style={styles.filaOpcion}>
          <View style={styles.filaIzquierda}>
            <Globe size={22} color={colors.marca.primario} />
            <Text
              style={[
                typography.cuerpoL,
                { color: colors.texto.primario, marginLeft: spacing.m },
              ]}
            >
              {t('settings.langSpanish')}
            </Text>
          </View>
        </View>
      </View>

      {/* informacion y contacto */}
      <View
        style={[
          styles.seccion,
          {
            backgroundColor: colors.superficie.elevada,
            borderColor: colors.superficie.borde,
            borderRadius: radii.l,
            padding: spacing.l,
            marginTop: spacing.l,
          },
        ]}
      >
        <Text
          style={[
            typography.etiqueta,
            {
              color: colors.texto.secundario,
              textTransform: 'uppercase',
              marginBottom: spacing.m,
            },
          ]}
        >
          {t('settings.contact')}
        </Text>

        <View style={styles.filaOpcion}>
          <View style={styles.filaIzquierda}>
            <MapPin size={22} color={colors.marca.primario} />
            <Text
              style={[
                typography.cuerpoM,
                {
                  color: colors.texto.primario,
                  marginLeft: spacing.m,
                  flex: 1,
                },
              ]}
            >
              {t('settings.location')}
            </Text>
          </View>
        </View>

        <View style={[styles.filaOpcion, { marginTop: spacing.m }]}>
          <View style={styles.filaIzquierda}>
            <Info size={22} color={colors.texto.secundario} />
            <Text
              style={[
                typography.pie,
                { color: colors.texto.secundario, marginLeft: spacing.m },
              ]}
            >
              {t('settings.version')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 10,
  },
  seccion: {
    borderWidth: 1,
  },
  filaOpcion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filaIzquierda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
