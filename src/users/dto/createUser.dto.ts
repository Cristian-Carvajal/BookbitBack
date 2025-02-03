import { State } from 'src/state/state.entity';

export class CreateUserDto {
  name: string;
  email: string;
  image: string;
  state?: State;
}
