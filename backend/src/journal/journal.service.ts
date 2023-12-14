import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journal.model';
import { JournalEntry } from './journalEntry.model';
import { response } from 'express';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(Journal)
    private readonly journalModel: typeof Journal,
  ) {}

  async getAll(req: any): Promise<Journal[]> {
    try {
      const userId = req?.user?.userId;
      if (!userId) {
        throw new UnauthorizedException('Invalid User Id');
      }
      return this.journalModel.findAll({
        where: {
          userId: userId,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async create(req: any, journalEntry: JournalEntry) {
    try {
      const userId = req?.user?.userId;
      if (!userId) {
        throw new UnauthorizedException('Invalid User Id');
      }

      const newJournalEntry = new Journal({
        journalEntry: journalEntry.entry,
        userId: userId,
      });
      await newJournalEntry.save();
      return response.status(HttpStatus.OK);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
