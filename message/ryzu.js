"use strict";
require('../message/settings')
const { downloadContentFromMessage } = require("@adiwajshing/baileys")
const fs = require ("fs");
const cheerio = require("cheerio")
const moment = require("moment-timezone");
const Dym = require("didyoumean");
const util = require("util");
const imageToBase64 = require('image-to-base64');
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const acrcloud = require("acrcloud");
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const translate = require("@vitalets/google-translate-api");
const request = require("request");
const FormData = require("form-data");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const ms = require("parse-ms");
const toMS = require("ms");
const { Aki } = require("aki-api")
const clph = require("caliph-api");
const bochil = require("@bochilteam/scraper");
const nou = require("node-os-utils");
const ig = require('insta-fetcher');
const google = require('google-it');
const { Brainly } = require("brainly-scraper-v2");
const brain = new Brainly("id"); 
const { FajarNews, BBCNews, metroNews, CNNNews, iNews, KumparanNews, TribunNews, DailyNews, DetikNews, OkezoneNews, CNBCNews, KompasNews, SindoNews, TempoNews, IndozoneNews, AntaraNews, RepublikaNews, VivaNews, KontanNews, MerdekaNews, KomikuSearch, AniPlanetSearch, KomikFoxSearch, KomikStationSearch, MangakuSearch, KiryuuSearch, KissMangaSearch, KlikMangaSearch, PalingMurah, LayarKaca21, AminoApps, Mangatoon, WAModsSearch, Emojis, CoronaInfo, JalanTikusMeme,  Cerpen, Quotes, Couples, Darkjokes } = require("dhn-api");
let { sizeFormatter } = require("human-readable");
let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// Lib
const afk = require("../lib/afk");
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, generateProfilePicture, makeid, removeEmojis, calculate_age} = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { telesticker } = require("../lib/telestick")
const { igdl } = require("../lib/igdl");
const { covid } = require('../lib/covid') 
const { lirikLagu } =require("../lib/lirik.js")
const { Gempa } = require('../lib/gempa');
const { jadwaltv }= require('../lib/jadwaltv');
const { igstalk } = require('../lib/function')
const { getUser, getPost, searchUser, igstory } = require("../lib/instagram")
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const { casinoSave, setCasino, deleteCasino } = require("../lib/casino");
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('../lib/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('../lib/setleft');
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list');
const { addRespons, checkRespons, deleteRespons } = require('../lib/respon');
const { TelegraPh, UploadFileUgu } = require('../lib/uploader');
const { goLens } = require("../lib/googlens");
const { yta, ytv } = require("../lib/ytdl");
const { topUp } = require("../lib/duniagames");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");
const _sewa = require("../lib/sewa");
const msgFilter = require("../lib/antispam");
const { writeExif } = require("../lib/exif2");
const textpro = require("../lib/textpro");
const cerpen = require('../lib/cerpen')

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let listCmd = JSON.parse(fs.readFileSync('./database/listcmd.json'));
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let modsNumber = JSON.parse(fs.readFileSync('./database/modsNumber.json'));
let responDB = JSON.parse(fs.readFileSync('./database/respon.json'));
let listStore = JSON.parse(fs.readFileSync('./database/list-message.json'));
let banchat = JSON.parse(fs.readFileSync('./database/banChat.json'));
let geayubi = fs.readFileSync("./facture/geayubi.json");
let bocil = fs.readFileSync("./facture/bocil.json");
let rikagusriani = fs.readFileSync("./facture/rikagusriani.json");

// DB Game
let tictactoe = [];
let tebakgambar = [];
let kuis = []
let tebaklagu = [];
let family100 = [];
let akinator = {}

// Akses Eval
const uss = 'administrator'
const pass = 'keyy'

// Auto Reset Limit
setInterval(function() { 
    var jamna = new Date().toLocaleTimeString('en-US', { timeZone: "Asia/Jakarta" });
    var hasilnes = jamna.split(':')[0] < 10 ? '0' + jamna : jamna
    // hasilnes Kalo mau Jam 00 jadi 12:00:00 AM
    if(hasilnes === '12:00:00 AM') {
        limit = []
        fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
        glimit = []
        fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
        console.log("Limit Sudah Di Reset!")
    }
}, 1000);

// Bandwidth
async function checkBandwidth() {
    let ind = 0;
    let out = 0;
    for (let i of await require("node-os-utils").netstat.stats()) {
        ind += parseInt(i.inputBytes);
        out += parseInt(i.outputBytes);
    }
    return {
        download: format(ind),
        upload: format(out),
    };
}

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(ezii, msg, m, setting, store, welcome, left, set_welcome_db, set_left_db, db_respon_list, sewa, opengc, _afk) => {
    try {
    	var budy = (typeof msg.text == 'string' ? msg.text : '')
        let { ownerNumber, ownerName, botName, footer, instagram, lolkey, xteamkey, gamewaktu, limitCount, sticker: sct } = setting
        let { allMenu, donate } = require('./help')
        let footxt = `Error? Report to the number below↷\n░⃞ׇ͠🦢̸۪ ⚭ wa.me/6285758050756 ␥\n𖦆 ${footer}`
        let thumb = fs.readFileSync(setting.pathimg)
        const { type, quotedMsg, now, fromMe, mentioned } = msg
        if (msg.isBaileys) return
        const tanggal = moment().format("ll")
        const jam = moment().format("HH:mm:ss z")
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        var fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
        const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
        const ucapanWaktu2 = fildt.charAt(0).toUpperCase() + fildt.slice(1)
        const content = JSON.stringify(msg.message)
        const from = msg.key.remoteJid
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type == "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == "messageContextInfo") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const toJSON = j => JSON.stringify(j, null,'\t')
        if (ezii.multi) {
        	var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        } else {
        	if (ezii.nopref) {
                prefix = ''
        	} else {
                prefix = ezii.prefa
        	}
        }
        const args = chats.split(' ')
        const command = chats.toLowerCase().split(' ')[0] || ''
        const isCmd = command.startsWith(prefix)
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
        const isOwner = ownerNumber.includes(sender)
        const isMods = isOwner ? true : modsNumber.includes(sender) ? true : false
        const pushname = msg.pushName
        const text = chats.slice(command.length + 1, chats.length)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = ezii.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await ezii.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender)
        const isUser = pendaftar.includes(sender)
        const isAfkOn = afk.checkAfkUser(sender, _afk)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
        const isAntiLink = antilink.includes(from) ? true : false
        const isAntiWame = antiwame.includes(from) ? true : false
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isLeft = isGroup ? left.includes(from) ? true : false : false
        const isBanChat = isGroup ? banchat.includes(from) : false

        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        let timestamp = speed();
        let latensi = speed() - timestamp

        let wangsaf = "0@s.whatsapp.net"

        const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
        
        async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        const sendFileFromUrl = async (from, url, caption, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headerd["content-type"]
            let type = mime.split("/")[0]+"Message"
            if (mime.split("/")[0] === "image") {
               var img = await getBuffer(url)
               return ezii.sendMessage(from, { image: img, caption: caption }, options)
            } else if (mime.split("/")[0] === "video") {
               var vid = await getBuffer(url)
               return ezii.sendMessage(from, { video: vid, caption: caption }, options)
            } else if (mime.split("/")[0] === "audio") {
               var aud = await getBuffer(url)
               return ezii.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
            } else {
               var doc = await getBuffer(url)
               return ezii.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
            }
        }
        async function sendPlay(from, query) {
            var url = await yts(query)
            url = url.videos[0].url
            hxz.youtube(url).then(async(data) => {
                var button = [{ urlButton: { displayText: `Source Code`, url: `${url}` } }, { quickReplyButton: { displayText: `🎵 Audio`, id: `${prefix}ytmp3 ${url}` } }, { quickReplyButton: { displayText: `🎥 Video`, id: `${prefix}ytmp4 ${url}` } }]
                // var button = [{ buttonId: `!ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `!ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
                ezii.sendMessage(from, { caption: `🗒️Title : ${data.title}\n⚙️Quality : ${data.quality}\n📧Url : https://youtu.be/${data.id}`, image: { url: data.thumb }, templateButtons: button, footer: 'Pilih Salah Satu Button Dibawah', mentions: [sender] })
           }).catch((e) => {
               ezii.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => ezii.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
        function hitungmundur(bulan, tanggal) {
            let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        const isUrl = (url) => {
        	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function randomNomor(min, max = null) {
            if (max !== null) {
        	    min = Math.ceil(min);
        	    max = Math.floor(max);
        	    return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
        	    return Math.floor(Math.random() * min) + 1
            }
        }
        const pickRandom = (arr) => {
        	return arr[Math.floor(Math.random() * arr.length)]
        }
        function mentions(teks, mems = [], id) {
        	if (id == null || id == undefined || id == false) {
        	    let res = ezii.sendMessage(from, { text: teks, mentions: mems })
        	    return res
        	} else {
                let res = ezii.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        function parseMention(text = '') {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }
        const reply2 = (teks) => {
        	return ezii.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: msg })
        }
        const reply = (teks) => {
        ezii.sendMessage(from, { text : teks, contextInfo: {"externalAdReply": { title: "WHASTAPP BOT",mediaType: 3,renderLargerThumbnail: true, showAdAttribution: true, body: "nekopoi.care",thumbnail: thumb,sourceUrl: "https://www.instagram.com/p/CdE0RPbDRXi/?igshid=YmMyMTA2M2Y="}}}, { quoted: msg })
        }
        const troli =  {key: { fromMe: false,remoteJid: "status@broadcast", participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 2022, status: 200, thumbnail: thumb, surface: 200, message: ` • ${botName}\n • Pengguna : ${pushname}`, orderTitle: 'Eziitzy', sellerJid: '0@s.whatsapp.net'} } }    
        const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: thumb, surface: 200, message: `WHATSAPP BOT`, orderTitle: 'memek', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
        const fdoc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `WHATSAPP BOT`,jpegThumbnail: thumb}}}
        const fvn = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":359996400,"ptt": "true"}} } 
        const fgif = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})},message: {"videoMessage": { "title":`WHATSAPP BOT`, "h": `Hmm`,'seconds': '359996400', 'gifPlayback': 'true', 'caption': `WHATSAPP BOT`, 'jpegThumbnail': thumb}}}
        const fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": "P", "caption": `WHATSAPP BOT`, 'jpegThumbnail': thumb}}}
        const fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {}) },message: { "videoMessage": { "title":`${pushname}`, "h": `Hmm`,'seconds': '359996400', 'caption': `${pushname}`, 'jpegThumbnail': thumb}}}
        const floc = {key : {participant : '0@s.whatsapp.net'},message: {locationMessage: {name: `WHATSAPP BOT`,jpegThumbnail: thumb}}}
        const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb,sendEphemeral: true}}}
        const ftoko = {
        key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "16505434800@s.whatsapp.net" } : {})
        },
        message: {
        "productMessage": {
        "product": {
        "productImage":{
        "mimetype": "image/jpeg",
        "jpegThumbnail": thumb //Gambarnye
        },
        "title": "Ryzuubot", //Kasih namalu 
        "description": "Ryzuu Bot", 
        "currencyCode": "USD",
        "priceAmount1000": "2000",
        "retailerId": "Eziitzy",
        "productImageCount": 1
        },
        "businessOwnerJid": `0@s.whatsapp.net`
        }
        }
        }
        const flokasi = {
        key : {
        participant : '0@s.whatsapp.net'
        },
        message: {
        locationMessage: {
        name: 'Tokyo',
        jpegThumbnail: thumb
        }
        }
        }
        const fakeDeface = (from, teks, title, description, img, option = {}) => {
            if (!isUrl(teks)) return 'teks harus mengandung url'
            return ezii.sendMessage(from, {
                text: teks,
                title,
                matchedText: isUrl(teks)[0],
                canonicalUrl: isUrl(teks)[0],
                description,
                detectLinks: false,
                jpegThumbnail: img
            }, option)
        }
        const replyDeface = (teks) => {
            return ezii.sendMessage(from, {
                text: teks, contextInfo: {
                    externalAdReply: {
                        title: `© Ryzuubot`,
                        body: `Simple Bot WhatsApp`,
                        mediaType: 2,
                        thumbnail: thumb,
                        sourceUrl: `https://chat.whatsapp.com/FBioPs09A4SJFFhKYet5cr`
                    }
                }
            }, { quoted: msg })
        }
        const replyDeface2 = (teks) => {
            return ezii.sendMessage(from, {
                text: teks,
                mentions: [sender],
                contextInfo: {
                    externalAdReply: {
                        title: `${ucapanWaktu} ${pushname}`,
                        body: `Simple Bot WhatsApp`,
                        thumbnail: thumb,
                        mediaType:1,
                        mediaUrl: 'https://chat.whatsapp.com/FBioPs09A4SJFFhKYet5cr',
                        sourceUrl: 'https://chat.whatsapp.com/FBioPs09A4SJFFhKYet5cr'
                    }
                }
            }, { quoted:msg })
        }

        const textImg = (teks) => {
        	return ezii.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg), mentions: parseMention(teks) }, { quoted: msg })
        }
        const sendMess = (hehe, teks) => {
        	ezii.sendMessage(hehe, { text, teks })
        }
        const buttonWithText = (from, text, footer, buttons) => {
        	return ezii.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
        }
        const sendContact = (jid, numbers, name, quoted, mn) => {
        	let number = numbers.replace(/[^0-9]/g, '')
        	const vcard = 'BEGIN:VCARD\n' 
        	+ 'VERSION:3.0\n' 
        	+ 'FN:' + name + '\n'
        	+ 'ORG:;\n'
        	+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
        	+ 'END:VCARD'
        	return ezii.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
        }
        const getCase = (cases) => {
            return "case prefix+"+`'${cases}'`+fs.readFileSync(__filename).toString().split('case prefix+\''+cases+'\'')[1].split("break")[0]+"break"
        }

        async function getGcName(groupID) {
            try {
                let data_name = await ezii.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '-'
            }
        }

        /*async function getAtminTag(groupID) {
            try {
                let data_admin = await ezii.groupMetadata(groupID)
                let array_admin = [];
                for (let x of data_admin.participants) {
                    if (x.isAdmin === true) {
                        array_admin.push(x.jid)
                    }
                }
                return array_admin
            } catch (err) {
                return '-'
            }
        }

        async function getAtmin(groupID) {
            try {
                let list_admin = "*ADMIN GROUP:*\n"
                let data_group = await ezii.groupMetadata(groupID)
                for (let x of data_group.participants) {
                    if (x.isAdmin === true) {
                        list_admin += ` • @${x.jid.split('@')[0]}\n`
                    }
                }
                return list_admin.trim()
            } catch (err) {
                return '-'
            }
        }*/

        async function sendStickerFromUrl(from, url, packname1 = "Created By", author1 = "@eziigntng", options = {}) {
        	var names = Date.now() / 10000;
        	var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	            });
        	};
            exif.create(packname1, author1, `sendstc_${names}`)
        	download(url, './sticker/' + names + '.png', async function () {
                let filess = './sticker/' + names + '.png'
        	    let asw = './sticker/' + names + '.webp'
        	    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
        	        exec(`webpmux -set exif ./sticker/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        ezii.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
        	        })
                })
        	})
        }
        
        const buttonsBc = [
        	{ urlButton: { displayText: `Instagram`, url : `https://instagram.com/${instagram}` } },
        	{ quickReplyButton: { displayText: `🍙 Donasi`, id: `${prefix}donate` } },
            { quickReplyButton: { displayText: `👤 Owner`, id: `${prefix}owner` } }
        ]

        const buttonsDefault = [
            { urlButton: { displayText: `Instagram`, url : `https://instagram.com/${instagram}` } },
        	{ quickReplyButton: { displayText: `🍙 Donasi`, id: `${prefix}donate` } },
            { quickReplyButton: { displayText: `🍥 Infobot`, id: `${prefix}infobot` } },
        	{ quickReplyButton: { displayText: `📬 Dashboard`, id: `${prefix}dashboard` } }
        ]

        async function akiStart() {
            var data = await fetchJson(`https://api.lolhuman.xyz/api/akinator/start?apikey=${lolkey}`)
            return data
        }

        async function akiAnswer(server, frontaddr, session, signature, step, answer) {
	        var data = await fetchJson(`https://api.lolhuman.xyz/api/akinator/answer?apikey=${lolkey}&server=${server}&frontaddr=${frontaddr}&session=${session}&signature=${signature}&step=${step}&answer=${answer}`)
	        return data
	    }

        async function akiBack(server, frontaddr, session, signature, step, answer) {
            var data = await fetchJson(`https://api.lolhuman.xyz/api/akinator/back?apikey=${lolkey}&server=${server}&frontaddr=${frontaddr}&session=${session}&signature=${signature}&step=${step}&answer=${answer}`)
            return data
        }

        async function akiEnd(server, session, signature, step) {
            var data = await fetchJson(`https://api.lolhuman.xyz/api/akinator/end?apikey=${lolkey}&server=${server}&session=${session}&signature=${signature}&step=${step}`)
            return data
        }

        // Anti Link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                ezii.groupParticipantsUpdate(from, [sender], "remove")
            }
        }

        // Anti Wame
        if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(https:\/\/wa.me)/gi)) {
                if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                reply(`*「 NOMOR LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link wa.me, maaf kamu akan di kick`)
                ezii.groupParticipantsUpdate(from, [sender], "remove")
            }
        }
        
    async function addCountCmdUser(nama, sender, u) {
            var posi = null
            var pos = null
            Object.keys(u).forEach((i) => {
                if (u[i].jid === sender) {
                    posi = i
                }
            })
            if (posi === null) {
                u.push({jid: sender, db: [{nama: nama, count: 0}]})
                fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                Object.keys(u).forEach((i) => {
                    if (u[i].jid === sender) {
                        posi = i
                    }
                })
            }
            if (posi !== null) {
                Object.keys(u[posi].db).forEach((i) => {
                    if (u[posi].db[i].nama === nama) {
                        pos = i
                    }
                })
                if (pos === null) {
                    u[posi].db.push({nama: nama, count: 1})
                    fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                } else {
                    u[posi].db[pos].count += 1
                    fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                }
            }
        }

        async function getPosiCmdUser(sender, _db) {
            var posi = null
            Object.keys(_db).forEach((i) => {
                if (_db[i].jid === sender) {
                    posi = i
                }
            })
            return posi
        }

        async function addCountCmd(nama, sender, _db) {
            addCountCmdUser(nama, sender, _cmdUser)
            var posi = null
            Object.keys(_db).forEach((i) => {
                if (_db[i].nama === nama) {
                   posi = i
                }
            })
            if (posi === null) {
                _db.push({nama: nama, count: 1})
                fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            } else {
                _db[posi].count += 1
                fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            }
        }

        // Store
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                ezii.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
                    quoted: msg
                })
            } else {
                ezii.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: msg
                })
            }
        }

        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedMsg = msg.isQuotedMsg
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

        //document randomizer
        let documents = [doc1,doc2,doc3,doc4,doc5,doc6]
        let docs = pickRandom(documents)

        // Auto Read & Presence Online
        ezii.sendReadReceipt(from, sender, [msg.key.id])
        ezii.sendPresenceUpdate('available', from)

        // Auto Registrasi
        if (isCmd && !isUser) {
            pendaftar.push(sender)
            fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
        }
        
        // Auto Block +212
        if (sender.startsWith('212')) {
            return ezii.updateBlockStatus(sender, 'block')
        }

        // Mode
        if (ezii.mode === 'self'){
            if (!isOwner && !fromMe) return
        }

        // Premium
        _prem.expiredCheck(ezii, premium)

        // Tictactoe
        if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
        cekWaktuGame(ezii, tebakgambar) // Tebak Gambar
        if (isPlayGame(from, tebakgambar) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
                tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
            }
        }
        cekWaktuGame(ezii, kuis) // Kuis Game
        if (isPlayGame(from, kuis) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, kuis)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, kuis)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}kuis*`)
                kuis.splice(getGamePosi(from, kuis), 1)
            }
        }
        cekWaktuGame(ezii, tebaklagu) // Tebak Lagu
        if (isPlayGame(from, tebaklagu) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, tebaklagu)) {
                var htl = randomNomor(150, 200)
                addBalance(sender, htl, balance)
                reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebaklagu)}\nHadiah : ${htl} balance\n\nIngin bermain lagi? ketik *${prefix}tebaklagu*`)
                tebaklagu.splice(getGamePosi(from, tebaklagu), 1)
            }
        }
        cekWaktuGame(ezii, family100) // Family 100
        if (isPlayGame(from, family100) && isUser) {
            var anjuy = getJawabanGame(from, family100)
            for (let i of anjuy) {
                if (chats.toLowerCase().includes(i)) {
                    var htli = randomNomor(150, 200)
                    addBalance(sender, htli, balance)
                    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${i}\nHadiah : ${htli} balance\n\nIngin bermain lagi? ketik *${prefix}family100*`)
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                }
            }
            if (anjuy.length < 1) {
                ezii.sendMessage(from, { text: `Semua jawaban sudah tertebak\nKirim *${prefix}family100* untuk bermain lagi` })
                family100.splice(getGamePosi(from, family100), 1)
            }
        }

        // Anonymous Chat
        if (!isGroup && !msg.key.fromMe && !isCmd) {
        	this.anonymous = this.anonymous ? this.anonymous : {}
        	let rums = Object.values(this.anonymous).find(room => [room.a, room.b].includes(sender) && room.state == "CHATTING")
        	if (rums) {
        	    var partnerJID = [rums.a, rums.b].find(user => user !== sender)
        	    if (msg.type == "conversation") {
                    ezii.sendMessage(partnerJID, { text: chats })
        	    } else if (msg.type == "extendedTextMessage") {
                    ezii.sendMessage(partnerJID, { text: chats, contextInfo: msg.message["extendedTextMessage"].contextInfo })
        	    } else {
                    var contextInfo = msg.message[msg.type].contextInfo
        	        ezii.sendMessageFromContent(partnerJID, msg.message, { contextInfo })
        	    }
        	}
        }

        if (fs.existsSync(`./database/casino/${from}.json`)) {
            var casinoo = setCasino(`${from}`)
            if (sender == `${casinoo.Y}@s.whatsapp.net` && chats.toLowerCase() == 'n') {
                ezii.sendMessage(from, { text: `「 Game Casino Rejected 」\n\n• @${casinoo.Y} Membatalkan Game`, mentions: [casinoo.Y+"@s.whatsapp.net"] }, {quoted: msg })
                deleteCasino(from)
            }
            if (sender == `${casinoo.Y}@s.whatsapp.net` && chats.toLowerCase() == 'y') {
                var angka1 = await randomNomor(10, 20)
                var angka2 = await randomNomor(10, 20)
                if (angka1 > angka2) {
                    starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 👑
• @${casinoo.Y} --> ${angka2} 🥈

Pemenangnya adalah [ @${casinoo.Z} ]
Mendapatkan: $ ${nebal(casinoo.nominal)}`
                    ezii.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net"]}, {quoted: msg })
                    await addBalance(`${casinoo.Z}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    await kurangBalance(`${casinoo.Y}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    deleteCasino(from)
                } else if (angka1 < angka2) {
                    starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 🥈
• @${casinoo.Y} --> ${angka2} 👑

Pemenangnya adalah [ @${casinoo.Y} ]
Mendapatkan: $ ${nebal(casinoo.nominal)}`
                    ezii.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net"] }, {quoted: msg })
                    await addBalance(`${casinoo.Y}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    await kurangBalance(`${casinoo.Z}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    deleteCasino(from)
                } else if (angka1 = angka2) {
                    starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 📍
• @${casinoo.Y} --> ${angka2} 📍

Games Draw, Tidak Ada Pemenang`
                    ezii.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net" ]}, { quoted: msg })
                    deleteCasino(from)
                }
            }
        }
        // Auto Write Database Akinator Every 1 Minutes
        setInterval(() => {
            fs.writeFileSync('./database/akinator.json', JSON.stringify(akinator, null, 2))
        }, 30 * 1000)

        // Akinator
        if (!isGroup && akinator.hasOwnProperty(sender.split('@')[0]) && !isCmd && ["0", "1", "2", "3", "4"].includes(chats)) {
            var { server, frontaddr, session, signature, question, step } = akinator[sender.split('@')[0]]
            var jwb = (await akiAnswer(server, frontaddr, session, signature, step, chats)).result
            if (jwb.hasOwnProperty('name')) {
                var img = await getBuffer(jwb.image)
                var cpt = `*HASIL DITEMUKAN*\n\nNama : ${jwb.name}\nDeskripsi : ${jwb.description}`
                ezii.sendMessage(from, { image: img, caption: cpt }, { quoted: msg })
                .then( res => {
                    delete akinator[sender.split("@")[0]]
                })
                return
            }
            var jques = jwb.question
            var jstep = jwb.step
            var jteks = `${jques}\n\n`
            jteks += `0 - Ya\n`
            jteks += `1 - Tidak\n`
            jteks += `2 - Tidak Tahu\n`
            jteks += `3 - Mungkin\n`
            jteks += `4 - Mungkin Tidak`
            ezii.sendMessage(from, { text: jteks }, { quoted: msg }).then( res => {
                var jaki = akinator[sender.split("@")[0]]
                jaki.question = jques
                jaki.step = jstep
                akinator[sender.split("@")[0]] = jaki
            })
        }

        // Antispam
        msgFilter.ResetSpam(ezii.spam)

		const spampm = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
            msgFilter.addSpam(sender, ezii.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }
        const spamgr = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            msgFilter.addSpam(sender, ezii.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }

        if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
        if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
        if (isCmd && args[0].length > 1 && !isOwner && !isPremium) msgFilter.addFilter(sender)

		if (chats.startsWith("x ") && isMods) {
            console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            const ev = (sul) => {
                var sat = JSON.stringify(sul, null, 2)
                var bang = util.format(sat)
                if (sat == undefined) {
                    bang = util.format(sul)
                }
                return reply(bang)
            }
            try {
                reply(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
            } catch (e) {
                reply(util.format(e))
            }
		} else if (chats.startsWith("$ ") && isMods) {
            console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            exec(chats.slice(2), (err, stdout) => {
                if (err) return reply(`${err}`)
                if (stdout) reply(`${stdout}`)
            })
        } else if (chats.startsWith("> ") && isMods) {
	        console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
        try {
            let evaled = await eval(chats.slice(2))
            if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
            reply(`${evaled}`)
        } catch (err) {
            reply(`${err}`)
        }
        }
        
		// Logs
		if (!isGroup && isCmd && !fromMe) {
		    addBalance(sender, randomNomor(20), balance)
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
		    addBalance(sender, randomNomor(20), balance)
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

        function triggerSticker() {
            try {
                for (let x = 0; x < responDB.length; x++) {
                    if (msg.message.stickerMessage.fileSha256.toString('hex') == responDB[x].hex) {
                        return responDB[x].balasan;
                    }
                }
            } catch {
                return false;
            }
        }
        switch (command || triggerSticker()) {
        case prefix+'menu': case prefix+'help':
            addCountCmd('#menu', sender, _cmd)
            let mundur = hitungmundur(7, 9)
            var { download, upload } = await checkBandwidth();
            // ezii.sendMessage(from, { caption: allMenu(ucapanWaktu, pushname, mundur, upload, download, ownerName, botName, jam, tanggal, runtime, isOwner, isPremium, sender, limitCount, limit, gcount, glimit, balance, prefix), location: { jpegThumbnail: fs.readFileSync(setting.pathimg) }, footer: footxt, templateButtons: buttonsDefault, mentions: [sender] })
            ezii.sendMessage(from, { document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), caption: allMenu(ucapanWaktu, pushname, mundur, upload, download, ownerName, botName, jam, tanggal, runtime, isOwner, isPremium, sender, limitCount, limit, gcount, glimit, balance, prefix), mimetype: `${docs}`, fileName: `Hai kak ${pushname}`, jpegThumbnail: fs.readFileSync(setting.pathimg), footer: footxt, templateButtons: buttonsDefault, mentions: [sender] }, { quoted: msg })
            break
        case prefix+'infobot': case prefix+'info': case prefix+'botinfo':
            addCountCmd('#infobot', sender, _cmd)
            var capt = `_*${botName} Information*_

*• Name :* ${ezii.user.name}
*• Number :* ${botNumber.split("@")[0]}
*• Owner :* 6285758050756
*• Total Pengguna :* ${pendaftar.length}
*• Prefix :* Multi Prefix
*• Bot Created On 2 Mei 2022*

_*Special Thanks To :*_
*• Allah SWT*
*• Adiwajshing/Baileys*
*• Eziigntng*
*• Ryzuubot*
*• Penyedia Dari :*
   *- Rest Api*
   *- Module*`
            var buts = [
                { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
                { quickReplyButton: { displayText: `🍙 Donasi`, id: `${prefix}donate` } },
                { quickReplyButton: { displayText: `👤 Owner`, id: `${prefix}owner` } }
            ]
            ezii.sendMessage(from, { image: thumb, caption: capt, footer: footxt, templateButtons: buts })
            break
        case prefix+'donate': case prefix+'donasi':
            addCountCmd('#donate', sender, _cmd)
            var butdonate = [ { urlButton: { displayText: `Tautan`, url: `https://wa.me/message/UIIYFGKTGZTXO1` } } ]
            ezii.sendMessage(from, { image: fs.readFileSync('./media/qris.jpg'), caption: donate(pushname, ownerNumber), footer: footxt, templateButtons: butdonate })
            break;
        case prefix+'dashboard':
	        addCountCmd('#dashboard', sender, _cmd)
            var posi = await getPosiCmdUser(sender, _cmdUser)
            _cmdUser[posi].db.sort((a, b) => (a.count < b.count) ? 1 : -1)
            _cmd.sort((a, b) => (a.count  < b.count) ? 1 : -1)
            var posi = await getPosiCmdUser(sender, _cmdUser)
            var jumlahCmd = _cmd.length
            if (jumlahCmd > 10) jumlahCmd = 10
            var jumlah = _cmdUser[posi].db.length
            if (jumlah > 5) jumlah = 5
            var totalUser = 0
            for (let x of _cmdUser[posi].db) {
                totalUser = totalUser + x.count
            }
            var total = 0
            for (let o of _cmd) {
                total = total + o.count
            }
            var teks = `*RYZUU BOT DASHBOARD*\n\n*HIT*\n• GLOBAL : ${total}\n• USER : ${totalUser}\n\n`
            teks += `*Most Command Global*\n`
            for (let u = 0; u < jumlahCmd; u ++) {
                teks += `• ${_cmd[u].nama} : ${_cmd[u].count}\n`
            }
            teks += `\n*Most Command User*\n`
            for (let i = 0; i < jumlah; i ++) {
                teks += `• ${_cmdUser[posi].db[i].nama} : ${_cmdUser[posi].db[i].count}\n`
            }
            replyDeface(teks)
            break
        case prefix+'owner': 
            addCountCmd('#owner', sender, _cmd)
            // sendContact(from, ownerNumber.split('@s.whatsapp.net')[0], ownerName, msg)
            ezii.sendContact(from, ownerNumber.map( i => i.split("@")[0]), msg)
            .then((res) => ezii.sendMessage(from, { text: 'Tuh Nomor Ownerku' }, {quoted: res}))
            break
        case prefix+'groupbot': case prefix+'grupbot':
            addCountCmd('#groupbot', sender, _cmd)
            reply(`･ᴗ･ ‌@𝗿𝘆𝘇𝘂𝘂𝗯𖦹‌𝘁𝘇 凛
https://chat.whatsapp.com/FBioPs09A4SJFFhKYet5cr`)
            break
        case prefix+'cekdrive': case prefix+'drive':
            var result = await nou.drive.info();
            addCountCmd('#cekdrive', sender, _cmd)
            replyDeface(`*Drive Server Info*\n\n *• Total :* ${result.totalGb} GB\n *• Used :* ${result.usedGb} GB (${result.usedPercentage}%)\n *• Free :* ${result.freeGb} GB (${result.freePercentage}%)`)
            break
        case prefix+'cekbandwidth': case prefix+'bandwidth':
            reply(mess.wait);
            addCountCmd('#cekbandwidth', sender, _cmd)
            var { download, upload } = await checkBandwidth();
            replyDeface(`*Bandwidth Server*\n\n*>* Upload : ${upload}\n*>* Download : ${download}`)
            break
        case prefix+'cekprem': case prefix+'cekpremium':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            addCountCmd('#cekpremium', sender, _cmd)
            if (isOwner) return reply(`Lu owner bego!`)
            if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
            let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
            let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
            reply(premiumnya)
            break
        case prefix+'listpremium': case prefix+'listprem':
            addCountCmd('#listpremium', sender, _cmd)
            let txt = `*List Premium User*\nJumlah : ${premium.length}\n\n`
            let men = [];
            for (let i of premium) {
                men.push(i.id)
                txt += `*ID :* @${i.id.split("@")[0]}\n`
                if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
            }
            mentions(txt, men, true)
            break
        case prefix+'listsewa':
            let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`
            let data_array = [];
            for (let x of sewa) {
                addCountCmd('#listsewa', sender, _cmd)
                list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
                if (x.expired === 'PERMANENT') {
                    let ceksewa = 'PERMANENT'
                    list_sewa_list += `*Expire :* PERMANENT\n\n`
                } else {
                    let ceksewa = ms(x.expired - Date.now())
                    list_sewa_list += `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)\n\n`
                }
            }
            ezii.sendMessage(from, { text: list_sewa_list }, { quoted: msg })
            break
        case prefix+'speed': case prefix+'ping':
            addCountCmd('#speed', sender, _cmd)
            let butSinyal = [
            { urlButton: { displayText: `Instagram`, url : `https://instagram.com/${instagram}` } }
            ]
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            caption: `SPEEDTEST`, 
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: `${latensi.toFixed(4)} Second`,
            templateButtons: butSinyal
            }, { quoted: msg })
            break
        case prefix+'runtime':
            addCountCmd('#runtime', sender, _cmd)
            let butRun = [
            { urlButton: { displayText: `Instagram`, url : `https://instagram.com/${instagram}` } }
            ]
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            caption: `Active During`, 
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: `${runtime(process.uptime())}`,
            templateButtons: butRun
            }, { quoted: msg })
            break
        case prefix+'listbahasa':
            addCountCmd('#listbahasa', sender, _cmd)
            var clear = ["auto", "isSupported", "getCode"]
            var teks = `List Bahasa Yang Tersedia\n\n`
            for (let i in translate.languages) {
                if (!clear.includes(i)) {
                    teks += `*${i}* untuk ${translate.languages[i]}\n`
                }
            }
            reply(teks)
            break
        case prefix+"listdm":{
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\nContoh : ${command} 646675175`)
            var id = q
            var ffdm = ["5","12","70","140","355","720","1450"]
            var row = []
            for (var ik = 0; ik < ffdm.length; ik++) {
                row.push({
                    title: ffdm[ik]+" Diamond",
                    rowId: prefix+"topupff "+id+"|"+ffdm[ik]
                })
            }
            var listDiamond = {
                text: `List Service Diamond Free Fire`,
                buttonText: 'Click Here!',
                sections: [{
                    title: "LIST-SERVICE", rows: row
                }]
            }
            ezii.sendMessage(from, listDiamond)
            }
            break
        case prefix+"topupff":{
            if (!q) return reply(`Gunakan dengan cara ${command} *id|jumlah diamond*\n\nContoh : ${command} 646675175|1450`)
            let id = q.split("|")[0]
            let diamond = q.split("|")[1]
            let data = await topUp(id, "", diamond, "6285758050756", "freefire")
            let tex = `*TopUp FreeFire*

ID : ${id}
NickName : ${data.data.gameDetail.userName}
Total Diamond : ${diamond} Diamond
Silahkan Scan QR Untuk Membayar

*Note* : _QR Hanya Berlaku 5 Menit_`
            ezii.sendMessage(from, { image: await getBuffer(data.data.elisaConfig.qrCode), caption: tex }, { quoted: msg })
            }
            break
            
        // Converter & Tools Menu
        case prefix+'sticker': case prefix+'stiker': case prefix+'s':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isImage || isQuotedImage) {
                addCountCmd('#sticker', sender, _cmd)
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                var buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                var rand1 = 'sticker/'+getRandom('.jpg')
                var rand2 = 'sticker/'+getRandom('.webp')
                fs.writeFileSync(`./${rand1}`, buffer)
                ffmpeg(`./${rand1}`)
                .on("error", console.error)
                .on("end", () => {
                    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                        ezii.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                        limitAdd(sender, limit)
                        fs.unlinkSync(`./${rand1}`)
                        fs.unlinkSync(`./${rand2}`)
                    })
                })
                .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
                .toFormat('webp')
                .save(`${rand2}`)
            } else if (isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && quotedMsg.videoMessage.seconds < 10) {
                addCountCmd('#sticker', sender, _cmd)
                reply(mess.wait)
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                var buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                var rand1 = 'sticker/'+getRandom('.mp4')
                var rand2 = 'sticker/'+getRandom('.webp')
                fs.writeFileSync(`./${rand1}`, buffer)
                ffmpeg(`./${rand1}`)
                .on("error", console.error)
                .on("end", () => {
                    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                        ezii.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                        limitAdd(sender, limit)
                        fs.unlinkSync(`./${rand1}`)
                        fs.unlinkSync(`./${rand2}`)
                    })
                })
                .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
                .toFormat('webp')
                .save(`${rand2}`)
            } else {
                reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
            }
            break
        case prefix+'swm': case prefix+'wm': case prefix+'stikerwm': case prefix+'stickerwm':
            if (isBanChat) return reply(mess.banChat)
            if (!isPremium) return reply(mess.OnlyPrem)
            var packname = q.split('|')[0] ? q.split('|')[0] : q
            var author = q.split('|')[1] ? q.split('|')[1] : ''
            if (isImage || isQuotedImage) {
                if (args.length < 2) return reply(`Gunakan dengan cara ${command} nama|author\n\nContoh : ${command} ezii|gntng`)
                addCountCmd('#stickerwm', sender, _cmd)
                var media = await ezii.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}.jpeg`)
                var opt = { packname, author }
                ezii.sendImageAsSticker(from, media, msg, opt)
                .then( res => {
                    fs.unlinkSync(media)
                }).catch((e) => reply(mess.error.api))
            } else if (isVideo || isQuotedVideo) {
                if (args.length < 2) return reply(`Gunakan dengan cara ${command} nama|author\n\nContoh : ${command} ezii|gntng`)
                reply(mess.wait)
                addCountCmd('#stickerwm', sender, _cmd)
                var media = await ezii.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender}.jpeg`)
                var opt = { packname, author }
                ezii.sendImageAsSticker(from, media, msg, opt)
                .then( res => {
                    fs.unlinkSync(media)
                }).catch((e) => reply(mess.error.api))
            } else {
                reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
            }
            break
        case prefix+'smeme': case prefix+'stikermeme': case prefix+'stickermeme': case prefix+'memestiker':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var atas = q.includes('|') ? q.split('|')[0] ? q.split('|')[0] : q : '-'
            var bawah = q.includes('|') ? q.split('|')[1] ? q.split('|')[1] : '' : q
            var opt = { packname: 'Ryzuubot', author: '@eziigntng_' }
            if (isImage || isQuotedImage) {
                try {
                    if (args.length < 2) return reply(`Gunakan dengan cara ${command} text atas|text bawah\n\nContoh : ${command} Beliau|Awikawok`)
                    reply(mess.wait)
                    addCountCmd('#smeme', sender, _cmd)
                    var media = await ezii.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender+Date.now()}.jpg`)
                    var media_url = (await UploadFileUgu(media)).url
                    var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
                    ezii.sendImageAsSticker(from, meme_url, msg, opt)
                    limitAdd(sender, limit)
                    fs.unlinkSync(media)
                } catch (e) {
                    console.log(color('[ ERROR ]', 'red'), e)
                    reply(mess.error.api)
                    ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
                }
            } else if (isQuotedSticker) {
                try {
                    if (args.length < 2) return reply(`Gunakan dengan cara ${command} text atas|text bawah\n\nContoh : ${command} Beliau|Awikawok`)
                    reply(mess.wait)
                    addCountCmd('#smeme', sender, _cmd)
                    var media = await ezii.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender+Date.now()}.webp`)
                    var media_url = (await UploadFileUgu(media)).url
                    var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
                    ezii.sendImageAsSticker(from, meme_url, msg, opt)
                    limitAdd(sender, limit)
                    fs.unlinkSync(media)
                } catch (err) {
                    console.log(color('[ ERROR ]', 'red'), err)
                    reply(mess.error.api)
                    ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
                }
            } else {
                reply(`Kirim Gambar atau balas Sticker dengan caption ${command} teks atas|teks bawah`)
            }
            break
        case prefix+'toimg': case prefix+'toimage': case prefix+'tovid': case prefix+'tovideo':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isQuotedSticker) return reply(`Reply stikernya!`)
            var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            var buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            var rand1 = 'sticker/'+getRandom('.webp')
            var rand2 = 'sticker/'+getRandom('.png')
            fs.writeFileSync(`./${rand1}`, buffer)
            if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                addCountCmd('#toimg', sender, _cmd)
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                    fs.unlinkSync(`./${rand1}`)
                    if (err) return reply(mess.error.api)
                    ezii.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                    limitAdd(sender, limit)
                    fs.unlinkSync(`./${rand2}`)
                })
            } else {
                reply(mess.wait)
                addCountCmd('#tovid', sender, _cmd)
                webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    ezii.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: msg })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'tomp3': case prefix+'toaudio':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isVideo || isQuotedVideo) {
                let media = await downloadAndSaveMediaMessage('video', `./sticker/${sender}.mp4`)
                reply(mess.wait)
                addCountCmd('#tomp3', sender, _cmd)
                let ran = './sticker/'+getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                    fs.unlinkSync(media)
                    if (err) return reply('Gagal :V')
                    ezii.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3` }, { quoted: msg })
                    limitAdd(sender, limit)
                    fs.unlinkSync(media)
                    fs.unlinkSync(ran)
                })
            } else {
                reply(`Kirim/reply video dengan caption ${command}`)
            }
            break
        case prefix+'ttp':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
            if (q.length > 75) return reply(`Teksnya terlalu panjang`)
            addCountCmd('#ttp', sender, _cmd)
            var pth = await getBuffer(`https://api.xteam.xyz/ttp?file&text=${encodeURIComponent(q)}`)
            fs.writeFileSync(`./sticker/${sender}.png`, pth)
            var media = `./sticker/${sender}.png`
            await ffmpeg(`${media}`)
            .input(media)
            .on('start', function (cmd) {
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                reply(mess.error.api)
            })
            .on('end', function () {
                exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    ezii.sendMessage(from, { sticker: fs.readFileSync(`./sticker/${sender}.webp`) }, {quoted: msg})
                    limitAdd(sender, limit)
                    fs.unlinkSync(media)
                    fs.unlinkSync(`./sticker/${sender}.webp`)
                })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(`./sticker/${sender}.webp`)
            break
        case prefix+'attp':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
            if (q.length > 75) return reply(`Teksnya terlalu panjang`)
            addCountCmd('#attp', sender, _cmd)
            var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            var rand2 = 'sticker/'+getRandom('.webp')
            fs.writeFileSync(`./${rand2}`, data)
            exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                ezii.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                limitAdd(sender, limit)
                fs.unlinkSync(`./${rand2}`)
            })
            break
        case prefix+'emojimix': case prefix+'mixemoji':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} emoji1+emoji2\n\nContoh : ${command} 😅+😝`)
            var emo1 = q.split("+")[0]
            var emo2 = q.split("+")[1]
            if (!isEmoji(emo1) || !isEmoji(emo2)) return reply(`Itu bukan emoji!`)
            addCountCmd('#emojimix', sender, _cmd)
            fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
            .then(data => {
                sendStickerFromUrl(from, data.results[0]. url, packname, author, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => reply(mess.error.api))
            break
        case prefix+'nulis':
            if (isBanChat) return reply(mess.banChat)
            addCountCmd('#nulis', sender, _cmd)
            reply(`*Pilihan Fitur Nulis*
1. ${prefix}nuliskiri
2. ${prefix}nuliskanan
3. ${prefix}foliokiri
4. ${prefix}foliokanan

Contoh:
${prefix}nuliskiri Jangan Lupa Donasi`)
            break
        case prefix+'nuliskiri': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
            reply(mess.wait)
            const tulisan = body.slice(11)
            addCountCmd('#nuliskiri', sender, _cmd)
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './media/nulis/images/buku/sebelumkiri.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '22',
                '-interline-spacing',
                '2',
                '-annotate',
                '+140+153',
                fixHeight,
                './media/nulis/images/buku/setelahkiri.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    ezii.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'nuliskanan': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
            reply(mess.wait)
            const tulisan = body.slice(12)
            addCountCmd('#nuliskanan', sender, _cmd)
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './media/nulis/images/buku/sebelumkanan.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '2',
                '-annotate',
                '+128+129',
                fixHeight,
                './media/nulis/images/buku/setelahkanan.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    ezii.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'foliokiri': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
            reply(mess.wait)
            const tulisan = body.slice(11)
            addCountCmd('#foliokiri', sender, _cmd)
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './media/nulis/images/folio/sebelumkiri.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '1720x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '4',
                '-annotate',
                '+48+185',
                fixHeight,
                './media/nulis/images/folio/setelahkiri.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    ezii.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'foliokanan': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
            reply(mess.wait)
            const tulisan = body.slice(12)
            addCountCmd('#foliokanan', sender, _cmd)
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './media/nulis/images/folio/sebelumkanan.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '3',
                '-annotate',
                '+89+190',
                fixHeight,
                './media/nulis/images/folio/setelahkanan.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    ezii.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'spamcall':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} nomor\n\nContoh : ${command} 628XXXXXXXXXX`)
            var data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${args[1]}`).catch(() => reply(mess.error.api))
            if (data.status == false) {
                reply(data.msg)
            } else {
                addCountCmd('#spamcall', sender, _cmd)
                reply(data.logs)
            }
            break
        case prefix+'say':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} ezii`)
	        addCountCmd('#say', sender, _cmd)
	        var lang = q.split("--")[1]
            if (!lang) lang = 'id'
            var gen = ["female", "male"].includes(args[1]) ? args[1] : 'male'
            var teks = ["female", "male"].includes(args[1]) ? (q.slice(args[1].length + 1, q.length).split('--')[0]) : q.split('--')[0]
            ezii.sendPresenceUpdate('recording', from)
            getBuffer(`http://texttospeech.responsivevoice.org/v1/text:synthesize?text=${removeEmojis(teks)}&lang=${lang}&engine=g3&name=&pitch=0.5&rate=0.420&volume=1&key=0POmS5Y2&gender=${gen}`)
            .then(async(buf) => {
                ezii.sendMessage(from, { audio: buf, mimetype: 'audio/mp4', ptt: true }, { quoted: msg })
                limitAdd(sender, limit)
            })
            break
        case prefix+'translate': case prefix+'tr':{
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara :\n${command} kodebahasa text\n${command} kodebahasa < reply chat >\n\nContoh :\n${command} id what\n${command} id < reply chat >`)
            if (isQuotedMsg){
                addCountCmd('#translate', sender, _cmd)
                let bahasanya = args[1].toString()
                const trans = await translate(quotedMsg.chats, {
                    to: bahasanya
                })
                .then((res) => reply(res.text))
                .catch((err) => {
                    reply(`Kode bahasa salah!`)
                })
                trans
                limitAdd(sender, limit)
            } else {
                if (args.length < 3) return reply(`Gunakan dengan cara :\n${command} kodebahasa text\n${command} kodebahasa < reply chat >\n\nContoh :\n${command} id what\n${command} id < reply chat >`)
                addCountCmd('#translate', sender, _cmd)
                let bahasanya = args[1].toString()
                let textnya = q.slice(args[1].length + 1, q.length)
                const trans = await translate(textnya, {
                    to: bahasanya
                })
                .then((res) => reply(res.text))
                .catch((err) => {
                    reply(`Kode bahasa salah!`)
                })
                trans
                limitAdd(sender, limit)
            }
            }
            break

        // Anonymous Chat
        case prefix+'anonymous':
            if (isGroup) return reply(mess.OnlyPM)
            addCountCmd('#anonymous', sender, _cmd)
            this.anonymous = this.anonymous ? this.anonymous : {}
            var but = [
                { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                { quickReplyButton: { displayText: "SEARCH", id: prefix+'start' }}
            ]
            var teks = `Hai ${pushname !== undefined ? pushname : 'Kak'} Selamat Datang di Anonymous Chat\n\nKetik ${prefix}search untuk mencari Teman Chat anda, atau bisa pencet tombol Search dibawah`
             ezii.sendMessage(from, { 
             document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
             caption: teks, 
             mimetype: `${docs}`, 
             fileName: `Hai kak ${pushname}`, 
             jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
             footer: footxt,
             templateButtons: but
             }, { quoted: msg })
            break
        case prefix+'start': case prefix+'search':
            if (isGroup) return reply(mess.OnlyPM)
            addCountCmd('#start', sender, _cmd)
            this.anonymous = this.anonymous ? this.anonymous : {}
            var rooms = Object.values(this.anonymous).find(room => room.check(sender))
            if (rooms) {
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "STOP", id: prefix+'stop' }},
                    { quickReplyButton: { displayText: "SKIP", id: prefix+'skip' }}
                ]
                var teks = `[⚠️] Kamu masih dalam sesi chat dengan partner! ❌`
                return ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
            }
            var roomm = Object.values(this.anonymous).find(room => room.state == "WAITING" && !room.check(sender))
            if (roomm) {
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "STOP", id: prefix+'stop' }},
                    { quickReplyButton: { displayText: "SKIP", id: prefix+'skip' }}
                ]
                roomm.b = sender
                roomm.state = "CHATTING"
                var teks = `_Pasangan Ditemukan 🐼_\n${prefix}skip -- _cari pasangan baru_\n${prefix}stop -- _hentikan dialog ini_`
                await ezii.sendMessage(room.a, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
                await ezii.sendMessage(room.b, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
               }, { quoted: msg })
            } else if (!rooms) {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: sender,
                    b: '',
                    state: "WAITING",
                    check: function(who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function(who = '') {
                        return who == this.a ? this.b : who == this.b ? this.a : ''
                    }
                }
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "STOP", id: prefix+'stop' }}
                ]
                var teks = `[🔎] Mohon tunggu sedang mencari teman chat`
                await ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
            }
            break
        case prefix+'next': case prefix+'skip':
            if (isGroup) return reply(mess.OnlyPM)
            addCountCmd('#next', sender, _cmd)
            this.anonymous = this.anonymous ? this.anonymous : {}
            let romeo = Object.values(this.anonymous).find(room => room.check(sender))
            var but = [
                { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                { quickReplyButton: { displayText: "SEARCH", id: prefix+'start' }}
            ]
            if (!romeo) {
                var teks = `[⚠️] Kamu belum pernah memulai chat! ❌`
                await ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
               }, { quoted: msg })
                throw false
            }
            let other = romeo.other(sender)
            var teks1 = `[⚠️] Sesi chat ini telah diberhentikan oleh teman chat kamu! ❌`
            if (other) await ezii.sendMessage(other, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks1, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
            delete this.anonymous[romeo.id]
            let room = Object.values(this.anonymous).find(room => room.state == "WAITING" && !room.check(sender))
            if (room) {
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "STOP", id: prefix+'stop' }},
                    { quickReplyButton: { displayText: "SKIP", id: prefix+'skip' }}
                ]
                room.b = sender
                room.state = "CHATTING"
                var teks = `_Pasangan Ditemukan 🐼_\n${prefix}skip -- _cari pasangan baru_\n${prefix}stop -- _hentikan dialog ini_`
                await ezii.sendMessage(room.a, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
                await ezii.sendMessage(room.b, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
               }, { quoted: msg })
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: sender,
                    b: '',
                    state: "WAITING",
                    check: function(who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function(who = '') {
                        return who == this.a ? this.b : who == this.b ? this.a : ''
                    }
                }
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "STOP", id: prefix+'stop' }}
                ]
                var teks = `[🔎] Mohon tunggu sedang mencari teman chat`
                await ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
            }
            break
        case prefix+'stop':
            if (isGroup) return reply(mess.OnlyPM)
            addCountCmd('#stop', sender, _cmd)
            this.anonymous = this.anonymous ? this.anonymous : {}
            var roomo = Object.values(this.anonymous).find(room => room.check(sender))
            if (!roomo) {
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "SEARCH", id: prefix+'start' }}
                ]
                var teks = `[⚠️] Kamu belum pernah mulai chat! ❌`
                await ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
                await ezii.sendMessage(from, { text: teks, footer: footxt, templateButtons: but })
                throw false
            } else {
                var but = [
                    { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                    { quickReplyButton: { displayText: "SEARCH", id: prefix+'start' }}
                ]
                var teks = `[✅] Berhasil memberhentikan chat`
                var teks2 = `[⚠️] Sesi chat ini telah diberhentikan oleh teman chat kamu`
                await ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
                let other = roomo.other(sender)
                if (other) await ezii.sendMessage(other, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks2, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
                delete this.anonymous[roomo.id]
            }
            break
        case prefix+'sendprofile': case prefix+'sendprofil':
            if (isGroup) return reply(mess.OnlyPM)
            this.anonymous = this.anonymous ? this.anonymous : {}
	        let romoe = Object.values(this.anonymous).find(room => room.check(sender))
	        var but = [
                { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` }},
                { quickReplyButton: { displayText: "SEARCH", id: prefix+'start' }}
	        ]
		    if (!romoe) {
                var teks = `[⚠️] Kamu belum pernah memulai chat! ❌`
                await ezii.sendMessage(from, { 
                document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: teks, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt,
                templateButtons: but
                }, { quoted: msg })
                throw false
            } else {
                let rms = Object.values(this.anonymous).find(room => [room.a, room.b].includes(sender) && room.state == "CHATTING")
                var partnerJID = rms.other(sender)
                var res = await ezii.sendContact(partnerJID, [sender.split("@")[0]])
                ezii.sendMessage(from, { text: '[✅] Berhasil mengirim profil ke teman chat anda!' }, { quoted: msg })
                ezii.sendMessage(partnerJID, { text: '[👨👩] Teman chat kamu memberikan kontak profil nya!' }, { quoted: res })
            }
            break

        // Store Menu
        case prefix+'list':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}`,
                buttonText: 'Click Here!',
                footer: `*List ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            ezii.sendMessage(from, listMsg)
            break
        case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses set list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses set list message dengan key : *${args1}*`)
            }
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            break
        case prefix+'jeda': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!args[1]) return reply(`kirim ${command} waktu\nContoh: ${command} 30m\n\nlist waktu:\ns = detik\nm = menit\nh = jam\nd = hari`)
            opengc[from] = { id: from, time: Date.now() + toMS(args[1]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            ezii.groupSettingUpdate(from, "announcement")
            .then((res) => reply(`Sukses, group akan dibuka ${args[1]} lagi`))
            .catch((err) => reply('Error'))
            }
            break
        case prefix+'tambah':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one + nilai_two}`)
            break
        case prefix+'kurang':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one - nilai_two}`)
            break
        case prefix+'kali':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one * nilai_two}`)
            break
        case prefix+'bagi':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one / nilai_two}`)
            break
        case 'p': case 'proses':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (!isQuotedMsg) return
            let numb = quotedMsg.sender
            let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${numb.split("@")[0]} sedang di proses!`
            mentions(proses, [numb], true)
            break
        case 'd': case 'done':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (!isQuotedMsg) return
            let numbb = quotedMsg.sender
            let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${numbb.split("@")[0]} Next Order ya🙏`
            mentions(sukses, [numbb], true)
            break

        // Downloads Menu
        case prefix+'play':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query*\n\nContoh : ${command} aku bukan jodohnya`)
            reply(mess.wait)
            addCountCmd('#play', sender, _cmd)
            await sendPlay(from, q)
            limitAdd(sender, limit)
            break
        case prefix+'ytmp3': case prefix+'mp3':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://youtu.be/J9YG0LxpSqM`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#ytmp3', sender, _cmd)
            args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
            yta(args[1]).then(async(data) => {
                var teks = `*YOUTUBE-DOWNLOADER*\n\n*• Title :* ${data.title}\n*• Size :* ${data.filesizeF}\n*• Url Source :* ${args[1]}\n\n_Wait a minute sending media..._`
                if (Number(data.filesize) >= 30000) {
                    var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                    teks = `*YOUTUBE-DOWNLOADER*\n\n*• Title :* ${data.title}\n*• Size :* ${data.filesizeF}\n*• Url Source :* ${args[1]}\n*• Download :* ${res.data}\n\n_For larger sizes, presented in the form of a link_`
                    ezii.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    ezii.sendMessage(from, { document: await getBuffer(data.dl_link), mimetype: 'audio/mpeg', fileName: `${data.title}.mp3`}, { quoted : msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6281365960346@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'ytmp4': case prefix+'mp4':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://youtu.be/J9YG0LxpSqM`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#ytmp4', sender, _cmd)
            args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
            ytv(args[1]).then(async(data) => {
                var teks = `*YOUTUBE-DOWNLOADER*\n\n*• Title :* ${data.title}\n*• Size :* ${data.filesizeF}\n*• Url Source :* ${args[1]}`
                if (Number(data.filesize) >= 30000) {
                    var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                    teks += `\n*• Download :* ${res.data}\n\n_For larger sizes, presented in the form of a link_`
                    ezii.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    ezii.sendMessage(from, { video: await getBuffer(data.dl_link) }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'getmusik': case prefix+'getmusic':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isQuotedImage) return reply(`Gunakan dengan cara reply dari hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
		    if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
		    if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
		    var kuoted = await quotedMsg.chats
            var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
            var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
            if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
             if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
            if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
            reply(mess.wait)
            addCountCmd('#getmusic', sender, _cmd)
            args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
            yta(args[1]).then(async(data) => {
                var teks = `*YOUTUBE-DOWNLOADER*\n\n*• Title :* ${data.title}\n*• Size :* ${data.filesizeF}\n*• Url Source :* ${args[1]}\n\n_Wait a minute sending media..._`
                if (Number(data.filesize) >= 30000) {
                    var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                    teks = `*YOUTUBE-DOWNLOADER*\n\n*• Title :* ${data.title}\n*• Size :* ${data.filesizeF}\n*• Url Source :* ${args[1]}\n*• Download :* ${res.data}\n\n_For larger sizes, presented in the form of a link_`
                    ezii.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    ezii.sendMessage(from, { document: await getBuffer(data.dl_link), mimetype: 'audio/mpeg', fileName: `${data.title}.mp3`}, { quoted : msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'getvideo': case prefix+'getvidio':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isQuotedImage) return reply(`Gunakan dengan cara reply hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
            if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
            if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
            var kuoted = await quotedMsg.chats
            var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
            var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
            if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
            if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
            if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
            reply(mess.wait)
            addCountCmd('#getvideo', sender, _cmd)
            args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
            ytv(args[1]).then(async(data) => {
                var teks = `*YOUTUBE-DOWNLOADER*\n\n*• Title :* ${data.title}\n*• Size :* ${data.filesizeF}\n*• Url Source :* ${args[1]}`
                if (Number(data.filesize) >= 30000) {
                    var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                    teks += `\n*• Download :* ${res.data}\n\n_For larger sizes, presented in the form of a link_`
                    ezii.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    ezii.sendMessage(from, { video: await getBuffer(data.dl_link) }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
		case prefix+'youtube':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://youtu.be/J9YG0LxpSqM`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#youtube', sender, _cmd)
            axios.get(`https://api-kaysa.herokuapp.com/api/ytmp4?url=${args[1]}&apikey=keyapi`).then((data) => {
                var text_result_yt = `*YOUTUBE-DOWNLOADER*

📃 *Title:* ${data.data.result.title ? data.data.result.title : '-'}

_Silahkan Pilih Format yang ada dibawah_`
                var yutub = [ { urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `🎧 Audio`, id: `${prefix}mp3 ${args[1]}` } }, { quickReplyButton: { displayText: `🎥 Video`, id: `${prefix}mp4 ${args[1]}` } } ]
                ezii.sendMessage(from, 
                { document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                caption: text_result_yt, 
                mimetype: `${docs}`, 
                fileName: `Hai kak ${pushname}`, 
                jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
                footer: footxt, 
                templateButtons: yutub,
                }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'igdl': case prefix+'instagram': case prefix+'ig':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.instagram.com/p/CWR_S4BF0mt/?utm_medium=copy_link`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#igdl', sender, _cmd)
            igdl(args[1]).then(async(res) => {
                let { medias } = res
                let { username, fullName } = res.user
                var capat = `*INSTAGRAM-DOWNLOAD*\n\n≻ *Username:* ${username}\n≻ *Fullname :* ${fullName}\n≻ *Jumlah Media :* ${medias.length}\n\n_wait a minute, media is being sent..._`
                ezii.sendMessage(from, { text: capat }, { quoted: msg })
                for (let i = 0; i < medias.length; i++) {
                    if (medias[i].fileType == 'jpg') {
                        ezii.sendMessage(from, { image: await getBuffer(medias[i].url) })
                    } else if (medias[i].fileType == 'mp4') {
                        ezii.sendMessage(from, { video: await getBuffer(medias[i].url) })
                    }
                }
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'igstory':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *username*\n\n_Contoh_\n\n${command} iameziiid_`)
            reply(mess.wait)
            addCountCmd('#igstory', sender, _cmd)
            if (args[1].startsWith("@")) args[1] = args[1].replace("@", "")
            igstory(args[1]).then(async(data) => {
                var teks = `Instagram Story total ${data.medias.length}, media segera dikirim`
                reply(teks)
                for (let i of data.medias) {
                    var media = await getBuffer(i.url)
                    if (i.type == "image") {
                        ezii.sendMessage(from, { image: media })
                    } else if (i.type == "video") {
                        ezii.sendMessage(from, { video: media })
                    }
                }
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        /*case prefix+'tiktok':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#tiktok', sender, _cmd)
            xfar.Tiktok(args[1]).then( data => {
                ezii.sendMessage(from, {
                    image: { url: data.thumbnail },
                    caption: `*TIKTOK-DOWNLOADER*\n\n🗒️ Title : ${data.title}\n\n_Silahkan Pilih Format yang ada dibawah_`,
                    footer: footxt,
                    templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
                        { quickReplyButton: { displayText: `Without Watermark`, id: `${prefix}tiktoknowm ${args[1]}` } },
                        { quickReplyButton: { displayText: `Audio`, id: `${prefix}tiktokaudio ${args[1]}` } }]
                }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break*/
        case prefix+'tiktok':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#tiktok', sender, _cmd)
            bochil.tiktokdlv3(args[1]).then( data => {
                ezii.sendMessage(from, {
                	document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
                    caption: `*TIKTOK-DOWNLOADER*\n\n🗒️ Title : ${data.description}\n👤 Username : ${data.nickname}\n\n_Silahkan Pilih Format yang ada dibawah_`,
                    footer: footxt,
                    mimetype: `${docs}`,
                    fileName: `Hai kak ${pushname}`,
                    jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
                    footer: footxt,
                    templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
                        { quickReplyButton: { displayText: `🎥 Video`, id: `${prefix}tiktoknowm ${args[1]}` } },
                        { quickReplyButton: { displayText: `🎧 Audio`, id: `${prefix}tiktokaudio ${args[1]}` } }]
                }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'tiktoknowm':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#tiktoknowm', sender, _cmd)
            hxz.ttdownloader(args[1]).then( data => {
                ezii.sendMessage(from, { video: { url: data.nowm }}, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
		case prefix+'tiktokaudio':
		    if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
		    if (!isUrl(args[1])) return reply(mess.error.Iv)
		    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
		    reply(mess.wait)
		    addCountCmd('#tiktokaudio', sender, _cmd)
		    hxz.ttdownloader(args[1]).then( data => {
		        ezii.sendMessage(from, { document: { url: data.nowm }, mimetype: 'audio/mpeg', fileName: `${args[1]}.mp3`}, { quoted: msg })
		        limitAdd(sender, limit)
		    }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
		    break
        case prefix+'facebook': case prefix+'fbdl':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://m.facebook.com/groups/4021832254535027/permalink/5410646708986901/`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#facebook', sender, _cmd)
            xfar.Facebook(args[1]).then( data => {
                ezii.sendMessage(from, { video: { url: data.medias[0].url }, caption: data.title }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'fbmp3': case prefix+'facebookmp3': case prefix+'facebookaudio': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
             if (!q) return reply(`Link?\nExample: ${command} https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
            if (!isUrl(args[1]) && !args[1].includes('facebook.com')) return reply(`Tautan yang Anda berikan tidak valid!`)
            reply(mess.wait)
            addCountCmd('#facebookaudio', sender, _cmd)
            let noh = require('@bochilteam/scraper')                
            noh.savefrom(`${q}`).then(async (anu) => {  
            ezii.sendMessage(from, { audio: { url: anu.url[0].url }, mimetype: 'audio/mp4' }, { quoted: msg })      
                limitAdd(sender, limit)
                }).catch((err) => {
                    reply(mess.error)
                })
            }
            break
        case prefix+'mediafire': case prefix+'mfire': case prefix+'mfdl':
            if (isBanChat) return reply(mess.banChat)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.mediafire.com/file/a61862y1tgvfiim/ZackBotMans+(+Versi+1.0.1+).zip/file`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('mediafire.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#mediafire', sender, _cmd)
            kotz.mediafire(args[1]).then(async(data) => {
                data = data[0]
                data.nama = decodeURIComponent(data.nama)
                var media = await getBuffer(data.link)
                if (data.mime.includes('mp4')) {
                    ezii.sendMessage(from, { document: media, fileName: data.nama, mimetype: 'video/mp4' }, { quoted: msg })
                } else if (data.mime.includes('mp3')) {
                    ezii.sendMessage(from, { document: media, fileName: data.nama, mimetype: 'audio/mp3' }, { quoted: msg })
                } else {
                    ezii.sendMessage(from, { document: media, fileName: data.nama, mimetype: 'application/'+data.mime }, { quoted: msg })
                }
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
         case prefix+'zippyshare': {
            if (isBanChat) return reply(mess.banChat)
            if (!q) return reply('Linknya?')
            if (!isUrl(args[1]) && !args[1].includes('zippyshare.com')) return reply(`Tautan bukan tautan zippyshare!`)
            reply(mess.wait)
            addCountCmd('#zippyshare', sender, _cmd)
            anuy = await fetchJson(`https://violetics.pw/api/downloader/zippyshare?apikey=df7d-425a-3bc8&url=${text}`)
            reply(`*${util.format(anuy)}*`)
            linkyke = await getBuffer(anuy.result.dlink)
            ezii.sendMessage(from, {document: linkyke, mimetype: 'application/zip', fileName: `${anuy.result.filename}`}, {quoted:msg}).catch ((err) => reply(mess.error))     
            }
            break
        case prefix+'telestick': case prefix+'telesticker':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (isGroup) return reply(`Untuk menghindari Spam, fitur ${command} hanya bisa digunakan di Chat Pribadi`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://t.me/addstickers/Nekonyaaaa`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('t.me')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#telestick', sender, _cmd)
            telesticker(args[1]).then(async(data) => {
                for (let i of data) {
                    if (i.status == 200) {
			            sendStickerFromUrl(from, i.url)
			            await sleep(1000)
			        } else {
			            ezii.sendMessage(from, { text: 'Salah satu sticker error!' })
			        }
			    }
            }).catch((e) => reply(mess.error.api))
            break
        case prefix+'pindl': case prefix+'pinterestdl':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://pin.it/xyHalNF`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('pin')) return reply(mess.error.Iv)
            reply(mess.wait)
            addCountCmd('#pinterestdl', sender, _cmd)
            fetchJson(`https://xteam.xyz/dl/pinterestdl?url=${args[1]}&APIKEY=${xteamkey}`)
            .then(async(res) => {
                ezii.sendMessage(from, { image: await getBuffer(res.result.hd_img) }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch(() => { reply(mess.error.api) })
            break
        case prefix+'gitclone':
            let regx = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
            if (!q) return reply('Linknya?')
            if (!regx.test(args[1])) return reply('Linknya salah')
            reply(mess.wait)
            addCountCmd('#gitclone', sender, _cmd)
            let [, usr, repo] = args[1].match(regx) || []
            let repos = repo.replace(/.git$/, '')
            let hasdl = `https://api.github.com/repos/${usr}/${repos}/zipball`
            let namafile = (await fetch(hasdl, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
            ezii.sendMessage(from, { document: { url: hasdl }, mimetype: 'application/zip', fileName: namafile }, { quoted: msg })
            break

        // Group Menu
        case prefix+'afk':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
            if (body.slice(100)) return reply('Alasanmu terlalu panjang')
            addCountCmd('#afk', sender, _cmd)
            let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
            afk.addAfkUser(sender, Date.now(), reason, _afk)
            mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
            break
        case prefix+'welcome': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                addCountCmd('#welcome', sender, _cmd)
                if (isWelcome) return reply(`Udah aktif`)
                welcome.push(from)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses mengaktifkan welcome di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                addCountCmd('#welcome', sender, _cmd)
                var posi = welcome.indexOf(from)
                welcome.splice(posi, 1)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses menonaktifkan welcome di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            }
            break
        case prefix+'left': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                addCountCmd('#setleft', sender, _cmd)
                if (isLeft) return reply(`Udah aktif`)
                left.push(from)
                fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 2))
                reply('Sukses mengaktifkan left di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                addCountCmd('#setleft', sender, _cmd)
                var posi = left.indexOf(from)
                left.splice(posi, 1)
                fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 2))
                reply('Sukses menonaktifkan left di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            }
            break
        case prefix+'setwelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
            if (isSetWelcome(from, set_welcome_db)) return reply(`Set welcome already active`)
            addSetWelcome(q, from, set_welcome_db)
            addCountCmd('#setwelcome', sender, _cmd)
            reply(`Successfully set welcome!`)
            break
        case prefix+'changewelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
            if (isSetWelcome(from, set_welcome_db)) {
                addCountCmd('#changewelcome', sender, _cmd)
                changeSetWelcome(q, from, set_welcome_db)
                reply(`Sukses change set welcome teks!`)
            } else {
                addCountCmd('#changewelcome', sender, _cmd)
                addSetWelcome(q, from, set_welcome_db)
                reply(`Sukses change set welcome teks!`)
            }
            break
        case prefix+'delsetwelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return reply(`Belum ada set welcome di sini..`)
            removeSetWelcome(from, set_welcome_db)
            addCountCmd('#delsetwelcome', sender, _cmd)
            reply(`Sukses delete set welcome`)
            break
        case prefix+'setleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @user, Selamat tinggal dari @group`)
            if (isSetLeft(from, set_left_db)) return reply(`Set left already active`)
            addCountCmd('#setleft', sender, _cmd)
            addSetLeft(q, from, set_left_db)
            reply(`Successfully set left!`)
            break
        case prefix+'changeleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @user, Selamat tinggal dari @group`)
            if (isSetLeft(from, set_left_db)) {
                addCountCmd('#changeleft', sender, _cmd)
                changeSetLeft(q, from, set_left_db)
                reply(`Sukses change set left teks!`)
            } else {
                addCountCmd('#changeleft', sender, _cmd)
                addSetLeft(q, from, set_left_db)
                reply(`Sukses change set left teks!`)
            }
            break
        case prefix+'delsetleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetLeft(from, set_left_db)) return reply(`Belum ada set left di sini..`)
            addCountCmd('#delsetleft', sender, _cmd)
            removeSetLeft(from, set_left_db)
            reply(`Sukses delete set left`)
            break
        case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            addCountCmd('#linkgc', sender, _cmd)
            var url = await ezii.groupInviteCode(from).catch(() => reply(mess.error.api))
            url = 'https://chat.whatsapp.com/'+url
            reply(url)
            break
        case prefix+'setppgrup': case prefix+'setppgc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            addCountCmd('#setppgrup', sender, _cmd)
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[1] == '\'panjang\'') {
            	var { img } = await generateProfilePicture(media)
            	await ezii.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	reply(`Sukses`)
            } else {
                await ezii.updateProfilePicture(from, { url: media })
                .then( res => {
                    reply(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => reply(mess.error.api))
            }
            } else {
			    reply(`Kirim/balas gambar dengan caption ${command}`)
            }
            break
        case prefix+'setnamegrup': case prefix+'setnamegc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} SUPPORT Eziitzy`)
            addCountCmd('#setnamegc', sender, _cmd)
            await ezii.groupUpdateSubject(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            break
        case prefix+'setdesc': case prefix+'setdescription':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} New Description by Eziitzy`)
            addCountCmd('#setdesc', sender, _cmd)
            await ezii.groupUpdateDescription(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            break
        case prefix+'antilink': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === 'enable'){
                addCountCmd('#antilink', sender, _cmd)
                if (isAntiLink) return reply(`Udah aktif`)
                antilink.push(from)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Berhasil Aktifkan Antilink Di Grup Ini!')
            var groupe = await ezii.groupMetadata(from)
            var members = groupe['participants']
            var mems = []
            members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            ezii.sendMessage(from, {text: `PERINGATAN!!! jika bukan admin jangan send link di group ini`, contextInfo: { mentionedJid : mems }}, {quoted:msg})
            } else if (args[1].toLowerCase() === 'disable'){
                addCountCmd('#antilink', sender, _cmd)
                if (!isAntiLink) return reply(`Udah nonaktif`)
                let anu = antilink.indexOf(from)
                antilink.splice(anu, 1)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Berhasil Menonaktifkan Antilink Di Grup Ini!')
            } else {
                reply(`Pilih enable atau disable`)
            }
            }
            break
                case prefix+'antiwame':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === 'enable'){
                addCountCmd('#antiwame', sender, _cmd)
                if (isAntiWame) return reply(`Udah aktif`)
                antilink.push(from)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Berhasil Aktifkan Antiwame Di Grup Ini!')
            var groupe = await ezii.groupMetadata(from)
            var members = groupe['participants']
            var mems = []
            members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            ezii.sendMessage(from, {text: `PERINGATAN!!! jika bukan admin jangan send wa.me di group ini`, contextInfo: { mentionedJid : mems }}, {quoted:msg})
            } else if (args[1].toLowerCase() === 'disable'){
                addCountCmd('#antiwame', sender, _cmd)
                if (!isAntiWame) return reply(`Udah nonaktif`)
                let anu = antiwame.indexOf(from)
                antiwame.splice(anu, 1)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Berhasil Menonaktifkan Antiwame Di Grup Ini!')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
        case prefix+'banchat': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args[1].toLowerCase() === "enable") {
            addCountCmd('#banchat', sender, _cmd)
            if (isBanChat) return reply('Sudah Aktif!')
            banchat.push(from)
            reply('Sukses menyalakan banchat!')
            var groupe = await ezii.groupMetadata(from)
            var members = groupe['participants']
            var mems = []
            members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
            })
            ezii.sendMessage(from, {text: `PERINGATAN!!! group ini telah di ban oleh owner`, contextInfo: { mentionedJid : mems }}, {quoted:msg})
            } else if (args[1].toLowerCase() === "disable") {
            addCountCmd('#banchat', sender, _cmd)
            if (!isBanChat) return reply('Sudah Dinonaktifkan!')
            addCountCmd('#banchat', sender, _cmd)
            let off = banchat.indexOf(from)
            banchat.splice(off, 1)
            reply('Success menonaktifkan banchat!')
            } else {
                reply(`Pilih enable atau disable`)
            }
            }
            break
        case prefix+'open': case prefix+'buka':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            addCountCmd('#group', sender, _cmd)
            ezii.groupSettingUpdate(from, 'not_announcement')
            reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
			break
        case prefix+'close': case prefix+'tutup':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		    addCountCmd('#close', sender, _cmd)
		    ezii.groupSettingUpdate(from, 'announcement')
		    reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
		    break
        case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
            if (args.length > 1) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await ezii.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                addCountCmd('#add', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                var cek = await ezii.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                addCountCmd('#add', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                addCountCmd('#kick', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                addCountCmd('#kick', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            break
        case prefix+'promote': case prefix+'pm':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                addCountCmd('#promote', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                addCountCmd('#promote', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            break
        case prefix+'demote':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                addCountCmd('#demote', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                addCountCmd('#demote', sender, _cmd)
                ezii.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            break
        case prefix+'revoke':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            addCountCmd('#revoke', sender, _cmd)
            await ezii.groupRevokeInvite(from)
            .then( res => {
                reply(`Sukses menyetel tautan undangan grup ini`)
            }).catch(() => reply(mess.error.api))
            break
        case prefix+'h': case prefix+'hidetag':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            addCountCmd('#hidetag', sender, _cmd)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            ezii.sendMessage(from, { text: q ? q : '', mentions: mem })
            break
        case prefix+'delete': case prefix+'del': case prefix+'d':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
            if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
            addCountCmd('#delete', sender, _cmd)
            ezii.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
            break
        case prefix+'checksewa': case prefix+'ceksewa':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isSewa) return reply(`Bot tidak di sewa group ini!`)
            addCountCmd('#checksewa', sender, _cmd)
            let ceksewa = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            let sewanya = `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s)`
            reply(sewanya)
            break

        // Game Menu
        case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
            if (!isGroup)return reply(mess.OnlyGrup)
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
            if (mentionByTag.length !== 1) {
                if (mentionByTag[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentionByTag[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                var hadiah = randomNomor(100, 150)
                addCountCmd('#tictactoe', sender, _cmd)
                mentions(monospace(`@${sender.split('@')[0]} menantang @${mentionByTag[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentionByTag[0]], false)
                tictactoe.push({
                    id: from,
                    status: null,
                    hadiah: hadiah,
                    penantang: sender,
                    ditantang: mentionByTag[0],
                    TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                })
                gameAdd(sender, limit)
            } else {
                reply(`Kirim perintah *${prefix}tictactoe* @tag`)
            }
            break
        case prefix+'delttt': case prefix+'delttc':
            if (!isGroup)return reply(mess.OnlyGrup)
            if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
            var posi = getPosTic(from, tictactoe)
            if (tictactoe[posi].penantang.includes(sender)) {
                addCountCmd('#delttc', sender, _cmd)
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else if (tictactoe[posi].ditantang.includes(sender)) {
                addCountCmd('#delttc', sender, _cmd)
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else if (isGroupAdmins) {
                addCountCmd('#delttc', sender, _cmd)
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else if (isOwner) {
                addCountCmd('#delttc', sender, _cmd)
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else {
                reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
            }
            break
        case prefix+'tebakgambar': case prefix+'tg':
		    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
		    if (isPlayGame(from, tebakgambar)) return ezii.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
		    addCountCmd('#tebakgambar', sender, _cmd)
		    var data = { image: '', jawaban: '' }
		    try {
		        var anu1 = await fetchJson(`https://api.xteam.xyz/game/tebakgambar?APIKEY=${xteamkey}`)
		        data.image = anu1.url
		        data.jawaban = anu1.jawaban
		    } catch {
		        var anu2 = await kotz.tebakgambar()
		        anu2 = anu2[0]
		        data.image = data.image
		        data.jawaban = data.jawaban.split('Jawaban ').join('')
		    }
		    var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
		    ezii.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TG' })
		    .then( res => {
		        var jawab = data.jawaban.toLowerCase()
		        addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
		        gameAdd(sender, glimit)
		    })
		    .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
		    break
		case prefix+'kuis':
		    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
		    if (isPlayGame(from, kuis)) return ezii.reply(from, `Masih ada game yang belum diselesaikan`, kuis[getGamePosi(from, kuis)].msg)
		    addCountCmd('#kuis', sender, _cmd)
		    fetchJson(`https://api.xteam.xyz/game/tebaktebakan?APIKEY=${xteamkey}`).then( data => {
		   // fetchJson(`https://api.lolhuman.xyz/api/tebak/jenaka?apikey=${lolkey}`).then( data => {
		        var { question, answer } = data.result
		        var teks = `*KUIS GAME*\n\n`+monospace(`Soal : ${question}\nPetunjuk : ${answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
		        ezii.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'KS' })
		        .then( res => {
					var jawab = answer.toLowerCase()
                    addPlayGame(from, 'Kuis Game', jawab, gamewaktu, res, kuis)
                    gameAdd(sender, glimit)
                })
            }).catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'tebaklagu': case prefix+'tl':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, tebaklagu)) return ezii.reply(from, `Masih ada game yang belum diselesaikan`, tebaklagu[getGamePosi(from, tebaklagu)].msg)
            addCountCmd('#tebaklagu', sender, _cmd)
            fetchJson(`https://api.xteam.xyz/game/tebaklagu?id=3AaKHE9ZMMEdyRadsg8rcy&APIKEY=${xteamkey}`).then( data => {
                var { preview, judul } = data.result
                if (judul.toLowerCase() == 'audio tidak ditemukan, silahkan request ulang!') judul = 'Rick Roll'
                var teks = `*TEBAK LAGU*\n\n`+monospace(`Petunjuk : ${judul.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                ezii.sendMessage(from, { audio: { url: preview }, mimetype: 'audio/mp4', ptt: true }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TL' })
                .then( res => {
                    ezii.sendMessage(from, { text: teks }, { quoted: res })
                    var jawab = judul.toLowerCase()
                    addPlayGame(from, 'Tebak Lagu', jawab, gamewaktu, res, tebaklagu)
                    gameAdd(sender, glimit)
                })
            }).catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'family100':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, family100)) return ezii.reply(from, `Masih ada soal yang belum diselesaikan`, family100[getGamePosi(from, family100)].msg)
            addCountCmd('#family100', sender, _cmd)
            // fetchJson(`https://api.lolhuman.xyz/api/tebak/family100?apikey=${lolkey}`).then( anu => {
            bochil.family100('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json').then( anu => {
                var teks = `*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${anu.soal}\n*Total Jawaban :* ${anu.jawaban.length}\n\nWaktu : ${gamewaktu}s`
                ezii.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'FML' })
                // let anoh = anu.result.answer
                .then( res => {
                    let rgfds = []
                    for (let i of anu.jawaban) {
                        let fefs = i.split('/') ? i.split('/')[0] : i
                        let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ', '') : fefs
                        let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                        rgfds.push(axsf.toLowerCase())
                    }
                    addPlayGame(from, 'Family 100', rgfds, gamewaktu, res, family100)
                    gameAdd(sender, glimit)
                })
            }).catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'delgame': case prefix+'deletegame': case prefix+'dellgame': case prefix+'nyerah':
		    if (!isQuotedMsg) return reply(`Balas pesan soal game yang ingin dihapus`)
		    if (quotedMsg.id.endsWith('TG')) {
		        var tg = getGamePosi(from, tebakgambar)
		        if (tg == undefined) return reply(`Game tersebut sudah selesai`)
		        if (tebakgambar[tg].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
		        addCountCmd('#nyerah', sender, _cmd)
		        reply(`*Tebak Gambar*\nJawaban : ${tebakgambar[tg].jawaban}`)
		        tebakgambar.splice(tg, 1)
		    } else if (quotedMsg.id.endsWith('KS')) {
		        var ks = getGamePosi(from, kuis)
		        if (ks == undefined) return reply(`Game tersebut sudah selesai`)
		        if (kuis[ks].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
		        addCountCmd('#nyerah', sender, _cmd)
		        reply(`*Kuis Game*\nJawaban : ${kuis[ks].jawaban}`)
		        kuis.splice(ks, 1)
		    } else if (quotedMsg.id.endsWith('TL')) {
		        var tl = getGamePosi(from, tebaklagu)
		        if (tl == undefined) return reply(`Game tersebut sudah selesai`)
		        if (tebaklagu[tl].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
		        addCountCmd('#nyerah', sender, _cmd)
		        reply(`*Tebal Lagu*\nJawaban : ${tebaklagu[tl].jawaban}`)
		        tebaklagu.splice(tl, 1)
		    } else if (quotedMsg.id.endsWith('FML')) {
		        var fml = getGamePosi(from, family100)
		        if (fml == undefined) return reply(`Game tersebut sudah selesai`)
		        if (family100[fml].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
		        addCountCmd('#nyerah', sender, _cmd)
		        reply(`*Family 100*\nJawaban : ${family100[fml].jawaban}`)
		        family100.splice(fml, 1)
		    } else {
		        reply(`Balas soal game!`)
		    }
		    break
		case prefix+'casino':
            if (!isGroup)return reply(mess.OnlyGrup)
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal`)
            if (mentionUser.length == 0) return reply(`Tag Lawan Yang Ingin Diajak Bermain Game`)
            if (mentionUser.length > 2) return reply('Hanya bisa dengan 1 orang')
            if (mentionUser[0] === sender) return reply(`Sad amat main sama diri sendiri`)
            if (mentionUser[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
            if (fs.existsSync(`./database/${from}.json`)) return reply(`Sedang Ada Sesi, tidak dapat dijalankan secara bersamaan\nKetik *${prefix}delcasino*, untuk menghapus sesi`)
            if (args.length == 2) return reply('Masukan Nominal Nya')
            if (args[2].includes('-')) return reply(`Jangan menggunakan -`)
            if (isNaN(parseInt(args[2]))) return reply('Nominal Harus Berupa Angka!')
            var anu = getBalance(sender, balance)
            var ani = getBalance(mentionUser[0], balance)
            if (anu < args[2] || anu == 'undefined') return reply(`Balance Tidak Mencukupi, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
            if (ani < args[2] || ani == 'undefined') return reply(`Balance Lawan Tidak Mencukupi Untuk Bermain Denganmu\nKetik ${prefix}balance @tag untuk mengecek Balance lawanmu`)
            var casinoo = setCasino(`${from}`)
            casinoo.Z = sender.replace("@s.whatsapp.net", "")
            casinoo.Y = mentionUser[0].split("@")[0]
            casinoo.nominal = parseInt(args[2])
            addCountCmd('#casino', sender, _cmd)
            fs.writeFileSync(`./database/casino/${from}.json`, JSON.stringify(casinoo, null, 2))
            gameAdd(sender, glimit)
            var starGame = `🎰 Memulai Game Casino 💰\n\n• @${sender.replace("@s.whatsapp.net", "")} Menantang ${args[1]}, dengan Nominal: *$ ${parseInt(args[2])}*\n• Ketik Y/N untuk menerima atau menolak Permainan!`
            ezii.sendMessage(from, { text: starGame, mentions: [sender, args[1].replace("@", "") + "@s.whatsapp.net"] }, { quoted: msg })
            break
        case prefix+'delcasino':
            if (fs.existsSync('./database/casino/'+from+'.json')) {
                var csn = JSON.parse(fs.readFileSync('./database/casino/'+from+'.json'))
                if (csn.Z.includes(sender)) {
                    addCountCmd('#delcasino', sender, _cmd)
                    deleteCasino(from)
                    reply('Berhasil Menghapus Sesi Casino')
		        } else if (csn.Y.includes(sender)) {
                    addCountCmd('#delcasino', sender, _cmd)
                    deleteCasino(from)
                    reply('Berhasil Menghapus Sesi Casino')
                } else if (isGroupAdmins) {
                    addCountCmd('#delcasino', sender, _cmd)
                    deleteCasino(from)
                    reply('Berhasil Menghapus Sesi Casino')
                } else if (isOwner) {
                    addCountCmd('#delcasino', sender, _cmd)
                    deleteCasino(from)
                    reply('Berhasil Menghapu Sesi Casino')
                } else {
	                reply('Anda tidak bisa menghapus sesi casino, karena bukan pemain!')
	            }
            } else {
                reply('Tidak ada sesi yang berlangsung')
            }
            break
        case prefix+'akinator':
            if (isGroup) return reply(mess.OnlyPM)
            if (akinator.hasOwnProperty(sender.split('@')[0])) return reply("Selesain yg sebelumnya dulu atuh")
            var get_result = await akiStart()
            if (get_result.status == 200) {
                var { server, frontaddr, session, signature, question, step } = get_result.result
                const data = {}
                data["server"] = server
                data["frontaddr"] = frontaddr
                data["session"] = session
                data["signature"] = signature
                data["question"] = question
                data["step"] = step
                var ini_txt = `${question}\n\n`
                ini_txt += "0 - Ya\n"
                ini_txt += "1 - Tidak\n"
                ini_txt += "2 - Saya Tidak Tau\n"
                ini_txt += "3 - Mungkin\n"
                ini_txt += "4 - Mungkin Tidak"
                ezii.sendMessage(from, { text: ini_txt }, { quoted: msg }).then(() => {
                    akinator[sender.split('@')[0]] = data
                })
            } else {
                reply(mess.error.api)
            }
            break
        case prefix+'cancelakinator':
            if (isGroup) return reply(mess.OnlyPM)
            if (!akinator.hasOwnProperty(sender.split('@')[0])) return reply("Anda tidak memiliki akinator sebelumnya")
            delete akinator[sender.split("@")[0]]
            reply(`Sukses`)
            break
            
            // Fun Menu
            case prefix+'suit':
            if (isBanChat) return reply(mess.banChat)
                var sutit = `Pilih Button Dibawah Untuk Bermain`
                var but = [
                { quickReplyButton: { displayText: `Batu ✊`, id: `${prefix}sbatu` } },
                { quickReplyButton: { displayText: `Kertas 🖐️`, id: `${prefix}skertas` } },
                { quickReplyButton: { displayText: `Gunting ✌️`, id: `${prefix}sgunting` } }
                ]
                ezii.sendMessage(from, { text: sutit, footer: footxt, templateButtons: but })
                break
            case prefix+'sbatu':
            if (isBanChat) return reply(mess.banChat)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                const batu = [`Aku Memilih *Batu*\nKamu Memilih *Batu*\n\n!! KITA SERI !!`,`Aku Memilih *Gunting*\nKamu Memilih *Batu*\n\n!! KAMU MENANG:( !!`,`Aku Memilih *Kertas*\nKamu Memilih *Batu*\n\n!! AKU MENANG !!`]
                const batuh = batu[Math.floor(Math.random() * batu.length)]
                var batuh2 = `*[ GAME SUIT ]*\n\n${batuh}`
                ezii.sendMessage(from, { text: batuh2 }, { quoted: fkontak })
                gameAdd(sender, glimit)
                break
            case prefix+'skertas':
            if (isBanChat) return reply(mess.banChat)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                const kertas = [`Aku Memilih *Batu*\nKamu Memilih *Kertas*\n\n!! KAMU MENANG :( !!`,`Aku Memilih *Gunting*\nKamu Memilih *Kertas*\n\n!! KAMU KALAH !!`,`Aku Memilih *Kertas*\nKamu Memilih *Kertas*\n\n!! KITA SERI !!`]
                const kertash = kertas[Math.floor(Math.random() * kertas.length)]
                var kertash2 = `*[ GAME SUIT ]*\n\n${kertash}`
                ezii.sendMessage(from, { text: kertash2 }, { quoted: fkontak })
                gameAdd(sender, glimit)
                break
            case prefix+'sgunting':
            if (isBanChat) return reply(mess.banChat)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                const gunting = [`Aku Memilih *Batu*\nKamu Memilih *Gunting*\n\n!! AKU MENANG !!`,`Aku Memilih *Gunting*\nKamu Memilih *Gunting*\n\n!! KITA SERI !!`,`Aku Memilih *Kertas*\nKamu Memilih *Gunting*\n\n!! KAMU MENANG :( !!`]
                const guntingh = gunting[Math.floor(Math.random() * gunting.length)]
                var guntingh2 = `*[ GAME SUIT ]*\n\n${guntingh}`
                ezii.sendMessage(from, { text: guntingh2 }, { quoted: fkontak })
                gameAdd(sender, glimit)
                break
            case prefix+'slot':
            if (isBanChat) return reply(mess.banChat)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                const pepekk = [
                '🍊 : 🍒 : 🍐',
                '🍒 : 🔔 : 🍊',
                '🍇 : 🍇 : 🍐',
                '🍊 : 🍋 : 🔔', // ANKER
                '🔔 : 🍒 : 🍐',
                '🔔 : 🍒 : 🍊',
                '🍊 : 🍋 : 🔔',        
                '🍐 : 🍒 : 🍋',
                '🍐 : 🍒 : 🍐',
                '🍊 : 🍒 : 🍒',
                '🔔 : 🔔 : 🍇',
                '🍌 : 🍌 : 🔔',
                '🥑 : 🥑 : 🥑 Win👑',
                '🍐 : 🔔 : 🔔',
                '🍊 : 🍋 : 🍒',
                '🌶️ : 🌶️ : 🌶️ Win👑',
                '🍋 : 🍋 : 🍋 Win👑',
                '🔔 : 🔔 : 🍇',
                '🔔 : 🍇 : 🍇', 
                '🔔 : 🍐 : 🔔',
                '🍌 : 🍌 : 🍌 Win👑'
                ]
                const kalah = [
                '🍊 : 🍒 : 🍐',
                '🍒 : 🔔 : 🍊',
                '🍇 : 🍇 : 🍐',
                '🍊 : 🍋 : 🔔', // ANKER
                '🔔 : 🍒 : 🍐',
                '🔔 : 🍒 : 🍊',
                '🍊 : 🍋 : 🔔',        
                '🍐 : 🍒 : 🍋',
                '🍐 : 🍒 : 🍐',
                '🍊 : 🍒 : 🍒',
                '🔔 : 🔔 : 🍇',
                '🍌 : 🍌 : 🔔',
                '🍐 : 🔔 : 🔔',
                '🍊 : 🍋 : 🍒',
                '🔔 : 🔔 : 🍇',
                '🔔 : 🍇 : 🍇', 
                '🔔 : 🍐 : 🔔',
                ]
                const kalah2 = [
                '🍊 : 🍒 : 🍐',
                '🍒 : 🔔 : 🍊',
                '🍇 : 🍇 : 🍐',
                '🍊 : 🍋 : 🔔', // ANKER
                '🔔 : 🍒 : 🍐',
                '🔔 : 🍒 : 🍊',
                '🍊 : 🍋 : 🔔',        
                '🍐 : 🍒 : 🍋',
                '🍐 : 🍒 : 🍐',
                '🍊 : 🍒 : 🍒',
                '🔔 : 🔔 : 🍇',
                '🍌 : 🍌 : 🔔',
                '🍌 : 🔔 : 🔔',
                '🍊 : 🍋 : 🍐',
                '🔔 : ?? : 🍇',
                '🔔 : 🍇 : 🍇', 
                '🔔 : 🍐 : 🔔',
                ]
                const selot = pepekk[Math.floor(Math.random() * pepekk.length)]
                const kalahnya = kalah[Math.floor(Math.random() * kalah.length)]
                const kalahnya2 = kalah2[Math.floor(Math.random() * kalah2.length)]
                var slotnya = `*[ 🎰 GAME SLOT 🎰 ]*

${kalahnya}
${selot}
${kalahnya2}

Note : Jika Kamu Mendapatkan Item Yang Sama, Kamu Menang!!!
Contoh : 🔔 : 🔔 : 🔔`
                var but = [ { quickReplyButton: { displayText: `🕹 Play Again 🕹️️`, id: `${prefix}slot` } } ]
                ezii.sendMessage(from, { text: slotnya, footer: footer, templateButtons: but })
                gameAdd(sender, glimit)
                break
            case prefix+'apakah':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} kamu lonteh`)
                const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Betul','Bisa Jadi Tidak']
                const kah = apa[Math.floor(Math.random() * apa.length)]
                ezii.sendMessage(from, { text: `Pertanyaan : apakah ${q}\nJawaban : ${kah}` }, { quoted: fkontak })
                break
            case prefix+'bisakah': case prefix+'bisa': case prefix+'bisagak':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya punya cewe`)
                const bisa = ['Bisa','Gak Bisa','Gak Bisa Ajg Awokwokak','TENTU PASTI KAMU BISA!!!!','TENTU, PASTI KAMU *TIDAK* BISA!!']
                const ga = bisa[Math.floor(Math.random() * bisa.length)]
                ezii.sendMessage(from, { text: `Pertanyaan : bisakah ${q}\nJawaban : ${ga}` }, { quoted: fkontak })
                break
            case prefix+'kapankah': case prefix+'kapan':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} Pertanyaan\n\nContoh : ${command} saya punya cewe`)
                const kapan = ['5 Hari Lagi', '10 Hari Lagi', '15 Hari Lagi','20 Hari Lagi', '25 Hari Lagi','30 Hari Lagi','35 Hari Lagi','40 Hari Lagi','45 Hari Lagi','50 Hari Lagi','55 Hari Lagi','60 Hari Lagi','65 Hari Lagi','70 Hari Lagi','75 Hari Lagi','80 Hari Lagi','85 Hari Lagi','90 Hari Lagi','100 Hari Lagi','5 Bulan Lagi', '10 Bulan Lagi', '15 Bulan Lagi','20 Bulan Lagi', '25 Bulan Lagi','30 Bulan Lagi','35 Bulan Lagi','40 Bulan Lagi','45 Bulan Lagi','50 Bulan Lagi','55 Bulan Lagi','60 Bulan Lagi','65 Bulan Lagi','70 Bulan Lagi','75 Bulan Lagi','80 Bulan Lagi','85 Bulan Lagi','90 Bulan Lagi','100 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','Besok','Lusa',`Abis Ini Juga Lu ${q}`]
                const kapankah = kapan[Math.floor(Math.random() * kapan.length)]
                ezii.sendMessage(from, { text: `Pertanyaan : kapankah ${q}\nJawaban : *${kapankah}*` }, { quoted: fkontak })
                break
            case prefix+'bagaimanakah': case prefix+'gimanakah': case prefix+'gimana':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} cara punya cewe`)
                const gimana = ['Ga Gimana2', 'Sulit Itu Bro', 'Maaf Bot Tidak Bisa Menjawab', 'Coba Deh Cari Di Gugel','Astaghfirallah Beneran???','Pusing ah','Ooh Gitu','Yang Sabar Ya Bos','Gimana yeee']
                const ya = gimana[Math.floor(Math.random() * gimana.length)]
                ezii.sendMessage(from, { text: `Pertanyaan : bagaimanakah ${q}\nJawaban : ${ya}` }, { quoted: fkontak })
                break
            case prefix+'rate': case prefix+'nilai':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} kebesaran titit sy`)
                const ra = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
                const te = ra[Math.floor(Math.random() * ra.length)]
                ezii.sendMessage(from, { text: `Rate : ${q}\nJawaban : *${te}%*` }, { quoted: fkontak })
                break
            case prefix+'gantengcek': case prefix+'cekganteng':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Ezii`)
                const gan = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
                const teng = gan[Math.floor(Math.random() * gan.length)]
                ezii.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${teng}%*` }, { quoted: fkontak })
                break
           case prefix+'cantikcek': case prefix+'cekcantik':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Fafa`)
                const can = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
                const tik = can[Math.floor(Math.random() * can.length)]
                ezii.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${tik}%*` }, { quoted: fkontak })
                break
           case prefix+'sangecek': case prefix+'ceksange': case prefix+'gaycek': case prefix+'cekgay': case prefix+'lesbicek': case prefix+'ceklesbi':
            if (isBanChat) return reply(mess.banChat)
                if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} ${pushname}`)
                const sangeh = ['5', '10', '15','20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
                const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
                ezii.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${sange}%*` }, { quoted: fkontak })
                break
            case prefix+'cekbapak':
            if (isBanChat) return reply(mess.banChat)
                const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ezii Emlit']
                const bapack = bapak[Math.floor(Math.random() * bapak.length)]
                ezii.sendMessage(from, { text: bapack }, { quoted: fkontak })
                break
          
         // Berita Menu
         case prefix+'covidindo':
            if (q.includes('--help')) return reply(examkosong) 
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            const c = await covid()
            var { kasus, kematian, sembuh } = c[0]
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
            caption: `Kasus : ${kasus}\n\nKematian : ${kematian}\n\nSembuh : ${sembuh}`,
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
            break
        case prefix+'gempa':
            if (q.includes('--help')) return reply(examkosong) 
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            const tres = await Gempa()
            var { Waktu, Lintang, Bujur, Magnitude, Kedalaman, Wilayah, Map } = tres.result
            console.log(Map)
            const captt = `Waktu : ${Waktu}\nLintang : ${Lintang}\nBujur : ${Bujur}\nWilayah : ${Wilayah}`
            ezii.sendMessage(from, { image : { url : Map }, caption : captt})
            break
        case prefix+'fajar-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            FajarNews().then(async(res) => {
            console.log(res) 
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            reply(teks) 
            })
            break
        case prefix+'cnn-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            CNNNews().then(res => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            reply(teks) 
            })
            break
        case prefix+'layarkaca-search':
            if (!q) return reply('Judul') 
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            LayarKaca21(q).then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Film: ${i.film_title}\n`
            teks += `Link: ${i.film_link}\n`
            }
            teks += ``
            reply(teks) 
            })
            break
        case prefix+'cnbc-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            CNBCNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'tribun-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            TribunNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'indozone-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            IndozoneNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'kompas-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            KompasNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'detik-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            DetikNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'daily-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            DailyNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'inews-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            iNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            reply(teks) 
            })
            break
        case prefix+'okezone-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            OkezoneNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'sindo-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            SindoNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            reply(teks) 
            })
            break
        case prefix+'tempo-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            TempoNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+'antara-news':
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            AntaraNews().then(async(res) => {
            no = 0
            teks = ""
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+"kontan-news":
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            KontanNews().then(async (res) => {
            teks = ""
            no = 0
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Jenis: ${i.berita_jenis}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+"merdeka-news":
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            MerdekaNews().then(async (res) => {
            teks = ""
            no = 0
            for (let i of res) {
            no += 1
            teks += `\n• ${no.toString()} •\n`
            teks += `Berita: ${i.berita}\n`
            teks += `Upload: ${i.berita_diupload}\n`
            teks += `Link: ${i.berita_url}\n`
            }
            teks += ""
            ezii.sendMessage(from, { image : { url : res[0].berita_thumb }, caption: teks }, { quoted : msg })
            })
            break
        case prefix+"jalantikus-meme":
            reply(mess.wait)
            addCountCmd('#Berita', sender, _cmd)
            var res = await JalanTikusMeme()
            teks = ""
            teks += "Jalan Tikus Meme\n\n"
            teks += `Source: ${res}`
            teks += ""
            ezii.sendMessage(from, { image : { url : res }, caption: teks }, { quoted : msg })
            break
 
        // Search Menu
        case prefix+'anime':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if(!q) return reply(`Anime mana yang ingin kamu cari?\nExample ${prefix}manga naruto`)
            reply(mess.wait)						
            addCountCmd('#Anime', sender, _cmd)
            const { Anime } =require("@shineiichijo/marika")
            const client = new Anime();
            let anime = await client.searchAnime(q)
            let resullt = anime.data[0];
            console.log(resullt)
            let details = `🎀 *Title: ${resullt.title}*\n`;
            details += `🎋 *Format: ${resullt.type}*\n`;
            details += `📈 *Status: ${resullt.status.toUpperCase().replace(/\_/g, " ")}*\n`;
            details += `🍥 *Total episodes: ${resullt.episodes}*\n`;
            details += `🎈 *Duration: ${resullt.duration}*\n`;
            details += `🧧 *Genres:*\n`;
            for (let i = 0; i < resullt.genres.length; i++) {
            details += `\t\t\t\t\t\t\t\t*${resullt.genres[i].name}*\n`;
            }
            details += `✨ *Based on: ${resullt.source.toUpperCase()}*\n`;
            details += `📍 *Studios:*\n`;
            for (let i = 0; i < resullt.studios.length; i++) {
            details += `\t\t\t\t\t\t\t\t*${resullt.studios[i].name}*\n`;
            }
            details += `🎴 *Producers:*\n`;
            for (let i = 0; i < resullt.producers.length; i++) {
            details += `\t\t\t\t\t\t\t\t\t\t*${resullt.producers[i].name}*\n`;
            }
            details += `💫 *Premiered on: ${resullt.aired.from}*\n`;
            details += `👤 *Ended on: ${resullt.aired.to}*\n`;
            details += `🎐 *Popularity: ${resullt.popularity}*\n`;
            details += `🎏 *Favorites: ${resullt.favorites}*\n`;
            details += `🎇 *Rating: ${resullt.rating}*\n`;
            details += `🏅 *Rank: ${resullt.rank}*\n\n`;
            if (resullt.trailer.url !== null)
            details += `♦ *Trailer: ${resullt.trailer.url}*\n\n`;
            details += `🌐 *URL: ${resullt.url}*\n\n`;
            if (resullt.background !== null)
            details += `🎆 *Background:* ${resullt.background}*\n\n`;
            details += `❄ *Description:* ${resullt.synopsis.replace(
            /\[Written by MAL Rewrite]/g,
            ""
            )}`
            ezii.sendMessage(from,{image:{url:resullt.images.jpg.large_image_url},caption:details},{quoted:msg})   
            limitAdd(sender, limit)
            break
        case prefix+'manga':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)						
            addCountCmd('#Manga', sender, _cmd)
            const { Manga } =require("@shineiichijo/marika")
            const manga = new Manga();
            if(!q) return reply(`Which manga do you want to search?\nExample ${prefix}manga naruto`)
            let srh = await manga.searchManga(q)
            let mang = `🎀 *Title: ${srh.data[0].title}*\n`;
            mang += `📈 *Status: ${srh.data[0].status}*\n`;
            mang += `🌸 *Total Volumes: ${srh.data[0].volumes}*\n`;
            mang += `🎗 *Total Chapters: ${srh.data[0].chapters}*\n`;
            mang += `🧧 *Genres:*\n`;
            for (let i = 0; i < srh.data[0].genres.length; i++) {
            mang += `\t\t\t\t\t\t\t\t*${srh.data[0].genres[i].name}*\n`;
            }
            mang += `✨ *Published on: ${srh.data[0].published.from}*\n`;
            mang += `🌟 *Score: ${srh.data[0].scored}*\n`;
            mang += `🎐 *Popularity: ${srh.data[0].popularity}*\n`;
            mang += `🎏 *Favorites: ${srh.data[0].favorites}*\n`;
            mang += `✍ *Authors:*\n`;
            for (let i = 0; i < srh.data[0].authors.length; i++) {
            mang += `\t\t\t\t\t\t\t\t\t*${srh.data[0].authors[i].name}* *(${srh.data[0].authors[0].type})*\n`;
            }
            mang += `\n🌐 *URL: ${srh.data[0].url}*\n\n`;
            if (srh.data[0].background !== null)
            mang += `🎆 *Background:* ${srh.data[0].background}`;
            mang += `❄️ *Description:* ${srh.data[0].synopsis.replace(
            /\[Written by MAL Rewrite]/g,
            ""
            )}`;
            ezii.sendMessage(from,{image:{url:srh.data[0].images.jpg.large_image_url},caption:mang},{quoted:msg})   
            limitAdd(sender, limit)
            break
        case prefix+'lirik': case prefix+'liriklagu':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (q.includes('--help')) return reply(examquery) 
            if (args.length < 2) return reply(`kirim Perintah ${command} Judul Lagu`)
            reply(mess.wait)
            addCountCmd('#Liriklagu', sender, _cmd)
            lirikLagu(q).then ( data => {
            var caption = `*• Nama Lagu :* ${q}\n*• Lirik :*\n ${data[0].result}`
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
            caption: caption,
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
            }).catch(() => reply(`Lagu ${q} Tidak Di Temukan`))
            break
        case prefix+'cerpen':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply('Judul cerpen yang tersedia lihat di list!')
            reply(mess.wait)
            addCountCmd('#Cerpen', sender, _cmd)
            let cerpe = await cerpen(q)
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
            caption: ` • *Title :* ${cerpe.title}\n • *Author :* ${cerpe.author}\n • *Category :* ${cerpe.kategori}\n • *Pass Moderation :* ${cerpe.lolos}\n • *Story :*\n${cerpe.cerita}`, 
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }] 
            }, { quoted: msg })
            limitAdd(sender, limit)
		    .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
		    break
        case prefix+'nickff':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 646675175`)
            axios.get(`https://api.lolhuman.xyz/api/freefire/${args[1]}?apikey=${lolkey}`)
            .then(({data}) => {
            let epep = `*🔎 CHECK NICK FREE FIRE 🔍*

ID : ${args[1]}
Nick : ${data.result}`
            reply(epep)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'nickml':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var args1 = q.split("/")[0]
            var args2 = q.split("/")[1]                
            if (!q.includes("/")) return reply(`Gunakan dengan cara ${command} *id/server*\n\n_Contoh_\n\n${command} 617243212/8460`)
            axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${args1}/${args2}?apikey=${lolkey}`)
            .then(({data}) => {
            let emel = `*🔎 CHECK NICK MOBILE LEGENDS 🔍*

ID : ${args[1]}
Nick : ${data.result}`
reply(emel)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'nickpubg':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 5217933016`)
            axios.get(`https://api.lolhuman.xyz/api/pubg/${args[1]}?apikey=${lolkey}`)
            .then(({data}) => {
            let pubg = `*🔎 CHECK NICK PUBG 🔍*

ID : ${args[1]}
Nick : ${data.result}`
            reply(pubg)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'nickdomino':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 291756557`)
            axios.get(`https://api.lolhuman.xyz/api/higghdomino/${args[1]}?apikey=${lolkey}`)
            .then(({data}) => {
            let domino = `*🔎 CHECK NICK HIGGS DOMINO 🔍*

ID : ${args[1]}
Nick : ${data.result}`
            reply(domino)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
         case prefix+'google': {
            if (isBanChat) return reply(mess.banChat)
            if (!args[1]) return reply(`Example: ${command} <query>\nUses : ${command} apa arti cinta`)
            addCountCmd('#Google', sender, _cmd)
            let google = require('google-it')
            google({'query': args.join(" ")}).then(res => {
            let teks = `Google Search From : ${text}\n\n`
            for (let g of res) {
            teks += `• *Title* : ${g.title}\n`
            teks += `• *Description* : ${g.snippet}\n`
            teks += `• *Link* : ${g.link}\n\n────────────────────────\n\n`
            } 
            reply(teks)
            })
            }
            break
         case prefix+'brainly':
            if (isBanChat) return reply(mess.banChat)
            if (!q) return reply("Masukkan soal")
            const nx = await brain.searchWithMT(q, "id")
            reply(`[ *BRAINLY* ]\n
• *Soal* : ${q}
• *Pelajaran* : ${nx[0].question.education}
• *Kelas* : ${nx[0].question.grade}
• *Jawaban* : ${nx[0].answers[0].content}`) 
            addCountCmd('#Brainly', sender, _cmd)
            break
        case prefix+'grupwa': case prefix+'searchgrup':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *nama group*\n\n_Contoh_\n\n${command} Bot WhatsApp`)
            reply(mess.wait)
            addCountCmd('#grupwa', sender, _cmd)
            hxz.linkwa(q).then(async(data) => {
                if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
                var teks = `*Hasil Pencarian Dari ${q}*\n\n`
                for (let x of data) {
                    teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
                }
                reply(teks)
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(`Hasil pencarian dari ${q} tidak ditemukan`)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'pinterest':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query* atau ${command} *query --jumlah*\nContoh :\n${command} cecan atau ${command} cecan --10`)
            reply(mess.wait)
            addCountCmd('#pinterest', sender, _cmd)
            var jumlah;
            if (q.includes('--')) jumlah = q.split('--')[1]
            pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
                if (q.includes('--')) {
                    if (data.result.length < jumlah) {
                        jumlah = data.result.length
                        reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
                    }
                    for (let i = 0; i < jumlah; i++) {
                        ezii.sendMessage(from, { image: { url: data.result[i] }})
                    }
                    limitAdd(sender, limit)
                } else {
                    var but = [{ urlButton: { displayText: `Photo Source`, url: `https://www.pinterest.com` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command} ${q}` } }]
                    ezii.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'yts': case prefix+'ytsearch':{
            if (isBanChat) return reply(mess.banChat)
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query*\n\n_Contoh_\n\n${command} Bila Nanti`)
            reply(mess.wait)
            addCountCmd('#ytsearch', sender, _cmd)
            let search = await yts(q)
            let listSerch = []
            for (let i of search.all) {
                listSerch.push({
                    title: i.title, rowId: `${prefix}mp3 ${i.url}`, description: `Channel : ${i.author.name}\nDuration : ${i.timestamp}`
                })
            }
            const listSearch = {
                text: `*「 Youtube Search Downloader 」*\n\nResult From ${q}, klik tombol dibawah untuk melihat list youtube search, dan pilih salah satu untuk mendownload video tersebut`,
                footer: footxt,
                buttonText: "List Search",
                sections: [{
                   title: "Total Search " + search.all.length, rows: listSerch
                }]
            }
            ezii.sendMessage(from, listSearch, { quoted: msg })
            limitAdd(sender, limit)
            }
            break
		case prefix+'whatmusic': case prefix+'whatmusik':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (isVideo || isQuotedVideo || isQuotedAudio) {
            reply(mess.wait)
            addCountCmd('#whatmusic', sender, _cmd)
            try {
                var media;
                if (isVideo || isQuotedVideo) {
                    media = await downloadAndSaveMediaMessage('video', './sticker/a'+sender+'.mp3')
                } else if (isQuotedAudio) {
                    media = await downloadAndSaveMediaMessage('audio', './sticker/a'+sender+'.mp3')
                }
                const acr = new acrcloud({
                    host: "identify-eu-west-1.acrcloud.com",
                    access_key: "1598f147ee841b02dc18821a1be79fae",
                    access_secret: "FLMLqyIMv19PHb8L4Xgy86YeD1K2qrHQFnL3muYO"
                });
                var sampleq = fs.readFileSync('./sticker/a'+sender+'.mp3')
                var metadata = await acr.identify(sampleq)
                console.log(metadata)
                ezii.reply(from, `*「 Berhasil Ditemukan 」*\n\n➸ Judul Lagu : ${metadata.metadata.music[0].title}\n➸ Artis : ${metadata.metadata.music[0].artists[0].name}\n➸ Album : ${metadata.metadata.music[0].album.name}\n➸ Rilis : ${metadata.metadata.music[0].release_date}`, msg)
                fs.unlinkSync('./sticker/a'+sender+'.mp3')
            } catch (e) {
                fs.unlinkSync('./sticker/a'+sender+'.mp3')
                reply(`Lagu tidak dapat ditemukan, atau ukuran lagu yang terlalu besar!`)
            }
            } else {
                reply(`Reply video/audio dan sertakan caption ${prefix}whatmusic`)
            }
            break
         case prefix+'igtv': {	            
                if (isBanChat) return reply(mess.banChat)
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!q) return reply(`Linknya?`)
                reply(mess.wait)
                addCountCmd('#igtv', sender, _cmd)
                const { instagramdl, instagramdlv2, instagramdlv3 } = require('@bochilteam/scraper')
                if (!isUrl(args[1]) && !args[1].includes('instagram.com')) return reply('Tautan yang Anda berikan tidak valid!')
                instagramdlv3(`${q}`).then(async (data) => {            
                var buf = await getBuffer(data[0].thumbnail)        
                ezii.sendMessage(from, { video: { url: data[0].url }, jpegThumbnail:buf, caption: `${footer}`}, { quoted: msg })
                }).catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            }
            break
        case prefix+'igstalk': case prefix+'stalkig':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Kirim perintah ${command} Username\nContoh : ${command} arsrfi.jpg`)
            reply(mess.wait)
            addCountCmd('#igstalk', sender, _cmd)
            var data = await fetchJson(`https://hardianto.xyz/api/igstalk?username=${q}&apikey=hardianto`)
            var caption = `*[ INSTAGRAM STALK ]*\n\n👤Username : ${data.username}\n📛 Full Name : ${data.fullname}\n✔️ Verified : ${data.verified}\n👥 Followers : ${data.followers}\n?? Following : ${data.follow}\n🗣️ Kategori ${data.category}\n\n${readmore} *© JOJOBOT*`
            ezii.sendMessage(from, {caption: caption, image: {url: data.thumbnail}}, {quoted: msg})
            limitAdd(sender, limit)
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'googlelens': case prefix+'glens': case prefix+'searchbyimage': case prefix+'golens': case prefix+'searchbyimg':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isImage || isQuotedImage) {
                reply(mess.wait)
                addCountCmd('#googlelens', sender, _cmd)
                var media = await ezii.downloadAndSaveMediaMessage(msg, 'image', `./sticker/glens${sender}.jpg`)
                var mediaLink = (await ra.UploadFile(media)).result.namaFile
                var data = await goLens(mediaLink)
                var teks = `*Data Berhasil Di Dapatkan!*\n\n*Url Photo :* ${data.imgUrl}\n\nPencet Tombol "Menuju Pencarian" atau "Ambil Link" di bawah untuk menuju ke pencarian yang anda Cari!`
                var but = [{ urlButton: { displayText: 'Menuju Pencarian', url: `${data.url}` } }, { quickReplyButton: { displayText: 'Get Link', id: `${prefix}getglink ${data.imgUrl}` } }]
                ezii.sendMessage(from, { caption: teks, image: fs.readFileSync(media), templateButtons: but, footer: footxt, mentions: [sender] }, { quoted: msg })
                fs.unlinkSync(media)
                limitAdd(sender, limit)
            } else {
                reply(`Kirim/Balas gambar yang ingin dicari!`)
            }
            break
        case prefix+'getglink':
            if (type !== 'templateButtonReplyMessage') return
            goLens(args[1]).then( data => {
                reply(data.url)
            })
            break
            
            // Anime Menu
         case prefix+'loli':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#loli', sender, _cmd)
	        var query = ["loli","loli chan","loli anime","loli hd","loli aesthetic"]
            var ezi = await pinterest(pickRandom(query))
	        var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Loli", image: { url: pickRandom(ezi.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'waifu': case prefix+'lolii':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		    reply(mess.wait)
		    addCountCmd('#waifu', sender, _cmd)
		    var data = (await axios.get('https://waifu.pics/api/sfw/waifu')).data.url
		    var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` }}]
		    ezii.sendMessage(from, { caption: "Random Waifu", image: { url: data }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
		    limitAdd(sender, limit)
		    .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
		    break
        case prefix+'naruto':
			if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)
            var query = ["naruto hd","naruto boruto","naruto sasuke", "naruto aesthetic", "naruto aesthetic"]
            var data = await pinterest(pickRandom(query))
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Naruto", image: { url: pickRandom(data.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'yaoi':
			if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)
		    var query = ["yaoi","yaoi aesthetic","yaoi hd","yaoi ganteng"]
            var data = await pinterest(pickRandom(query))
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Yaoi", image: { url: pickRandom(data.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break  
       case prefix+'husbu':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)					
	        var query = ["husbu anime","husbu hd","husbu aesthetic"]
            var ezi = await pinterest(pickRandom(query))
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Husbu", image: { url: pickRandom(ezi.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'smug2':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/smug`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: `Random ${q}`, image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'foxgirl':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Foxgirl", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animenom' :
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            addCountCmd('#Anime', sender, _cmd)
            var waifudd = await axios.get(`https://waifu.pics/api/sfw/nom`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Animenom", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'waifu2':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/waifu`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Waifu", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'neko2':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifud = await axios.get('https://waifu.pics/api/sfw/neko')
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Neko", image: {url:waifud.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animecuddle':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/cuddle`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cuddle", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animeslap':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/slap`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Slap", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animepat':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/pat`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Pat", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animeneko':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/neko`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Neko", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animehug':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/hug`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Hug", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animekiss':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/kiss`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Kiss", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animewlp':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Wlp", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animespank':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/spank`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Spank", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animecry':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/cry`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cry", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animekill':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/kill`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Kill", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animelick':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/lick`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Lick", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animebite':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/bite`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Bite", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animeyeet':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/yeet`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Yeet", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animebully':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/lick`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Lick", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animebonk':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/bonk`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Bonk", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animewink':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/wink`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Wink", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animepoke':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/poke`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Poke", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animesmile':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/smile`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Smile", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animewave':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/wave`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Wave", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animeawoo':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/awoo`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Awoo", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animeblush':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/blush`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Blush", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animesmug':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/smug`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Smug", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animeglomp':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/glomp`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Glomp", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animehappy':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/happy`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Happy", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animedance':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/dance`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Dance", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animecringe':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/cringe`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cringe", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animehighfive':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/highfive`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Highfive", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animehandhold':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/handhold`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Handhold", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'animemegumin':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://api.waifu.pics/sfw/megumin`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Megumin", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'shinobu':  
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)
            var ud = await axios.get('https://waifu.pics/api/sfw/shinobu')
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Shinobu", image: {url:ud.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break						
        case prefix+'megumin2':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var ud = await axios.get('https://waifu.pics/api/sfw/megumin')
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Megumin", image: {url:ud.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break	
        case prefix+'awoo2':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#Anime', sender, _cmd)						
            var waifudd = await axios.get(`https://waifu.pics/api/sfw/awoo`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Awoo", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break

         // Sticker Anime 
        case 'cry':case 'kill':case 'hug':case 'pat':case 'lick':case 'kiss':case 'bite':case 'yeet':case 'neko':case 'bully':case 'bonk':case 'wink':case 'poke':case 'nom':case 'slap':case 'smile':case 'wave':case 'awoo':case 'blush':case 'smug':case 'glomp':case 'happy':case 'dance':case 'cringe':case 'cuddle':case 'highfive':case 'shinobu':case 'megumin':case 'handhold':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            addCountCmd('#animesticker', sender, _cmd)
            axios.get(`https://api.waifu.pics/sfw/${command}`)
			.then(({data}) => {
			ezii.sendImageAsSticker(from, data.url, msg, { packname: 'Ryzuubot', author: '@eziigntng_' })
	        limitAdd(sender, limit)
            })
		    break
            
          // Nsfw Menu
        case prefix+'spank':
            if (!isPremium) return reply(mess.OnlyPrem)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)
            var spankd = await axios.get(`https://nekos.life/api/v2/img/spank`)                                   
            let spbuff = await getBuffer(spankd.data.url)
            let spgif = await GIFBufferToVideoBuffer(spbuff)   
            await ezii.sendMessage(from,{video: spgif, gifPlayback:true},{ quoted:msg })
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'trap' :
            if (!isPremium) return reply(mess.OnlyPrem)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)
            var waifudd = await axios.get(`https://waifu.pics/api/nsfw/${command}`)       
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cewe Cantik", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'hentai-neko' : case prefix+'hneko' :
            if (!isPremium) return reply(mess.OnlyPrem)
            addCountCmd('#nsfw', sender, _cmd)
            var waifudd = await axios.get(`https://waifu.pics/api/nsfw/neko`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cewe Cantik", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'hentai-waifu' : case prefix+'nwaifu' :
            if (!isPremium) return reply(mess.OnlyPrem)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)
            var waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`)         
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cewe Cantik", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'gasm':
            if (!isPremium) return reply(mess.OnlyPrem)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var waifudd = await axios.get(`https://nekos.life/api/v2/img/${command}`)
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cewe Cantik", image: {url:waifudd.data.url}, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break         
         case prefix+'pussy':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var pussy = JSON.parse(fs.readFileSync('./facture/nsfw/pussy.json'))
            var hasil = pickRandom(pussy)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
         case prefix+'masturbation':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var masturbation = JSON.parse(fs.readFileSync('./facture/nsfw/masturbation.json'))
            var hasil = pickRandom(masturbation)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break 
         case prefix+'hentai':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var hentai = JSON.parse(fs.readFileSync('./facture/nsfw/hentai.json'))
            var hasil = pickRandom(hentai)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break 
         case prefix+'blowjob':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var bj = JSON.parse(fs.readFileSync('./facture/nsfw/blowjob.json'))
            var hasil = pickRandom(bj)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break 
         case prefix+'bdsm':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var bdsm = JSON.parse(fs.readFileSync('./facture/nsfw/bdsm.json'))
            var hasil = pickRandom(bdsm)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break 
         case prefix+'ass':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var ass = JSON.parse(fs.readFileSync('./facture/nsfw/ass.json'))
            var hasil = pickRandom(ass)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break 
         case prefix+'ahegao':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#nsfw', sender, _cmd)						
            var ahegao = JSON.parse(fs.readFileSync('./facture/nsfw/ahegao.json'))
            var hasil = pickRandom(ahegao)
            ezii.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break 
            
         // Story Menu
         case prefix+'storywa':
            if (q.includes('--help')) return fezy(examkosong) 
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#storywa', sender, _cmd)
            const Depp1 = fs.readFileSync("./facture/storywa.json");
            const Dep1 = JSON.parse(Depp1)
            const Defff1 = Math.floor(Math.random() * Dep1.length)
            const Diep1 = Dep1[Defff1]
            ezii.sendMessage(from, { video : { url : Diep1.url }, caption : 'nih' }) 
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
         case prefix+'asupan':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            reply(mess.wait)
            addCountCmd('#asupan', sender, _cmd)
            var asupan = JSON.parse(fs.readFileSync('./facture/asupan.json'))
            var hasil = pickRandom(asupan)
            ezii.sendMessage(from, {video: {url: hasil.url}}, {quoted: msg})
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break

        // Random Menu
        case prefix+'gombal': case prefix+'gombalan':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            addCountCmd('#gombalan', sender, _cmd)
            var gombal = JSON.parse(fs.readFileSync('./facture/gombalan.json'))
            var hasil = pickRandom(gombal)
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
            caption: hasil,
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
            { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
            break
        case prefix+'katagalau': case prefix+'galau':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            addCountCmd('#katagalau', sender, _cmd)
            var kotes = JSON.parse(fs.readFileSync('./facture/katagalau.json'))
            var hasil = pickRandom(kotes)
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
            caption: hasil,
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
            { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'quote': case prefix+'quotes': case prefix+'randomquote': case prefix+'randomquotes':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            addCountCmd('#quotes', sender, _cmd)
            var res = await Quotes()
            var anjayani = `${res.quotes}\n\nQuotes By - ${res.author}`
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
            caption: anjayani,
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
            { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'cecan': case prefix+'cewek':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#cecan', sender, _cmd)
            var query = ["cecan hd","cecan indo","cewe cantik", "cewe aesthetic", "cecan aesthetic"]
            var data = await pinterest(pickRandom(query))
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cewe Cantik", image: { url: pickRandom(data.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
        case prefix+'cogan': case prefix+'cowok':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            addCountCmd('#cogan', sender, _cmd)
            var query = ["cogan hd","cogan indo","cowo ganteng","handsome boy","hot boy","oppa","cowo aesthetic","cogan aesthetic"]
            var data = await pinterest(pickRandom(query))
            var but = [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } }, { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            ezii.sendMessage(from, { caption: "Random Cowo Ganteng", image: { url: pickRandom(data.result) }, templateButtons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
            limitAdd(sender, limit)
            .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            break
		case prefix+'dark': case prefix+'darkjoke': case prefix+'darkjokes':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
		    addCountCmd('#darkjoke', sender, _cmd)
            var res = await Darkjokes()
            teks = "*DARKJOKES*"
            ezii.sendMessage(from, { image : { url : res }, caption: teks }, { quoted : msg })
            limitAdd(sender, limit)
		    .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
		    break
		case prefix+'quotesanime': case prefix+'quoteanime': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            addCountCmd('#quotesanime', sender, _cmd)
            let { quotesAnime } = require('../lib/scraper')
            let anu = await quotesAnime()
            let resulltt = anu[Math.floor(Math.random() * anu.length)] 
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            caption: `~_${resulltt.quotes}_\n\nBy '${resulltt.karakter}', ${resulltt.anime}\n\n- ${resulltt.up_at}`,
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
            { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
		    .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
            }
		    break
        case prefix+'faktaunik': case prefix+'faktamenarik':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		    addCountCmd('#faktaunik', sender, _cmd)
            var ezi = await fetchJson(`https://docs-jojo.herokuapp.com/api/fakta-unik`)
            var caption = `Tahukah kamu?\n${ezi.result}`
            ezii.sendMessage(from, { 
            document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            caption: caption, 
            mimetype: `${docs}`, 
            fileName: `Hai kak ${pushname}`, 
            jpegThumbnail: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), 
            footer: footxt,
            templateButtons: [{ urlButton: { displayText: `Instagram`, url: `https://instagram.com/${instagram}` } },
            { quickReplyButton: { displayText: `➡️ Next`, id: `${command}` } }]
            }, { quoted: msg })
            limitAdd(sender, limit)
		    .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
		    break
		case prefix+'meme': case prefix+'memeindo':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		    reply(mess.wait)
		    addCountCmd('#meme', sender, _cmd)
            var res = await Darkjokes()
            teks = "*MEME*"
            ezii.sendMessage(from, { image : { url : res }, caption: teks }, { quoted : msg })
            limitAdd(sender, limit)
		    .catch((e) => {
                console.log(color('[ ERROR ]', 'red'), e)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${e}` })
            })
		    break
        case prefix+'couple': case prefix+'kapel': case prefix+'ppcp': {
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            let anu = await axios.get(`https://api.zacros.my.id/randomimg/ppcouple`)
            ezii.sendMessage(from, { image: { url: anu.data.male }, caption: 'Cowo' }, { quoted: msg } )
                .then((res) => ezii.sendMessage(from, { image: { url: anu.data.female }, caption: 'Cewe' }, { quoted: res }))
                .catch((err) => {
                    console.log(color('[ ERROR ]', 'red'), err)
                    reply(mess.error.api)
                    ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
                })
                limitAdd(sender, limit)
            }
            break

        // Textpro Menu
        case prefix+'glitch':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'pornhub':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'harrypotter':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'graffiti':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'3dspace':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/create-space-3d-text-effect-online-985.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'lionlogo':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/create-lion-logo-mascot-online-938.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'bearlogo':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'wolflogo':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text1|text2*\n\n_Contoh_\n\n${command} ezii|gntng`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            var teks1 = q.split("|")[0]
            var teks2 = q.split("|")[1]
            textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [`${teks1}`,`${teks2}`])
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break
        case prefix+'candy': case prefix+'christmas': case prefix+'3dchristmas': case prefix+'sparklechristmas': case prefix+'deepsea':
        case prefix+'scifi': case prefix+'rainbow': case prefix+'waterpipe': case prefix+'spooky': case prefix+'pencil':
        case prefix+'circuit': case prefix+'discovery': case prefix+'metalic': case prefix+'fiction': case prefix+'demon':
        case prefix+'transformer': case prefix+'berry': case prefix+'thunder': case prefix+'magma': case prefix+'neonlight':
        case prefix+'brokenglass': case prefix+'papercut': case prefix+'watercolor': case prefix+'multicolor': case prefix+'neondevil':
        case prefix+'underwater': case prefix+'graffitibike': case prefix+'snow': case prefix+'cloud': case prefix+'honey':
        case prefix+'ice': case prefix+'fruitjuice': case prefix+'biscuit': case prefix+'wood': case prefix+'chocolate':
        case prefix+'strawberry': case prefix+'matrix': case prefix+'blood': case prefix+'droopwater': case prefix+'toxic':
        case prefix+'larva': case prefix+'rock': case prefix+'bloodglas': case prefix+'hallowen': case prefix+'darkgold':
        case prefix+'joker': case prefix+'wicker': case prefix+'firework': case prefix+'skeleton': case prefix+'blackpink':
        case prefix+'sand': case prefix+'glue': case prefix+'1917': case prefix+'leaves':
            if (isBanChat) return reply(mess.banChat)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} Eziitzy`)
            reply(mess.wait)
            addCountCmd('#textpro', sender, _cmd)
            let link
            if (/candy/.test(command)) link = 'https://textpro.me/create-christmas-candy-cane-text-effect-1056.html'
            if (/christmas/.test(command)) link = 'https://textpro.me/christmas-tree-text-effect-online-free-1057.html'
            if (/3dchristmas/.test(command)) link = 'https://textpro.me/3d-christmas-text-effect-by-name-1055.html'
            if (/sparklechristmas/.test(command)) link = 'https://textpro.me/sparkles-merry-christmas-text-effect-1054.html'
            if (/deepsea/.test(command)) link = 'https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html'
            if (/scifi/.test(command)) link = 'https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html'
            if (/rainbow/.test(command)) link = 'https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html'
            if (/waterpipe/.test(command)) link = 'https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html'
            if (/spooky/.test(command)) link = 'https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html'
            if (/pencil/.test(command)) link = 'https://textpro.me/create-a-sketch-text-effect-online-1044.html'
            if (/circuit/.test(command)) link = 'https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html'
            if (/discovery/.test(command)) link = 'https://textpro.me/create-space-text-effects-online-free-1042.html'
            if (/metalic/.test(command)) link = 'https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html'
            if (/fiction/.test(command)) link = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html'
            if (/demon/.test(command)) link = 'https://textpro.me/create-green-horror-style-text-effect-online-1036.html'
            if (/transformer/.test(command)) link = 'https://textpro.me/create-a-transformer-text-effect-online-1035.html'
            if (/berry/.test(command)) link = 'https://textpro.me/create-berry-text-effect-online-free-1033.html'
            if (/thunder/.test(command)) link = 'https://textpro.me/online-thunder-text-effect-generator-1031.html'
            if (/magma/.test(command)) link = 'https://textpro.me/create-a-magma-hot-text-effect-online-1030.html'
            if (/neonlight/.test(command)) link = 'https://textpro.me/create-3d-neon-light-text-effect-online-1028.html'
            if (/brokenglass/.test(command)) link = 'https://textpro.me/broken-glass-text-effect-free-online-1023.html'
            if (/papercut/.test(command)) link = 'https://textpro.me/create-art-paper-cut-text-effect-online-1022.html'
            if (/watercolor/.test(command)) link = 'https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html'
            if (/multicolor/.test(command)) link = 'https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html'
            if (/neondevil/.test(command)) link = 'https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html'
            if (/underwater/.test(command)) link = 'https://textpro.me/3d-underwater-text-effect-generator-online-1013.html'
            if (/graffitibike/.test(command)) link = 'https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html'
            if (/snow/.test(command)) link = 'https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html'
            if (/cloud/.test(command)) link = 'https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html'
            if (/honey/.test(command)) link = 'https://textpro.me/honey-text-effect-868.html'
            if (/ice/.test(command)) link = 'https://textpro.me/ice-cold-text-effect-862.html'
            if (/fruitjuice/.test(command)) link = 'https://textpro.me/fruit-juice-text-effect-861.html'
            if (/biscuit/.test(command)) link = 'https://textpro.me/biscuit-text-effect-858.html'
            if (/wood/.test(command)) link = 'https://textpro.me/wood-text-effect-856.html'
            if (/chocolate/.test(command)) link = 'https://textpro.me/chocolate-cake-text-effect-890.html'
            if (/strawberry/.test(command)) link = 'https://textpro.me/strawberry-text-effect-online-889.html'
            if (/matrix/.test(command)) link = 'https://textpro.me/matrix-style-text-effect-online-884.html'
            if (/blood/.test(command)) link = 'https://textpro.me/horror-blood-text-effect-online-883.html'
            if (/dropwater/.test(command)) link = 'https://textpro.me/dropwater-text-effect-872.html'
            if (/toxic/.test(command)) link = 'https://textpro.me/toxic-text-effect-online-901.html'
            if (/larva/.test(command)) link = 'https://textpro.me/lava-text-effect-online-914.html'
            if (/rock/.test(command)) link = 'https://textpro.me/rock-text-effect-online-915.html'
            if (/bloodglas/.test(command)) link = 'https://textpro.me/blood-text-on-the-frosted-glass-941.html'
            if (/hallowen/.test(command)) link = 'https://textpro.me/halloween-fire-text-effect-940.html'
            if (/darkgold/.test(command)) link = 'https://textpro.me/metal-dark-gold-text-effect-online-939.html'
            if (/joker/.test(command)) link = 'https://textpro.me/create-logo-joker-online-934.html'
            if (/wicker/.test(command)) link = 'https://textpro.me/wicker-text-effect-online-932.html'
            if (/firework/.test(command)) link = 'https://textpro.me/firework-sparkle-text-effect-930.html'
            if (/skeleton/.test(command)) link = 'https://textpro.me/skeleton-text-effect-online-929.html'
            if (/blackpink/.test(command)) link = 'https://textpro.me/create-blackpink-logo-style-online-1001.html'
            if (/sand/.test(command)) link = 'https://textpro.me/write-in-sand-summer-beach-free-online-991.html'
            if (/glue/.test(command)) link = 'https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html'
            if (/1917/.test(command)) link = 'https://textpro.me/1917-style-text-effect-online-980.html'
            if (/leaves/.test(command)) link = 'https://textpro.me/natural-leaves-text-effect-931.html'
            textpro(link, q)
            .then((data) => {
                ezii.sendMessage(from, { image: { url: data }, caption: `Dont forget to donate` }, { quoted: msg })
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
                ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `${command} error : ${err}` })
            })
            break

        // Balance Menu
        case prefix+'topglobal':{
            balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            let top = '*── 「 TOPGLOBAL BALANCE 」 ──*\n\n'
            let arrTop = []
            var total = 10
            if (balance.length < 10) total = balance.length
            for (let i = 0; i < total; i ++){
                top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                arrTop.push(balance[i].id)
            }
            mentions(top, arrTop, true)
            }
            break
        case prefix+'toplocal':{
            if (!isGroup)return reply(mess.OnlyGrup)
            balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            let top = '*── 「 TOPLOCAL BALANCE 」 ──*\n\n'
            let arrTop = []
            var total = 10
            if (balance.length < 10) total = balance.length
            let anggroup = groupMembers.map(a => a.id)
            for (let i = 0; i < total; i ++){
                if (anggroup.includes(balance[i].id)) {
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
            }
            mentions(top, arrTop, true)
            }
            break
        case prefix+'buylimit':{
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *jumlah limit yang ingin dibeli*\n\nHarga 1 limit = $50 balance`)
            if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
            if (isNaN(args[1])) return reply(`Harus berupa angka`)
            if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            let ane = Number(parseInt(args[1]) * 50)
            if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            addCountCmd('#buylimit', sender, _cmd)
            kurangBalance(sender, ane, balance)
            giveLimit(sender, parseInt(args[1]), limit)
            reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
            break
        case prefix+'buygamelimit': case prefix+'buyglimit':{
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *jumlah game limit yang ingin dibeli*\n\nHarga 1 game limit = $50 balance\nPajak $1 / $10`)
            if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
            if (isNaN(args[1])) return reply(`Harus berupa angka`)
            if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            let ane = Number(parseInt(args[1]) * 50)
            if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            addCountCmd('#buygamelimit', sender, _cmd)
            kurangBalance(sender, ane, balance)
            givegame(sender, parseInt(args[1]), glimit)
            reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
            break
        case prefix+'transfer': case prefix+'tf':{
            if (args.length < 2) return mentions(`Gunakan dengan cara ${command} *@tag nominal*\n\nContoh : ${command} @${wangsaf.split("@")[0]} 2000`, [wangsaf], true)
            if (mentionUser.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
            if (!args[2]) return reply(`Masukkan nominal nya!`)
            if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
            if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
            var anu = getBalance(sender, balance)
            if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
            addCountCmd('#transfer', sender, _cmd)
            kurangBalance(sender, parseInt(args[2]), balance)
            addBalance(mentionUser[0], parseInt(args[2]), balance)
            mentions(`Sukses transfer balance sebesar $${args[2]} kepada @${mentionUser[0].split("@")[0]}`, [mentionUser[0]], true)
            }
            break
        case prefix+'limit': case prefix+'balance': case prefix+'ceklimit': case prefix+'cekbalance':
            if (mentioned.length !== 0){
                var Ystatus = ownerNumber.includes(mentioned[0])
                var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
                var ggcount = isPrim ? gcounti.prem : gcounti.user
                var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                reply(`💳 Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}\n🕹️ Limit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}\n🏦 Balance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $50 balance`)
            } else {
                var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                reply(`💳 Limit : ${isPremium ? 'Unlimited' : limitPrib}\n🕹️ Limit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\n🏦 Balance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $50 balance`)
            }
            break

        // Baileys
        case prefix+'fitnah':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (args.length < 2) return mentions(`Gunakan dengan cara ${command} *@tag|pesantarget|pesanbot*\n\n_Contoh_\n\n${command} @${wangsaf.split("@")[0]}|enak ga semalem|enak banget`, [wangsaf], true)
            var org = q.split("|")[0]
            var target = q.split("|")[1];
            var bot = q.split("|")[2];
            if (!org.startsWith('@')) return reply('Tag orangnya')
            if (!target) return reply(`Masukkan pesan target!`)
            if (!bot) return reply(`Masukkan pesan bot!`)
            var mens = parseMention(target)
            addCountCmd('#fitnah', sender, _cmd)
            var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
            var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
            ezii.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
            break
        case prefix+'nowa':
            if (!isPremium) return reply(mess.OnlyPrem)
	        if (args.length < 2) return reply(`Gunakan dengan cara ${command} *nomor*\n\n_Contoh_\n\n${command} 628XXXXXXXXXX`)
	        var teks = args[1]
            if (!teks.includes('x')) return reply('lah?')
            reply(mess.wait)
            addCountCmd('#nowa', sender, _cmd)
            function countInstances(string, word) {
                return string.split(word).length - 1;
            }
	        var nomer0 = teks.split('x')[0]
	        var nomer1 = teks.split('x')[countInstances(teks, 'x')] ? teks.split('x')[countInstances(teks, 'x')] : ''
	        var random_length = countInstances(teks, 'x')
	        var random;
	        if (random_length == 1) {
	            random = 10
	        } else if (random_length == 2) {
	            random = 100
	        } else if (random_length == 3) {
	            random = 1000
	        }

            var nomerny = `List Nomer\n\nPunya Bio/status/info\n`
            var no_bio = `\nTanpa Bio/status/info || \nHey there! I am using WhatsApp.\n`
            var no_watsap = `\nTidak Terdaftar\n`

            for (let i = 0; i < random; i++) {
                var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                var dom1 = nu[Math.floor(Math.random() * nu.length)]
                var dom2 = nu[Math.floor(Math.random() * nu.length)]
                var dom3 = nu[Math.floor(Math.random() * nu.length)]
                var dom4 = nu[Math.floor(Math.random() * nu.length)]

                var rndm;
                if (random_length == 1) {
                    rndm = `${dom1}`
                } else if (random_length == 2) {
                    rndm = `${dom1}${dom2}`
                } else if (random_length == 3) {
                    rndm = `${dom1}${dom2}${dom3}`
                } else if (random_length == 4) {
                    rndm = `${dom1}${dom2}${dom3}${dom4}`
                }

                var anu = await ezii.onWhatsApp(`${nomer0}${i}${nomer1}@s.whatsapp.net`);
                var anuu = anu.length !== 0 ? anu : false

                try {
                    try {
                        var anu1 = await ezii.fetchStatus(anu[0].jid)
                    } catch {
                        var anu1 = '401'
                    }
                    if (anu1 == '401' || anu1.status.length == 0) {
                        no_bio += `wa.me/${anu[0].jid.split("@")[0]}\n`
                        console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
                    } else {
                        if (random_length == 6) {
                            var thn = `${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}`
                            if (thn.endsWith('2009')) {
                                nomerny += `wa.me/${anu[0].jid.split("@")[0]}\nBio Name : ${anu1.status}\nTahun : ${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}\n\n`
                                console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
                            }
                        } else {
                            nomerny += `wa.me/${anu[0].jid.split("@")[0]}\nBio Name : ${anu1.status}\nTahun : ${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}\n\n`
                            console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
                        }
                    }
                } catch {
                    no_watsap += `${nomer0}${i}${nomer1}\n`
                    console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [NOT REGISTERED]`, 'red'))
                }
            }
		    reply(`${nomerny}${no_bio}${no_watsap}`)
		    break
	    case prefix+'q': case prefix+'getquotedmsg': case prefix+'getquoted': case prefix+'quoted':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (!isQuotedMsg) return reply(`Balas Pesannya!`)
            var data = await store.loadMessage(from, quotedMsg.id)
            if (data.isQuotedMsg !== true) return reply(`The message you replied to contained no reply`)
            var typ = Object.keys(data.message)[0]
            addCountCmd('#getquotedmsg', sender, _cmd)
            if (data.message[typ].contextInfo.quotedMessage.conversation) {
	            reply(`${data.message[typ].contextInfo.quotedMessage.conversation}`)
            } else {
                var anu = data.message[typ].contextInfo.quotedMessage
                ezii.sendMessageFromContent(from, anu)
	        }
	        break
	    case prefix+'fakehidetag':
	        if (!isPremium) return rely(mess.OnlyPrem)
            if (!isGroup) return reply(mess.OnlyGrup)
            if (args.length < 2) return mentions(`Gunakan dengan cara ${command} *@tag|text*\n\n_Contoh_\n\n${command} @${wangsaf.split("@")[0]}|Halo`, [wangsaf], true)
            var org = q.split("|")[0]
            var teks = q.split("|")[1];
            if (!org.startsWith('@')) return reply('Tag orangnya')
            var mem2 = []
            groupMembers.map( i => mem2.push(i.id) )
            var mens = parseMention(target)
            addCountCmd('#fakehidetag', sender, _cmd)
            var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${prefix}hidetag ${teks}`, contextInfo: { mentionedJid: mens }}}}
            var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${prefix}hidetag ${teks}` }}
            ezii.sendMessage(from, { text: teks ? teks : '', mentions: mem2 }, { quoted: mens.length > 2 ? msg1 : msg2 })
            break
        case prefix+'react':
            if (!isMods) return reply(mess.OnlyOwner)
            if (!isQuotedMsg) return reply(`Balas pesannya`)
            if (args.length < 2) return reply(`Masukkan 1 emoji`)
            if (!isEmoji(args[1])) return reply(`Itu bukan emoji!`)
            if (isEmoji(args[1]).length > 1) return reply(`Satu aja emojinya`)
            addCountCmd('#react', sender, _cmd)
            var reactMsg = { reactionMessage: {
                key: {
                    remoteJid: from,
                    fromMe: quotedMsg.fromMe,
                    id: quotedMsg.id,
                    participant: quotedMsg.sender
                    },
                text: args[1]
            }
            }
            ezii.sendMessageFromContent(from, reactMsg)
            break
        case prefix+'setcmd':
            if (!isPremium && !isOwner && !fromMe) return reply(mess.OnlyPrem)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!q) return reply(`Masukan balasannya...\nContoh: ${prefix}setcmd #menu`)
            addCountCmd('#setcmd', sender, _cmd)
            if (checkRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB) === true) return reply('Key hex tersebut sudah terdaftar di database!')
            addRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), q, sender, responDB)
            reply(`• *Key:* ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}\n• *Action:* ${q}\n\nBerhasil di set`)
            break
        case prefix+'delcmd':
            if (!isPremium && !isOwner && !fromMe) return reply(mess.OnlyPrem)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            addCountCmd('#delcmd', sender, _cmd)
            if (!deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)) return reply('Key hex tersebut tidak ada di database')
            deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)
            reply(`Berhasil remove key hex ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}`)
            break
         
        // Owners Menu
        case prefix+'exif':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            addCountCmd('#exif', sender, _cmd)
            var namaPack = q.split('|')[0] ? q.split('|')[0] : q
            var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
            exif.create(namaPack, authorPack)
            reply(`Sukses membuat exif`)
            break
        case prefix+'join':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            addCountCmd('#join', sender, _cmd)
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await ezii.groupAcceptInvite(url)
            reply(jsonformat(data))
            break
        case prefix+'leave':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(mess.OnlyGrup)
            addCountCmd('#leave', sender, _cmd)
            ezii.groupLeave(from)
            break
        case prefix+'self':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            addCountCmd('#self', sender, _cmd)
            ezii.mode = 'self'
            reply('Berhasil berubah ke mode self')
            }
            break
        case prefix+'publik': case prefix+'public':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            addCountCmd('#public', sender, _cmd)
            ezii.mode = 'public'
            reply('Berhasil berubah ke mode public')
            }
            break
        case prefix+'setprefix':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
            if (q === 'multi') {
                addCountCmd('#setprefix', sender, _cmd)
                ezii.multi = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else if (q === 'nopref') {
                addCountCmd('#setprefix', sender, _cmd)
                ezii.multi = false
                ezii.nopref = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else {
                addCountCmd('#setprefix', sender, _cmd)
                ezii.multi = false
                ezii.nopref = false
                ezii.prefa = `${q}`
                reply(`Berhasil mengubah prefix ke ${q}`)
            }
            break
        case prefix+'setpp': case prefix+'setppbot':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (isImage || isQuotedImage) {
                addCountCmd('#setppbot', sender, _cmd)
                var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
                if (args[1] == '\'panjang\'') {
                    var { img } = await generateProfilePicture(media)
                    await ezii.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type:'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [
                        {
                            tag: 'picture',
                            attrs: { type: 'image' },
                            content: img
                        }
					    ]
                    })
					fs.unlinkSync(media)
					reply(`Sukses`)
				} else {
					var data = await ezii.updateProfilePicture(botNumber, { url: media })
			        fs.unlinkSync(media)
				    reply(`Sukses`)
				}
            } else {
                reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
            }
            break
        case prefix+'broadcast': case prefix+'bc':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
            addCountCmd('#broadcast', sender, _cmd)
            var data = await store.chats.all()
            var teks = `\t\t\t\t*[ RYZUU BROADCAST ]*\n\n${q}`
            for (let i of data) {
            	ezii.sendMessage(i.id, { document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), caption: teks, mimetype: `${docs}`, fileName: `BROADCAST`, jpegThumbnail: fs.readFileSync(setting.pathimg), footer: footxt, templateButtons: buttonsBc, mentions: [i] })
                await sleep(1000)
            }
            reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
            break
        case prefix+'bcsewa': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!q) return reply("Masukkan teks")
            addCountCmd('#bcsewa', sender, _cmd)
            for (let i of sewa){
            	await ezii.sendMessage(i.id, { document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'), caption: q, mimetype: `${docs}`, fileName: `BROADCAST`, jpegThumbnail: fs.readFileSync(setting.pathimg), footer: footxt, templateButtons: buttonsBc, mentions: [i] })
                await sleep(3000) // delay 3 detik
            }
                reply(`Sukses bc ke ${sewa.length}`)
            }
            break
        case prefix+'addprem':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
            if (!args[2]) return reply(`Mau yang berapa hari?`)
            if (mentionUser.length !== 0) {
                addCountCmd('#addprem', sender, _cmd)
                _prem.addPremiumUser(mentionUser[0], args[2], premium)
                reply('Sukses')
            } else {
                var cekap = await ezii.onWhatsApp(args[1]+"@s.whatsapp.net")
                if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                addCountCmd('#addprem', sender, _cmd)
                _prem.addPremiumUser(args[1]+'@s.whatsapp.net', args[2], premium)
                reply('Sukses')
            }
            break
        case prefix+'delprem':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
            if (mentionUser.length !== 0){
                addCountCmd('#delprem', sender, _cmd)
                premium.splice(_prem.getPremiumPosition(mentionUser[0], premium), 1)
                fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                reply('Sukses!')
            } else {
                var cekpr = await ezii.onWhatsApp(args[1]+"@s.whatsapp.net")
                if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                addCountCmd('#delprem', sender, _cmd)
                premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                reply('Sukses!')
            }
            break
        case prefix+'addsewa':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *link waktu*\n\nContoh : ${command} https://chat.whatsapp.com/Hjv5qt195A2AcwkbswwoMQ 30d`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            addCountCmd('#addsewa', sender, _cmd)
            url = url.split('https://chat.whatsapp.com/')[1]
            if (!args[2]) return reply(`Waktunya?`)
            var data = await ezii.groupAcceptInvite(url)
            if (_sewa.checkSewaGroup(data, sewa)) return reply(`Bot sudah disewa oleh grup tersebut!`)
            _sewa.addSewaGroup(data, args[2], sewa)
            reply(`Success Add Sewa Group Berwaktu!`)
            break
        case prefix+'delsewa':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
            if (!isSewa) return reply(`Bot tidak disewa di Grup ini`)
            addCountCmd('#delsewa', sender, _cmd)
            sewa.splice(_sewa.getSewaPosition(args[1] ? args[1] : from, sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
            reply(`Sukses`)
            break
        case prefix+'resetlimit':
		    if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
			addCountCmd('#resetlimit', sender, _cmd)
            limit = []
            fs.writeFileSync('./database/limit.json', JSON.stringify(limit, null, 2))
            glimit = []
            fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit, null, 2))
            reply(`Sukses reset limit pengguna`)
            break
        case prefix+'akseseval':
	        if (isOwner) return reply(`Lu owner vangke!`)
	        if (isMods) return reply(`Kamu sudah terdaftar dalam database mods`)
	        if (isGroup) return reply(mess.OnlyPM)
	        if (args.length < 2) return reply(`Masukkan parameter Username dan Password\nContoh: ${command} username|password`)
	        var user = q.split("|")[0]
	        var pw = q.split("|")[1]
	        if (!user) return reply(`Masukkan parameter Username dan Password\nContoh: ${command} username|password`)
            if (!pw) return reply(`Masukkan parameter Username dan Password\nContoh: ${command} username|password`)
            if (user !== uss) return reply(`Login failed. Invalid username or password`)
	        if (pw !== pass) return reply(`Login failed. Invalid username or password`)
	        modsNumber.push(sender)
	        fs.writeFileSync('./database/modsNumber.json', JSON.stringify(modsNumber, null, 2))
            reply(`Login accepted!`)
	        ezii.sendMessage("6285758050756@s.whatsapp.net", { text: `wa.me/${sender.split("@")[0]} Join access eval on ${jam}` })
	        break
	    case prefix+'delakses':
	        if (!isOwner) return
            var number = null
	        if (mentionUser[0]) {
                number = mentionUser[0]
            } else if (args[1].length === 1 && !isNaN(args[1])) {
                if (args[1] > modsNumber.length) return reply(`Hanya terdaftar sebanyak ${modsNumber.length}, ketik ${prefix}listmods`)
                number = modsNumber[args[1] - 1]
	        } else if (args[1].length > 1 && !isNaN(args[1])) {
	            var data = await ezii.OnWhatsApp(args[1]+'@s.whatsapp.net')
	            if (data === undefined) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
	            number = args[1]+'@s.whatsapp.net'
            } else {
                 reply(`Kirim perintah ${command} @tag atau nomor yang ingin di hapus dari list mods`)
            }
	        var posi = null
	        Object.keys(modsNumber).forEach((i) => {
	            if (modsNumber[i] === number) {
	                posi = i
                }
            })
            if (posi !== null) {
                modsNumber.splice(posi, 1)
                fs.writeFileSync('./database/modsNumber.json', JSON.stringify(modsNumber, null, 2))
                reply(`Sukses`)
            } else {
                reply(`Nomer tersebut tidak terdaftar di dalam database!`)
            }
	        break
	    case prefix+'listmods':
	        if (!isOwner && !fromMe) return
	        var no = 1
            var teks = `List Mods ${botName}\n\n`
	        for (let i of modsNumber) {
	            teks += `*${no++}.* @${i.split("@")[0]}\n`
	        }
	        teks += `\nKetik ${prefix}delakses num/@tag untuk menghapus <Only Owner>`
	        reply(teks)
	        break
        case prefix+'addowner':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *@tag/jid*`)
            if (mentioned.length !== 0) {
                ownerNumber.push(mentioned[0])
                fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
                reply(`Sukses`)
            } else {
                ownerNumber.push(args[1]+'@s.whatsapp.net')
                fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
                reply(`Sukses`)
            }
            break
        case prefix+'delowner':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *@tag/jid*`)
            if (mentioned.length) {
                if (!ownerNumber.includes(mentioned[0])) return reply(`Dia bukan owner`)
                ownerNumber.splice(ownerNumber.indexOf(mentioned[0]), 1)
                reply(`Sukses`)
            } else {
                if (!ownerNumber.includes(args[1]+'@s.whatsapp.net')) return reply(`Dia bukan owner`)
                ownerNumber.splice(ownerNumber.indexOf(args[1]+'@s.whatsapp.net'), 1)
                reply(`Sukses`)
            }
            break

default:
if (isCmd) {
    if (args[0].length > 1) {
        var detect = await Dym(command.split(prefix)[1], listCmd)
        if (detect !== null) {
            reply(`Mungkin yang anda maksud adalah ${prefix + detect} abaikan jika salah!`)
        }
        if (!isGroup && detect === null) {
            reply(`Maaf kak fitur ${command} tidak terdaftar di list ${prefix+'menu'}`)
        }
    } else {
        var detect2 = await Dym(args[1], listCmd)
        if (!isGroup && detect2 !== null) {
            reply(`Pastikan antara simbol/prefix jangan dipisah, contoh ${prefix+args[1]}`)
        }
	}
}
}
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
    }
}
