import { Types } from 'mongoose';
import { Portefeuille, type IPortefeuille } from '../models/Portefeuille.js';
import { Visiteur } from '../models/Visiteur.js';
import { Praticien } from '../models/Praticien.js';

export class PortefeuilleService {
  public async addPraticien(data: {
    visiteur: string;
    praticien: string;
    notes?: string;
  }): Promise<IPortefeuille> {
    if (!Types.ObjectId.isValid(data.visiteur)) {
      throw new Error('ID visiteur invalide');
    }
    if (!Types.ObjectId.isValid(data.praticien)) {
      throw new Error('ID praticien invalide');
    }

    const visiteurExists = await Visiteur.findById(data.visiteur).select('_id').lean();
    if (!visiteurExists) {
      throw new Error(`Visiteur avec l'ID ${data.visiteur} introuvable`);
    }

    const praticienExists = await Praticien.findById(data.praticien).select('_id').lean();
    if (!praticienExists) {
      throw new Error(`Praticien avec l'ID ${data.praticien} introuvable`);
    }

    const existingEntry = await Portefeuille.findOne({
      visiteur: data.visiteur,
      praticien: data.praticien
    });

    if (existingEntry) {
      if (existingEntry.actif) {
        throw new Error('Ce praticien est déjà dans le portefeuille du visiteur');
      }
      existingEntry.actif = true;
      existingEntry.date_ajout = new Date();
      if (data.notes) {
        existingEntry.notes = data.notes;
      }
      return await existingEntry.save();
    }

    const portefeuille = new Portefeuille({
      visiteur: data.visiteur,
      praticien: data.praticien,
      notes: data.notes,
      date_ajout: new Date(),
      actif: true
    });

    return await portefeuille.save();
  }

  public async removePraticien(visiteurId: string, praticienId: string): Promise<void> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }
    if (!Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID praticien invalide');
    }

    const result = await Portefeuille.findOneAndUpdate(
      { visiteur: visiteurId, praticien: praticienId },
      { actif: false },
      { new: true }
    );

    if (!result) {
      throw new Error('Relation introuvable dans le portefeuille');
    }
  }

  public async getByVisiteur(visiteurId: string, actifOnly: boolean = true): Promise<IPortefeuille[]> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }

    const query: any = { visiteur: visiteurId };
    if (actifOnly) {
      query.actif = true;
    }

    return await Portefeuille.find(query)
      .select('-visiteur')
      .populate('praticien', 'nom prenom email ville')
      .sort({ date_ajout: -1 });
  }

  public async getByPraticien(praticienId: string, actifOnly: boolean = true): Promise<IPortefeuille[]> {
    if (!Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID praticien invalide');
    }

    const query: any = { praticien: praticienId };
    if (actifOnly) {
      query.actif = true;
    }

    return await Portefeuille.find(query)
      .populate('visiteur', 'nom prenom email tel')
      .sort({ date_ajout: -1 });
  }

  public async updateNotes(visiteurId: string, praticienId: string, notes: string): Promise<IPortefeuille> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }
    if (!Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID praticien invalide');
    }

    const result = await Portefeuille.findOneAndUpdate(
      { visiteur: visiteurId, praticien: praticienId },
      { notes },
      { new: true, runValidators: true }
    )
      .populate('visiteur', 'nom prenom email')
      .populate('praticien', 'nom prenom email ville');

    if (!result) {
      throw new Error('Relation introuvable dans le portefeuille');
    }

    return result;
  }

  public async getAll(actifOnly: boolean = true): Promise<IPortefeuille[]> {
    const query: any = {};
    if (actifOnly) {
      query.actif = true;
    }

    return await Portefeuille.find(query)
      .populate('visiteur', 'nom prenom email')
      .populate('praticien', 'nom prenom email ville')
      .sort({ date_ajout: -1 });
  }

  public async getNombrePortefeuille(visiteurId: string): Promise<number> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }

    return await Portefeuille.countDocuments({ visiteur: visiteurId });
  }

  public async getNombrePortefeuilleActif(visiteurId: string): Promise<number> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }

    return await Portefeuille.countDocuments({ visiteur: visiteurId, actif: true });
  }

  public async deleteRelation(visiteurId: string, praticienId: string): Promise<void> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }
    if (!Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID praticien invalide');
    }

    const result = await Portefeuille.findOneAndDelete({
      visiteur: visiteurId,
      praticien: praticienId
    });

    if (!result) {
      throw new Error('Relation introuvable dans le portefeuille');
    }
  }
}
