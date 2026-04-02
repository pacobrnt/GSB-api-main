import { Types } from 'mongoose';
import { Motif, type IMotif } from '../models/Motif.js';

export class MotifService {
  public async create(data: { libelle: string }): Promise<IMotif> {
    const motif = new Motif(data);
    return await motif.save();
  }

  public async getAll(): Promise<IMotif[]> {
    return await Motif.find().sort({ libelle: 1 });
  }

  public async getById(id: string): Promise<IMotif> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID motif invalide');
    }

    const motif = await Motif.findById(id);
    if (!motif) {
      throw new Error(`Motif avec l'ID ${id} introuvable`);
    }

    return motif;
  }

  public async update(id: string, data: Partial<{ libelle: string }>): Promise<IMotif> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID motif invalide');
    }

    const motif = await Motif.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!motif) {
      throw new Error(`Motif avec l'ID ${id} introuvable`);
    }

    return motif;
  }

  public async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID motif invalide');
    }

    const result = await Motif.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`Motif avec l'ID ${id} introuvable`);
    }
  }
}
