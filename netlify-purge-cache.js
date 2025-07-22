// Script para limpar o cache do Netlify
// Execute este script com Node.js quando precisar forçar uma atualização do cache

const https = require('https');

// Substitua com seu site ID do Netlify
const SITE_ID = 'jornada30diascomjesus'; // ou o ID do seu site no Netlify

// Substitua com seu token de acesso pessoal do Netlify
// Você pode gerar um em https://app.netlify.com/user/applications#personal-access-tokens
const ACCESS_TOKEN = 'seu-token-aqui'; 

const options = {
  hostname: 'api.netlify.com',
  path: `/api/v1/sites/${SITE_ID}/builds`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    console.log(`Resposta: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Erro: ${e.message}`);
});

req.end();

console.log('Solicitação de limpeza de cache enviada ao Netlify.');
console.log('Aguarde alguns minutos para que as alterações sejam aplicadas.');