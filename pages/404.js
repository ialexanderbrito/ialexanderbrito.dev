import ErrorMessage from '../components/ErrorMessage';
import Base from '../layouts/Base';

function Custom404() {
  return <ErrorMessage code={404} />;
}

Custom404.Layout = Base;

export default Custom404;
