export const COMPANY = {
  name: 'ByteAxis',
  whatsapp: '+263 77 866 3941',
  whatsappIntl: '263778663941',
  voip: '08677212381',
  social: {
    facebook: 'https://facebook.com/byteaxis',
    instagram: 'https://instagram.com/byteaxis',
    tiktok: 'https://www.tiktok.com/@byteaxis',
  },
};

export const getWhatsAppLink = () => `https://wa.me/${COMPANY.whatsappIntl}`;

export const getTelLink = (number) => `tel:${number.replace(/\s+/g, '')}`;
