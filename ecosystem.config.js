
module.exports = {
    apps: [
      {
        name: 'backend',
        script: 'node ./src/index.js',
        env: {
          PORT: 3000,
          DATABASE_URL: 'mysql://bitacora:bitacora1152@mysql.face.ubiobio.cl:3306/bitacora_bd?schema=public',
  
        },
      },
    ],
  };
  