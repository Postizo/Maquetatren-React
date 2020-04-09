Aplicacion Maquetatren 

Entorno de desarrollo:
  Instalar servidor estatico:
    npm i serve
  Inicializamos el servidor:
    serve -s build
  Compilamos la aplicacion:
   yarn build
  Archivos compilados: .\build
Despliegue:
  Copiar archivos de .\build a .\Server\build

Produccion servidor:

- Instalación de forever:
    npm install forever -g
    forever start ./main.js
- Instalacion de nginx:
   sudo nginx -t
   Copiar archivo de configuracion en: /etc/nginx/nginx.conf
- Configurar crontab, para el inicio al reboot:
   crontab -u pi -e
   Agregar linea: @reboot /usr/local/bin/forever start /home/pi/NodeSocketReact/NodeSocket/Server/main.js

