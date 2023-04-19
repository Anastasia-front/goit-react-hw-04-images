import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderStyle } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderStyle>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderStyle>
  );
};
export default Loader;
