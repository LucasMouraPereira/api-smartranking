import { Controller, Post, Get, Body, Query, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createAndUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createAndUpdatePlayer(createPlayerDto);
  }

  @Get()
  async allPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.searchPlayerByEmail(email);
    }
    return this.playersService.allPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayer(email);
  }
}
