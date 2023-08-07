import { LoadMore } from './Button.styled';
export default function Button({ onClick }) {
  return (
    <LoadMore type="button" onClick={onClick}>
      Load more
    </LoadMore>
  );
}
