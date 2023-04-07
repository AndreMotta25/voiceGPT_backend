# VoiceGPT
Apresento a você, o voiceGPT, com essa aplicação voce pode comandar o chatGPT por voz! 

Acredito que essa ideia tem muito potencial, especialmente porque permite que pessoas com deficiência visual usem a plataforma com facilidade. Há espaço para melhorias, mas acredito que é um bom começo. 

Sinta-se a vontade para mexer no codigo. Se o fizer, de uma ```estrelinha```

## Bibliotecas usadas
* Axios
* Cors
* OpenAi
* Multer
* Express
* Typescript
* @google-cloud/speech

# Começando
Para começar, de um ```yarn install``` e depois um ```yarn start```. O servidor vai ficar ouvindo na porta 3333.

## Api da OpenAi
Como vamos fazer requisiçoes ao chatGPT, temos que ter uma key para acessarmos sua api, então crie uma no link: https://platform.openai.com/account/api-keys
Nesse link você pode criar sua chave. 

Com a chave criada, você pode coloca-lá na variavel ```API_KEY```, mais precisamente na ```linha 15```. 
Com isso a configuração relacionado ao chatGPT está pronta.  

## Api do google
Essa api é responsavel por tranformar nossa fala em texto. Voce deve ter uma conta de serviço que pode ser criada seguinto o seguinte tutorial: https://cloud.google.com/speech-to-text/docs/before-you-begin?hl=pt-br#linux-or-macos

Seguindo esse passo a passo, a api do google já vai estar configurada e funcionando. 
