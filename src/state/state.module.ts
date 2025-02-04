import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './state.entity';
import { StateService } from './state.service';
import { AchievementxuserModule } from 'src/achievementxuser/achievementxuser.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([State]),
    forwardRef(() => AchievementxuserModule),
  ], // Importa el repositorio de `State`
  providers: [StateService],
  exports: [StateService, TypeOrmModule], // Exportamos para que otros módulos puedan usarlo
})
export class StateModule {}
