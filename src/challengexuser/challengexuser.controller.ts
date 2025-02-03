import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ChallengeXUserService } from './challengexuser.service';
import { ChallengeXUser } from './challengexuser.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user-challenges')
export class ChallengeXUserController {
  constructor(private readonly challengeXUserService: ChallengeXUserService) {}

  @Post()
  async assignChallengeToUser(
    @Req() req,
    @Body('challengeId') challengeId: number,
    @Body('statusId') statusId: number,
  ): Promise<ChallengeXUser> {
    return this.challengeXUserService.assignChallengeToUser(
      req.user.id,
      challengeId,
      statusId,
    );
  }

  @Get()
  async getUserChallenges(@Req() req): Promise<ChallengeXUser[]> {
    return this.challengeXUserService.getUserChallenges(req.user.id);
  }
}
