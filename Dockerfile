# Use a imagem oficial do MongoDB a partir do Docker Hub
FROM mongo:latest

# Configuração opcional (por exemplo, se você deseja fornecer um arquivo de configuração personalizado)
# COPY mongo.conf /etc/mongo/mongo.conf
# CMD ["mongod", "--config", "/etc/mongo/mongo.conf"]

# Exponha a porta padrão do MongoDB
EXPOSE 27017

# CMD padrão para iniciar o servidor MongoDB
CMD ["mongod"]
