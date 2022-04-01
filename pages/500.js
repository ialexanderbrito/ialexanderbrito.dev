import ErrorMessage from '../components/ErrorMessage';
import Base from '../layouts/Base';

function Custom500() {
  return <ErrorMessage />;
}

Custom500.Layout = Base;

export default Custom500;
