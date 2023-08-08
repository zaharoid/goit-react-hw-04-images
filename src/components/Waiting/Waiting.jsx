import { ThreeDots } from 'react-loader-spinner';
import { Title } from './Waiting.styled';

export default function Waiting() {
  return (
    <>
      <Title>Write something, buddy :- ) </Title>
      <ThreeDots wrapperStyle={{ margin: '0 auto' }} />
    </>
  );
}
