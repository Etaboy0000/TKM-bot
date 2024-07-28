const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE5xV25Qb3dIZ21TcjRHZXZ2c0w0QU5vNGt5VDY4TEtpM0VKZ0VQMkptRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkpiZkpQNHdMbjNUNENKcXhvdkhTbW1ZRkRoN3lBekEzcG5yRWdQQzlHYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSzlEU3k4L2VUNGRTMVhKTTE3bVBsOEk5Y3pCOFRuN2crZ0ZkL0lWaFZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyaGpEOVc4RStxR2F5VGhhWENjTUpQci8yTGlUTGwxajRUR0Z4WWdDeFY4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRDWXI1dndwSlNuQ0tCRmhQdW4yaGpYalRlQTFWZkU1QWluYWJQcWlpVlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNmZGhWWUE2dXlucjBIVlgwOHgwRzgzRFE0blhqOGQwVlV5ZUROMUVwRFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ01yc0dJSUhzYkVxWDQxenJla0V5VHRkK0x1V3RYOFJrM3piWUR2d1kwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGQ0OUFEWm80Y290SmRWLytPanNnVFZ1ZmY0VVNkMFUxaE9HeUJyRytTND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt3YnVsMW44TnZhOGtSZ0JiYmx5ZGlBbXlzVGg0TzlCR0k1UENYbFhiNmN2bUlsNy9UVGw0OVI5bWl6TkRjWnptODI2N2p6M3lPNjIyTUlZRjRRMkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJlT1ZtRWEvbm4yS1FXUS9QTEVRVWFwSUo3S1p0c2gvUUtKZThhMjJkUXVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJocVBwemJMTlQxQzRBVmVxeFFwUGt3IiwicGhvbmVJZCI6IjEyNjg1OGU5LTRjNTctNDViMC04MWU2LTk5YzQwYzFjNzE5NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0aENMNDBWS2NEZDRucTAvU1RSNHFZZGF5V289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXVBL0FRdE9rSG1vTjJ1dXlHditUak5wNkY0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZRR1BOSDJSIiwibWUiOnsiaWQiOiIyMzc2ODA2Mjg0NDY6MjFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tMTTlqMFE3SXVadFFZWUJ5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IktuSGFRK0ZSMG5xN2tKZC9CS1FpOThaWGR2Zk8zc2JWNlpOL1hGN2h2eDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkkwTWFKZzRRSUxMajhkRUY2SUo2bkY4OHFjK2NKUmtSMURjcUdPL3dQVk9ON2VsanZOcllLWjRZN3N0TnNtNnZoWXE4ejEzVTUwS1labU1PK0x4S0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJETWRDRnZRcC9mSlFCbTZPZmRGMjNjZjYzbURZOEVFUWgrRWRXSXU1ZGhvQ0thWHRXcXN3WE1ULzJET2RjNlFEMEx0OXpTaXNocjFFN203UGVpU1VDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY4MDYyODQ0NjoyMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTcHgya1BoVWRKNnU1Q1hmd1NrSXZmR1YzYjN6dDdHMWVtVGYxeGU0YjhlIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTcyOTIxfQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "N",
    NUMERO_OWNER : process.env.OWNER_NUM || "237680628446",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Nate',
    URL : process.env.BOT_MENU_LINKS || 'https://preview.redd.it/favorite-yuuichi-image-v0-2n8cd726nwcc1.jpg?width=250&format=pjpg&auto=webp&s=8040864df78114b2bedfb9f716cf2cdf5658da2d ',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
