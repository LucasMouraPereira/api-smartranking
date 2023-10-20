import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}
  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const findPlayer = await this.playerModel.findOne({ email }).exec();

    if (findPlayer) {
      this.Update(createPlayerDto);
      return;
    }
    this.create(createPlayerDto);
  }

  async allPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async searchPlayerByEmail(email: string): Promise<Player> {
    const findPlayer = this.playerModel.findOne({ email }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return findPlayer;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.deleteOne({ email }).exec();
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);
    return await playerCreated.save();
  }

  private async Update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDto.email },
        { $set: createPlayerDto },
      )
      .exec();
  }
}
