import Polyglot from 'node-polyglot';
import { messages } from '../config/i18n';

const startPolyglot = (req, res, next) => {
  const locale = req.headers.locale;

  req.polyglot = new Polyglot();

  if (locale === 'ar') {
    req.polyglot.extend(messages.ar);
  } else {
    req.polyglot.extend(messages.en);
  }

  next();
};

export default startPolyglot;
