# MC Agro Social — Estúdio de Artes (v1)

Gerador independente de carrosséis para a **MC Imóveis Rurais**.

## O que já existe
- Interface em português para informar título, área, preço, cidade, descrição, fotos e contato
- Cinco artes de **1080 × 1350 px** geradas no navegador por Canvas
- Prévia das artes e exportação **ZIP** (cinco PNGs + legenda.txt)
- Modo de demonstração com aviso explícito de imóvel fictício
- Sem chamadas à OpenAI, Base44, serviços de imagens ou APIs pagas
- Nenhuma postagem automática; imagens e dados ficam no navegador durante a geração

## Primeiro teste
1. Abra o arquivo `index.html` em um navegador moderno ou use um servidor de arquivos estáticos:
   ```bash
   python3 -m http.server 8000
   ```
2. Acesse `http://localhost:8000`.
3. Mantenha os dados fictícios e a caixa **Modo demonstração** marcada.
4. Clique **Gerar 5 artes**; confira as cinco prévias.
5. Clique **Baixar ZIP** e confira os PNGs (1080 × 1350).
6. Para um imóvel real, desmarque **Modo demonstração**, informe dados reais e selecione ao menos uma fotografia.

## Segurança e limitações
- Não inclua tokens, senhas, chaves de API, documentos sigilosos nem dados privados de compradores.
- O repositório pode estar público: **mude-o para privado** nas configurações do GitHub antes de adicionar qualquer material confidencial.
- Ainda **não** há conexão com Base44, hospedagem/URL pública, automação diária ou publicação no Instagram.
- Esta v1 é uma aplicação local/estática: o ZIP é gerado no navegador, sem servidor e sem custo por imagem.
- Se o dispositivo não tiver memória suficiente para cinco PNGs grandes, execute em computador.
- Não use fotografias de terceiros sem autorização. Confirme preço, metragem e disponibilidade antes de publicar.
- Textos muito extensos são resumidos visualmente com reticências.
- O ZIP é armazenado sem compressão interna; os PNGs já são comprimidos.

## Próxima fase
Criar adaptador **Base44 somente leitura**, com autenticação e mapeamento de entidades reais, e um destino seguro para as artes aprovadas. A integração com Instagram existente no Base44 deve ser testada separadamente.

## Licença
Uso interno MC Imóveis Rurais.