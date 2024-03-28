# messages-whatsapp
app for send messages by whatsapp

npm install

npm start

then scan QR code with whatsapp web


POST:   http://localhost:3001/api/messages

    {
        phone: string, // '59177475474'
        message: string // 'Here message'
    }

POST:   http://localhost:3001/api/messages/list

    {
        phones: string[], // ['59177475474', '59161548564']
        message: string // 'Here message'
    }
