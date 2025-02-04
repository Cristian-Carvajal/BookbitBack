import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { Challenge } from './challenge.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  async createChallenge(
    @Req() req,
    @Body('name') name: string,
    @Body('pages') pages: number,
    @Body('deadLine') deadLine: number,
  ): Promise<Challenge> {
    return this.challengeService.createChallenge(
      req.user.id,
      name,
      pages,
      deadLine,
    );
  }

  @Get()
  async getUserChallenges(@Req() req): Promise<Challenge[]> {
    return this.challengeService.getUserChallenges(req.user.id);
  }

  @Get(':id')
  async getChallengeById(@Param('id') id: number): Promise<Challenge> {
    return this.challengeService.getChallengeById(id);
  }

  @Patch(':challengeId/complete/:bookId')
  async completeChallenge(
    @Param('bookId') bookId: number,
    @Param('challengeId') challengeId: number,
    @Req() req,
  ): Promise<Challenge> {
    return this.challengeService.completeChallenge(
      req.user.id,
      challengeId,
      bookId,
    );
  }
}
