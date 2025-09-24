# 💥 DETONA RALPH - The Ultimate Game 🎮

<div align="center">
  <img src="src/images/preview.png" alt="Preview do Jogo" width="600px">
  
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  
  **Um jogo interativo inspirado no clássico Detona Ralph com mecânicas avançadas e sistema de ranking!**
</div>

---

## 🌟 Sobre o Projeto

Este projeto foi desenvolvido como parte do bootcamp da [DIO](https://www.dio.me/), mas evoluiu muito além do escopo original! O que começou como um jogo simples se transformou em uma experiência completa com múltiplas telas, sistema de pontuação persistente, dificuldade progressiva e efeitos sonoros imersivos.

### 🎯 Objetivo do Jogo
Teste seus reflexos e velocidade! Acerte o Ralph nas janelas que aparecem aleatoriamente. Quanto mais você joga, mais rápido ele fica. Consegue sobreviver aos 60 segundos e entrar no hall da fama?

---

## ✨ Funcionalidades Principais

### � Sistema de Ranking Completo
- **Hall da Fama**: Top 3 melhores pontuações salvas permanentemente
- **Nomes Personalizados**: Registre seu nome quando fizer um novo recorde
- **Armazenamento Local**: Suas conquistas ficam salvas no navegador

### 🚀 Dificuldade Progressiva
- **Velocidade Dinâmica**: A cada 5 pontos, o Ralph fica mais rápido
- **Progressão Suave**: De 1000ms até 300ms (velocidade máxima)
- **Desafio Crescente**: Teste seus limites conforme o jogo acelera

### 🎵 Sistema de Áudio Imersivo
- **Feedback Sonoro**: Sons diferentes para acertos, erros e game over
- **Alerta de Velocidade**: Áudio especial quando a dificuldade aumenta
- **Countdown Dramático**: Som de tensão nos últimos 5 segundos

### 🎮 Interface Profissional
- **Tela de Menu**: Interface elegante com ranking dos melhores
- **Tela de Game Over**: Resultados detalhados e opções de restart
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Estilo Retrô**: Fonte pixelada e cores vibrantes

### ⚡ Mecânicas de Jogo
- **Sistema de Vidas**: 3 vidas - cuidado com os erros!
- **Tempo Limitado**: 60 segundos de pura adrenalina
- **Controles Intuitivos**: Mouse no desktop, touch no mobile
- **Estados de Jogo**: Menu → Jogando → Game Over com transições suaves

---

## 🛠️ Tecnologias e Arquitetura

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização avançada com animações e responsividade
- **JavaScript (ES6+)**: Lógica robusta com padrões modernos

### Recursos Técnicos
- **LocalStorage API**: Persistência de dados do ranking
- **Web Audio API**: Sistema de sons sincronizados
- **CSS Grid/Flexbox**: Layout responsivo e moderno
- **Event Listeners**: Controle preciso de interações
- **Timers Dinâmicos**: Sistema de velocidade progressiva

### Estrutura do Projeto
```
detona-ralph-game/
├── index.html              # Página principal
├── src/
│   ├── scripts/
│   │   └── engine.js        # Lógica principal do jogo
│   ├── styles/
│   │   ├── main.css         # Estilos principais
│   │   └── reset.css        # Reset CSS
│   ├── images/              # Assets visuais
│   └── audios/              # Efeitos sonoros
└── README.md
```

---

## 🎯 Como Jogar

1. **Inicie o Jogo**: Clique em "COMEÇAR JOGO" na tela inicial
2. **Acerte o Ralph**: Clique nas janelas quando o Ralph aparecer
3. **Evite Erros**: Você tem apenas 3 vidas!
4. **Velocidade Crescente**: A cada 5 pontos, prepare-se para mais velocidade
5. **Últimos Segundos**: Fique atento ao countdown nos últimos 5 segundos
6. **Entre no Ranking**: Faça um recorde e registre seu nome!

---

## 🚀 Como Executar

### Opção 1: GitHub Pages
Acesse diretamente: [**JOGAR AGORA**](https://spyhenry.github.io/Jogo-do-Detona-Ralph/)

### Opção 2: Local
```bash
# Clone o repositório
git clone https://github.com/SpyHenry/Jogo-do-Detona-Ralph.git

# Entre na pasta
cd Jogo-do-Detona-Ralph

# Abra o index.html no seu navegador preferido
```

---

## 🎨 Capturas de Tela

### Tela Inicial
- Interface elegante com ranking dos melhores jogadores
- Design retrô com cores vibrantes

### Durante o Jogo
- HUD completo com pontuação, tempo e vidas
- Animações suaves e feedback visual

### Game Over
- Tela de resultados com opção de salvar recorde
- Botões para jogar novamente ou voltar ao menu

---

## 🏆 Recordes e Conquistas

- **🥇 Velocidade Máxima**: Chegue aos 35+ pontos para experimentar a velocidade máxima (300ms)!
- **⏱️ Sobrevivente**: Complete os 60 segundos completos
- **🎯 Precisão**: Minimize os erros para manter suas vidas
- **👑 Hall da Fama**: Entre no top 3 e seja lembrado para sempre!

---

## 🔧 Funcionalidades Técnicas Avançadas

### Sistema de Estados
```javascript
gameState: 'menu' | 'playing' | 'gameOver'
```

### Controle de Velocidade Dinâmica
```javascript
// Velocidade diminui 100ms a cada 5 pontos
gameVelocity = Math.max(300, initialVelocity - (score / 5 * 100))
```

### Sistema de Ranking Persistente
```javascript
// Salva no localStorage com nome e pontuação
highScores = [
  { name: "Player", score: 150 },
  { name: "Pro", score: 120 },
  { name: "Ace", score: 100 }
]
```

---

## 🎵 Áudios Necessários

Para a experiência completa, adicione estes arquivos na pasta `src/audios/`:
- `coin.mp3` - Som de acerto ✅
- `error.mp3` - Som de erro ❌  
- `win.mp3` - Som de vitória 🏆
- `gameover.mp3` - Som de game over 💀
- `speedup.mp3` - Som de aumento de velocidade 🚀
- `countdown.mp3` - Som dos últimos 5 segundos ⏰

---

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades  
- 🎨 Melhorar o design
- 📝 Aprimorar a documentação

---

## 📱 Compatibilidade

- ✅ **Desktop**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- ✅ **Tablets**: Suporte completo com controles touch

---

## 📞 Contato

Este projeto foi desenvolvido com muito carinho e dedicação!

**Henrique Baptista Bandeira**  
[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henrique-baptista-bandeira)
[![GitHub](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SpyHenry)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <strong>🎮 Divirta-se jogando e quebre todos os recordes! 🏆</strong>
  
  **⭐ Se você gostou do projeto, não esqueça de dar uma estrela no repositório! ⭐**
</div>


