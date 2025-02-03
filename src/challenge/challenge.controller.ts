import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { Challenge } from './challenge.entity';

@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  async createChallenge(
    @Body('name') name: string,
    @Body('pages') pages: number,
    @Body('deadline') deadline: number,
  ): Promise<Challenge> {
    return this.challengeService.createChallenge(name, pages, deadline);
  }

  @Get(':id')
  async getChallengeById(@Param('id') id: number): Promise<Challenge> {
    return this.challengeService.getChallengeById(id);
  }
}
