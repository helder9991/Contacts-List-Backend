# Versões dos softwares utilizados:  
  node v14.17.2  
  npm v6.14.13  
  
# Como utilizar
1 -  Crie o banco de dados com o nome ``contacts``  
  Obs: No desenvolvimento foi utilizado o PosgreSQL  
  
  
2 - Altere o arquivo .ormconfig conforme a necessidade    
  
  
3 - Rode o comando na pasta raiz do projeto:  
  - ```npm```  
  
  Nota: Este comando irá baixar as dependencias das bibliotecas (node_modules)  
  
  
4 - Rode o commando na pasta raiz do projeto:  
  - ```npm run typeorm migration:run```  
  
  Nota: Este comando irá criar a tabela no banco de dados
  
  
5 - Rode o commando na pasta raiz do projeto:  
  - ```npm run dev:server```  
  
  Nota: Este comando irá iniciar o backend  

