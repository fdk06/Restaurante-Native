import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { UtensilsCrossed, Calendar } from 'lucide-react-native';
import { formatCurrencyCOP } from '@encanto/shared';

// pantalla principal de la carta digital del restaurante
export const MenuScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <ScrollView
      style={[styles.contenedor, { backgroundColor: colors.superficie.fondo }]}
      contentContainerStyle={[
        styles.scrollContent,
        { padding: spacing.margenLateral },
      ]}
    >
      {/* cabecera con titulo y presentacion */}
      <View style={styles.header}>
        <Text
          style={[
            styles.titulo,
            typography.display,
            { color: colors.texto.primario },
          ]}
        >
          {t('menu.title')}
        </Text>
        <Text
          style={[
            styles.subtitulo,
            typography.cuerpoM,
            { color: colors.texto.secundario },
          ]}
        >
          {t('menu.subtitle')}
        </Text>
      </View>

      {/* tarjeta destacada con el proximo dia de atencion */}
      <View
        style={[
          styles.tarjetaHorario,
          {
            backgroundColor: colors.superficie.elevada,
            borderColor: colors.superficie.borde,
            borderRadius: radii.m,
            padding: spacing.l,
          },
        ]}
      >
        <View style={styles.filaIcono}>
          <Calendar size={20} color={colors.marca.primario} />
          <Text
            style={[
              typography.etiqueta,
              { color: colors.marca.primario, marginLeft: spacing.s },
            ]}
          >
            {t('menu.nextOpenDay')}
          </Text>
        </View>
        <Text
          style={[
            typography.cuerpoL,
            {
              color: colors.texto.primario,
              marginTop: spacing.s,
              fontWeight: '600',
            },
          ]}
        >
          {t('menu.schedule')}
        </Text>
      </View>

      {/* muestra de plato de ejemplo usando las utilidades de formato de moneda */}
      <View
        style={[
          styles.tarjetaPlato,
          {
            backgroundColor: colors.superficie.elevada,
            borderColor: colors.superficie.borde,
            borderRadius: radii.l,
            padding: spacing.l,
            marginTop: spacing.xl,
          },
        ]}
      >
        <View style={styles.filaPlato}>
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.tituloM, { color: colors.texto.primario }]}
            >
              Sancocho de Gallina Criolla
            </Text>
            <Text
              style={[
                typography.cuerpoM,
                { color: colors.texto.secundario, marginTop: spacing.xs },
              ]}
            >
              Preparado a la leña con plátano verde, yuca y mazorca de la
              región.
            </Text>
            <Text
              style={[
                typography.precio,
                { color: colors.marca.acento, marginTop: spacing.m },
              ]}
            >
              {formatCurrencyCOP(32000)}
            </Text>
          </View>
        </View>

        {/* insignia de disponibilidad segun el diseno */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.marca.primarioSuave,
              borderRadius: radii.s,
              marginTop: spacing.m,
            },
          ]}
        >
          <Text style={[typography.etiqueta, { color: colors.marca.primario }]}>
            {t('menu.badgeAvailable')}
          </Text>
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
    marginBottom: 20,
    marginTop: 10,
  },
  titulo: {
    marginBottom: 6,
  },
  subtitulo: {},
  tarjetaHorario: {
    borderWidth: 1,
  },
  filaIcono: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tarjetaPlato: {
    borderWidth: 1,
  },
  filaPlato: {
    flexDirection: 'row',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
