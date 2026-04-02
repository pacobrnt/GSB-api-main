import { Types } from 'mongoose';
import { Praticien, type IPraticien } from '../models/Praticien.js';

export class PraticienService {
  public async create(data: {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    rue: string;
    code_postal: string;
    ville: string;
  }): Promise<IPraticien> {
    const praticien = new Praticien(data);
    return await praticien.save();
  }

  public async getAll(filters?: {
    ville?: string;
    nom?: string;
  }): Promise<IPraticien[]> {
    const query: any = {};

    if (filters?.ville) {
      query.ville = new RegExp(filters.ville, 'i');
    }

    if (filters?.nom) {
      query.nom = new RegExp(filters.nom, 'i');
    }

    return await Praticien.find(query).sort({ nom: 1, prenom: 1 });
  }

  public async getById(id: string): Promise<IPraticien> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID praticien invalide');
    }

    const praticien = await Praticien.findById(id);
    if (!praticien) {
      throw new Error(`Praticien avec l'ID ${id} introuvable`);
    }

    return praticien;
  }

  public async getByEmail(email: string): Promise<IPraticien | null> {
    return await Praticien.findOne({ email: email.toLowerCase() });
  }

  public async getByVille(ville: string): Promise<IPraticien[]> {
    return await Praticien.find({ ville: new RegExp(ville, 'i') }).sort({ nom: 1, prenom: 1 });
  }

  public async update(id: string, data: Partial<{
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    rue: string;
    code_postal: string;
    ville: string;
  }>): Promise<IPraticien> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID praticien invalide');
    }

    const praticien = await Praticien.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!praticien) {
      throw new Error(`Praticien avec l'ID ${id} introuvable`);
    }

    return praticien;
  }

  public async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID praticien invalide');
    }

    const result = await Praticien.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`Praticien avec l'ID ${id} introuvable`);
    }
  }

  public async getVisites(praticienId: string): Promise<IPraticien> {
    if (!Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID praticien invalide');
    }

    const praticien = await Praticien.findById(praticienId).populate({
      path: 'visites',
      options: { sort: { date_visite: -1 } }
    });

    if (!praticien) {
      throw new Error(`Praticien avec l'ID ${praticienId} introuvable`);
    }

    return praticien;
  }
}
