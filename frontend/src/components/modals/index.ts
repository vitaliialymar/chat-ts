import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

export const getModal = (modalName: string) => {
  switch (modalName) {
    case 'adding':
      return Add;
    case 'removing':
      return Remove;
    case 'renaming':
      return Rename;
    default:
      break;
  }
};
