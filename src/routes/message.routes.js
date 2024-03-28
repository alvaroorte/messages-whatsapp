import { Router } from 'express';

const router = Router();

export default function messageRoute(client) {
  router.post('/', async (req, res) => {
    try {
      const response = await sendWhatsapp(req.body, client);
      if (response) {
        res.json({message: 'Mensaje enviado correctamente.'})
      } else {
        res.status(500).json({
          message: 'No existe un número enlazado al QR',
        });
      }
      return res;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
      return res;
    }
  });
  
  router.post('/list', async (req, res) => {
    try {
      if ( Array.isArray(req.body.phones) ) {
        const results = await req.body.phones.reduce( async (acum, phone) => {
          let result = await sendWhatsapp({ phone: phone, message: req.body.message }, client);
          if ( acum ) {
            acum = result
          }
          return acum
        }, true);
        if (!results) {
          res.status(500).json({
            message: 'Todos o algunos mensajes no se enviaron.',
          });
        } else {
          res.json({message: 'Mensajes enviados correctamente.'})
        }
      } else {
        res.status(500).json({
          message: 'phones no es una lista de números',
        });
      }
      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return router;
}

async function sendWhatsapp(body, client) {
  const clientActived = await client.getState();
  if ( clientActived ) {
    await client.sendMessage(`${body.phone}@c.us`, body.message);
    return true
  } else {
    return false;
  }
}
