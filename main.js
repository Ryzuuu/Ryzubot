"use strict";
require('./message/settings')
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
	useSingleFileAuthState,
	makeInMemoryStore,
	delay,
	downloadContentFromMessage,
	jidDecode,
	generateForwardMessageContent,
	generateWAMessageFromContent,
	proto,
	prepareWAMessageMedia
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const PhoneNumber = require('awesome-phonenumber')
const { Spinner } = clui

const afk = require("./lib/afk");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif2')
const { serialize, getBuffer, makeid } = require("./lib/myfunc");
const { color, EziiLog } = require("./lib/color");
const _sewa = require("./lib/sewa");
const { isSetWelcome, getTextSetWelcome } = require('./lib/setwelcome');
const { isSetLeft, getTextSetLeft } = require('./lib/setleft');

let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'));
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')

let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

function title() {
    console.log(chalk.bold.green(figlet.textSync('Ryzuu Beta', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: false
    })))
    console.log(chalk.yellow(`\n${chalk.yellow('[ Created By Eziitzy ]')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
    console.log(`Module ${module} sedang dipantau oleh Eziigntng:b`)
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
    const ezii = makeWASocket({
        printQRInTerminal: true,
        logger: logg({ level: 'fatal' }),
        auth: state
    })
    title()
    store.bind(ezii.ev)

    ezii.spam = []
    ezii.mode = 'public'

    require('./config.json')
    require('./message/help')
    require('./lib/myfunc')
    require('./message/ryzu')
    nocache('./config.json', module => console.log(chalk.greenBright('[ RYZU ] ') + time + chalk.cyanBright(` "${module}" Updated!`)))
    nocache('./message/help', module => console.log(chalk.greenBright('[ RYZU ] ') + time + chalk.cyanBright(` "${module}" Updated!`)))
    nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ RYZU ]  ') + time + chalk.cyanBright(` "${module}" Updated!`)))
    nocache('./message/ryzu', module => console.log(chalk.greenBright('[ RYZU ] ') + time + chalk.cyanBright(` "${module}" Updated!`)))

    ezii.multi = true
    ezii.nopref = false
	ezii.prefa = 'anjing'
	ezii.ev.on('messages.upsert', async m => {
	    var msg = m.messages[0]
	    if (!m.messages) return;
	    //  msg.message = (Object.keys(msg.message)[0] == "ephemeralMessage") ? msg.message.ephemeralMessage.message : msg.message
	    if (msg.key && msg.key.remoteJid == "status@broadcast") return
	    msg = serialize(ezii, msg)
	    msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
	    require('./message/ryzu')(ezii, msg, m, setting, store, welcome, left, set_welcome_db, set_left_db, db_respon_list, sewa, opengc, _afk)
	})

    ezii.ev.on('presence.update', async data => {
        if (data.presences) {
            for (let key in data.presences) {
                if (data.presences[key].lastKnownPresence === "composing" || data.presences[key].lastKnownPresence === "recording") {
                    if (afk.checkAfkUser(key, _afk)) {
                        _afk.splice(afk.getAfkPosition(key, _afk), 1)
                        fs.writeFileSync('./database/afk.json', JSON.stringify(_afk, null, 2))
                        ezii.sendMessage(data.id, { text: `@${key.split("@")[0]} berhenti afk, dia sedang ${data.presences[key].lastKnownPresence === "composing" ? "mengetik" : "merekam"}`, mentions: [key] })
                    }
                }
            }
        }
    })

    ezii.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            status.stop()
            reconnect.stop()
            starting.stop()
            console.log(EziiLog('Connect, Welcome Owner'))
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
            ? connectToWhatsApp()
            : console.log(EziiLog('Connection Lost'))
        }
    })
	
//randoming function
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}
//document randomizer
let documents = [doc1,doc2,doc3,doc4,doc5,doc6]
let docs = pickRandom(documents)
// Websitex, botName, ownerName
let ownerName = 'Eziigntng'
let botName = 'Ryzuubot'
let websitex = 'https://youtu.be/xn9RatOrbuI'
const fake = 'Error? Report to the number below↷\n░⃞ׇ͠🦢̸۪ ⚭ wa.me/6285758050756 ␥\n𖦆 WhatsApp bot by @eziigntng_'

    ezii.ev.on('group-participants.update', async (data) => {
        const isWelcome = welcome.includes(data.id) ? true : false
        const isLeft = left.includes(data.id) ? true : false
        const metadata = await ezii.groupMetadata(data.id)
        const groupName = metadata.subject
        const groupDesc = metadata.desc
        try {
            for (let i of data.participants) {
                    try {
                        var pp_user = await ezii.profilePictureUrl(i, 'image')
                    } catch {
                        var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                    }

// Welcome & Left
                if (data.action == 'add' && isWelcome) {
                const buffer = await getBuffer(pp_user)
                const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	            const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                const xmembers = metadata.participants.length
                let unicorndoc = { key: {participant: `0@s.whatsapp.net`, ...(data.id ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `RyzuuBotz`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;RyzuuBotz,;;;\nFN:RyzuuBotz,\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_user, thumbnail: pp_user,sendEphemeral: true}}}
                let xeonbody = `Welcome @${i.split("@")[0]} in the group ${groupName}`
let buttons = [
{buttonId: `ahhhh`, buttonText: {displayText: 'Hii Beban'}, type: 1}, 
{buttonId: `ahhhh`, buttonText: {displayText: 'Welcome'}, type: 1}
]
let buttonMessage = {
document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
mimetype: docs,
jpegThumbnail:buffer,
mentions: [i],
fileName: `Don't forget to read group description`,
fileLength: 99999999999999,
caption: xeonbody,
footer: `${fake}`,
buttons: buttons,
headerType: 4,
contextInfo:{externalAdReply:{
title: `WHATSAPP BOT`,
body: `nekopi.care`,
mediaType:2,
thumbnail: buffer,
sourceUrl: `https://instagram.com/ohyziro`
}}
}
ezii.sendMessage(data.id, buttonMessage, {quoted:unicorndoc})
                } else if (data.action == 'remove' && isLeft) {
                	const buffer = await getBuffer(pp_user)
                    const xeontime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	                const xeondate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                    const xeonmembers = metadata.participants.length
                    let unicorndoc = { key: {participant: `0@s.whatsapp.net`, ...(data.id ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `RyzuuBotz`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;RyzuuBotz,;;;\nFN:RyzuuBotz,\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_user, thumbnail: pp_user,sendEphemeral: true}}}
                    let xeonbody = `Sayonara @${i.split("@")[0]}`
let buttons = [
{buttonId: `wkwkwk`, buttonText: {displayText: 'Bay Beban'}, type: 1},
{buttonId: `wkwkwk`, buttonText: {displayText: 'Sayonara'}, type: 1}
]
let buttonMessage = {
document: fs.readFileSync('./RyzuMedia/theme/cheems.xlsx'),
mimetype: docs,
jpegThumbnail:buffer,
mentions: [i],
fileName: `Bye! my friend, take care.`,
fileLength: 99999999999999,
caption: xeonbody,
footer: `${fake}`,
buttons: buttons,
headerType: 4,
contextInfo:{externalAdReply:{
title: `WHATSAPP BOT`,
body: `nekopi.care`,
mediaType:2,
thumbnail: buffer,
sourceUrl: `https://instagram.com/ohyziro`
}}
}
ezii.sendMessage(data.id, buttonMessage, {quoted:unicorndoc})
                }
             }
        } catch (e) {
            console.log(e)
        }
    })

    ezii.ev.on('messages.delete', item => {
        if ('all' in item) {
            const list = messages[item.jid]
            list === null || list === void 0 ? void 0 : list.clear()
        }
        else {
            const jid = item.keys[0].remoteJid
            const list = messages[jid]
            if (list) {
                const idSet = new Set(item.keys.map(k => k.id));
                list.filter(m => !idSet.has(m.key.id))
            }
        }
    })

    ezii.ev.on('chats.delete', deletions => {
        for (const item of deletions) {
            chats.deleteById(item)
        }
    })

    setInterval(async function() {
        var jamna = new Date().toLocaleTimeString('en-US', { timeZone: "Asia/Jakarta" });
        var hasilnes = jamna.split(':')[0] < 10 ? '0' + jamna : jamna
        // hasilnes Kalo mau Jam 00 jadi 12:00:00 AM
        if(hasilnes === '12:00:00 AM') {
            var gcname = (await ezii.groupMetadata("17736660147-1622202642@g.us")).subject
            var count = gcname.replace(/[^0-9]/gi, '')
            ezii.groupUpdateSubject("17736660147-1622202642@g.us", gcname.replace(count, count - 1))
        }
    }, 1000);

    _sewa.expiredCheck(ezii, sewa)

    setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                ezii.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                ezii.sendMessage(i.id, { text: `Sukses, group telah dibuka` }))
                .catch((err) =>
                ezii.sendMessage(i.id, { text: 'Error' }))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)
	
    ezii.ev.on('creds.update', () => saveState)
	
	ezii.reply = (from, content, msg) => ezii.sendMessage(from, { text: content }, { quoted: msg })

    ezii.ws.on('CB:call', async (json) => {
        const callerId = json.content[0].attrs['call-creator']
        ezii.sendMessage(callerId, { text: `Jangan telepon bot!` })
    })

    ezii.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    ezii.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = ezii.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })
        
    ezii.getName = (jid, withoutContact = false) => {
        var id = ezii.decodeJid(jid)
        withoutContact = ezii.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = ezii.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === ezii.decodeJid(ezii.user.id) ?
            ezii.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
        
    ezii.setStatus = (status) => {
        hisoka.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
        
    ezii.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                lisplayName: await ezii.getName(i + '@s.whatsapp.net'),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await ezii.getName(i + '@s.whatsapp.net')}\nFN:${await ezii.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
           })
        }
        return ezii.sendMessage(jid, { contacts: { displayName: `${list.length} Contacts`, contacts: list }, ...opts }, { quoted })
    }
        
    ezii.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await ezii.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }
	
    ezii.sendMessageFromContent = async(jid, message, options = {}) => {
        var option = { contextInfo: {}, ...options }
        var prepare = await generateWAMessageFromContent(jid, message, option)
        await ezii.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
        return prepare
    }
	
    ezii.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
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
	
    // Add Other
    
    /** Send Button 5 Location
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
     
    ezii.send5Loc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
               "hydratedContentText": text,
               "locationMessage": {
               "jpegThumbnail": img },
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ezii.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    
    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    ezii.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: ezii.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ezii.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Video
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Video
     * @param [*] button
     * @param {*} options
     * @returns
     */
    ezii.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: vid }, { upload: ezii.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ezii.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Gif
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Gif
     * @param [*] button
     * @param {*} options
     * @returns
     */
    ezii.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: ezii.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            ezii.relayMessage(jid, template.message, { messageId: template.key.id })
    }


    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    ezii.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        ezii.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
	
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    ezii.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await ezii.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
     
    ezii.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await ezii.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    return ezii
}

connectToWhatsApp()
.catch(err => console.log(err))
