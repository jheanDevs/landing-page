# Resolvendo Problemas de Cache no Netlify

Se você está enfrentando problemas com atualizações que não aparecem no site publicado no Netlify, mesmo após fazer commit e push das alterações, isso provavelmente está relacionado ao cache. Aqui estão algumas soluções:

## Soluções Implementadas Neste Projeto

1. **Configuração de Cache Ajustada**
   - Modificamos o arquivo `netlify.toml` para definir `Cache-Control: public, max-age=0, must-revalidate` para arquivos CSS
   - Isso instrui o Netlify a não armazenar em cache os arquivos CSS

2. **Versionamento de Recursos**
   - Adicionamos um parâmetro de versão ao link do CSS: `styles.css?v=1.0.1`
   - Quando você fizer alterações significativas, aumente este número de versão

## Soluções Adicionais

### 1. Forçar Nova Implantação

A maneira mais simples de atualizar seu site:

1. Acesse o painel do Netlify: https://app.netlify.com/
2. Selecione seu site
3. Vá para a guia "Deploys"
4. Clique no botão "Trigger deploy" e selecione "Clear cache and deploy site"

### 2. Usando a API do Netlify (Avançado)

Incluímos um script `netlify-purge-cache.js` que pode ser usado para forçar uma nova compilação:

1. Obtenha um token de acesso pessoal em https://app.netlify.com/user/applications#personal-access-tokens
2. Edite o arquivo `netlify-purge-cache.js` e adicione seu token e ID do site
3. Execute o script com Node.js: `node netlify-purge-cache.js`

### 3. Solução para Visitantes do Site

Se os visitantes do seu site estão vendo versões antigas, instrua-os a:

1. Pressionar Ctrl+F5 (ou Cmd+Shift+R no Mac) para forçar uma atualização completa
2. Limpar o cache do navegador nas configurações
3. Tentar em uma janela anônima/privada

## Prevenção de Problemas Futuros

1. **Atualize o Número de Versão**
   - Sempre que fizer alterações significativas no CSS, atualize o parâmetro de versão no arquivo HTML:
   ```html
   <link rel="stylesheet" href="styles.css?v=1.0.2">
   ```

2. **Desative o Cache Durante o Desenvolvimento**
   - Mantenha as configurações de cache atuais durante o desenvolvimento
   - Você pode restaurar caches mais longos para produção quando o site estiver estável

3. **Monitore os Headers de Resposta**
   - Use as ferramentas de desenvolvedor do navegador (F12) para verificar os headers de resposta
   - Verifique se o `Cache-Control` está configurado corretamente

Esperamos que estas soluções ajudem a resolver os problemas de cache no Netlify!