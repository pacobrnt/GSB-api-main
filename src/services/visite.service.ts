import { Types } from 'mongoose';
import { Visite, type IVisite } from '../models/Visite.js';
import { Visiteur } from '../models/Visiteur.js';
import { Praticien } from '../models/Praticien.js';
import { Motif } from '../models/Motif.js';

export class VisiteService {
  public async create(data: {
    date_visite: Date;
    commentaire?: string;
    visiteur: string;
    praticien: string;
    motif: string;
  }): Promise<IVisite> {
    if (!Types.ObjectId.isValid(data.visiteur)) {
      throw new Error('ID visiteur invalide');
    }
    if (!Types.ObjectId.isValid(data.praticien)) {
      throw new Error('ID praticien invalide');
    }
    if (!Types.ObjectId.isValid(data.motif)) {
      throw new Error('ID motif invalide');
    }

    const visiteurExists = await Visiteur.findById(data.visiteur).select('_id').lean();
    if (!visiteurExists) {
      throw new Error(`Visiteur avec l'ID ${data.visiteur} introuvable`);
    }

    const praticienExists = await Praticien.findById(data.praticien).select('_id').lean();
    if (!praticienExists) {
      throw new Error(`Praticien avec l'ID ${data.praticien} introuvable`);
    }

    const motifExists = await Motif.findById(data.motif).select('_id').lean();
    if (!motifExists) {
      throw new Error(`Motif avec l'ID ${data.motif} introuvable`);
    }

    const visite = new Visite(data);
    return await visite.save();
  }

  public async getAll(filters?: {
    visiteur?: string;
    praticien?: string;
    motif?: string;
    dateDebut?: Date;
    dateFin?: Date;
  }): Promise<IVisite[]> {
    const query: any = {};

    if (filters?.visiteur && Types.ObjectId.isValid(filters.visiteur)) {
      query.visiteur = filters.visiteur;
    }

    if (filters?.praticien && Types.ObjectId.isValid(filters.praticien)) {
      query.praticien = filters.praticien;
    }

    if (filters?.motif && Types.ObjectId.isValid(filters.motif)) {
      query.motif = filters.motif;
    }

    if (filters?.dateDebut || filters?.dateFin) {
      query.date_visite = {};
      if (filters.dateDebut) {
        query.date_visite.$gte = filters.dateDebut;
      }
      if (filters.dateFin) {
        query.date_visite.$lte = filters.dateFin;
      }
    }

    return await Visite.find(query)
      .populate('visiteur', 'nom prenom email')
      .populate('praticien', 'nom prenom ville')
      .populate('motif', 'libelle')
      .sort({ date_visite: -1 });
  }

  public async getById(id: string): Promise<IVisite> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID visite invalide');
    }

    const visite = await Visite.findById(id)
      .populate('visiteur', 'nom prenom email')
      .populate('praticien', 'nom prenom ville')
      .populate('motif', 'libelle');

    if (!visite) {
      throw new Error(`Visite avec l'ID ${id} introuvable`);
    }

    return visite;
  }

  public async getByVisiteur(visiteurId: string): Promise<IVisite[]> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }

    return await Visite.find({ visiteur: visiteurId })
      .populate('praticien', 'nom prenom ville')
      .populate('motif', 'libelle')
      .sort({ date_visite: -1 });
  }

  public async getByPraticien(praticienId: string): Promise<IVisite[]> {
    if (!Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID praticien invalide');
    }

    return await Visite.find({ praticien: praticienId })
      .populate('visiteur', 'nom prenom email')
      .populate('motif', 'libelle')
      .sort({ date_visite: -1 });
  }

  public async getByPeriod(dateDebut: Date, dateFin: Date): Promise<IVisite[]> {
    return await Visite.find({
      date_visite: {
        $gte: dateDebut,
        $lte: dateFin
      }
    })
      .populate('visiteur', 'nom prenom email')
      .populate('praticien', 'nom prenom ville')
      .populate('motif', 'libelle')
      .sort({ date_visite: -1 });
  }

  public async update(id: string, data: Partial<{
    date_visite: Date;
    commentaire: string;
    visiteur: string;
    praticien: string;
    motif: string;
  }>): Promise<IVisite> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID visite invalide');
    }

    if (data.visiteur && !Types.ObjectId.isValid(data.visiteur)) {
      throw new Error('ID visiteur invalide');
    }
    if (data.praticien && !Types.ObjectId.isValid(data.praticien)) {
      throw new Error('ID praticien invalide');
    }
    if (data.motif && !Types.ObjectId.isValid(data.motif)) {
      throw new Error('ID motif invalide');
    }

    const visite = await Visite.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    )
      .populate('visiteur', 'nom prenom email')
      .populate('praticien', 'nom prenom ville')
      .populate('motif', 'libelle');

    if (!visite) {
      throw new Error(`Visite avec l'ID ${id} introuvable`);
    }

    return visite;
  }

  public async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID visite invalide');
    }

    const result = await Visite.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`Visite avec l'ID ${id} introuvable`);
    }
  }
}
