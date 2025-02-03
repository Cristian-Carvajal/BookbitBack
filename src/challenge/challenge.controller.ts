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
    @Body('pages') pages: number,
    @Body('deadline') deadline: number,
  ): Promise<Challenge> {
    return this.challengeService.createChallenge(
      req.user.id,
      req.user.name,
      pages,
      deadline,
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

  @Patch(':challengeId/complete')
  async completeChallenge(
    @Param('challengeId') challengeId: number,
    @Body('userId') userId: number,
  ): Promise<Challenge> {
    return this.challengeService.completeChallenge(userId, challengeId);
  }
}
