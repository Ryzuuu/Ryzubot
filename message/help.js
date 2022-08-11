const fs = require("fs");
const petik = '```'

let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
    x = x.toString()
    var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
       x = x.replace(pattern, "$1,$2");
    return x;
}

exports.allMenu = (ucapanWaktu, pushname, mundur, upload, download, ownerName, botName, jam, tanggal, runtime, isOwner, isPremium, sender, limitCount, limit, gcount, glimit, balance, prefix) => {
    return`  *${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*

〃A Simple WhatsApp Bot, always by your side〃

*𔔀🫗࣪.⭒STATISTICS﹆ׅ ๋ ּ*
 ◍⃘ִ  Upload : ${upload}
 ◍⃘ִ  Downloads : ${download}

*𔔀🫗࣪.⭒BOT INFO﹆ׅ ๋ ּ*
 ◍⃘ִ  Bot Name : ${botName}
 ◍⃘ִ  Time : ${jam}
 ◍⃘ִ  Date : ${tanggal}
 ◍⃘ִ  Runtime : ${runtime(process.uptime())}

*𔔀🫗࣪.⭒USER INFO﹆ׅ ๋ ּ*
 ◍⃘ִ  Name : ${pushname !== undefined ? pushname : '-'}
 ◍⃘ִ  Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Gratisan'}
 ◍⃘ִ  Limit : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
 ◍⃘ִ  Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
 ◍⃘ִ  Balance : $${toCommas(getBalance(sender, balance))}
${readmore}
*MAIN MENU*${petik}
 • ${prefix}menu
 • ${prefix}infobot
 • ${prefix}donate
 • ${prefix}dashboard
 • ${prefix}owner
 • ${prefix}groupbot
 • ${prefix}cekdrive
 • ${prefix}cekbandwidth
 • ${prefix}cekpremium
 • ${prefix}listpremium
 • ${prefix}listsewa
 • ${prefix}speed
 • ${prefix}runtime
 • ${prefix}listbahasa
 Usage : #menu${petik}
 
*SHOP MENU*${petik}
 • ${prefix}listdm
 • ${prefix}topupff
 Usage : #listdm${petik}

*CONVERTER/TOOLS*${petik}
 • ${prefix}sticker
 • ${prefix}stickerwm
 • ${prefix}smeme
 • ${prefix}toimg
 • ${prefix}tovideo
 • ${prefix}tomp3
 • ${prefix}ttp
 • ${prefix}attp
 • ${prefix}emojimix
 • ${prefix}nulis
 • ${prefix}spamcall
 • ${prefix}say
 • ${prefix}translate
 Usage : #sticker${petik}

*ANONYMOUS CHATS*${petik}
 • ${prefix}anonymous
 • ${prefix}start
 • ${prefix}next
 • ${prefix}stop
 • ${prefix}sendprofile
 Usage : #sendprofile${petik}

*STORE MENU*${petik}
 • ${prefix}list
 • ${prefix}addlist
 • ${prefix}dellist
 • ${prefix}update
 • ${prefix}jeda
 • ${prefix}tambah
 • ${prefix}kurang
 • ${prefix}kali
 • ${prefix}bagi
 • proses < reply chat >
 • done < reply chat >
 Usage : #addlist${petik}

*DOWNLOADS MENU*${petik}
 • ${prefix}play
 • ${prefix}ytmp3
 • ${prefix}ytmp4
 • ${prefix}getmusic
 • ${prefix}getvideo
 • ${prefix}youtube
 • ${prefix}instagram
 • ${prefix}igstory
 • ${prefix}tiktok
 • ${prefix}facebook
 • ${prefix}facebookmp3
 • ${prefix}mediafire
 • ${prefix}zippyshare
 • ${prefix}telesticker
 • ${prefix}pinterestdl
 • ${prefix}gitclone
 Usage : #tiktok${petik}

*GROUP MENU*${petik}
 • ${prefix}afk
 • ${prefix}welcome
 • ${prefix}left
 • ${prefix}setwelcome
 • ${prefix}changewelcome
 • ${prefix}delsetwelcome
 • ${prefix}setleft
 • ${prefix}changeleft
 • ${prefix}delsetleft
 • ${prefix}linkgc
 • ${prefix}setppgc
 • ${prefix}setnamegc
 • ${prefix}setdesc
 • ${prefix}antilink
 • ${prefix}antiwame
 • ${prefix}open
 • ${prefix}close
 • ${prefix}add
 • ${prefix}kick
 • ${prefix}promote
 • ${prefix}demote
 • ${prefix}revoke
 • ${prefix}hidetag
 • ${prefix}checksewa
 Usage : #antilink${petik}

*GAME MENU*${petik}
 • ${prefix}tictactoe
 • ${prefix}delttt
 • ${prefix}tebakgambar
 • ${prefix}kuis
 • ${prefix}tebaklagu
 • ${prefix}family100
 • ${prefix}nyerah
 Usage : #tebakgambar${petik}
 
*FUN MENU*${petik}
 • ${prefix}suit
 • ${prefix}slot
 • ${prefix}apakah
 • ${prefix}bisakah
 • ${prefix}kapankah
 • ${prefix}bagaimanakah
 • ${prefix}rate
 • ${prefix}gantengcek
 • ${prefix}cantikcek
 • ${prefix}sangecek
 • ${prefix}gaycek
 • ${prefix}lesbicek
 • ${prefix}cekbapak
 Usage : #cekbapak${petik}
 
*INFORMATION*${petik}
 • ${prefix}gempa
 • ${prefix}covidindo
 • ${prefix}merdeka-news 
 • ${prefix}kontan-news 
 • ${prefix}cnbc-news 
 • ${prefix}tribun-news 
 • ${prefix}indozone-news 
 • ${prefix}kompas-news 
 • ${prefix}detik-news 
 • ${prefix}daily-news 
 • ${prefix}inews-news 
 • ${prefix}okezone-news 
 • ${prefix}sindo-news 
 • ${prefix}tempo-news 
 • ${prefix}antara-news 
 • ${prefix}cnn-news 
 • ${prefix}fajar-news
 Usage : #covidindo${petik}

*SEARCH MENU*${petik}
 • ${prefix}anime
 • ${prefix}manga
 • ${prefix}google
 • ${prefix}brainly
 • ${prefix}lirik
 • ${prefix}grupwa
 • ${prefix}pinterest
 • ${prefix}ytsearch
 • ${prefix}whatmusic
 • ${prefix}igtv
 • ${prefix}searchbyimage
 Usage : #brainly${petik}
 
*STORY MENU*${petik}
 • ${prefix}storywa
 • ${prefix}asupan
 Usage : #asupan${petik}

*NSFW MENU*${petik}
 • ${prefix}hentai
 • ${prefix}pussy
 • ${prefix}ahegao
 • ${prefix}ass
 • ${prefix}bdsm
 • ${prefix}blowjob
 • ${prefix}gasm
 • ${prefix}trap
 • ${prefix}spank
 • ${prefix}hneko
 • ${prefix}nwaifu
 • ${prefix}masturbation
 Usage : #hentai${petik}

*STICKER ANIME*${petik}
 • cry
 • kill
 • hug
 • pat
 • lick
 • kiss
 • bite
 • yeet
 • neko
 • bully
 • bonk
 • wink
 • poke
 • nom
 • slap
 • smile
 • wave
 • awoo
 • blush
 • smug
 • glomp
 • happy
 • dance
 • cringe
 • cuddle
 • highfive
 • shinobu
 • megumin
 • handhold
 Usage : kiss${petik}
 
*ANIME MENU*${petik}
 • ${prefix}loli
 • ${prefix}naruto
 • ${prefix}yaoi
 • ${prefix}neko2
 • ${prefix}waifu
 • ${prefix}waifu2
 • ${prefix}awoo2
 • ${prefix}shinobu
 • ${prefix}foxgirl
 • ${prefix}megumin
 • ${prefix}goose
 • ${prefix}avatar
 • ${prefix}tickle
 • ${prefix}gecg
 • ${prefix}feed
 • ${prefix}smug2
 • ${prefix}animenom
 • ${prefix}animeslap
 • ${prefix}animespank
 • ${prefix}animepat
 • ${prefix}animeneko
 • ${prefix}animekiss
 • ${prefix}animewlp
 • ${prefix}animecuddle
 • ${prefix}animecry
 • ${prefix}animekill
 • ${prefix}animelick
 • ${prefix}animebite
 • ${prefix}animeyeet
 • ${prefix}animebully
 • ${prefix}animebonk
 • ${prefix}animewink
 • ${prefix}animepoke
 • ${prefix}animesmile
 • ${prefix}animewave
 • ${prefix}animeawoo
 • ${prefix}animeblush
 • ${prefix}animesmug
 • ${prefix}animeglomp
 • ${prefix}animehappy
 • ${prefix}animedance
 • ${prefix}animecringe
 • ${prefix}animehighfive
 • ${prefix}animehandhold
 • ${prefix}animemegumin
 Usage : #loli${petik}

*RANDOM MENU*${petik}
 • ${prefix}quotes
 • ${prefix}cecan
 • ${prefix}cogan
 • ${prefix}meme
 • ${prefix}darkjoke
 • ${prefix}couple
 • ${prefix}faktaunik
 • ${prefix}gombalan
 • ${prefix}katagalau
 • ${prefix}quotesanime
 Usage : #cogan${petik}

*TEXTPRO MENU*${petik}
 • ${prefix}glitch
 • ${prefix}pornhub
 • ${prefix}harrypotter
 • ${prefix}graffiti
 • ${prefix}3dspace
 • ${prefix}lionlogo
 • ${prefix}bearlogo
 • ${prefix}wolflogo
 • ${prefix}candy
 • ${prefix}christmas
 • ${prefix}3dchristmas
 • ${prefix}sparklechristmas
 • ${prefix}deepsea
 • ${prefix}scifi
 • ${prefix}rainbow
 • ${prefix}waterpipe
 • ${prefix}spooky
 • ${prefix}pencil
 • ${prefix}circuit
 • ${prefix}discovery
 • ${prefix}metalic
 • ${prefix}fiction
 • ${prefix}demon
 • ${prefix}transformer
 • ${prefix}berry
 • ${prefix}thunder
 • ${prefix}magma
 • ${prefix}neonlight
 • ${prefix}brokenglass
 • ${prefix}papercut
 • ${prefix}watercolor
 • ${prefix}multicolor
 • ${prefix}neondevil
 • ${prefix}underwater
 • ${prefix}graffitibike
 • ${prefix}snow
 • ${prefix}cloud
 • ${prefix}honey
 • ${prefix}ice
 • ${prefix}fruitjuice
 • ${prefix}biscuit
 • ${prefix}wood
 • ${prefix}chocolate
 • ${prefix}strawberry
 • ${prefix}matrix
 • ${prefix}blood
 • ${prefix}droopwater
 • ${prefix}toxic
 • ${prefix}larva
 • ${prefix}rock
 • ${prefix}bloodglas
 • ${prefix}hallowen
 • ${prefix}darkgold
 • ${prefix}joker
 • ${prefix}wicker
 • ${prefix}firework
 • ${prefix}skeleton
 • ${prefix}blackpink
 • ${prefix}sand
 • ${prefix}glue
 • ${prefix}1917
 • ${prefix}leaves
 Usage : #leaves *teks*${petik}

*CERPEN MENU*${petik}
 • ${prefix}cerpen anak
 • ${prefix}cerpen bahasa daerah
 • ${prefix}cerpen bahasa inggris
 • ${prefix}cerpen bahasa jawa
 • ${prefix}cerpen bahasa sunda
 • ${prefix}cerpen budaya
 • ${prefix}cerpen cinta
 • ${prefix}cerpen cinta islami
 • ${prefix}cerpen cinta pertama
 • ${prefix}cerpen cinta romantis
 • ${prefix}cerpen cinta sedih
 • ${prefix}cerpen cinta segitiga
 • ${prefix}cerpen cinta sejati
 • ${prefix}cerpen galau
 • ${prefix}cerpen gokil
 • ${prefix}cerpen inspiratif
 • ${prefix}cerpen jepang
 • ${prefix}cerpen kehidupan
 • ${prefix}cerpen keluarga
 • ${prefix}cerpen kisah nyata
 • ${prefix}cerpen korea
 • ${prefix}cerpen kristen
 • ${prefix}cerpen liburan
 • ${prefix}cerpen lingkungan
 • ${prefix}cerpen lucu
 • ${prefix}cerpen malaysia
 • ${prefix}cerpen mengharukan
 • ${prefix}cerpen misteri
 • ${prefix}cerpen motivasi
 • ${prefix}cerpen nasihat
 • ${prefix}cerpen nasionalisme
 • ${prefix}cerpen olahraga
 • ${prefix}cerpen patah hati
 • ${prefix}cerpen penantian
 • ${prefix}cerpen pendidikan
 • ${prefix}cerpen pengalaman pribadi
 • ${prefix}cerpen pengorbanan
 • ${prefix}cerpen penyesalan
 • ${prefix}cerpen perjuangan
 • ${prefix}cerpen perpisahan
 • ${prefix}cerpen persahabatan
 • ${prefix}cerpen petualangan
 • ${prefix}cerpen ramadhan
 • ${prefix}cerpen remaja
 • ${prefix}cerpen renungan
 • ${prefix}cerpen rindu
 • ${prefix}cerpen rohani
 • ${prefix}cerpen romantis
 • ${prefix}cerpen sastra
 • ${prefix}cerpen sedih
 • ${prefix}cerpen sejarah
 • ${prefix}cerpen slice of life
 • ${prefix}cerpen terjemahan
 • ${prefix}cerpen thriller
 Usage : #cerpen rohani${petik}
  
*BALANCE MENU*${petik}
 • ${prefix}topglobal
 • ${prefix}toplocal
 • ${prefix}buylimit
 • ${prefix}buyglimit
 • ${prefix}transfer
 • ${prefix}limit
 • ${prefix}balance
 Usage : #limit${petik}

*BAILEYS*${petik}
 • ${prefix}fitnah
 • ${prefix}nowa
 • ${prefix}getquoted
 • ${prefix}fakehidetag
 • ${prefix}react
 • ${prefix}setcmd
 • ${prefix}delcmd
 Usage : #fitnah${petik}

*OWNERS MENU*${petik}
 • > evalcode
 • x evalcode-2
 • $ executor
 • ${prefix}exif
 • ${prefix}join
 • ${prefix}left
 • ${prefix}self
 • ${prefix}public
 • ${prefix}banchat
 • ${prefix}setprefix
 • ${prefix}setppbot
 • ${prefix}broadcast
 • ${prefix}bcsewa
 • ${prefix}addpremium
 • ${prefix}delpremium
 • ${prefix}addsewa
 • ${prefix}delsewa
 • ${prefix}addowner
 • ${prefix}delowner
 • ${prefix}resetlimit
 • ${prefix}akseseval
 • ${prefix}delakses
 • ${prefix}listmods
 Usage : #addowner${petik}

Fitur Lainnya Masih Dalam Tahap Pengembangan\nRequest Fitur? .owner`
}

exports.donate = (pushname, ownerNumber) => {
    return`\t\t\t*-------「 DONATE 」-------*

Hai ${pushname}👋
Kalian bisa mendukung saya agar bot ini tetap up to date dengan cara donasi
Berapapun donasi kalian akan sangat berarti 👍

Arigatou!

Contact person Owner:
wa.me/6285758050756 (Owner)`
}
