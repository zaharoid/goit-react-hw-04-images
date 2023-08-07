import { FallingLines } from 'react-loader-spinner';
import { Loading } from './Loader.styled';
export default function Loader() {
  return (
    <Loading>
      <FallingLines />
    </Loading>
  );
}
