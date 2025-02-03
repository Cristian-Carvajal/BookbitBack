import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './state.entity';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([State])], // Importa el repositorio de `State`
  providers: [StateService],
  exports: [StateService, TypeOrmModule], // Exportamos para que otros módulos puedan usarlo
})
export class StateModule {}
