import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SportsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/sports.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Esportes</ThemedText>
      </ThemedView>
      <ThemedText>Bem-vindo à seção de esportes! Aqui você encontra informações sobre diferentes modalidades,
      seus jogadores e torneios mais emocionantes.</ThemedText>
      <Collapsible title="Futebol">
        <ThemedText>
          O futebol é um dos esportes mais populares do mundo, com bilhões de fãs. Saiba mais sobre regras, times e campeonatos.
        </ThemedText>
        <Image source={require('@/assets/images/futebol.png')} />
      </Collapsible>
      <Collapsible title="Basquete">
        <ThemedText>
          O basquete é um esporte emocionante e dinâmico. Descubra mais sobre a NBA, Euroliga e outros torneios importantes.
        </ThemedText>
        <Image source={require('@/assets/images/basquete.png')} />
      </Collapsible>
      <Collapsible title="Tênis">
        <ThemedText>
          Explore o mundo do tênis, com seus torneios icônicos como Wimbledon, Roland Garros e US Open.
        </ThemedText>
        <Image source={require('@/assets/images/tenis.png')} />
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 500,
    width: 1950,
  },
});
